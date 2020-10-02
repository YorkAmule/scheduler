import React, {useState} from "react";

import classNames from 'classnames';


export default function DayList(props) {
  
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

 return (
  <li className={interviewClass} onClick={() => props.setInterviewer(props.name)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
 );
}
