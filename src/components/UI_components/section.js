import React from 'react';

const Section = props => {
    let {className } = props
    return (
        <div className={`section ${className ? className : ""}`}>
            {props.children}
        </div>
    )
}

export default Section;