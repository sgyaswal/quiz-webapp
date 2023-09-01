"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';


const StartPage = ({ onStart }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      router.push('/quiz');
    }
    
  };

  return (
    <div className="start-page-container">
      <h1>Welcome to the Quiz App!</h1>
      <form className="email-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@example.com"
          required
        />
        <button type="submit" className="start-button">
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default StartPage;
