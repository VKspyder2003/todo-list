import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const Reward = ({ onRewardComplete }) => {
    const [isRewardVisible, setIsRewardVisible] = useState(false);
    const [isConfettiActive, setIsConfettiActive] = useState(false);

    useEffect(() => {
        // Trigger the animation
        setIsRewardVisible(true);
        return () => setIsRewardVisible(false);
    }, []);

    useEffect(() => {
        if (isRewardVisible) {
            // Delay before the animation
            const timeoutId = setTimeout(() => setIsConfettiActive(true), 100);
            return () => clearTimeout(timeoutId); 
        }
    }, [isRewardVisible]);

    const handleRewardCompletion = () => {
        // After animation actions
        if (onRewardComplete) {
            onRewardComplete();
        }
    };

    return (
        <div style={{ display: isRewardVisible ? 'block' : 'none', textAlign: 'center', marginTop: '50px', color: 'green' }}>
            <h2>Congratulations! You completed all tasks.</h2>
            {isConfettiActive && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={300}
                    colors={[
                        '#f00',
                        '#0f0',
                        '#00f',
                        '#fff',
                        '#ff0',
                        '#f0f',
                    ]}
                    recycle={false}
                    onConfettiComplete={handleRewardCompletion}
                />
            )}
        </div>
    );
};

export default Reward;
