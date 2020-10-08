const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};


export const getInterview = function (state, interview) {

  if(!interview)
  {
    return null;
  }

  const result = {...interview};
  const id = interview.interviewer;

  if(!id)
  {
    return null;
  }

  const interviewer = state.interviewers[id];
  if(!interviewer)
  {
    return null;
  }
  result.interviewer = interviewer;
  
  return result; 
}

export const getInterviewersForDay = function (state, dayName) {
  const results = [];
  // console.log("Calling getInterviewersForDay");
  let dayObj = state.days.find(day => day.name === dayName);

  if(!dayObj)
  {
    return results;
  }
  
  for (const interviewer of dayObj.appointments) {
    results.push(state.interviewers[interviewer]);
  }
  // console.log("The interviewers are", results);
  return results;
}

export const getAppointmentsForDay = function (state, dayName) {
    const results = [];
    let dayObj = state.days.find(day => day.name === dayName);

    if(!dayObj)
    {
      return results;
    }
    
    for (const id of dayObj.appointments) {
      results.push(state.appointments[id]);
    }

    return results;
}

// console.log(getInterviewersForDay(state, "Tuesday"));