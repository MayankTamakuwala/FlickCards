import { useState } from 'react';

interface FlashcardProps {
    front: string;
    back: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="card w-64 h-64">
            <div
                className={`card-inner ${isFlipped ? 'card-flip' : ''}`}
                onClick={toggleFlip}
            >
                <div className="card-front bg-white shadow-lg p-5">
                    {front}
                </div>
                <div className="card-back bg-gray-200 shadow-lg p-5">
                    {back}
                </div>
            </div>
        </div>
    );
};

export default Flashcard;