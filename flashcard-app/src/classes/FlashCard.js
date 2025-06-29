export class Flashcard {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    this.id = Date.now().toString();
    this.createdAt = new Date().toISOString();
  }

  getPreview() {
    return `${this.question.substring(0, 30)}...`;
  }
}
