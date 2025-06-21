import React,{useContext,useState,useEffect} from "react";
import { FlashcardContext } from "../Context/FlashcardContext";
import {useNavigate} from "react-router-dom";
import { StudyFlashcard } from "../classes/StudyFlashCard";

const Dashboard =()=>{
    const { flashcards, addFlashcard, updateFlashcard} = useContext(FlashcardContext);
    const [newCard, setNewCard] = useState({ question: "", answer: "" });
    const navigate = useNavigate();

    const createHandler = () =>{
        const studyCard = new StudyFlashcard(newCard.question, newCard.answer,'medium');
        addFlashcard(studyCard);
        setNewCard({question:'',answer:''});
    };

    const studyHandler =(id) =>{
        navigate(`/flashcard/${id}`);
    };

    const difficultyChageHandler =(id,difficulty)=>{
        const card = flashcards.find(c => c.id === id);
        if(card instanceof StudyFlashcard){
            card.difficulty  = difficulty;
            updateFlashcard(id,card);
        }
    }

    return(
        <div className="dashboard container mt-4">
            <h2 className="mb-4">Dashboard</h2>

            {/* Create Falshcard form */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Create New Flashcard</h5>
                    <div className="mb-3">
                        <label className="form-label">Question</label>
                        <input type="text" className="form-control" value={newCard.question} onChange={(e)=>setNewCard({...newCard,question: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Answer</label>
                        <textarea className="form-control" value={newCard.answer} onChange={(e)=> setNewCard({...newCard,answer:e.target.value})}/>
                    </div>
                    <button className="btn btn-primary" onClick={createHandler} disabled={!newCard.question || !newCard.answer}>Add Card</button>
                </div>    
            </div>

            {/* Flashcards List */}
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {flashcards.map((card)=>(
                    <div key={card.id} className="col">
                        <div className=""></div>

                    </div>
                ))}
            </div>
        </div>
    )
}