import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LetterStatus.css';

export default function LetterStatus() {
    const location = useLocation();
    const navigate = useNavigate();
    const [letter, setLetter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = 'https://andika-backend.onrender.com';

    // ✅ FIXED: userId is DIRECTLY the ID string - no extraction needed!
    const userId = location.state?.user;
    
    console.log("Raw location.state:", location.state);
    console.log("User ID directly:", userId); // Should be: "698dd83a1afd687af1c55989"

    useEffect(() => {
        const fetchLetter = async () => {
            if (!userId) {
                console.error("No userId found in state");
                setError("User information missing.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                console.log("Fetching letter for userId:", userId);
                
                // ✅ Use userId directly as the letterId
                const response = await axios.get(`${url}/pepe/mine/${userId}`);
                setLetter(response.data);
                console.log("Fetched letter:", response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching letter:", err);
                if (err.response?.status === 404) {
                    setLetter(null);
                    setError(null);
                } else {
                    setError("Could not load your letter. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchLetter();
    }, [userId]);

    const formatDate = (dateString) => {
        if (!dateString) return "Not available";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // ✅ If no userId, show error
    if (!userId) {
        return (
            <div className="status-container">
                <div className="status-card error-card">
                    <h2>Cannot Load Status</h2>
                    <p>User information is missing. Please log in again.</p>
                    <button className="status-btn" onClick={() => navigate('/signIn')}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="status-container">
            <div className="status-header">
                <h1>Your Letter Status</h1>
                <p className="subtitle">Track the letter you've sent</p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Opening your letter...</p>
                </div>
            ) : error ? (
                <div className="status-card error-card">
                    <h3>Something went wrong</h3>
                    <p>{error}</p>
                    <button className="status-btn" onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            ) : !letter ? (
                <div className="status-card empty-card">
                    <h3>No letter yet</h3>
                    <p>You haven't written your love letter yet.</p>
                    <button className="status-btn write-btn" onClick={() => navigate('/letter')}>
                        Write Your Letter
                    </button>
                </div>
            ) : (
                <div className="letter-status-card single-card">
                    <div className="card-header">
                        <span className="letter-date">Written: {formatDate(letter.createdAt)}</span>
                    </div>
                    
                    <div className="status-indicator">
                        {letter.viewed ? (
                            <div className="status-viewed">
                                <span className="status-badge viewed">✓ Viewed</span>
                                <span className="viewer-name">by {letter.viewed}</span>
                                {letter.viewedAt && (
                                    <span className="viewed-date">{formatDate(letter.viewedAt)}</span>
                                )}
                            </div>
                        ) : (
                            <div className="status-not-viewed">
                                <span className="status-badge pending">⏳ Not viewed yet</span>
                                <span className="pending-message">Still waiting to be opened</span>
                            </div>
                        )}
                    </div>

                    <div className="letter-preview">
                        <h4>Your letter to:</h4>
                        <p className="recipient">My Mpendwa</p>
                        <p className="preview-text">
                            {letter.letter?.substring(0, 150)}
                            {letter.letter?.length > 150 ? '...' : ''}
                        </p>
                    </div>

                    <div className="card-footer">
                        <div className="questionnaire-status">
                            {letter.quesAns !== undefined ? (
                                <span className="answer-badge answered">
                                    Question answered: {letter.quesAns ? 'Yes' : 'No'}
                                </span>
                            ) : (
                                <span className="answer-badge pending">
                                    Question not answered yet
                                </span>
                            )}
                        </div>
                        <button 
                            className="view-letter-btn"
                            onClick={() => navigate(`/view/${letter._id}`)}
                        >
                            View Full Letter
                        </button>
                    </div>
                </div>
            )}

            <button className="back-home-btn" onClick={() => navigate('/')}>
                ← Back to Home
            </button>
        </div>
    );
}