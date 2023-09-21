import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from "./Signup.module.css";

const Login = () => {
    const emailInputRef = useRef();
    const passInputRef = useRef();
    const formRef = useRef();

  return (
    <div className={classes.form}>
            <Form className={classes.controls} ref={formRef}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required ref={passInputRef}/>
                </Form.Group>
                <div className={classes.action}>
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </div>
            </Form>
        </div>
  )
}

export default Login
