import React,{ useContext,useState,useEffect, use } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { FlashcardContext } from "../Context/FlashcardContext";

const Details = () => {
    const {id} = useParams();
    const {flashcards,uodateFlashcard} = useContext(FlashcardContext);
    const [card,setCard] = useState(null);
    const [isFlipped,setIsFlippeed] = useState(false);
    const [userAnswer,setUserAnswer] = useState('');
    const [feedback,setFeedBack] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const foundCard = flashcards.find(c => c.id === id);
        if(foundCard){
            setCard(foundCard);
        }else{
            navigate('/dashboard');
        }
    },[id,flashcards,navigate]);

    const submitHandler =()=>{
        if(!card) return;

        const isCorrect = userAnswer.trim().toLowerCase() === card.answer.trim().toLowerCase();
        setFeedBack(isCorrect ? 'Correct!' : `Incorrect. The Answer is: ${card.answer}`);

        // uodate the study record
        if(card.__protp__.hasOwnProperty('updateStudyRecord')){
            card.updateStudyRecord(isCorrect);
            uodateFlashcard(id,card);
        }
    };

    if(!card) return <div className="container mt-4">Loading...</div>

    return(
        <div className="container mt-4">
            <button className="btn btn-link mb-3" onClick={()=>navigate(-1)}>
                Back to Dashboard
            </button>
            <div className={`card mb-4 ${isFlipped ? 'bg-light' : ''}`} onClick={()=>setIsFlippeed(!isFlipped)} style={{cursor:'pointer',minHeight:'200px'}}>
                <div className="card-body d-flex align-items-center justify-content-center">
                    <h3 className="card-title text-center">
                        {isFlipped ? card.answer : card.question}
                    </h3>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Test Yourself</h5>
                    <div className="mb-3">
                        <label className="form-label">Your Answer</label>
                        <input type="text" className="form-control" value={userAnswer} onChange={(e)=>setUserAnswer(e.target.value)} disabled={isFlipped}/>
                    </div>
                    <button className="btn btn-primary me-2" onClick={submitHandler} disabled={!userAnswer || isFlipped}>Check Answer</button>
                    { feedback && (
                        <div className={`alert ${feedback.includes('Correct') ? 'alert-success':'alert-warning'} mt-3`}>
                            {feedback}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Details;
// This code defines a React component for displaying the details of a flashcard, allowing users to flip the card to see the answer, submit their own answer, and receive feedback on whether their answer was correct or not. It uses React Router for navigation and context for managing flashcard data. The component also handles loading the specific flashcard based on the ID from the URL parameters. If the flashcard is not found, it redirects the user back to the dashboard.
// The component includes a button to go back to the dashboard, a card that displays either the question or answer based on whether the card is flipped, and a form for the user to input their answer. When the user submits their answer, it checks if the answer is correct and updates the flashcard's study record if applicable. Feedback is displayed based on the user's answer.
// The component is styled using Bootstrap classes for a clean and responsive design. It also includes basic error handling to ensure that the user is redirected if the flashcard is not found in the context state.