import { createContext, useState, useEffect, useContext } from "react";
import { categoryAPI } from "../services/api";

export const FlashcardContext = createContext();

export const FlashcardProvider = ({children}) =>{
    const[flashcards,setFlashcards] = useState([]);
    const[categories,setCategories] = useState([]);
    const[isLoading,setIsLoading] = useState(true);
    const[categoryLoading,setCategoryLoading] = useState(true);

    //loading flashcards from localStorage
    useEffect(()=>{
        const loadFlashcards =()=>{
            const storeCards = localStorage.getItem('flashcards');
            
            if(storeCards !== null){
                setFlashcards(JSON.parse(storeCards));
            }
            
            setIsLoading(false);
        };
        loadFlashcards();
    },[]);

    //loading categories from API
    useEffect(()=>{
        const loadCategories = async () => {
            try {
                setCategoryLoading(true);
                const response = await categoryAPI.getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to load categories:', error);
                // エラー時はデフォルトカテゴリを設定
                const defaultCategories = [
                    { id: '1', name: 'General', color: 'primary', description: 'General flashcards' },
                    { id: '2', name: 'Study', color: 'success', description: 'Study materials' },
                    { id: '3', name: 'Work', color: 'warning', description: 'Work related' },
                    { id: '4', name: 'Personal', color: 'info', description: 'Personal notes' }
                ];
                setCategories(defaultCategories);
            } finally {
                setCategoryLoading(false);
            }
        };
        loadCategories();
    },[]);

    //saving flashcards when every time flashcards update
    useEffect(()=>{
        localStorage.setItem('flashcards',JSON.stringify(flashcards));
    },[flashcards]);

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

    // functions related to categories - now using API
    const addCategory = async (category) => {
        try {
            const response = await categoryAPI.createCategory(category);
            setCategories(prev => [...prev, response.data]);
            return response.data;
        } catch (error) {
            console.error('Failed to add category:', error);
            throw error;
        }
    };

    const updateCategory = async (id, updates) => {
        try {
            const response = await categoryAPI.updateCategory(id, updates);
            setCategories(prev =>
                prev.map(cat =>
                    cat.id === id ? response.data : cat
                )
            );
            return response.data;
        } catch (error) {
            console.error('Failed to update category:', error);
            throw error;
        }
    };

    const deleteCategory = async (id) => {
        try {
            await categoryAPI.deleteCategory(id);
            setCategories(prev => prev.filter(cat => cat.id !== id));
            // moving the cards in the deleted category to the General category
            setFlashcards(prev =>
                prev.map(card =>
                    card.category === id ? {...card, category: 'General'} : card
                )
            );
        } catch (error) {
            console.error('Failed to delete category:', error);
            throw error;
        }
    };

    // get the cards in the category
    const getCardsByCategory = (categoryId) => {
        return flashcards.filter(card => card.category === categoryId);
    };

    return(
        <FlashcardContext.Provider value={{
            flashcards,
            categories,
            isLoading: isLoading || categoryLoading,
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
