import React from 'react'
import './Card.css'

const HIDDEN_SYMBOL = '❓'

const Card = ({ card, feedback, index, onClick }) => (
    <div sclassName={`card ${feedback}`} onClick={() => onClick(index)}>
        <span className="symbol">
            {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
        </span>
    </div>
)

export default Card