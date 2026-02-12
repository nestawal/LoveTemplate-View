import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './ViewLetter.css';

export default function ViewLetter() {
    const { letterId } = useParams();
    const navigate = useNavigate();
    const [letter, setLetter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [viewerName, setViewerName] = useState('');
    const [showNameInput, setShowNameInput] = useState(true);
    const [nameError, setNameError] = useState('');
    const [downloading, setDownloading] = useState(false);
    const url = 'https://andika-backend.onrender.com';

    // SINGLE PATCH CALL - Fetches letter AND updates viewed field
    const handleNameSubmit = async (e) => {
        e.preventDefault();
        
        if (!viewerName.trim()) {
            setNameError('Please enter your name');
            return;
        }

        setLoading(true);
        setNameError('');

        try {
            const response = await axios.patch(`${url}/pepe/${letterId}`, {
                viewed: viewerName.trim()
            });
            
            setLetter(response.data);
            setShowNameInput(false);
            setError(null);
        } catch (err) {
            console.error("Error fetching letter:", err);
            setError("This letter could not be found or has been removed.");
        } finally {
            setLoading(false);
        }
    };

    // Handle answer for questionnaire
    const handleAnswer = async (quesAns) => {
        try {
            const response = await axios.patch(`${url}/pepe/updateAns/${letterId}`, {
                quesAns,
                written: true
            });
            
            setLetter(prev => ({
                ...prev,
                quesAns,
                written: true
            }));
            
            console.log("Answer recorded:", quesAns);
        } catch (err) {
            console.error("Error saving answer:", err);
        }
    };

    // Generate PDF of ALL pages by navigating through them
  // Generate PDF of ALL pages - with automatic list splitting
const downloadCompleteLetterPDF = async () => {
    setDownloading(true);
    try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Store current page to restore later
        const currentPageIndex = currentPage;
        
        // Capture each page by navigating to it
        for (let i = 0; i < pages.length; i++) {
            const isListPage = pages[i].type === "list";
            
            if (isListPage) {
                // SPECIAL HANDLING: Split Ten Things across multiple PDF pages
                const listItems = pages[i].content.filter(item => item?.trim());
                const itemsPerPage = 6; // 6 items per A4 page fits perfectly
                const totalListPages = Math.ceil(listItems.length / itemsPerPage) || 1;
                
                for (let pageIdx = 0; pageIdx < totalListPages; pageIdx++) {
                    // Navigate to the list page
                    setCurrentPage(i);
                    await new Promise(resolve => setTimeout(resolve, 600));
                    
                    const pageElement = document.querySelector('.book-page-view:not(.name-input-page)');
                    
                    if (pageElement) {
                        // Hide all list items first
                        const allItems = pageElement.querySelectorAll('.romantic-list li');
                        allItems.forEach(item => {
                            item.style.display = 'none';
                        });
                        
                        // Show only items for this PDF page
                        const startIdx = pageIdx * itemsPerPage;
                        const endIdx = Math.min(startIdx + itemsPerPage, listItems.length);
                        
                        // Get the actual items with content
                        let visibleCount = 0;
                        pageElement.querySelectorAll('.romantic-list li').forEach((item, idx) => {
                            const hasContent = pages[i].content[idx]?.trim();
                            if (hasContent) {
                                if (visibleCount >= startIdx && visibleCount < endIdx) {
                                    item.style.display = 'flex';
                                }
                                visibleCount++;
                            }
                        });
                        
                        // Add page title with part indicator
                        const titleElement = pageElement.querySelector('h2');
                        if (titleElement && totalListPages > 1) {
                            titleElement.innerHTML = `${pages[i].title} <span style="font-size: 1.2rem; color: #be185d;">(Part ${pageIdx + 1}/${totalListPages})</span>`;
                        }
                        
                        // Update page number display
                        const pageNumberElement = pageElement.querySelector('.page-number');
                        if (pageNumberElement) {
                            pageNumberElement.textContent = `Page ${currentPage + 1} of ${pages.length} • Ten Things ${pageIdx + 1}/${totalListPages}`;
                        }
                        
                        await document.fonts.ready;
                        await new Promise(resolve => setTimeout(resolve, 300));
                        
                        const canvas = await html2canvas(pageElement, {
                            scale: 2.2,
                            backgroundColor: '#fff9f0',
                            logging: false,
                            allowTaint: true,
                            useCORS: true,
                            imageTimeout: 0,
                            windowWidth: pageElement.scrollWidth,
                            windowHeight: pageElement.scrollHeight
                        });
                        
                        // Add page to PDF (first page or add new page)
                        if (i > 0 || pageIdx > 0) {
                            pdf.addPage();
                        }
                        
                        const imgData = canvas.toDataURL('image/jpeg', 0.95);
                        const imgWidth = 210;
                        const imgHeight = (canvas.height * imgWidth) / canvas.width;
                        
                        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
                        
                        // Restore original display
                        allItems.forEach(item => {
                            item.style.display = 'flex';
                        });
                        
                        if (titleElement && totalListPages > 1) {
                            titleElement.textContent = pages[i].title;
                        }
                        
                        if (pageNumberElement) {
                            pageNumberElement.textContent = `Page ${currentPage + 1} of ${pages.length}`;
                        }
                    }
                }
            } else {
                // Regular page (not list) - capture normally
                setCurrentPage(i);
                await new Promise(resolve => setTimeout(resolve, 600));
                
                const pageElement = document.querySelector('.book-page-view:not(.name-input-page)');
                
                if (pageElement) {
                    await document.fonts.ready;
                    
                    const canvas = await html2canvas(pageElement, {
                        scale: 2.2,
                        backgroundColor: '#fff9f0',
                        logging: false,
                        allowTaint: true,
                        useCORS: true,
                        imageTimeout: 0,
                        windowWidth: pageElement.scrollWidth,
                        windowHeight: pageElement.scrollHeight
                    });
                    
                    if (i > 0) pdf.addPage();
                    
                    const imgData = canvas.toDataURL('image/jpeg', 0.95);
                    const imgWidth = 210;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
                }
            }
        }
        
        // Restore original page
        setCurrentPage(currentPageIndex);
        
        // Save PDF
        const date = new Date().toISOString().split('T')[0];
        pdf.save(`love-letter-for-${viewerName}-${date}.pdf`);
        
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
    setDownloading(false);
};

    // Create pages array from letter data
    const pages = letter ? [
        {
            title: "My Letter to You",
            content: letter.letter,
            icon: "💌",
            type: "text"
        },
        {
            title: "The First Time I Saw You",
            content: letter.firstImpression,
            icon: "✨",
            type: "text"
        },
        {
            title: "Ten Things I Love About You",
            content: letter.tenThings,
            icon: "💕",
            type: "list"
        },
        {
            title: "Our Future Together",
            content: letter.future,
            icon: "🌟",
            type: "text"
        },
        {
            title: "One Last Question...",
            content: letter.questionnaire || "Will you cherish this memory forever?",
            icon: "📝",
            type: "questionnaire",
            answer: letter.quesAns
        }
    ].filter(page => {
        if (page.type === "list") {
            return page.content?.some(item => item?.trim());
        }
        if (page.type === "questionnaire") {
            return true;
        }
        return page.content?.trim();
    }) : [];

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

    const isLastPage = currentPage === pages.length - 1;

    // Loading state
    if (loading) {
        return (
            <div className="viewer-book-container">
                <div className="book-spine"></div>
                <div className="book-page-view a4-size">
                    <div className="page-icon">❤️</div>
                    <h2>Opening Your Letter...</h2>
                    <div className="loading-hearts">
                        <span>💗</span>
                        <span>💖</span>
                        <span>💝</span>
                    </div>
                </div>
            </div>
        );
    }

    // Name input page
    if (showNameInput) {
        return (
            <div className="viewer-book-container">
                <div className="book-spine"></div>
                <div className="book-page-view a4-size name-input-page">
                    <div className="page-icon">📖</div>
                    <h2>A Letter Awaits You</h2>
                    
                    <div className="name-input-content">
                        <p className="name-input-message">
                            Someone special has written you a letter...
                        </p>
                        
                        <form onSubmit={handleNameSubmit} className="name-form">
                            <div className="input-group">
                                <label htmlFor="viewerName">Please enter your name:</label>
                                <input
                                    type="text"
                                    id="viewerName"
                                    className="name-input-field"
                                    placeholder="e.g. Mpendwa"
                                    value={viewerName}
                                    onChange={(e) => setViewerName(e.target.value)}
                                    autoFocus
                                />
                                {nameError && <span className="error-message">{nameError}</span>}
                            </div>
                            
                            <button type="submit" className="open-letter-btn">
                                Open Letter <span className="btn-icon">💌</span>
                            </button>
                        </form>
                        
                        <p className="name-input-footer">
                            Your name will be recorded as the viewer of this letter
                        </p>
                    </div>
                    
                    <div className="book-decoration-left">✨</div>
                    <div className="book-decoration-right">💕</div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !letter || pages.length === 0) {
        return (
            <div className="viewer-book-container">
                <div className="book-spine"></div>
                <div className="book-page-view a4-size">
                    <div className="page-icon">💔</div>
                    <h2>Letter Not Found</h2>
                    <p className="error-message">{error || "This letter may have been deleted or never existed."}</p>
                    <button className="nav-btn home-btn" onClick={() => navigate('/')}>
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    const currentPageData = pages[currentPage];

    // Letter viewing pages
    return (
        <div className="viewer-book-container">
            <div className="book-spine"></div>
            
            <div className="book-page-view a4-size">
                <div className="page-header">
                    <span className="page-icon">{currentPageData.icon}</span>
                    <h2>{currentPageData.title}</h2>
                    {viewerName && (
                        <div className="viewer-name-badge">
                            Viewed by: <span>{viewerName}</span>
                        </div>
                    )}
                </div>
                
                <div className="page-content">
                    {currentPageData.type === "list" ? (
                        <ul className="romantic-list">
                            {currentPageData.content.map((item, index) => 
                                item?.trim() ? (
                                    <li key={index}>
                                        <span className="bullet">❤️</span>
                                        {item}
                                    </li>
                                ) : null
                            )}
                        </ul>
                    ) : currentPageData.type === "questionnaire" ? (
                        <div className="questionnaire-section">
                            <p className="question-text">{currentPageData.content}</p>
                            
                            <div className="answer-buttons">
                                <button 
                                    className={`yes-btn ${letter.quesAns === true ? 'selected' : ''}`}
                                    onClick={() => handleAnswer(true)}
                                    disabled={letter.quesAns !== undefined}
                                >
                                    <span className="btn-icon">❤️</span>
                                    Yes
                                </button>
                                <button 
                                    className={`no-btn ${letter.quesAns === false ? 'selected' : ''}`}
                                    onClick={() => handleAnswer(false)}
                                    disabled={letter.quesAns !== undefined}
                                >
                                    <span className="btn-icon">💔</span>
                                    No
                                </button>
                            </div>

                            {letter.quesAns !== undefined && (
                                <div className="answer-confirmation">
                                    <span className="answer-heart">{letter.quesAns ? '❤️' : '💔'}</span>
                                    <p>You answered {letter.quesAns ? 'YES' : 'NO'}</p>
                                    <span className="answer-heart">{letter.quesAns ? '❤️' : '💔'}</span>
                                    {letter.written && (
                                        <span className="written-check">✓</span>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="romantic-text-content">{currentPageData.content}</p>
                    )}
                </div>
                
                <div className="page-footer">
                    <div className="page-number">
                        Page {currentPage + 1} of {pages.length}
                    </div>
                    
                    <div className="book-navigation">
                        <button 
                            onClick={prevPage} 
                            disabled={currentPage === 0}
                            className="nav-btn prev"
                        >
                            ← Previous
                        </button>
                        
                        {isLastPage ? (
                            <>
                                <button 
                                    onClick={downloadCompleteLetterPDF}
                                    className="pdf-btn"
                                    disabled={downloading}
                                >
                                    {downloading ? (
                                        <>📄 Creating Your PDF...</>
                                    ) : (
                                        <>📄 Save Complete Letter</>
                                    )}
                                </button>
                                
                                <button 
                                    onClick={() => navigate('/')} 
                                    className="nav-btn done"
                                >
                                    Close Book 📖
                                </button>
                            </>
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
            </div>
            
            {/* PDF Generation Progress Indicator */}
            {downloading && (
                <div className="pdf-progress">
                    <div className="pdf-progress-content">
                        <span className="pdf-progress-icon">📄</span>
                        <p>Creating your beautiful letter...</p>
                        <div className="pdf-progress-bar">
                            <div className="pdf-progress-fill"></div>
                        </div>
                        <p className="pdf-progress-page">
                            Capturing page {currentPage + 1} of {pages.length}
                        </p>
                    </div>
                </div>
            )}
            
            <div className="book-decoration-left">❤️</div>
            <div className="book-decoration-right">✨</div>
        </div>
    );
}