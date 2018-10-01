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
import './SignUp.css';

const SignUp = ({
    handleSubmit,
    handleChange,
    user,
    submitted,
}) => (
    <Row>
        <Col className="sign-up-form" xs={6} xsOffset={3}>
            <h2>Sign Up</h2>
            <form name="register" onSubmit={handleSubmit}>

                <FormGroup className={ submitted && !user.nickname ? ' has-error' : '' }>
                    <ControlLabel>Nickname</ControlLabel>
                    <FormControl type="text" name="nickname" value={user.nickname} onChange={handleChange}/>
                    { submitted && !user.nickname && <HelpBlock>Nickname is required</HelpBlock> }
                </FormGroup>

                <FormGroup className={(submitted && !user.email ? ' has-error' : '')}>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="text" name="email" value={user.email} onChange={handleChange} />
                    { submitted && !user.email && <HelpBlock>Email is required</HelpBlock> }
                </FormGroup>

                <FormGroup className={ submitted && !user.password ? ' has-error' : '' }>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type="text" name="password" value={user.password} onChange={handleChange}/>
                    { submitted && !user.password && <HelpBlock>Password is required</HelpBlock> }
                </FormGroup>

                <FormGroup className={(submitted && !user.passwordConfirm ? ' has-error' : '')}>
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl type="text" name="passwordConfirm" value={user.passwordConfirm} onChange={handleChange} />
                    { submitted && !user.passwordConfirm && <HelpBlock>Confirm is required</HelpBlock> }
                </FormGroup>

                <FormGroup>
                    <Button type="submit">Register</Button>
                    <Link to="/login" className="btn btn-link">Already have an account?</Link>
                </FormGroup>
            </form>
        </Col>
    </Row>
);

export default SignUp;
