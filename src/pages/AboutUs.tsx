import React from 'react';
import './CSSFolder/AboutUs.css';
import Person from './AboutUs/Person';
import { PEOPLE } from './AboutUs/People';

const AboutUs = () => {
    return (
        <div className='container'>
            {PEOPLE.map((person) => (
                <Person person={person}/>
            ))}
        </div>
    );
};

export default AboutUs;