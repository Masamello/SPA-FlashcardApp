import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlashcardContext } from '../Context/FlashcardContext';

const Categories = () => {
    const { 
        flashcards, 
        categories,  
        deleteFlashcard,
        getCardsByCategory
    } = useContext(FlashcardContext);
    
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const navigate = useNavigate();

    // filter the cards to display
    const getFilteredCards = () => {
        if (selectedCategory === 'all') {
            return flashcards;
        }
        return getCardsByCategory(selectedCategory);
    };

    const studyHandler = (id) => {
        navigate(`/flashcards/${id}`);
    };

    const filteredCards = getFilteredCards();

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Categories</h2>
            <div className="row">
                {/* sidebar - categories */}
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Categories</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <button 
                                    className={`btn btn-sm w-100 mb-2 ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    All Categories ({flashcards.length})
                                </button>
                                {categories.map(category => (
                                    <button 
                                        key={category.id}
                                        className={`btn btn-sm w-100 mb-2 ${selectedCategory === category.id ? `btn-${category.color}` : `btn-outline-${category.color}`}`}
                                        onClick={() => setSelectedCategory(category.id)}
                                    >
                                        {category.name} ({getCardsByCategory(category.id).length})
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* main content */}
                <div className="col-md-9">
                    {/* card list */}
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {filteredCards.map((card) => (
                            <div key={card.id} className="col">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h5 className="card-title">{card.question}</h5>
                                            <span className={`badge bg-${categories.find(c => c.id === card.category)?.color || 'primary'}`}>
                                                {categories.find(c => c.id === card.category)?.name || 'General'}
                                            </span>
                                        </div>
                                        
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button 
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => studyHandler(card.id)}
                                            >
                                                Study
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => deleteFlashcard(card.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {filteredCards.length === 0 && (
                        <div className="text-center py-5">
                            <h4 className="text-muted">No flashcards found</h4>
                            <p className="text-muted">
                                {selectedCategory !== 'all' 
                                    ? 'Try changing your filter or create flashcards in the Dashboard.' 
                                    : 'Create your first flashcard in the Dashboard!'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories; 