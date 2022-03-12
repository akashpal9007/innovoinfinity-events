import React from 'react'
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import './Event.css';

const EventCard = (props) => {
  return (
    // <div className="do-cards">
              <div className="do-card">
                  <img className="do-img" src={props.coverPhoto} alt="" />
                  <div className="do-info">
                    <h1 className="do-name">{props.title}</h1>
                      <p className="do-detail">{props.description}
                      </p>

                      

                      <div className="date">Date : 13th February 2022</div>
                      <div className="time">Time : 11 AM Onwards</div>
                      {/* <Link to={`/person/${index + 1}`}>{person.name}'s Page</Link> */}
                      <a className='details'><Link to={`/events/${props.slug}`}>Details</Link></a>
                      {/* <a target="_blank" href="../html/event-detail-page/TechTalk EDGE-AI.html" class="details">Details</a> */}
                  </div>
             </div>
    // </div>
  )
}

export default EventCard