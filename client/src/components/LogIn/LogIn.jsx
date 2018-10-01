import React from 'react';
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Col,
    Row,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./LogIn.css";

const LogIn = ({
    handleSubmit,
    handleChange,
    user,
    submitted
}) => (
    <Row>
        <Col className="log-in-form" md={2} mdOffset={5} xs={6} xsOffset={3}>
            <h2>Log In</h2>
            <form name="login" onSubmit={handleSubmit}>
                <FormGroup className={(submitted && !user.email ? ' has-error' : '')}>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="text" name="email" value={user.email} onChange={handleChange} />
                    {submitted && !user.email && <HelpBlock>Email is required</HelpBlock>
                    }
                </FormGroup>

                <FormGroup className={ submitted && !user.password ? ' has-error' : '' }>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="text" name="password" value={user.password} onChange={handleChange}/>
                    { submitted && !user.password && <HelpBlock>Password is required</HelpBlock> }
                </FormGroup>

                <FormGroup>
                    <Button type="submit">Login</Button>
                    <Link to="/signup" className="btn btn-link">Haven't an account?</Link>
                </FormGroup>
            </form>
        </Col>
    </Row>
);

export default LogIn;
