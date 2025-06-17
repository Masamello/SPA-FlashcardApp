# SPA-Flashcard

---

# Flashcard Learning App

A responsive, single-page flashcard learning application built with **React**, **Axios**, and **React Router**. This project demonstrates key front-end development skills including authentication, local storage, OOP principles, and API integration.

## 🔍 Overview

**Flashcard Learning App** allows users to create, edit, and review digital flashcards to aid in learning and memorization. It supports user authentication, persistent storage using local storage, and a clean, responsive interface suitable for both mobile and desktop.

## 🚀 Features

* 🔐 **User Authentication** (login/logout using local storage)
* 🔁 **Single Page Application** powered by React Router
* 🧠 **Create, edit, and review flashcards**
* 💾 **Local storage** for data persistence (e.g., user sessions, flashcards)
* 📦 Optional **API integration** (e.g., fetch motivational quotes)
* 🧱 **Object Oriented Programming**, including inheritance-based class structure
* 📱 **Responsive design** for all screen sizes
* ⚠️ **Error handling** with friendly feedback messages and loading indicators

## 📁 Project Structure

* **Home Page** – Welcome screen with login/signup, and app overview.
* **Dashboard** – Displays all flashcard sets created by the user.
* **Details Page** – View and study an individual flashcard set.
* **Profile Page** – (Authenticated Route) Manage user info, preferences, and saved sets.

> Bonus: Includes logout functionality and potential for role-based features (e.g., admin controls)

## 🛠️ Technologies Used

* React (with Hooks and functional components)
* Axios (for optional API requests)
* React Router
* Local Storage API
* CSS (or optionally Bootstrap/Tailwind)
* JavaScript OOP (including classes and inheritance)
* Vite/Webpack (for optimized bundling and performance)

## 🔧 Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Masamello/SPA-Flashcard.git
   cd SPA-Flashcard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open in your browser:

   ```
   http://localhost:5173
   ```

## 👨‍🏫 Usage (Tentative)

1. On the Home Page, log in or create a new account.
2. After logging in, you’ll be redirected to the Dashboard where you can:

   * Create a new flashcard set
   * View existing sets
   * Delete or edit your sets
3. Click on any flashcard set to enter **Study Mode** on the Details Page.
4. Head over to your **Profile Page** to manage your account preferences.
5. Click **Logout** to safely end your session.

> *(All data is saved locally in your browser, so make sure to use the same device to retain your progress.)*

## 🧪 Future Enhancements

* Support for tagging and categorizing flashcards
* Integration with external APIs for quote-of-the-day or word-of-the-day
* Role-based access for admin users
* Encryption of local storage data
* Dark mode and accessibility improvements

## 🧑‍💻 Author

* Developed by: Masamello, pedroevaristo17
* Course: Frontend Development Final Project

---

