import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignInModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-2xl mb-4">Sign In Required</h2>
                <p className="mb-4">You need to sign in to access this page.</p>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SignInModal;