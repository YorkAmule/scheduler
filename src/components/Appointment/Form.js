import React, { useState } from 'react'

import Button from "components/Button"

import InterviewerList from "components/InterviewerList"

import {bookInterview} from "components/Application"

export default function Form(props) {

  const [name, setName] = useState(props.name || "");

  //console.log(props.interviewer);
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  function reset(){
    setName("");
    setInterviewer("");
  }

  function cancel(){
    console.log("Form.js Cancelling...")
    reset();
    props.onCancel();
  }

  function save() {
    console.log("Saving...");
    props.onSave(name, interviewer);
  }

  function onChange(id) {
    console.log("onChange:", id);
    setInterviewer(id);
  }


//console.log(props.interviewers);
  return(
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          onChange={event => setName(event.target.value)}
          /*
            This must be a controlled component
          */
        />
      </form>
      <InterviewerList 
      interviewers={props.interviewers} 
      interviewer={interviewer} 
      onChange={onChange} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={() => cancel()} danger>Cancel</Button>
        <Button confirm onClick={save}>Save</Button>
      </section>
    </section>
  </main>


  )
}