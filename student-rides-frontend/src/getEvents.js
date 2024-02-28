import { useEffect, useState } from 'react';
import { firestore } from './firebase';
import { collection, query, getDocs } from "@firebase/firestore";

export default function FetchEvents(){
    // ~fetching Firestore data~
    const [events, setEvents] = useState([]);
    useEffect(() => {
        async function fetchEvents() {
            try {
                const q = query(collection(firestore, "events"));
                const querySnapshot = await getDocs(q);
                const currentEvents = querySnapshot.docs.map(doc => doc.data());    
                setEvents(currentEvents);
            } catch (err) {
                console.log(err);
            } 
        }
        fetchEvents();
    }, []);
    return events
}
