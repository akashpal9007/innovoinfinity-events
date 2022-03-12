import React from 'react'
import Events from './Components/Event/Events.jsx'
import EventCard from './Components/Event/EventCard.jsx'
import EventDetail from './Components/Event/EventDetail.jsx'
import { Link, BrowserRouter as Router,Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Events />}/>
          <Route exact path="/events/:slug" element={<EventDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App