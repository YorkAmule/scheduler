import React, {useState} from "react";

import classNames from 'classnames';

import InterviewerListItem from "./InterviewerListItem";

export default function DayList(props) {
  

 return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
 <ul className="interviewers__list">{props.interviewers.map(interviewer => <InterviewerListItem id={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} selected={interviewer.name === props.name} setInterviewer={props.setInterviewer}></InterviewerListItem>)}</ul>
  </section>
 );
}
