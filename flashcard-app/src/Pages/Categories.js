import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlashcardContext } from '../Context/FlashcardContext';

const Categories = () => {
    const { 
        flashcards, 
        categories, 
        updateFlashcards, 
        deleteFlashcard,
        addCategory,
        getCardsByCategory
    } = useContext(FlashcardContext);
    
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', color: 'primary', description: '' });
    
    const navigate = useNavigate();

    // 表示するカードをフィルタリング
    const getFilteredCards = () => {
        if (selectedCategory === 'all') {
            return flashcards;
        }
        return getCardsByCategory(selectedCategory);
    };

    const studyHandler = (id) => {
        navigate(`/flashcards/${id}`);
    };

    const addCategoryHandler = () => {
        if (newCategory.name.trim()) {
            addCategory(newCategory);
            setNewCategory({ name: '', color: 'primary', description: '' });
            setShowAddCategory(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch(difficulty){
            case 'easy': return 'success';
            case 'medium': return 'warning';
            case 'hard': return 'danger';
            default: return 'primary';
        }
    };

    const filteredCards = getFilteredCards();

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Categories</h2>
            <div className="row">
                {/* サイドバー - カテゴリ */}
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
                            <button 
                                className="btn btn-outline-secondary btn-sm w-100"
                                onClick={() => setShowAddCategory(!showAddCategory)}
                            >
                                {showAddCategory ? 'Cancel' : 'Add Category'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* メインコンテンツ */}
                <div className="col-md-9">
                    {/* カテゴリ追加フォーム */}
                    {showAddCategory && (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">Add New Category</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Category Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={newCategory.name}
                                            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">Color</label>
                                        <select 
                                            className="form-select"
                                            value={newCategory.color}
                                            onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                                        >
                                            <option value="primary">Primary</option>
                                            <option value="success">Success</option>
                                            <option value="warning">Warning</option>
                                            <option value="danger">Danger</option>
                                            <option value="info">Info</option>
                                            <option value="secondary">Secondary</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">&nbsp;</label>
                                        <button 
                                            className="btn btn-primary w-100"
                                            onClick={addCategoryHandler}
                                        >
                                            Add Category
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* カード一覧 */}
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {filteredCards.map((card) => (
                            <div key={card.id} className="col">
                                <div className={`card h-100 border-${getDifficultyColor(card.difficulty)}`}>
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