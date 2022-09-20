import React, { Component } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

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
    const startDate = "2022-09-16";
    const columns = [
      { name: "Lundi (M)", id: "M" },
      { name: "Mardi (T)", id: "T" },
      { name: "Mercredi (W)", id: "W" },
      { name: "Jeudi (Th)", id: "Th" },
      { name: "Vendredi (F)", id: "F" },
      { name: "Samedi (S)", id: "S" },
      { name: "Dimanche (Su)", id: "Su" },
    ];

    const events = this.props.eventList;

    // const events = [
    //   {
    //     id: 1,
    //     text: "Event 15",
    //     start: "2022-09-16T10:30:00",
    //     end: "2022-09-16T13:00:00",
    //     barColor: "#fcb711",
    //     resource: "M",
    //     user_id: "10",
    //     room_id: "10",
    //     patient_id: "10",
    //   },
    //   {
    //     id: 2,
    //     text: "Event 2",
    //     start: "2022-09-16T09:30:00",
    //     end: "2022-09-16T11:30:00",
    //     barColor: "#f37021",
    //     resource: "T",
    //   },
    //   {
    //     id: 3,
    //     text: "Event 3",
    //     start: "2022-09-16T12:00:00",
    //     end: "2022-09-16T15:00:00",
    //     barColor: "#cc004c",
    //     resource: "T",
    //   },
    //   {
    //     id: 4,
    //     text: "Event 4",
    //     start: "2022-09-16T11:30:00",
    //     end: "2022-09-16T14:30:00",
    //     barColor: "#6460aa",
    //     resource: "W",
    //   },
    // ];

    this.calendar.update({ startDate, columns, events });
  }

  componentDidMount() {
    this.loadCalendarData();
  }

  render() {
    return <DayPilotCalendar {...this.state} ref={this.calendarRef} />;
  }
}

export default Calendar;
