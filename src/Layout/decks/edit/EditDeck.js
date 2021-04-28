import React, {useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {Link} from "react-router-dom"
import { updateDeck, readDeck} from "../../../utils/api";
import NavigationBar from "../../NavigationBar";
import NotFound from "../../NotFound";

function EditDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();
  const {deckId}=useParams();  
  useEffect(()=>{
      const abortController= new AbortController();
      readDeck(deckId,abortController.signal).then((deck)=>{
          setDeckName(deck.name);
          setDeckDescription(deck.description);
      }).catch(()=>history.push("/NotFound"));
      return ()=>abortController.abort();
  },[deckId]);

  const [abortControllers, setAbortControllers] = useState([]);
  const _abortPreviousCall = () => {
    if (abortControllers.length) {
      const lastIndex = abortControllers.length - 1;
      const lastAbortController = abortControllers[lastIndex];
      lastAbortController.abort();
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    _abortPreviousCall();
    const newAbortController = new AbortController();
    setAbortControllers([...abortControllers, newAbortController]);
    const editedDeck = {
      id: deckId,   
      name: deckName,
      description: deckDescription,
    };
    updateDeck(editedDeck, newAbortController.signal).then(({id})=>{
        window.alert("Deck Info Updated");
        history.push("/decks/"+id);
    });
    console.log("attemp submit");
  };

  return (
    <div>
      <NavigationBar navItems={[deckName,"Edit Deck"]} />
      <h2>Edit Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            aria-describedby="newDeck"
            placeholder="Deck Name"
            required
            value={deckName}
            onChange={({ target: { value } }) => {
              setDeckName(value);
            }}
          />
          <small id="newDeck" className="form-text text-muted">
            This field is requuired
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Brief description of the deck"
            rows="3"
            required
            value={deckDescription}
            onChange={({ target: { value } }) => {
              setDeckDescription(value);
            }}
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-dark mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default EditDeck;
