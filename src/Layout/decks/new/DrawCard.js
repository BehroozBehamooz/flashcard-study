import  React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import { deleteCard } from "../../../utils/api";

function DrawCard({ card }) {
  const { url } = useRouteMatch(); //  /decks/1
  const [cardIdAsEffectTrigger,setCardIdAsEffectTrigger]=useState(0);
  //const [triggerCardsUseEffect,setTriggerUseEffect]=useState(false);
    useEffect(()=>{
        if (cardIdAsEffectTrigger){
            const abortController=new AbortController();
            deleteCard(cardIdAsEffectTrigger,abortController.signal);
            return ()=>abortController.abort();
        }
    },[cardIdAsEffectTrigger]);
    
    const deleteHandler=()=>{
        const result=window.confirm(`Delete this card? \n\n You will not be able to recover card Id: ${card.id}.`);
        if (result){
            setCardIdAsEffectTrigger(card.id);
        }
    }
  return (
    <div className="row border border-secondary">
      <div className="col col-6">
        <p>{card.front}</p>
      </div>
      <div className="col col-6">
        <p>{card.back}</p>
        <section className="d-flex justify-content-end mb-2">
          <Link
            to={`${url}/cards/${card.id}/edit`}
            className="btn btn-secondary mr-2"
          >
            <span className="oi oi-pencil"></span> Edit
          </Link>
          <button className="btn btn-danger float-right" onClick={deleteHandler}>
            <span className="oi oi-trash"></span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default DrawCard;
