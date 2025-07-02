import { createContext, useState, useEffect, useContext } from "react";
import { categoryAPI, flashcardAPI } from "../services/api";
import { useAuth } from "./AuthContext";

export const FlashcardContext = createContext();

export const FlashcardProvider = ({children}) =>{
    const { currentUser } = useAuth();
    const[flashcards,setFlashcards] = useState([]);
    const[categories,setCategories] = useState([]);
    const[studyStats,setStudyStats] = useState(null);
    const[isLoading,setIsLoading] = useState(true);
    const[categoryLoading,setCategoryLoading] = useState(true);
    const[statsLoading,setStatsLoading] = useState(true);

    // Getting flashcards from API
    useEffect(()=>{
        const loadFlashcards = async () => {
            if (!currentUser) {
                setFlashcards([]);
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const response = await flashcardAPI.getFlashcards();
                setFlashcards(response.data);
            } catch (error) {
                console.error('Failed to load flashcards from API:', error);
                // When error, get flashcards from localStorage
                const localCards = JSON.parse(localStorage.getItem('flashcardAppFlashcards_' + currentUser.id) || '[]');
                setFlashcards(localCards);
            } finally {
                setIsLoading(false);
            }
        };
        loadFlashcards();
        // When currentUser changes, reload flashcards
    },[currentUser]);

    // Get category data from API (GET)
    useEffect(()=>{
        const loadCategories = async () => {
            try {
                setCategoryLoading(true);
                const response = await categoryAPI.getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to load categories:', error);
                // When error, set default categories
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

    // Get study stats from API (GET)
    useEffect(()=>{
        const loadStudyStats = async () => {
            try {
                setStatsLoading(true);
                const response = await flashcardAPI.getStudyStats();
                setStudyStats(response.data);
            } catch (error) {
                console.error('Failed to load study stats:', error);
                setStudyStats(null);
            } finally {
                setStatsLoading(false);
            }
        };
        loadStudyStats();
    },[]);

    // Add new flashcard (POST)
    const addFlashcard = async (flashcard) => {
        if (!currentUser) return null;
        try {
            const response = await flashcardAPI.createFlashcard(flashcard);
            setFlashcards(prev => {
                const updated = [...prev, response.data];
                // Save to localStorage for each user
                localStorage.setItem('flashcardAppFlashcards_' + currentUser.id, JSON.stringify(updated));
                return updated;
            });
            return response.data;
        } catch (error) {
            console.error('Failed to add flashcard via API:', error);
            // When API error, add to localStorage
            const localCard = {
                ...flashcard,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                lastStudied: null
            };
            setFlashcards(prev => {
                const updated = [...prev, localCard];
                localStorage.setItem('flashcardAppFlashcards_' + currentUser.id, JSON.stringify(updated));
                return updated;
            });
            return localCard;
        }
    };

    const updateFlashcards = (id,updates) =>{
        if (!currentUser) return;
        setFlashcards(prev=> {
            const updated = prev.map(card =>
                card.id === id ? {...card, ...updates} : card
            );
            localStorage.setItem('flashcardAppFlashcards_' + currentUser.id, JSON.stringify(updated));
            return updated;
        });
    };

    const deleteFlashcard = (id)=>{
        if (!currentUser) return;
        setFlashcards(prev => {
            const updated = prev.filter(card => card.id !== id);
            localStorage.setItem('flashcardAppFlashcards_' + currentUser.id, JSON.stringify(updated));
            return updated;
        });
    };

    // Get number of cards by category
    const getCardsByCategory = (categoryId) => {
        return flashcards.filter(card => card.category === categoryId);
    };

    return(
        <FlashcardContext.Provider value={{
            flashcards,
            categories,
            studyStats,
            isLoading: isLoading || categoryLoading || statsLoading,
            addFlashcard,
            updateFlashcards,
            deleteFlashcard,
            getCardsByCategory
        }}>
            {children}
        </FlashcardContext.Provider>
    );
};

export const useFlashcards =()=>useContext(FlashcardContext);
