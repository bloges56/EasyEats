import React, { useState, useContext, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, InputGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import { IngredientsProviderContext } from "../Providers/IngredientsProviders";
import { UserProfileContext } from "../Providers/UserProfileProviders";
import { Container } from "reactstrap";
import history from "../history";

export default function RecipeGenerator(){

    const {getRecipesByIngredients } = useContext(IngredientsProviderContext);
    const { isLoggedIn, userId} = useContext(UserProfileContext);
    const [currentIngredients, setCurrentIngredients] = useState([]);
    const [ingredient, setIngredient ] = useState([]);

    const addIngredient = (e) => {
        e.preventDefault();
        currentIngredients.push(ingredient);
        setCurrentIngredients(currentIngredients);
        setIngredient();
    };

    const SubmitIngredients = (e) => {
        e.preventDefault();
        if(isLoggedIn)
        {
            debugger;
            getRecipesByIngredients(currentIngredients, userId)
            .then(() => {
                setCurrentIngredients([])
            });
        }
    }

    const ingredientsList = currentIngredients.map((i) => 
        <ListGroupItem key={i}>{i}</ListGroupItem>
    )

    return (
        <Container className="recipe-generator-form-container">
            <Form onSubmit={SubmitIngredients} className="recipe-generator-form">
                <FormGroup>
                    <InputGroup>
                        <Input name="ingredients" id="ingredients" placeholder="Add an ingredient..." onChange={e => setIngredient(e.target.value)} value={ingredient}/>
                        <Button onClick={addIngredient}>Add</Button>
                    </InputGroup>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
            {currentIngredients.length != 0 ? 
            <ListGroup>
                {ingredientsList}
            </ListGroup> : <></>}
        </Container>

    );
}