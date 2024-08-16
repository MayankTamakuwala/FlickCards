import React from 'react';

interface ModalProps {
    isOpen: boolean;
    children?: React.JSX.Element[]
}

const APIInputModal: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md shadow-md">
                {children}
            </div>
        </div>
    );
};

export default APIInputModal;