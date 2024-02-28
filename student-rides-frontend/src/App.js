import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AddEvent from "./components/addEvent"
import RidesCalendar from './components/calendar';
import { useEffect, useState } from "react";
import { signOut } from 'firebase/auth';
import { auth, firestore } from './firebase';
import { collection, query, getDocs } from "@firebase/firestore";

function App() {
  // allEvents initialized to the current data in Firestore
  const [allEvents, setAllEvents] = useState();
  // determine if user is logged in
  const [isAuth, setIsAuth] = useState(false);
  
  const userSignOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false)
      console.log("Sign out was successful")
    }).catch(error => console.log(error))
  }
  
  // ~fetching Firestore data~
  useEffect(() => {
    async function fetchEvents() {
      try {
        const q = query(collection(firestore, "events"));
        const querySnapshot = await getDocs(q);
        const currentEvents = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        for (let i = 0; i < currentEvents.length; i++) {
          currentEvents[i].start = new Date(
            currentEvents[i].start.seconds * 1000
          );
          currentEvents[i].end = new Date(currentEvents[i].end.seconds * 1000);
        }
        setAllEvents(currentEvents);
      } catch (err) {
        console.log(err);
      }
    }
    fetchEvents();
  }, [setAllEvents]);

  return (
    <div className="App">
      <h1>Student Rides</h1>
      {!isAuth ? (
        <>
          <SignUp />
          <SignIn setIsAuth={setIsAuth}/>
        </>
      ) : (
        <>
          <AddEvent allEvents={allEvents} setAllEvents={setAllEvents}/>
          <button onClick={userSignOut} className="log-out-button">Log Out</button>
        </>
      )}
      {/* <AuthDetails /> */}
      <RidesCalendar allEvents={allEvents} setAllEvents={setAllEvents} isAuth={isAuth}/>
    </div>
  );
}

export default App;
