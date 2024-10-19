import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import React from "react";

interface ApiResponse {
    content: string;
}

interface ApiTestProps {
    generateResponse: (prompt: string) => Promise<ApiResponse>;
}

const ApiTest: React.FC<ApiTestProps> = ({ generateResponse }) => {
    const [prompt, setPrompt] = useState<string>("");
    const [outputText, setOutputText] = useState<string>("");

    const generateOutput = () => {
        generateResponse(prompt).then((response) => setOutputText(response.content));
    };

    const updatePrompt = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(event.target.value);
    };

    return (
        <>
            <h1>Home Page</h1>
            <div>
                <Form.Control value={prompt} onChange={updatePrompt} />
                <Button onClick={generateOutput}>Call API</Button>
                <h2>{outputText}</h2>
            </div>
        </>
    );
};

export default ApiTest;
