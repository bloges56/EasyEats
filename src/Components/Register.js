import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { UserProfileContext } from "../Providers/UserProfileProviders";
import history from "../history";

export default function Register() {
    const { register } = useContext(UserProfileContext);

    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match.");
        } else {
            register(userName, email, password)
                .then(() => {
                    history.push("/")
                    history.go()
                });
        }
    };

    return (
        <Container className="register-form-container">
            <Form onSubmit={registerClick} className="register-form">
                <fieldset>
                    <FormGroup>
                        <Label htmlFor="userName">UserName</Label>
                        <Input id="name" type="text" onChange={e => setUserName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button>Register</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </Container>

    );
}