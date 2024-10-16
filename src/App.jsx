import React, {useState} from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import BasicQuestions from './pages/basicquestions';
import DetailedQuestions from './pages/detailedquestions';
import ApiTest from './pages/apitest';
import { Layout } from "./components/Layout";
import OpenAI from 'openai';
// import ApiTest from './pages/apitest';


/* NOTE: I have to write all API compatibility on the outermost level of the application so the key can be passed
* to each component
*/

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}); // need second flag unfortunately

const generateResponse = async (input) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: input,
            },
        ],
    });

    return completion.choices[0].message
}

const App = () => {

    const [key, setKey] = useState(keyData);

    function changeKey(event) {
        setKey(event.target.value);
    }

    function handleSubmit() {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
    }

    return (
    <Router>
        <Routes>
            <Route element={<Layout />}>
            <Route path="/" element={<Home changeKey={changeKey} handleSubmit={handleSubmit}/>} />
            <Route path="/basicquestions" element={<BasicQuestions />} />
            <Route path="/detailedquestions" element={<DetailedQuestions />} />
            <Route path="/apitest" element={<ApiTest generateResponse={generateResponse}/>} />
            </Route>
        </Routes>
    </Router>
    )
};

export default App;