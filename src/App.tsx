import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/homepage';
import BasicQuestions from './pages/basicquestions';
import DetailedQuestions from './pages/detailedquestions';
import ApiTest from './pages/apitest';
import ResultPage from './pages/resultpage';
import { Layout } from "./components/Layout";
import './react-app-env.d.ts'; //this is a file that I created to store the key for the API
import OpenAI from 'openai';

/* NOTE: I have to write all API compatibility on the outermost level of the application so the key can be passed
* to each component
*/

let keyData = "";
const saveKeyData = process.env.CHATGPT_API_REACT_KEY || "MYKEY"; //this is the key that I stored in the .env file
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}); // need second flag unfortunately

const generateResponse = async (input: { basicData: any, detailedData: any }): Promise<{ content: string }> => {
    const prompt = `
        Based on the following data, please recommend a suitable job for the user:

        Basic Data: ${JSON.stringify(input.basicData)}
        Detailed Data: ${JSON.stringify(input.detailedData)}

        Please consider the user's preferences and skills indicated in the data and suggest a job that would be a good fit for them.
    `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
        ],
    });

    return { content: completion.choices[0].message.content as string };
};

const App = () => {
    const [key, setKey] = useState(keyData);
    const [basicData, setBasicData] = useState({});
    const [detailedData, setDetailedData] = useState({});

    function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
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
                    <Route path="/" element={<Home changeKey={changeKey} handleSubmit={handleSubmit} />} />
                    <Route path="/basicquestions" element={<BasicQuestions setBasicData={setBasicData} />} />
                    <Route path="/detailedquestions" element={<DetailedQuestions setDetailedData={setDetailedData} />} />
                    <Route path="/apitest" element={<ApiTest generateResponse={generateResponse} />} />
                    <Route path="/result" element={<ResultPage basicData={basicData} detailedData={detailedData} generateResponse={generateResponse} />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;