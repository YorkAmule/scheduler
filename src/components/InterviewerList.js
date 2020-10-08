import React, {useState} from "react";

import classNames from 'classnames';

import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

export default function DayList(props) {
  //console.log(props.interviewers);
  const interviewList = classNames("interviewers__list", {
    "interviewers__header": props.selected
  })

  const setInterviewer = function(id) {

    //console.log(id);
    props.onChange(id);
  }
  

  // console.log("Is this an array? " +  Array.isArray(props.interviewers), props.interviewers.length);
  // console.log("setInteviewer is", props.onChange);
  const interviewers =  props.interviewers.map(interviewer => 
  <InterviewerListItem 
  id={interviewer.id} 
  name={interviewer.name} 
  avatar={interviewer.avatar} 
  selected={interviewer.id === props.interviewer} 
  setInterviewer={() => setInterviewer(interviewer.id)}>
  </InterviewerListItem>);




 return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
 <ul className={interviewList}>{interviewers
  }</ul>
  </section>
 );
}
