import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import BasicQuestions from './pages/basicquestions';
import DetailedQuestions from './pages/detailedquestions';
import { Layout } from "./components/Components/Layout";

const App = () => (
    <Router>
        <Routes>
            <Route element={<Layout />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/basicquestions" element={<BasicQuestions />} />
            <Route path="/detailedquestions" element={<DetailedQuestions />} />
            </Route>
        </Routes>
    </Router>
);

export default App;