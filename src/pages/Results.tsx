import React from 'react'
import Job from '../components/Job';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Results.css';

type ResponseFormat = {job_title: string, starting_salary: string, description: string, match_percentage: number, wiki: string};
type Props = {results: ResponseFormat[]}

export default function Results({results}: Props) {

  const navigate = useNavigate();

  const listItems = results.map((result, index) => 
    <li key={index}>
      <Job result={result}/>
    </li>
  );

  return ( results[0].match_percentage === -1 ? (
    <div className='container'>
      <h1 className='h1' id="loading">Loading Results...</h1>
      <Button onClick={() => navigate("/")}>Home</Button>
    </div>
  ): 
    <div className='container'>
      <h1 className='h1' id="header">Results</h1>
      <ul>
        {listItems}
      </ul>
      <Button onClick={() => navigate("/")}>Home</Button>
    </div>

    )
}