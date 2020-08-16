import React from 'react';
import {Link} from 'react-router-dom';

export const LinkItem = ({ link }) => {
    return (
        <li>
            <Link to={`/detail/${link.id}`}>{link.linkTo}</Link>
        </li>
    );
};