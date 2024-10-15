import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";

const ApiTest = ({ generateResponse }) => {

    const [prompt, setPrompt] = useState("");
    const [outputText, setOutputText] = useState("");

    const generateOutput = () => {
        generateResponse(prompt)
        .then((response) => setOutputText(response.content));
    }

    function updatePrompt(event){
        setPrompt(event.target.value);
    }

    return (
        <>
            <h1>Home Page</h1>
            <div>
                <Form.Control value={prompt} onChange={updatePrompt}/>
                <Button onClick={generateOutput}>
                    Call API
                </Button>
                <h2>{outputText}</h2>
            </div>

        </>
    );
};

export default ApiTest;