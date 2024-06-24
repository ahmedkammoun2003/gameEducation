import React from 'react';

const Profile = ({ username, score }) => {
    return (
        <div className="profile">
            <h2>Profile</h2>
            <p>Username: {username}</p>
            <p>Score: {score}</p>
        </div>
    );
};

export default Profile;
