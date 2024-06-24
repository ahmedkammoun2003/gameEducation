import React, { useState, useEffect } from 'react';
import Slime from './Slime';

const Game = ({ updateScore }) => {
    const [topic, setTopic] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);
    const [slimeState, setSlimeState] = useState('idle');

    useEffect(() => {
         fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        try {
            const response = await fetch('http://localhost:4000/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: topic, 
                    num_questions: 3,
                }),
            });
            const data = await response.json();
            const questionData = data.output[0];
            setQuestion(questionData.question);
            setOptions(questionData.options);
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const handleTopicSubmit = (e) => {
        e.preventDefault();
        fetchQuestion();
    };

    const handleAnswer = (selectedOption) => {
        const correctAnswer = options[0];
        if (selectedOption === correctAnswer) {
            setMessage('Correct! You hit the slime!');
            setScore(score + 1);
            setSlimeState('hit');
        } else {
            setMessage('Wrong! You got hit!');
            setScore(score - 1);
            setSlimeState('idle');
        }
        setTimeout(() => {
            setMessage('');
            fetchQuestion();
        }, 2000);
    };

    useEffect(() => {
        updateScore(score);
    }, [score, updateScore]);

    return (
        <div className="game flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Quiz Game</h2>
            
            {/* Topic input form */}
            <form onSubmit={handleTopicSubmit} className="mb-4">
                <label htmlFor="topic" className="mr-2">Enter a topic:</label>
                <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="border rounded px-2 py-1"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 ml-2 rounded hover:bg-blue-700">
                    Start Game
                </button>
            </form>

            {/* Slime animation */}
            <div className="slime-container flex items-center justify-center mb-8">
                <Slime state={slimeState} />
            </div>
            
            {/* Question and options */}
            {question && (
                <div>
                    <p className="mb-4">{question}</p>
                    <div className="options flex flex-col space-y-2">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className="option-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Message and score */}
            <p className="message mt-4">{message}</p>
            <p className="score mt-2">Score: {score}</p>
        </div>
    );
};

export default Game;
