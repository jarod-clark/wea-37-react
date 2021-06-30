import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home";
import Start from "./components/Start";
import Browse from "./components/Browse";
import Add from "./components/Add";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [addItem, setAddItem] = useState([]);
  const [added, setAdded] = useState(false);

  const handleBrowseClick = (item) => {
    if (!added) {
      const newItemList = [...addItem, item];
      setAddItem(newItemList);
    } else {
      setAdded(false);
      setAddItem([item]);
    }
    
  }

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/get-started">Get Started</Link>
          </li>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/add-grocery">Add</Link>
          </li>
        </ul>
        <ToastContainer />
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/get-started">
            <Start newItem={addItem}/>
          </Route>
          <Route path="/browse">
            <Browse onClick={handleBrowseClick}/>
          </Route>
          <Route path="/add-grocery">
            <Add />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
