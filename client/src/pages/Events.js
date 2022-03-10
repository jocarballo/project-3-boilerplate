import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { EVENTS_TAB } from "../utilities";

export default function Home() {
  const [events, setEvents] = useState([]); // initial state

  const getEvents = () => {
    axios
      .get("/events")
      .then((response) => {
        console.log("Received events", response.data);
        setEvents(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Navbar selectedTab={EVENTS_TAB}/>

      <div className="container">
        <div className="row">
          {events.map((event) => (
            <div className="col">
              <div className="card workshop-firstCard">
                <img
                  src={event.image_url}
                  className="card-img-top workshop-img"
                  alt="workshop img"
                />
                <div className="card-body">
                  <p className="card-title">
                    {event.title} ({new Date(event.date).toDateString()})
                  </p>
                  <p className="card-text">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
