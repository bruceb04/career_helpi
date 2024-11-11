import React from 'react'
import "./Job.css"

type ResponseFormat = {job_title: string, starting_salary: string, description: string, match_percentage: number, wiki: string};
type Props = {result: ResponseFormat}

export default function Job({result}: Props) {
  return (
    <div className="job-item"
    onClick={() => {window.open(result.wiki, "_blank")}}>
      <div className="job-name">{result.job_title}</div>
      <div className="job-description">{result.description}</div>
      <div className="job-salary">Salary: {result.starting_salary}</div>
      <div className="job-match">Match: {result.match_percentage}%</div>
    </div>
  )
}
