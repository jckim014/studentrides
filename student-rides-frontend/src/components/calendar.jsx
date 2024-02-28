import { format, getDay, parse, startOfWeek } from "date-fns";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { auth, firestore } from "../firebase";
import styles from "./addEvents.module.css";

const locales = {
    "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const formatPhoneNumber = (phoneNumber) => {
    // Remove non-numeric characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    // Group into 3-3-4 numbers
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    //format the phone number as (###)-###-####
    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`;
    }
    // return original if no match is found
    return phoneNumber;
  };

  export default function RidesCalendar({allEvents, setAllEvents, isAuth}) {
    // for click event (modal/popup)
    const [clickEvent, setClickEvent] = useState(null);

    const handleEventClick = (event) => {
        // Handle the event click, you can show a modal or any other UI component
        // Implement your logic to display a large box with event details here
        // Stores in click event 
        setClickEvent(event);
    };

    
    const deleteEvent = async (id) => {
        const event = doc(firestore, "events", id);
        await deleteDoc(event);
        const events = allEvents.filter(event => (event.id !== id));
        setAllEvents(events);
        setClickEvent(null);
    };

    return (
        <>
                 <div className={styles.orangeCircle}></div>
                 <div className={styles.orangeCircleTwo}></div>
            <Calendar 
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                defaultView={Views.WEEK}
                style={{height:500, margin:"50px"}} 
                onSelectEvent={handleEventClick}
            />

            {clickEvent ?
                // If an event is clicked then display
                <div 
                    // Closes
                    onClick={() => setClickEvent(null)}
                    style={{zIndex: 4, height:500, margin:"50px",position:"absolute", width: "100%", height: "100%", display:"flex",
                            alignItems: "center", justifyContent: "center", top: 0}} 
                >
                    <div
                        // Prevents the object from closing if you click on it 
                        onClick={(e) => e.stopPropagation()}
                        style={{border: "2px solid #D3D3D3",borderRadius: "50px",height: 300, width: 300, backgroundColor: "#3174ad"}}
                    >
                        {/* content within the pop */}
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '34px', color: '#fff' }}>{clickEvent.title}</h1>
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff' }}>
                        {clickEvent.start.toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                        </h1>
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff', textDecoration: 'underline' }}>
                        {clickEvent.seats + " seats available"}
                        </h1>
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff' }}>{"Price: $"+clickEvent.cost}</h1>
                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '24px', color: '#fff' }}>{"Contact: "+ formatPhoneNumber(clickEvent.contact)}</h1>
                        
                        {/* <FaRegTrashCan onClick={() => deletePost(clickEvent.author_id)}/> */}
                        {isAuth && clickEvent.author.id === auth.currentUser.uid && (
                            <>
                                {console.log(clickEvent.id)}
                                <button
                                onClick={() => {
                                    deleteEvent(clickEvent.id);
                                }}
                                >
                                    <FaRegTrashCan/>
                                </button>
                                <button><AiOutlineEdit /></button>
                            </>
                        )}
                        
                    </div>
                </div>
            // Else don't display
            : null }
        </>
    )
}
