import React, { createRef, useEffect, useRef, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const Calendar2 = (eventList) => {
  const [calendarRef, ] = useState(React.createRef());
  const [calendar, setCalendar] = useState(calendarRef);

  const [calendarState, ] = useState({
    viewType: "Resources",
    onEventMoved: (args) => {
      // DayPilot.message("Moved: " + args.e.text());
      console.log(args.e.data.id)
      console.log(args.e.data)
    //   console.log("okkkkkkkkkkkkkkkkkk", calendarRef.current.control.elements.events[args].data);
    //   control.elements.events.data
    },
  });



//   const getAgendaData = async () => {
//     const { data } = await APIManager.agendaData();
//     setAgendaData(data);
//     // console.log("con", data);
//     return data;
//   };



  const loadCalendarData = () => {
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

    const events = eventList.eventList;

    setCalendar(
      calendarRef.current.control.update({ startDate, columns, events })
    );
    return calendar;
  };

  useEffect(() => {
    loadCalendarData();
  }, []);

  if (calendar === null) return <div> ...LOADING</div>;

  return <DayPilotCalendar {...calendarState} ref={calendarRef} />;
};
export default Calendar2;
