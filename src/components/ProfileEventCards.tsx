import React from "react";
import { Event } from '../@types'
import { useNavigate } from 'react-router'

type Props = {
  events: Event[],
  pending?: boolean,
  handleResponse?: (eventId: string, response: string) => Promise<void>
}

const ProfileEventCards = ({ events, pending, handleResponse }: Props) => {
  const navigate = useNavigate();
  return (
    <>
    { events.map((event) => {
      return (
        <React.Fragment key={event.id}>
        <p key={event.id}>
          <b onClick={() => navigate(`/eventById/${event.id}`)} style={{ cursor: "pointer" }}>
            { event.eventName }
          </b> - <i>{event.date}, from { event.startTime }</i>
        </p>
        { (pending && handleResponse) &&
          <>
            <button onClick={() => handleResponse(event.id, "attending")}>
              Accept
            </button>
            <button onClick={() => handleResponse(event.id, "declined")}>
              Decline
            </button>
          </>
        }
      </React.Fragment>
      )
    }) }
    </>
  )
}

export default ProfileEventCards