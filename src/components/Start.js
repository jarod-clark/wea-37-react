import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, FormControl, InputGroup } from "react-bootstrap";
import StartList from './StartList';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const alreadyAdded = [];

const tabs = [
  { id: 1, label: "Produce", description: "" },
  { id: 2, label: "Bakery", description: "" },
  { id: 3, label: "Deli", description: "" },
  { id: 4, label: "Organic Materials", description: "" },
  { id: 5, label: "Medicine", description: "" },
  { id: 6, label: "Cleaning Supplies", description: "" },
  { id: 7, label: "Meat", description: "" },
  { id: 8, label: "Baking Ingredients", description: "" },
  { id: 9, label: "Pasta", description: "" },
  { id: 10, label: "Canned Goods", description: "" },
  { id: 11, label: "Sauces-Condiments", description: "" },
  { id: 12, label: "Cereals-Snacks", description: "" },
  { id: 13, label: "Drinks", description: "" },
  { id: 14, label: "Dairy", description: "" },
  { id: 15, label: "Frozen Goods", description: "" },
  { id: 16, label: "Misc.", description: "" }
];

const Start = ({ newItem }) => {
  const [groceryName, setGroceryName] = useState('');
  
  const handleChangeName = (event) => {
    setGroceryName(event.target.value);//takes value entered on site, sets variable to it
  }

  const GQL_API = `http://localhost:3030/`
    const GQL_QUERY = `
        query ($name: String!) {
          grocery (name: $name){
            name
            category
          }
            
        }`;

        const handleLoadGroceries = () => {
          
          const variables = { name: groceryName };
            fetch(GQL_API, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  query: GQL_QUERY,
                  variables,
              }),
            })
              .then((response) => response.json())
              .then(res => {
                if (res.errors) {
                  throw res.errors[0];
                }
                return res;
              })
              .then(res => res.data.grocery)
              .then(res => {
                // If the item exists in the list already, return early
                console.log(alreadyAdded)
                if (alreadyAdded.find(groc => groc === res.name)) {
                  toast.warn(`Grocery "${res.name}" is already added!`);

                  setGroceryName('')
                  return;
                } else {
                  alreadyAdded.push(res.name)
                }
                // Get the tab that corresponds to the category
                const idx = tabs.findIndex((t) => t.label === res.category);
                if (tabs[idx].description) {
                  // Add a space which the program uses as a delimiter between objects
                  tabs[idx].description += '\n';
                }
              
                tabs[idx].description += res.name;
                // Reset the state in order to re-render the objects
                setGroceryName('');

                toast.success(`Grocery "${groceryName}" added!`);
              })
              .catch(error => {
                toast.error(error.message);
                setGroceryName('');
              });
          }
          
      useEffect(() => {
        if (newItem.length > 0) {
          for (let i = 0; i < newItem.length; ++i) {

          const variables = { name: newItem[i] };
            fetch(GQL_API, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  query: GQL_QUERY,
                  variables,
              }),
            })
              .then((response) => response.json())
              .then(res => {
                if (res.errors) {
                  throw res.errors[0];
                }
                return res;
              })
              .then(res => res.data.grocery)
              .then(res => {
                setGroceryName('Added from browse');
                // If the item exists in the list already, return early
                if (alreadyAdded.find(groc => groc === res.name)) {
                  setGroceryName('')
                  return;
                } else {
                  alreadyAdded.push(res.name)
                }
                // Get the tab that corresponds to the category
                const idx = tabs.findIndex((t) => t.label === res.category);
                if (tabs[idx].description) {
                  // Add a space which the program uses as a delimiter between objects
                  tabs[idx].description += '\n';
                }
              
                tabs[idx].description += res.name;
                // Reset the state in order to re-render the objects
                setGroceryName('');
              })
              .catch(error => toast.error(error.message));
            }
            
        }
      }, [newItem, GQL_API, GQL_QUERY])

  return (
      <div>
        <h2 style={{position:"relative", left:"10px"}}>Get Started</h2>

        <p style={{position:"relative", left:"10px"}}> Add an item to your list by typing it into the form below! Your items will be sorted by category for you.</p>
        <p style={{position:"relative", left:"10px"}}> Be sure to capitalize the first letter of each word!</p>
        <p style={{position:"relative", left:"10px"}}> If you don't know what you want to buy, check out the Browse page, where you can also add items to your Grocery List .</p>
      

        <InputGroup className="w-25 p-2 mb-1">
      
          <FormControl
            placeholder="Enter Grocery Name"
            aria-label="Enter Grocery Name"
            aria-describedby="add-to-list"
            value={groceryName}
            onChange={handleChangeName}
          />

          <InputGroup.Append>
            <Button onClick={handleLoadGroceries} >Add</Button>
          </InputGroup.Append>
        </InputGroup>
      

        <h3 style={{position:"relative", left:"10px"}}>My Grocery List</h3>

        {tabs.map(tab => (tab.description &&
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={tab.id}>
                {tab.label}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={tab.id}>
              <Card.Body>
                <StartList items={tab.description} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}

      </div>
    );
}

export default Start;
