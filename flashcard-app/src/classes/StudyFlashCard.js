import {Flashcard} from './FlashCard.js';

export class StudyFlashcard extends Flashcard {
    constructor(question,answer,difficulty ='medium'){
        super(question,answer);
        this.difficulty = difficulty; // 'easy', 'medium', 'hard'
        this.lastReviewed = null; // Timestamp of last review
        this.reviewCount = 0; // Number of times reviewed
    }

    review(){
        this.lastReviewed = new Date().toISOString();
        this.reviewCount += 1;
    }

    getDifficultyColor() {
        return{
            easy:'success',
            medium:'warning',
            hard:'danger'
        }[this.difficulty] || 'primary';
    }
}