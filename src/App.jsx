import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import BasicQuestions from './pages/basicquestions';
import DetailedQuestions from './pages/detailedquestions';

const App = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/basicquestions" element={<BasicQuestions />} />
            <Route path="/detailedquestions" element={<DetailedQuestions />} />
        </Routes>
    </Router>
);

export default App;