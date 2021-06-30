import React from 'react';

function Home() {
    return (
        <div>
            <h2 style={{position:"relative", left:"10px"}}>Home</h2>
            <p style={{position:"relative", left:"10px"}}>Welcome to Shopping List, where you can create a list of groceries!</p>
            <p style={{position:"relative", left:"10px"}}>Your items will be sorted into their respective grocery categories for you, 
                so you can quickly find all the items you need!</p>
            <p style={{position:"relative", left:"10px"}}>The 'Get Started' page will help you set up a categorized grocery list, whereas 
                the 'Browse' page will let you search our database for items you might like to add to your list.</p>
            <p style={{position:"relative", left:"10px"}}>Our database is constantly expanding! If you have a grocery item that isn't
                in our database, head over to the 'Add' page to add it in.</p>
        </div>
    );
}

export default Home;
