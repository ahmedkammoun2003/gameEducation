import React, { useState } from 'react';
import Profile from '../components/Profile.jsx';
import Game from '../components/Game.jsx';

const App = () => {
    const [username] = useState('Player1');
    const [score, setScore] = useState(0);

    const updateScore = (newScore) => {
        setScore(newScore);
    };

    return (
        <div className="app flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Profile username={username} score={score} />
            <Game updateScore={updateScore} />
        </div>
    );
};

export default App;
