import  React, {useState } from "react";
import { useHistory } from "react-router";
import { createDeck } from "../../../utils/api";
import NavigationBar from "../../NavigationBar";

function CreateDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();

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
    const deck = {
      name: deckName,
      description: deckDescription,
    };
    /*Used setTimer just to test the Abort functionality and to see if it will be aborted
      if the user make another submit attemp */
    // setTimeout(() => {
    //   createDeck(deck, newAbortController.signal);
    // }, 2000);
    createDeck(deck, newAbortController.signal).then(({id})=>history.push("/decks/"+id));
  };
  return (
    <div>
      <NavigationBar navItems={["Creat Deck"]} />
      <h2>Create Deck</h2>

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
        <button type="reset" className="btn btn-dark mr-2">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default CreateDeck;
