import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton';

import BrowseList from './BrowseList';

function Browse({ onClick }) {
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Alphabetical', value: '1' },
        { name: 'Category', value: '2' },
        { name: 'Random', value: '3' },
    ];

    const handleChange = (e) => {
        setRadioValue(e.currentTarget.value)
    }

    const handleOnClick = (name) => {
        onClick(name);
    }

    return (
      <div>
        <h2 style={{position:"relative", left:"10px"}} >Browse</h2>
        <p style={{position:"relative", left:"10px"}}>Click on an item you want to add it to your list! You can see your Grocery List on the Get Started page.</p>
        <>
            <ButtonGroup toggle>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        type="radio"
                        variant="secondary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => handleChange(e)}
                        style={{position:"relative", left:"10px"}}
                    >
                    {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
            <BrowseList type={radioValue} onClick={handleOnClick}/>
        </>
    </div>
    );
}

export default Browse;
