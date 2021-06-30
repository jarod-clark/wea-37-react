import React, { useState } from 'react';
import './BrowseListItem.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BrowseListItem({ name, onClick }) {
    const [listItem, setItemState] = useState('0');

    const handleClick = () => {
        onClick(name);

        if (listItem === '0') {
            toast.success(`Grocery "${name}" Added!`);
            setItemState('1');
        } else {
            toast.warn(`Grocery "${name}" is already added!`);
        }
    }

    return <div className="list-item" onClick={handleClick}>{name}</div>
}

export default BrowseListItem;
