import { createContext, useState, useEffect, useContext } from "react";
import { categoryAPI, flashcardAPI } from "../services/api";

export const FlashcardContext = createContext();

export const FlashcardProvider = ({children}) =>{
    const[flashcards,setFlashcards] = useState([]);
    const[categories,setCategories] = useState([]);
    const[studyStats,setStudyStats] = useState(null);
    const[isLoading,setIsLoading] = useState(true);
    const[categoryLoading,setCategoryLoading] = useState(true);
    const[statsLoading,setStatsLoading] = useState(true);

    // APIからフラッシュカードデータを取得（GET）
    useEffect(()=>{
        const loadFlashcards = async () => {
            try {
                setIsLoading(true);
                const response = await flashcardAPI.getFlashcards();
                setFlashcards(response.data);
            } catch (error) {
                console.error('Failed to load flashcards from API:', error);
                // エラー時は空の配列を設定
                setFlashcards([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadFlashcards();
    },[]);

    // APIからカテゴリデータを取得（GET）
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

    // APIから学習統計を取得（GET）
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

    // 新しいフラッシュカードを追加（POST）
    const addFlashcard = async (flashcard) => {
        try {
            const response = await flashcardAPI.createFlashcard(flashcard);
            setFlashcards(prev => [...prev, response.data]);
            return response.data;
        } catch (error) {
            console.error('Failed to add flashcard via API:', error);
            // APIエラー時はローカルに追加
            const localCard = {
                ...flashcard,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                lastStudied: null
            };
            setFlashcards(prev => [...prev, localCard]);
            return localCard;
        }
    };

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

    // カテゴリ別のカード数を取得
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
