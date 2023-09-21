import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import classes from "./Signup.module.css";

const Signup = () => {
    const emailInputRef = useRef();
    const passInputRef = useRef();
    const conPassInputRef = useRef();
    const formRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPass = passInputRef.current.value;
        const enteredConPass = conPassInputRef.current.value;

        if(enteredPass !== enteredConPass){
            alert("Password Not Matched!!")
        }
        else{
            try {
                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjXIlJQSkQyYiuzZ_k34zUtQ4xghv6GTs",{
                    method:"POST",
                    body: JSON.stringify({
                        email : enteredEmail,
                        password : enteredPass,
                        returnSecureToken : true
                    }),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                })

                if(response.ok){
                    const data = await response.json();
                    console.log(data);
                    alert("Succesfully Signed Up");
                }else{
                    const data = await response.json();
                    let errMsg = "Authentication Failed!";
                    if(data && data.error && data.error.message){
                        errMsg = data.error.message;
                    }

                    throw new Error(errMsg);
                }
            } catch (error) {
                alert(error.message)
            }
        }

        formRef.current.reset();
    }


    return (
        <div className={classes.form}>
            <Form className={classes.controls} onSubmit={submitHandler} ref={formRef}>
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
                <Form.Group className="mb-3" >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" required ref={conPassInputRef}/>
                </Form.Group>
                <div className={classes.action}>
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Signup
