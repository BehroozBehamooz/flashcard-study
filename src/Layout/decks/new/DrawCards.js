import React from "react";
import DrawCard from "./DrawCard";

function DrawCards({cards}){
    if (!cards.length){
        return <h4 className="alert alert-info">No Cards In This Deck</h4>
    }
    // console.log("Loging cards from Cards.js: ",cards);
    
    

    return(
        <div >
            <h2>Cards</h2>
            {cards.map((card,index)=><DrawCard key={index} card={card} />)}
        </div>
    );

}

export default DrawCards;