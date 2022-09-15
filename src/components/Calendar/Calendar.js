import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";

class Calendar extends Component {

  constructor(props) {
    super(props);

    this.calendarRef = React.createRef();

    this.state = {
      viewType: "Resources",
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  loadCalendarData() {

    const startDate = "2022-11-07";
  
    const columns = [
      {name: "Room 1", id: "R1"},
      {name: "Room 2", id: "R2"},
      {name: "Room 3", id: "R3"},
      {name: "Room 4", id: "R4"},
      {name: "Room 5", id: "R5"},
      {name: "Room 6", id: "R6"},
      {name: "Room 7", id: "R7"},
    ];
  
    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2022-11-07T10:30:00",
        end: "2022-11-07T13:00:00",
        barColor: "#fcb711",
        resource: "R1"
      },
      {
        id: 2,
        text: "Event 2",
        start: "2022-11-07T09:30:00",
        end: "2022-11-07T11:30:00",
        barColor: "#f37021",
        resource: "R2"
      },
      {
        id: 3,
        text: "Event 3",
        start: "2022-11-07T12:00:00",
        end: "2022-11-07T15:00:00",
        barColor: "#cc004c",
        resource: "R2"
      },
      {
        id: 4,
        text: "Event 4",
        start: "2022-11-07T11:30:00",
        end: "2022-11-07T14:30:00",
        barColor: "#6460aa",
        resource: "R3"
      },
  
    ];
  
    this.calendar.update({startDate, columns, events});
  
  }

  componentDidMount() {
    this.loadCalendarData();
  }

  render() {

    return (
      <DayPilotCalendar
        {...this.state}
        ref={this.calendarRef}
        />
    );
  }
}

export default Calendar;