import React from 'react'
import "./Job.css"

type Props = {title: string, match: number, salary: string, desc: string};

export default function Job({title, match, salary, desc}: Props) {
  return (
    <div className="job-item">
      <div className="job-name">{title}</div>
      <div className="job-description">{desc}</div>
      <div className="job-salary">Salary: {salary}</div>
      <div className="job-match">Match: {match}%</div>
    </div>
  )
}
