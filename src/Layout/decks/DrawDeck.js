import  React  from "react";
import { Link } from "react-router-dom";
import {useHistory} from "react-router";
import { deleteDeck } from "../../utils/api";

function DrawDeck({ deck }) {
  const history=useHistory();  
  const handleDeckDelete = () => {
    if (
      window.confirm("Delete This Deck?\n\nDeck will be deleted permanently")
    ) {
      deleteDeck(deck.id).then(() => {
        history.go(0);
      }).catch((e)=>{
          history.push("/NotFound");
        });
    }
  };
  return (
    <div className="card border border-primary mt-3">
      <div className="card-body">
        <h5 className="card-title">
          {deck.name}{" "}
          <small className="float-right">{deck.cards.length} cards</small>
        </h5>
        <p className="card-text">{deck.description}</p>
        <Link
          to={`/decks/${deck.id}`}
          type="button"
          className="btn btn-lg btn-dark mr-1"
        >
          <span className="oi oi-eye"></span> View
        </Link>
        <Link
          to={`/decks/${deck.id}/study`}
          type="button"
          className="btn btn-lg btn-primary"
        >
          <span className="oi oi-book"></span> Study
        </Link>
        {/* <Link to={`/`} type="button" className="btn btn-lg btn-danger float-right" ><span className="oi oi-trash"></span></Link> */}
        <button
          type="button"
          onClick={handleDeckDelete}
          className="btn btn-danger  mr-2 float-right"
        >
          <span className="oi oi-trash "></span>
        </button>
      </div>
    </div>
  );
}

export default DrawDeck;
