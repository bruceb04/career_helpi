import React from 'react';
import { Button, Form } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)


const Home = ({changeKey, handleSubmit}) => {

    return (
        <>
            <h1>Home Page</h1>
            <div>
                <Form>
                    <Form.Label>API Key:</Form.Label>
                    <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
                    <br></br>
                    <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
                </Form>
            </div>
        </>
    );
};

export default Home;