import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

const CalendarDisplayer = (eventList) => {
  const [calendarRef] = useState(React.createRef());
  const [calendar, setCalendar] = useState(calendarRef);

  const [calendarState] = useState({
    viewType: "Resources",
    eventMoveHandling: ('Disabled'),
    eventResizeHandling:('Disabled'),
    heightSpec: ('BusinessHours'),
    businessEndsHour: (19),
    businessBeginsHour: (7),
    timeFormat: ('Clock24Hours'),
    width: ("98%"),
  });

  const loadCalendarData = () => {
    const startDate = "2022-09-16";
    const columns = [
      { name: "Lundi", id: "M" },
      { name: "Mardi", id: "T" },
      { name: "Mercredi", id: "W" },
      { name: "Jeudi", id: "Th" },
      { name: "Vendredi", id: "F" },
      { name: "Samedi", id: "S" },
      { name: "Dimanche", id: "Su" },
    ];

    const events = eventList.eventList;

    setCalendar(
      calendarRef.current.control.update({ startDate, columns, events })
    );
    return calendar;
  };

  useEffect(() => {
    loadCalendarData();
  }, [eventList]);

  if (calendar === null) return <div> ...LOADING</div>;

  return <DayPilotCalendar {...calendarState} ref={calendarRef} />;
};
export default CalendarDisplayer;
