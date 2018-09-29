import React, { PureComponent } from 'react';
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
import "./LogIn.css"

export default class LogIn extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password: '',
            },
            submitted: false
        };
    }

    handleChange = event => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { name } = event.target;
        this.setState({ submitted: true });
        const { user } = this.state;

        this.props.handleSubmit(name, user);
    };

    render() {
        const { user, submitted } = this.state;
        return (
            <Row>
                <Col className="log-in-form" md={2} mdOffset={5} xs={6} xsOffset={3}>
                    <h2>Log In</h2>
                    <form name="login" onSubmit={this.handleSubmit}>

                        <FormGroup className={(submitted && !user.email ? ' has-error' : '')}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" value={user.email} onChange={this.handleChange} />
                            {submitted && !user.email && <HelpBlock>Email is required</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup className={ submitted && !user.password ? ' has-error' : '' }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="text" name="password" value={user.password} onChange={this.handleChange}/>
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
    }
}
