import React, {useState} from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import BasicQuestions from './pages/basicquestions';
import DetailedQuestions from './pages/detailedquestions';
import { Layout } from "./pages/Layout/Layout";
import OpenAI from 'openai';
import Results from './pages/Results';
import AboutUs from './pages/AboutUs';


/* NOTE: I have to write all API compatibility on the outermost level of the application so the key can be passed
* to each component
*/

let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

const nullJob = {job_title: "", starting_salary: "", description: "", match_percentage: -1, wiki: ""}; // for incomplete loading times
const errJob = {job_title: "We're having some trouble connecting right now", starting_salary: "", description: "Pleast try again later.", match_percentage: 0, wiki: ""};

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
    "Do you enjoy creative tasks?",
    "Do you enjoy physical work?"
];

const openai = new OpenAI({apiKey: keyData, dangerouslyAllowBrowser: true}); // need second flag unfortunately

var basicQuestionsData = basicQuestions.map((q: string) => {return {question: q, answered: false, isMatch: false}})
var detailedQuestionsData = detailedQuestions.map((q: string) => {return {question: q, answered: false, match: -1}});

type ResponseFormat = {job_title: string, starting_salary: string, description: string, match_percentage: number, wiki: string};

const generateResponseBasic = async (): Promise<OpenAI.Chat.Completions.ChatCompletionMessage> => {

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: {type: "json_object"},
        messages: [
            { role: "system", content: "You are going to be given a list of Yes/No questions and their answers in stringified JSON format"},
            { role: "system", content: "You are going to output a list of multiple employment opportunities that align with the given answers to their respective questions"},
            { role: "system", content: "Respond in a JSON format that provides the job titles: \"job_title\", the starting yearly salaries in USD: \"starting_salary\", a brief description of the jobs: \"description\", a percentage match that aligns with the given answers: \"match_percentage\", and a link to the wikipedia article for this job: \"wiki\""},
            { role: "system", content: "Give results with a variety of match percentages and put the highest matches at the beginning of the results"},
            { role: "system", content: "Show jobs from a variety of fields, but still align with the given answers"},
            { role: "system", content: "Label the list as \"options\" in the json object"},
            { role: "system", content: "All fields should be a string except the match percentage which should be a number from 1 to 100 rounded to the nearest whole number, the salary should start with a dollar sign, and make sure the link is from wikipedia.org"},
            { role: "system", content: "Make sure almost all results are jobs with a 50% match or higher, and make sure all displayed jobs have a significant starting salary for a college graduate"},
            { role: "user", content: JSON.stringify(basicQuestionsData)},
        ],
    });
    return completion.choices[0].message
};

const generateResponseDetailed = async (): Promise<OpenAI.Chat.Completions.ChatCompletionMessage> => {

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: {type: "json_object"},
        messages: [
            { role: "system", content: "You are going to be given a list of questions and their answers on a scale of 1-5 in stringified JSON format"},
            { role: "system", content: "You are going to output a list of multiple employment opportunities that align with the given answers to their respective questions"},
            { role: "system", content: "Respond in a JSON format that provides the job titles: \"job_title\", the starting yearly salaries in USD: \"starting_salary\", a 2-3 sentence description of the jobs: \"description\", and a percentage match that aligns with the given answers: \"match_percentage\""},
            { role: "system", content: "Give results with a variety of match percentages and put the highest matches at the beginning of the results"},
            { role: "system", content: "Show jobs from a variety of fields, but still align with the given answers"},
            { role: "system", content: "Label the list as \"options\" in the json object"},
            { role: "system", content: "All fields should be a string except the match percentage which should be a number from 1 to 100 rounded to the nearest whole number, the salary should start with a dollar sign"},
            { role: "system", content: "Make sure almost all results are jobs with a 50% match or higher, and make sure all displayed jobs have a significant starting salary for a college graduate"},
            { role: "system", content: "\"description\": You also will provide website links that give information about the jobs "},
            { role: "user", content: JSON.stringify(detailedQuestionsData)},
        ],
    });
    console.log(completion.choices[0].message);
    return completion.choices[0].message
};



const App = () => {

    const [key, setKey] = useState(keyData);
    const [results, setResults] = useState<ResponseFormat[]>([nullJob]);

    async function changeResultsBasic() {
        setResults([nullJob]);
        try {
            await generateResponseBasic().then((message) => {
                let options = message.content ? JSON.parse(message.content).options: nullJob
                setResults(options);
            })
        } catch {
            setResults([errJob]);
        }        
        
    }

    async function changeResultsDetailed() {
        setResults([nullJob]);
        try {
            await generateResponseDetailed().then((message) => {
                let options = message.content ? JSON.parse(message.content).options: nullJob
                setResults(options);
            })
        } catch {
            setResults([errJob]);
        }
        
    }

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
            <Route path="/basicquestions" element={<BasicQuestions basicQuestionsData={basicQuestionsData} onSubmit={changeResultsBasic}/>} />
            <Route path="/detailedquestions" element={<DetailedQuestions detailedQuestionsData={detailedQuestionsData} onSubmit={changeResultsDetailed}/> } />
            <Route path="/results" element={<Results results={results}/> } />
            <Route path="/about-us" element={<AboutUs />} />
            </Route>
        </Routes>
    </Router>
    )
};

export default App;