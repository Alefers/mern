import React from 'react';

export const LinkCard = ({ link }) => {

    console.log(link);
    return (
        <>
            <h2>Link</h2>

            <ul>
                <li>Generated link: {link.linkTo}</li>
                <li>Original link: {link.linkFrom}</li>
            </ul>
        </>
    );
};