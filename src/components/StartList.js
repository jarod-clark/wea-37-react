import React, {useState, useEffect} from 'react';
import StartListItem from './StartListItem';

function StartList({ items }) {
    const [gList, setGList] = useState([]);

    useEffect(() => {
        setGList(items.split('\n'));
    }, [items]);

    return (gList && gList.map(n => <StartListItem key={n} name={n} />))
}

export default StartList;
