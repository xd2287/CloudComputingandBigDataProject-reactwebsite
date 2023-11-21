import React from 'react';
import '../../css/components/basic/Button.css'
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--submit', 'btn--submit-gray'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children, type, onClick, buttonStyle, buttonSize, pageLinkedTo
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <Link to={`/${pageLinkedTo == null ? "sign-up" : pageLinkedTo}`} className='btn-mobile'>
            <button 
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
            >
                {children}
            </button>
        </Link>
    )
}