import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from "./Signup.module.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';


const Login = (props) => {
    const emailInputRef = useRef();
    const passInputRef = useRef();
    const formRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const hideHandler = () => {
        props.onHide();
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPass = passInputRef.current.value;

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjXIlJQSkQyYiuzZ_k34zUtQ4xghv6GTs", {
                method: "POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPass,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const data = await response.json();
                dispatch(authActions.login({ tokenId: data.tokenId, email: enteredEmail}))
                navigate("/profile", { replace: true })
            } else {
                const data = await response.json();
                let errMsg = "Authentication Failed!";
                if (data && data.error && data.error.message) {
                    errMsg = data.error.message;
                }

                throw new Error(errMsg);
            }
        } catch (error) {
            alert(error.message)
        }
        formRef.current.reset();
    }

    return (
        <div className={classes.form}>
            <Form className={classes.controls} ref={formRef} onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required ref={passInputRef} />
                </Form.Group>
                <div className={classes.action}>
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </div>
                <div className={classes.toggle}>
                    <span>You don't have account?</span><button onClick={hideHandler}>Create account</button>
                </div>
            </Form>
        </div>
    )
}

export default Login
