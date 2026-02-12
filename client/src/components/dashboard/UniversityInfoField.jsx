import React from 'react';
import './UniversityInfoField.css';

const UniversityInfoField = ({
    label,
    value,
    onChange,
    placeholder = 'Enter value...',
    sourceText,
    onUseSource
}) => {
    return (
        <div className="uni-info-field-container">
            {/* Header */}
            <div className="uni-field-header">
                <span className="uni-field-label">{label}</span>
                {onUseSource && (
                    <button className="uni-field-use-source" onClick={onUseSource}>
                        <span>Use Source</span>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.25 10.5L8.75 7L5.25 3.5" stroke="#930051" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Input */}
            <div className="uni-field-input-wrapper">
                <input
                    type="text"
                    className="uni-field-input"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>

            {/* Source Display */}
            {sourceText && (
                <div className="uni-field-source-box">
                    <span className="source-label">SOURCE:</span>
                    <span className="source-text">{sourceText}</span>
                </div>
            )}
        </div>
    );
};

export default UniversityInfoField;
