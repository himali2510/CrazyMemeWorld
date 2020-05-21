import React from 'react';

//For re-using meme style
export const Meme = ({ Template, onclick }) => {
    return (
        <img
            style={{minHeight: 200 ,minWidth: 200, maxWidth: 200 ,maxHeight: 200}}
            key={Template.id}
            src={Template.url}
            alt={Template.name}
            onClick={onclick}
        />
    );
}