import React from 'react';

const Slime = ({ state }) => {
    return (
        <div className={`slime ${state} w-24 h-24 rounded-full bg-green-500 flex items-center justify-center relative`}>
            <div className="eyes flex justify-between absolute top-1/3 w-full px-4">
                <div className="eye bg-white rounded-full w-4 h-4"></div>
                <div className="eye bg-white rounded-full w-4 h-4"></div>
            </div>
            <div className="mouth bg-black w-6 h-1 rounded-full absolute bottom-2"></div>
        </div>
    );
};

export default Slime;
