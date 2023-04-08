import React, { useState, useContext} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProviders";
import { Container } from "reactstrap";
import history from "../history";

export default function Login(){

    const { login } = useContext(UserProfileContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => {
                history.push("/")
                history.go()
            })
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Container className="login-form-container">
            <Form onSubmit={loginSubmit} className="login-form">
                <fieldset>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button>Login</Button>
                    </FormGroup>
                    <em>
                        Not registered? <Link to="/register">Register</Link>
                    </em>
                </fieldset>
            </Form>
        </Container>

    );
}