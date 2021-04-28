import  React, {useEffect, useState } from "react";
import { useParams,useHistory } from "react-router";
import { Link } from "react-router-dom";
import { updateCard, readDeck } from "../../utils/api";
import NavigationBar from "../NavigationBar";
import NotFound from "../NotFound";
import CardFormData from "./CardFormData";

function EditCard() {
  const { deckId,cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history=useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck)=>{
          setDeck(deck);
          const card=deck.cards.find((card)=>card.id===parseInt(cardId));
          setFront(card.front);
          setBack(card.back);
        })
      .catch((e) => {
        return <NotFound />;
      });
    return () => abortController.abort();
  }, [deckId]);

  if (!deck) {
    return <NotFound />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const card = {
      id:cardId,  
      front,
      back,
    };
    updateCard(card)
      .then(window.alert("Card Info Was Updated"))
      .catch(console.log).then(history.push(`/decks/${deckId}`));
    
  };

  return (
    <div>
      <NavigationBar navItems={[deck.name, "Edit Card "+cardId]} />
      {/* <h2>{deck.name}: AddCard</h2> */}
      <form onSubmit={handleSubmit}>

        <CardFormData
          front={front}
          setFront={setFront}
          back={back}
          setBack={setBack}
        />

        <Link
          to={`/decks/${deckId}`}
          className="form-button btn btn-lg btn-secondary mr-2"
        >
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;
