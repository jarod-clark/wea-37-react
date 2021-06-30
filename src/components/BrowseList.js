import React, { useState, useEffect } from 'react';
import BrowseListItem from './BrowseListItem';
import categories from '../resources/categories'

function BrowseList({ type, onClick }) {
    const [gList, setGList] = useState(null);

    const GQL_API = `http://localhost:3030/`; 
    const GQL_QUERY_ALPHA = `
        query {
            groceries {
                name
            }
        }`;

    const GQL_QUERY = `
    query($cat: String!) {
        groceries(category: $cat) {
            name
        }
    }`;

    const fetchGroceries = async () => {
        console.log(type)
        if (type === '1') {
            await fetch(GQL_API, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  query: GQL_QUERY_ALPHA,
                }), 
            })
                .then((res) => res.json())
                .then((res) => {
                    const grocArr = res.data.groceries;
                    setGList(grocArr.map((groc) => groc.name));
                })
        } else if (type === '2') {
            let catSorted = [];

            for (let i = 0; i < categories.length; ++i) {
                const variables = { cat: categories[i]};
                await fetch(GQL_API, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    query: GQL_QUERY,
                    variables
                    }), 
                })
                    .then((res) => res.json())
                    // eslint-disable-next-line no-loop-func
                    .then((res) => {
                        let grocArr = res.data.groceries;
                        grocArr = grocArr.map((groc) => groc.name)
                        catSorted = catSorted.concat(grocArr);
                    })
            }
            
            await setGList(catSorted);
        } else {
            await fetch(GQL_API, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  query: GQL_QUERY_ALPHA,
                }), 
            })
                .then((res) => res.json())
                .then((res) => {
                    let grocArr = res.data.groceries;
                    grocArr = (grocArr.map((groc) => groc.name));
                    setGList(grocArr.sort((a,b) => Math.random() - 0.5));
                })
        }
    }

    const handleOnClick = (name) => {
        onClick(name);
    }

    useEffect(() => {
        fetchGroceries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    return (gList && gList.map(n => <BrowseListItem key={n} name={n} onClick={handleOnClick} />))
}

export default BrowseList;
