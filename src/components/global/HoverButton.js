// Leo pointed out that he used nav-item-home a lot, so I made a component for it.
import React from 'react'
import "./Hover.css";

const HoverButton = ( {onClick, buttonText} ) => {
  return (
    <div className="nav-item-home" onClick={onClick}>
            <h3>{buttonText}</h3>
          </div>
  )
}

export default HoverButton