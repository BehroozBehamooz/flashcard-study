import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import {readDeck} from "../../../utils/api"
import NavigationBar from "../../NavigationBar";
import NotFound from "../../NotFound";
import StudyCards from "./StudyCards";

function Study(){
    const {deckId}=useParams();
    const [deck,setDeck]=useState({});
    useEffect(()=>{
        const abortController= new AbortController();
        readDeck(deckId,abortController.signal).then(setDeck).catch((e)=>{
            console.log("Error inside Study.js: ",e.message);
            return <NotFound />;
        });
        return ()=>abortController.abort();
    },[deckId]);

    if (!deck.id){
        return <NotFound />;
    }
    return(
        <div>
             <NavigationBar navItems={[deck.name,"Study"]} />
             <h2>Study : {deck.name}</h2>
             <StudyCards cards={deck.cards} />
        </div>
       
    );
}



export default Study;