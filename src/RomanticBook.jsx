import { useState } from 'react';
import './RomanticBook.css';

export default function RomanticBook({ letterContent,sendLetter }) {
    const [currentPage, setCurrentPage] = useState(0);
    
    // Create pages only from sections that have content
    const pages = [
        {
            title: "My Letter to You",
            content: letterContent?.letter || "",
            icon: "💌",
            type: "text"
        },
        {
            title: "The First Time I Saw You",
            content: letterContent?.firstImpression || "",
            icon: "✨",
            type: "text"
        },
        {
            title: "Ten Things I Love About You",
            content: letterContent?.tenThings || Array(10).fill(""),
            icon: "💕",
            type: "list"
        },
        {
            title: "Our Future Together",
            content: letterContent?.future || "",
            icon: "🌟",
            type: "text"
        },
        {
            title: "My Heart Answers",
            content: letterContent?.questionnaire || "",
            icon: "📝",
            type: "text"
        }
    ].filter(page => {
        if (page.type === "list") {
            return page.content.some(item => item && item.trim() !== "");
        }
        return page.content && page.content.trim() !== "";
    });

    // SAFETY CHECK: If no pages have content, show empty state
    if (pages.length === 0) {
        return (
            <div className="flip-book-container">
                <div className="book-page-view" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <div className="page-icon">💔</div>
                    <h2>No Memories Yet</h2>
                    <p style={{ fontSize: '1.5rem', color: '#8a4b76', textAlign: 'center' }}>
                        Your love story is waiting to be written...
                    </p>
                    <button className="restart-btn" style={{ marginTop: '2rem' }}>
                        Start Writing ❤️
                    </button>
                </div>
            </div>
        );
    }

    // SAFETY CHECK: Ensure currentPage is within bounds
    const safeCurrentPage = Math.min(currentPage, pages.length - 1);
    
    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const currentPageData = pages[safeCurrentPage];

    return (
        <div className="flip-book-container">
            <div className="book-spine"></div>
            
            <div className="book-page-view">
                <div className="page-icon">{currentPageData.icon}</div>
                <h2>{currentPageData.title}</h2>
                
                {currentPageData.type === "list" ? (
                    <ul className="romantic-list">
                        {currentPageData.content.map((item, index) => 
                            item && item.trim() !== "" ? (
                                <li key={index}>
                                    <span className="bullet">❤️</span>
                                    {item}
                                </li>
                            ) : null
                        )}
                    </ul>
                ) : (
                    <p className="romantic-text-content">
                        {currentPageData.content || "..."}
                    </p>
                )}
                
                <div className="page-number">
                    Page {safeCurrentPage + 1} of {pages.length}
                </div>
            </div>
            
            <div className="book-navigation">
                <button 
                    onClick={prevPage} 
                    disabled={safeCurrentPage === 0}
                    className="nav-btn prev"
                >
                    ← Previous
                </button>
                
                {safeCurrentPage === pages.length - 1 ? (
                    <button  className="restart-btn" onClick={sendLetter}>
                        send ❤️
                    </button>
                ) : (
                    <button 
                        onClick={nextPage} 
                        className="nav-btn next"
                    >
                        Next →
                    </button>
                )}
            </div>
        </div>
    );
}