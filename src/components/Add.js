import React , { useState } from 'react';
import { Dropdown, DropdownButton, Button, ButtonGroup, FormControl, InputGroup, Alert } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add() {
    const [value,setValue]=useState('None');
    const [groceryName, setGroceryName] = useState('');
    const handleSelect=(e)=>{
        setValue(e)
    }

    const handleChangeName = (e) => {
        setGroceryName(e.target.value);
    }

    const handleAddNew = () => {
        const GQL_API = `http://localhost:3030/`
        const GQL_MUTATION = `
            mutation ($name: String!, $category: String!) {
                createGrocery (input:{name: $name, category: $category}) {
                    grocery {
                        name
                        category
                    }
                }
            }`;
        const variables = { name: groceryName, category: value };

        // Mutate the graphql
        fetch(GQL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GQL_MUTATION,
                variables,
            }),
          })
          .then(res => res.json())
          .then(res => {
              if (res.errors) {
                  throw res.errors[0];
              }
              return res;
          })
          .then(res => res.data.createGrocery.grocery)
          .then(res => {
                toast.success(`Grocery: ${res.name} successfully added under the category "${res.category}"`)
                setGroceryName('');
            })
          .catch(err => {
                toast.error(err.message)
                setGroceryName('');
            })

    }

    return (
        <div>
            <h2 style={{position:"relative", left:"10px"}}>Add Grocery Items</h2>
            <p style={{position:"relative", left:"10px"}}>Add new grocery items to our database below!</p>
            <Alert className="w-25 p-2" variant='primary' style={{position:"relative", left:"10px"}}>
                Your item is being added to the category: {value}
            </Alert>
            <InputGroup className="w-50 p-2 mb-1">
                <InputGroup.Prepend>
                    <ButtonGroup>
                        <DropdownButton
                            alignRight
                            title="Choose Category"
                            id="dropdown-menu-align-right"
                            onSelect={handleSelect}
                        >
                            <Dropdown.Item eventKey="Produce">Produce</Dropdown.Item>
                            <Dropdown.Item eventKey="Bakery">Bakery</Dropdown.Item>
                            <Dropdown.Item eventKey="Deli">Deli</Dropdown.Item>
                            <Dropdown.Item eventKey="Organic Materials">Organic Materials</Dropdown.Item>
                            <Dropdown.Item eventKey="Medicine">Medicine</Dropdown.Item>
                            <Dropdown.Item eventKey="Cleaning Supplies">Cleaning Supplies</Dropdown.Item>
                            <Dropdown.Item eventKey="Meat">Meat</Dropdown.Item>
                            <Dropdown.Item eventKey="Baking Ingredients">Baking Ingredients</Dropdown.Item>
                            <Dropdown.Item eventKey="Pasta">Pasta</Dropdown.Item>
                            <Dropdown.Item eventKey="Canned Goods">Canned Goods</Dropdown.Item>
                            <Dropdown.Item eventKey="Sauces/Condiments">Sauces-Condiments</Dropdown.Item>
                            <Dropdown.Item eventKey="Cereals/Snacks">Cereals-Snacks</Dropdown.Item>
                            <Dropdown.Item eventKey="Drinks">Drinks</Dropdown.Item>
                            <Dropdown.Item eventKey="Dairy">Dairy</Dropdown.Item>
                            <Dropdown.Item eventKey="Frozen Goods">Frozen Goods</Dropdown.Item>
                            <Dropdown.Item eventKey="Misc.">Misc.</Dropdown.Item>
                        </DropdownButton>
                    </ButtonGroup>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Enter New Grocery Name"
                    aria-label="Enter New Grocery Name"
                    aria-describedby="grocery-input-form"
                    value={groceryName}
                    onChange={handleChangeName}
                />
                <InputGroup.Append>
                    <Button variant="primary" onClick={handleAddNew}>Add</Button>
                </InputGroup.Append>
                
            </InputGroup>
        </div>
    );
}



export default Add;
