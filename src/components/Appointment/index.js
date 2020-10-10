import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/header"

import Show from "components/Appointment/Show"

import Empty from "components/Appointment/Empty"

import Form from "components/Appointment/Form"

import useVisualMode from "hooks/useVisualMode";
import { bookInterview } from "components/Application";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const CREATE = "CREATE/EDIT";
const EDIT = "EDIT";

export default function Appointment(props) {

  //{interviewer == true ? <Show student="Lydia Miller-Jones" interviewer={interviewer} onEdit={action("onEdit")} onDelete={action("onDelete")}/> : <Empty onAdd={action("onAdd")} />}


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SHOW);
    props.bookInterview(props.id, interview);
    
  }

  function cancel() {
    console.log("Appointment Cancelling...");
    back();
  }

  //console.log("The interviewers are: ", props.interviewers);

  return (<article className="appointment">
      <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}

    {mode === SHOW && (
      <Show onEdit = {() => transition(EDIT)} 
        onDelete={() => { transition(EMPTY) }}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && (
      <Form interviewers={props.interviewers} interviewer={props.interviewer} onSave={save} onCancel={cancel}/>)
    }
    {mode === EDIT && (
      <Form interviewers={props.interviewers} value={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} onCancel={cancel}/>
    )
    }

      </article>
  
  
  )
}