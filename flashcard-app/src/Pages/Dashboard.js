import React,{useContext,useState} from "react";
import { FlashcardContext } from "../Context/FlashcardContext";
import {useNavigate} from "react-router-dom";
import { StudyFlashcard } from "../classes/StudyFlashCard";

const Dashboard =()=>{
    const { flashcards, categories, studyStats, addFlashcard, updateFlashcards, isLoading} = useContext(FlashcardContext);
    const [newCard, setNewCard] = useState({ 
        question: "", 
        answer: "",
        category: "General"
    });
    const navigate = useNavigate();

    const createHandler = async () =>{
        const studyCard = new StudyFlashcard(newCard.question, newCard.answer,'medium');
        const cardWithCategory = {
            ...studyCard,
            category: newCard.category
        };
        await addFlashcard(cardWithCategory);
        setNewCard({
            question:'',
            answer:'',
            category: "General"
        });
        alert('Flashcard created successfully!')
    };

    const studyHandler =(id) =>{
        navigate(`/flashcards/${id}`);
    };

    if (isLoading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading flashcards and study data...</p>
            </div>
        );
    }

    return(
        <div className="dashboard container mt-4">
            <h2 className="mb-4">Dashboard</h2>

            {/* API Study Statistics */}
            {studyStats && (
                <div className="card mb-4">
                    <div className="card-header">
                        <h5 className="mb-0">
                            <i className="bi bi-graph-up me-2"></i>
                            Study Statistics
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="text-center">
                                    <h4 className="text-primary">{studyStats.totalCards}</h4>
                                    <p className="text-muted">Total Cards</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center">
                                    <h4 className="text-success">{studyStats.studiedToday}</h4>
                                    <p className="text-muted">Studied Today</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center">
                                    <h4 className="text-warning">{studyStats.averageScore}%</h4>
                                    <p className="text-muted">Average Score</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            
                        </div>
                    </div>
                </div>
            )}

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
                                    <option key={category.id} value={category.name}>
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
            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="mb-0">
                        <i className="bi bi-collection me-2"></i>
                        Flashcards
                    </h5>
                </div>
                <div className="card-body">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {flashcards.map((card)=>(
                            <div key={card.id} className="col">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h6 className="card-title">{card.question}</h6>
                                            <span className={`badge bg-${categories.find(c => c.name === card.category)?.color || 'primary'}`}>
                                                {card.category}
                                            </span>
                                        </div>
                                        
                                        <p className="card-text small text-muted">
                                            {card.answer}
                                        </p>
                                        
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <button className="btn btn-outline-primary btn-sm" onClick={()=>studyHandler(card.id)}>
                                                Study
                                            </button>

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
            </div>
        </div>
    )
};

export default Dashboard;