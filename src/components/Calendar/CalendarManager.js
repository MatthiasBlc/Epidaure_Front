import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import APIManager from "../../services/api";
import "./CalendarStyles.css";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../services/Atoms/currentUser";

import { BlockPicker } from "react-color";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CalendarManager = (eventList) => {
  const [calendarRef] = useState(React.createRef());
  const [calendar, setCalendar] = useState(calendarRef);
  const [newEvent, setNewEvent] = useState();

  const [agendaData, setAgendaData] = useState();
  let [currentUser] = useAtom(currentUserAtom);
  currentUser = JSON.parse(currentUser);

  const practice_id = currentUser.practice_id;
  const [practiceRoomsList, setPracticeRoomsList] = useState();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [text, setText] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [barColor, setBarColor] = useState("#37d67a");
  const [resource, setResource] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  // --------------- SETUP MODAL ACTIONS

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // --------------- SETUP CALENDAR ACTIONS
  const [calendarState] = useState({
    viewType: "Resources",
    heightSpec: "BusinessHours",
    businessEndsHour: 19,
    businessBeginsHour: 7,
    timeFormat: "Clock24Hours",
    width: "98%",
    eventRightClickHandling: "ContextMenu",

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
    onEventResized: async (args) => {
      const newIdEvent = args.e.data.id;
      const newTextEvent = args.e.data.text;
      const newStartEvent = args.e.data.start.value;
      const newEndEvent = args.e.data.end.value;
      const newBarColorEvent = args.e.data.barColor;
      const newResourceEvent = args.e.data.resource;
      await editEvent(
        newIdEvent,
        newTextEvent,
        newStartEvent,
        newEndEvent,
        newBarColorEvent,
        newResourceEvent
      );
      await setNewEvent("reset");
    },

    onEventClick: async (args) => {
      const form = [{ name: "Text", id: "text" }];
      const modal = await DayPilot.Modal.form(form, args.e.data);
      const newIdEvent = modal.result.id;
      const newTextEvent = modal.result.text;
      const newStartEvent = modal.result.start;
      const newEndEvent = modal.result.end;
      const newBarColorEvent = modal.result.barColor;
      const newResourceEvent = modal.result.resource;
      if (modal.canceled) {
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
      await setNewEvent("reset");
    },

    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async (args) => {
            const modal = await DayPilot.Modal.confirm(
              "Do you really want to delete this event?"
            );
            const newIdEvent = args.source.id();
            if (modal.canceled) {
              return;
            }
            deleteEvent(newIdEvent);
          },
        },
      ],
    }),

    onTimeRangeSelected: async function (args) {
      setStart(args.start);
      setEnd(args.end);
      setResource(args.resource);

      openModal();
    },
  });

  // --------------- FUNCTIONS

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
    await setNewEvent(newIdEvent);
    return data;
  };

  const deleteEvent = async (eventId) => {
    await APIManager.agendaDelete(eventId);
    await setNewEvent(eventId);
  };

  // --------------- INIT DISPLAY
  const getPracticeData = async (practice_id) => {
    const data = await APIManager.practiceData(practice_id);
    setPracticeRoomsList(data.rooms);
  };

  useEffect(() => {
    getPracticeData(practice_id);
  }, []);

  const getCurrentUserAgendaData = async () => {
    const { data } = await APIManager.agendaData();
    const currentUserData = data.filter(
      (data) => data.user_id === currentUser.id
    );
    setAgendaData(currentUserData);
    return currentUserData;
  };

  useEffect(() => {
    getCurrentUserAgendaData();
  }, [newEvent]);

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

    let events = eventList.eventList;
    if (agendaData != null) {
      events = agendaData;
    }
    console.log(events);
    setCalendar(
      calendarRef.current.control.update({ startDate, columns, events })
    );
    return calendar;
  };

  // --------------- REFRESH DISPLAY
  useEffect(() => {
    loadCalendarData();
  }, [eventList, agendaData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await APIManager.agendaCreate(
      text,
      start,
      end,
      barColor,
      resource,
      selectedRoom
    ).catch((error) => {
      alert("erreur");
      console.log(error.message);
    });
    closeModal();
    setNewEvent(e);
  };

  if (calendar === null) return <div> ...LOADING</div>;
  return (
    <>
      <DayPilotCalendar {...calendarState} ref={calendarRef} />

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Nouvel evenement"
        >
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nom de l'évent
                    </label>
                    <input
                      type="text"
                      id="text"
                      placeholder="RDV de ???"
                      className="focusForm mt-2 block w-full rounded-md border-2 border-gray-600 shadow-sm sm:text-sm"
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      BarColor
                    </label>
                    <div className="blockpicker">
                      <h6>Couleur de l'évènement</h6>
                      <BlockPicker
                        color={barColor}
                        onChange={(color) => {
                          setBarColor(color.hex);
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bureau
                    </label>
                    <select
                      className="select select-accent w-full max-w-xs"
                      onChange={(e) => setSelectedRoom(e.target.value)}
                    >
                      <option disabled selected>
                        {" "}
                        choisir un bureau
                      </option>
                      {practiceRoomsList &&
                        practiceRoomsList.map((room, index) => (
                          <option key={index} value={room.id}>
                            {room.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="ml-10 inline-flex justify-center hover:underline gradient text-white font-bold rounded-full my-3 py-2 px-5 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  >
                    Valider
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default CalendarManager;
