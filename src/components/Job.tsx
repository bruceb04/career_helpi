import React from 'react'
import "./Job.css"

type Props = {title: string, match: number, salary: string, description: string};

export default function Job({title, match, salary, description}: Props) {
  return (
    <div className="job-list-item">
      <div className="job-name">{title}</div>
      <div className="job-description">{description}</div>
      <div className="job-salary">Salary: {salary}</div>
      <div className="job-match">Match: {match}%</div>
    </div>
  )
}
