import React, { useState } from 'react';


function Profile() {
    const [topic, setTopic] = useState('');

    const handleClick = async () => {
        try {
            
        } catch (error) {
            console.error('Error generating course:', error);
        }
    };

    return (
        <div>
            <h2>Enter a Topic</h2>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic"
            />
            <button onClick={handleClick}>Start Game</button>
        </div>
    );
}

export default Profile;
