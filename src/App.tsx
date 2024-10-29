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

const detailedQuestions: string[] = [
    "I enjoy learning new things and expanding my skills regularly.",
    "I am passionate about specific subjects or topics from my school days.",
    "I prefer working independently rather than collaborating with others.",
    "I find creative tasks (like writing or designing) enjoyable.",
    "I believe I am well-organized and manage my tasks efficiently.",
    "Achieving a good work-life balance is important to me.",
    "I value job stability over the potential for high earnings.",
    "A high salary is one of my top priorities in choosing a career.",
    "I am comfortable speaking in front of large groups.",
    "I would prefer a job that allows remote work options.",
    "I am open to further education or training for my career.",
    "I gain satisfaction from helping others and being in service roles.",
    "I am more interested in analyzing data than interacting with people.",
    "I handle stressful situations and pressure effectively.",
    "I am curious about specific industries or fields.",
    "I am willing to relocate or travel frequently for work.",
    "Job title and status are important factors for me in a career.",
    "I enjoy having a routine and structured tasks each day.",
    "I value having opportunities for career advancement.",
    "I want my work to positively impact society or the environment."
];

const basicQuestions: string[] = [
    "Do you enjoy working with numbers?",
    "Are you comfortable with public speaking?",
    "Do you like working in a team?",
    "Do you enjoy solving complex problems?",
    "Are you interested in technology?",
    "Do you prefer a structured work environment?",
    "Do you enjoy creative tasks?"
];

const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}); // need second flag unfortunately

const generateResponse = async (input: string): Promise<{ content: string }> => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input},
        ],
    });

    return { content: completion.choices[0].message.content as string };
};

var basicQuestionsData = basicQuestions.map((q: string) => {return {question: q, answered: false, isMatch: false}})
var detailedQuestionsData = detailedQuestions.map((q: string) => {return {question: q, answered: false, match: -1}});

const App = () => {

    const [key, setKey] = useState(keyData);

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