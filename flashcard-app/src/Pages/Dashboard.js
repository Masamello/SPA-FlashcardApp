import React,{useContext,useState} from "react";
import { FlashcardContext } from "../Context/FlashcardContext";
import {useNavigate} from "react-router-dom";
import { StudyFlashcard } from "../classes/StudyFlashCard";

const Dashboard =()=>{
    const { flashcards, categories, addFlashcard, updateFlashcards} = useContext(FlashcardContext);
    const [newCard, setNewCard] = useState({ 
        question: "", 
        answer: "",
        category: "General"
    });
    const navigate = useNavigate();

    const createHandler = () =>{
        const studyCard = new StudyFlashcard(newCard.question, newCard.answer,'medium');
        const cardWithCategory = {
            ...studyCard,
            category: newCard.category
        };
        addFlashcard(cardWithCategory);
        setNewCard({
            question:'',
            answer:'',
            category: "General"
        });
    };

    const studyHandler =(id) =>{
        navigate(`/flashcards/${id}`);
    };

    const difficultyChangeHandler =(id,difficulty)=>{
        const card = flashcards.find(c => c.id === id);
        if(card instanceof StudyFlashcard){
            card.difficulty  = difficulty;
            updateFlashcards(id,card);
        }
    }

    const getDifficultyColor = (difficulty) =>{
        switch(difficulty){
            case 'easy':
                return 'success';
            case 'medium':
                return 'warning';
            case 'hard':
                return 'danger';
            default:
                return 'primary';
        }
    };

    return(
        <div className="dashboard container mt-4">
            <h2 className="mb-4">Dashboard</h2>

            {/* Create Flashcard form */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Create New Flashcard</h5>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Question</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={newCard.question} 
                                onChange={(e)=>setNewCard({...newCard,question: e.target.value})} 
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <select 
                                className="form-select"
                                value={newCard.category}
                                onChange={(e) => setNewCard({...newCard, category: e.target.value})}
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Answer</label>
                            <textarea 
                                className="form-control" 
                                value={newCard.answer} 
                                onChange={(e)=> setNewCard({...newCard,answer:e.target.value})}
                            />
                        </div>
                        <div className="col-12">
                            <button 
                                className="btn btn-primary" 
                                onClick={createHandler} 
                                disabled={!newCard.question || !newCard.answer}
                            >
                                Add Card
                            </button>
                        </div>
                    </div>
                </div>    
            </div>

            {/* Flashcards List */}
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {flashcards.map((card)=>(
                    <div key={card.id} className="col">
                        <div className={`card h-100 border-${getDifficultyColor(card.difficulty)}`}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="card-title">{card.question}</h5>
                                    <span className={`badge bg-${categories.find(c => c.id === card.category)?.color || 'primary'}`}>
                                        {categories.find(c => c.id === card.category)?.name || 'General'}
                                    </span>
                                </div>
                                
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <button className="btn btn-outline-primary btn-sm" onClick={()=>studyHandler(card.id)}>
                                        Study
                                    </button>
                                    {card instanceof StudyFlashcard && (
                                        <select className={`form-select form-select-sm w-auto border-${getDifficultyColor(card.difficulty)}`}
                                        value={card.difficulty}
                                        onChange={(e)=>difficultyChangeHandler(card.id, e.target.value)}>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {flashcards.length === 0 && (
                <div className="text-center py-5">
                    <h4 className="text-muted">No flashcards yet</h4>
                    <p className="text-muted">Create your first flashcard using the form above!</p>
                </div>
            )}
        </div>
    )
};

export default Dashboard;