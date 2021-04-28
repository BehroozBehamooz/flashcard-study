import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import {listDecks} from "../../utils/api"
import DrawDeck from "./DrawDeck";


function DrawDecks(){
    const [decks,setDecks]=useState([]);
    useEffect(()=>{
        const abortController= new AbortController();
        listDecks(abortController.signal).then(setDecks);
        return () => abortController.abort(); // Cancels any pending request or response;
    },[]);
    if (!decks){
        return (<p>not not found anything</p>);
    }
    if (!decks){
        return <p></p>
    }

    return (
        <div>
            <Link to={`/decks/new`} type="button" className="btn btn-lg btn-dark"><span className="oi oi-plus"></span> Create Deck</Link>
            {decks.map((deck,index)=><DrawDeck deck={deck} key={index}/>)}
        </div>
        
    );
}

export default DrawDecks;