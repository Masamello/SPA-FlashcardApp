// FlashcardContext.js
// このファイルは、フラッシュカード・カテゴリ・学習統計などのデータと操作関数を
// React Contextを使ってアプリ全体で共有するためのプロバイダーを定義しています。

import { createContext, useState, useEffect, useContext } from "react";
import { categoryAPI, flashcardAPI } from "../services/api";
import { useAuth } from "./AuthContext";

// FlashcardContextを作成し、アプリ全体でデータ共有できるようにする
export const FlashcardContext = createContext();

// FlashcardProvider: Contextの値（データや関数）を子コンポーネントに提供する
export const FlashcardProvider = ({children}) =>{
    // 現在ログイン中のユーザー情報を取得
    const { currentUser } = useAuth();
    // フラッシュカードの配列
    const[flashcards,setFlashcards] = useState([]);
    // カテゴリの配列
    const[categories,setCategories] = useState([]);
    // 学習統計データ
    const[studyStats,setStudyStats] = useState(null);
    // 各データのロード状態
    const[isLoading,setIsLoading] = useState(true);
    const[categoryLoading,setCategoryLoading] = useState(true);
    const[statsLoading,setStatsLoading] = useState(true);

    // フラッシュカードの取得（API優先、失敗時はlocalStorageから取得）
    // currentUserが変わるたびに、そのユーザー専用のカードだけを取得
    useEffect(()=>{
        const loadFlashcards = async () => {
            if (!currentUser) {
                setFlashcards([]); // ユーザー未ログイン時は空配列
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                // サーバーAPIからフラッシュカードを取得
                const response = await flashcardAPI.getFlashcards();
                setFlashcards(response.data);
            } catch (error) {
                console.error('Failed to load flashcards from API:', error);
                // API失敗時はlocalStorageからユーザーごとのカードを取得
                const localCards = JSON.parse(localStorage.getItem('flashcardAppFlashcards_' + currentUser.id) || '[]');
                setFlashcards(localCards);
            } finally {
                setIsLoading(false);
            }
        };
        loadFlashcards();
        // currentUserが変わるたびに再取得
    },[currentUser]);

    // カテゴリデータの取得（API優先、失敗時はデフォルトカテゴリ）
    useEffect(()=>{
        const loadCategories = async () => {
            try {
                setCategoryLoading(true);
                // サーバーAPIからカテゴリを取得
                const response = await categoryAPI.getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to load categories:', error);
                // API失敗時はデフォルトカテゴリをセット
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

    // 学習統計データの取得（API優先、失敗時はnull）
    useEffect(()=>{
        const loadStudyStats = async () => {
            try {
                setStatsLoading(true);
                // サーバーAPIから学習統計を取得
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

    // 新しいフラッシュカードを追加
    // API成功時はサーバーのデータを、失敗時はローカルでID等を生成して保存
    // どちらの場合もユーザーごとのlocalStorageに保存
    const addFlashcard = async (flashcard) => {
        if (!currentUser) return null;
        try {
            const response = await flashcardAPI.createFlashcard(flashcard);
            setFlashcards(prev => {
                const updated = [...prev, response.data];
                // ユーザーごとのlocalStorageにも保存
                localStorage.setItem('flashcardAppFlashcards_' + currentUser.id, JSON.stringify(updated));
                return updated;
            });
            return response.data;
        } catch (error) {
            console.error('Failed to add flashcard via API:', error);
            // API失敗時はローカルでID等を生成して保存
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

    // フラッシュカードの更新
    // 指定IDのカードを更新し、stateとlocalStorage（ユーザーごと）に保存
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

    // フラッシュカードの削除
    // 指定IDのカードを削除し、stateとlocalStorage（ユーザーごと）に保存
    const deleteFlashcard = (id)=>{
        if (!currentUser) return;
        setFlashcards(prev => {
            const updated = prev.filter(card => card.id !== id);
            localStorage.setItem('flashcardAppFlashcards_' + currentUser.id, JSON.stringify(updated));
            return updated;
        });
    };

    // 指定カテゴリIDのカードだけを返す
    const getCardsByCategory = (categoryId) => {
        return flashcards.filter(card => card.category === categoryId);
    };

    // Contextで定義した値や関数をアプリ全体で使えるように提供
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

// 他のコンポーネントでuseFlashcards()を呼ぶことで、上記の値や関数にアクセスできる
export const useFlashcards =()=>useContext(FlashcardContext);
