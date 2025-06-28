import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlashcardContext } from '../Context/FlashcardContext';
import { StudyFlashcard } from '../classes/StudyFlashCard';

const Categories = () => {
    const { 
        flashcards, 
        categories, 
        addFlashcard, 
        updateFlashcards, 
        deleteFlashcard,
        addCategory,
        updateCategory,
        deleteCategory,
        getCardsByCategory,
        getCardsByTag,
        getAllTags
    } = useContext(FlashcardContext);
    
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', color: 'primary', description: '' });
    const [newCard, setNewCard] = useState({ 
        question: '', 
        answer: '', 
        category: selectedCategory !== 'all' ? selectedCategory : 'General',
        tags: []
    });
    const [newTag, setNewTag] = useState('');
    
    const navigate = useNavigate();
    const allTags = getAllTags();

    // 表示するカードをフィルタリング
    const getFilteredCards = () => {
        let filteredCards = flashcards;
        
        if (selectedCategory !== 'all') {
            filteredCards = getCardsByCategory(selectedCategory);
        }
        
        if (selectedTag !== 'all') {
            filteredCards = filteredCards.filter(card => 
                card.tags && card.tags.includes(selectedTag)
            );
        }
        
        return filteredCards;
    };

    const createHandler = () => {
        const studyCard = new StudyFlashcard(newCard.question, newCard.answer, 'medium');
        const cardWithCategory = {
            ...studyCard,
            category: newCard.category,
            tags: newCard.tags
        };
        addFlashcard(cardWithCategory);
        setNewCard({ 
            question: '', 
            answer: '', 
            category: selectedCategory !== 'all' ? selectedCategory : 'General',
            tags: []
        });
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

    const addTagToCard = (cardId, tag) => {
        if (tag.trim()) {
            const card = flashcards.find(c => c.id === cardId);
            if (card) {
                const updatedTags = [...(card.tags || []), tag.trim()];
                updateFlashcards(cardId, { tags: updatedTags });
            }
        }
    };

    const removeTagFromCard = (cardId, tagToRemove) => {
        const card = flashcards.find(c => c.id === cardId);
        if (card && card.tags) {
            const updatedTags = card.tags.filter(tag => tag !== tagToRemove);
            updateFlashcards(cardId, { tags: updatedTags });
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
            <div className="row">
                {/* サイドバー - カテゴリとタグ */}
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

                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Tags</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <button 
                                    className={`btn btn-sm w-100 mb-2 ${selectedTag === 'all' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                    onClick={() => setSelectedTag('all')}
                                >
                                    All Tags
                                </button>
                                {allTags.map(tag => (
                                    <button 
                                        key={tag}
                                        className={`btn btn-sm w-100 mb-2 ${selectedTag === tag ? 'btn-secondary' : 'btn-outline-secondary'}`}
                                        onClick={() => setSelectedTag(tag)}
                                    >
                                        #{tag} ({getCardsByTag(tag).length})
                                    </button>
                                ))}
                            </div>
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

                    {/* カード作成フォーム */}
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Create New Flashcard</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Question</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={newCard.question}
                                        onChange={(e) => setNewCard({...newCard, question: e.target.value})}
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
                                        onChange={(e) => setNewCard({...newCard, answer: e.target.value})}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Tags (comma separated)</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="e.g., important, exam, review"
                                        value={newCard.tags.join(', ')}
                                        onChange={(e) => setNewCard({
                                            ...newCard, 
                                            tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                                        })}
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
                                        
                                        {/* タグ表示 */}
                                        {card.tags && card.tags.length > 0 && (
                                            <div className="mb-3">
                                                {card.tags.map(tag => (
                                                    <span 
                                                        key={tag} 
                                                        className="badge bg-secondary me-1"
                                                        style={{cursor: 'pointer'}}
                                                        onClick={() => removeTagFromCard(card.id, tag)}
                                                        title="Click to remove tag"
                                                    >
                                                        #{tag} ×
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {/* タグ追加 */}
                                        <div className="mb-3">
                                            <div className="input-group input-group-sm">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Add tag"
                                                    value={newTag}
                                                    onChange={(e) => setNewTag(e.target.value)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            addTagToCard(card.id, newTag);
                                                            setNewTag('');
                                                        }
                                                    }}
                                                />
                                                <button 
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => {
                                                        addTagToCard(card.id, newTag);
                                                        setNewTag('');
                                                    }}
                                                >
                                                    Add
                                                </button>
                                            </div>
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
                            <p className="text-muted">Try changing your filters or create a new flashcard.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories; 