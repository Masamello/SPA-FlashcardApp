import { createContext, useState, useEffect, useContext } from "react";

export const FlashcardContext = createContext();

export const FlashcardProvider = ({Children}) =>{
    const[flashcards,setFlashcards] = useState([]);
    const[isLoading,setIsLoading] = useState(true);

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

    //saving flashcards when every time falshcards update
    useEffect(()=>{
        localStorage.setItem('flashcaeds',JSON.stringify(flashcards));
    },[flashcards]);

    const addFlashcard = (flashcard) => {
        setFlashcards(prev => [...prev,{
            ...flashcard,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
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

    return(
        <FlashcardContext.Provider value={{
            flashcards,
            isLoading,
            addFlashcard,
            updateFlashcards,
            deleteFlashcard
        }}>
            {Children}
        </FlashcardContext.Provider>
    );
};

export const useFlashcards =()=>useContext(FlashcardContext);
