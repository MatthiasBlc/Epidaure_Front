import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import APIManager from "../../services/api";

const CalendarManager = (eventList) => {
  const [calendarRef] = useState(React.createRef());
  const [calendar, setCalendar] = useState(calendarRef);

  const [calendarState] = useState({
    viewType: "Resources",
    heightSpec: ('BusinessHours'),
    businessEndsHour: (19),
    businessBeginsHour: (7),
    timeFormat: ('Clock24Hours'),
    width: ("98%"),

    onEventMoved: (args) => {
      const newIdEvent = args.e.data.id;
      const newTextEvent = args.e.data.text;
      const newStartEvent = args.e.data.start.value;
      const newEndEvent = args.e.data.end.value;
      const newBarColorEvent = args.e.data.barColor;
      const newResourceEvent = args.e.data.resource;
      editEvent(
        newIdEvent,
        newTextEvent,
        newStartEvent,
        newEndEvent,
        newBarColorEvent,
        newResourceEvent
      );
    },
    onEventResized: (args) => {
      const newIdEvent = args.e.data.id;
      const newTextEvent = args.e.data.text;
      const newStartEvent = args.e.data.start.value;
      const newEndEvent = args.e.data.end.value;
      const newBarColorEvent = args.e.data.barColor;
      const newResourceEvent = args.e.data.resource;
      editEvent(
        newIdEvent,
        newTextEvent,
        newStartEvent,
        newEndEvent,
        newBarColorEvent,
        newResourceEvent
      );
    },

    onEventClick: async (args) => {
      const form = [
        { name: "Text", id: "text" },
        // { name: "Start", id: "start", type: "time" },
        // { name: "End", id: "end", type: "time" },
        // { name: "Color", id: "barColor" },
        { type: "checkbox", id: "delete", name: "delete" },
      ];

      const modal = await DayPilot.Modal.form(form, args.e.data);
      const newIdEvent = modal.result.id;
      const newTextEvent = modal.result.text;
      const newStartEvent = modal.result.start;
      const newEndEvent = modal.result.end;
      const newBarColorEvent = modal.result.barColor;
      const newResourceEvent = modal.result.resource;
      console.log("modal", modal.result.delete);
      if (modal.canceled) {
        return;
      }
      if (modal.result.delete) {
        console.log("Delete");
        deleteEvent(newIdEvent);
        return;
      }
      editEvent(
        newIdEvent,
        newTextEvent,
        newStartEvent,
        newEndEvent,
        newBarColorEvent,
        newResourceEvent
      );
    },
  });

  const editEvent = async (
    newIdEvent,
    newTextEvent,
    newStartEvent,
    newEndEvent,
    newBarColorEvent,
    newResourceEvent
  ) => {
    const id = newIdEvent;
    const text = newTextEvent;
    const start = newStartEvent;
    const end = newEndEvent;
    const barColor = newBarColorEvent;
    const resource = newResourceEvent;
    const data = await APIManager.agendaUpdate(
      id,
      text,
      start,
      end,
      barColor,
      resource
    ).catch((error) => {
      console.log(error.message);
    });
    return data;
  };

  const deleteEvent = async (eventId) => {
    await APIManager.agendaDelete(eventId);
  };

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
export default CalendarManager;
