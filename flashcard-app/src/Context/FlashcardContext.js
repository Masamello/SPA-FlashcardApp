import { createContext, useState, useEffect, useContext } from "react";

export const FlashcardContext = createContext();

export const FlashcardProvider = ({children}) =>{
    const[flashcards,setFlashcards] = useState([]);
    const[categories,setCategories] = useState([]);
    const[isLoading,setIsLoading] = useState(true);

    //loading flashcards and categories from localStorage
    useEffect(()=>{
        const loadData =()=>{
            const storeCards = localStorage.getItem('flashcards');
            const storeCategories = localStorage.getItem('flashcardCategories');
            
            if(storeCards !== null){
                setFlashcards(JSON.parse(storeCards));
            }
            
            if(storeCategories !== null){
                setCategories(JSON.parse(storeCategories));
            } else {
                // デフォルトカテゴリを設定
                const defaultCategories = [
                    { id: '1', name: 'General', color: 'primary', description: 'General flashcards' },
                    { id: '2', name: 'Study', color: 'success', description: 'Study materials' },
                    { id: '3', name: 'Work', color: 'warning', description: 'Work related' },
                    { id: '4', name: 'Personal', color: 'info', description: 'Personal notes' }
                ];
                setCategories(defaultCategories);
                localStorage.setItem('flashcardCategories', JSON.stringify(defaultCategories));
            }
            
            setIsLoading(false);
        };
        loadData();
    },[]);

    //saving flashcards when every time flashcards update
    useEffect(()=>{
        localStorage.setItem('flashcards',JSON.stringify(flashcards));
    },[flashcards]);

    //saving categories when every time categories update
    useEffect(()=>{
        localStorage.setItem('flashcardCategories',JSON.stringify(categories));
    },[categories]);

    const addFlashcard = (flashcard) => {
        setFlashcards(prev => [...prev,{
            ...flashcard,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            category: flashcard.category || 'General'
        }]);
    }

    const updateFlashcards = (id,updates) =>{
        setFlashcards(prev=>
            prev.map(card =>
                card.id === id ? {...card, ...updates} : card
            )
        );
    };

    const deleteFlashcard = (id)=>{
        setFlashcards(prev => prev.filter(card => card.id !== id))
    };

    // カテゴリ関連の関数
    const addCategory = (category) => {
        const newCategory = {
            ...category,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        setCategories(prev => [...prev, newCategory]);
    };

    const updateCategory = (id, updates) => {
        setCategories(prev =>
            prev.map(cat =>
                cat.id === id ? {...cat, ...updates} : cat
            )
        );
    };

    const deleteCategory = (id) => {
        setCategories(prev => prev.filter(cat => cat.id !== id));
        // そのカテゴリのカードをGeneralカテゴリに移動
        setFlashcards(prev =>
            prev.map(card =>
                card.category === id ? {...card, category: 'General'} : card
            )
        );
    };

    // カテゴリ別のカードを取得
    const getCardsByCategory = (categoryId) => {
        return flashcards.filter(card => card.category === categoryId);
    };

    return(
        <FlashcardContext.Provider value={{
            flashcards,
            categories,
            isLoading,
            addFlashcard,
            updateFlashcards,
            deleteFlashcard,
            addCategory,
            updateCategory,
            deleteCategory,
            getCardsByCategory
        }}>
            {children}
        </FlashcardContext.Provider>
    );
};

export const useFlashcards =()=>useContext(FlashcardContext);
