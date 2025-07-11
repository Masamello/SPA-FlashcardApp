export class StudyFlashcard {
    constructor(question,answer){
        this.question = question;
        this.answer = answer;
        this.id = Date.now().toString();
        this.createdAt = new Date().toISOString();
        this.lastReviewed = null; // Timestamp of last review
        this.reviewCount = 0; // Number of times reviewed
    }

    review(){
        this.lastReviewed = new Date().toISOString();
        this.reviewCount += 1;
    }
}