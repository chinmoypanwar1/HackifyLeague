import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Public/Css/search.css';

const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFocus = () => {
        setIsExpanded(true);
    };

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsExpanded(false); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className="search-box" onBlur={handleBlur}>
            <button
                type="button"
                className="btn-search"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <i className="fas fa-search"></i>
            </button>
            <input
                type="text"
                className={`input-search ${isExpanded ? 'expanded' : ''}`}
                placeholder="Search..."
                onFocus={handleFocus}
            />
        </form>
    );
};

export default SearchBar;
