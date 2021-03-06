import React, { useEffect, useState } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList"

import "components/Appointment"
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";



export default function Application(props) {

  // function bookInterview(id, interview) {
  //   console.log(id, interview);
  // }

  //const[day, setDay] = useState("Monday");

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  const [state, setState] = useState({
    day: "",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });

  const setDay = function (day) {
    setState({ ...state, day });
  }
  // const setDays = function(days)
  // {
  //   setState({...state, days});
  // }
  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");
    Promise.all([promise1, promise2, promise3])
      .then(all => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        // console.log(interviewers);
        setState(prev => ({ ...prev, days, interviewers, appointments }));
      })
      .catch(err => console.log(err));
  }, []);

   function bookInterview(id, interview) {
    console.log("Saving in Application");
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({ ...state, appointments });  
    
  
  }



  const array = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  // console.log("The interviewers are", interviewers);
  const appointments = array.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    // console.log(interviewers);
    return (<Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interviewers={interviewers}
      interview={interview}
      bookInterview={bookInterview}/>); //appointment.interview
  });

  /* {appointments.map(appointment => <ul><Appointment key={appointment.id} {...appointment} /><Appointment key="last" time="5pm" /></ul>)}  */

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
      </section>
    </main>
  );
}
//
//<Appointment id={appointment.id} time={appointment.time} interview={appointment.interview} /><Appointment id="last" time="1pm" />