import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ResponseDisplay.css'

const ResponseDisplay = () => {
  const { eventId } = useParams();  // Get eventId from the route
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Fetch responses by eventId
    // axios.get(`/api/formresponse/${eventId}/responses`)
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/formresponse/response/${eventId}/responses`)
      .then((res) => {
        setResponses(res.data);
      })
      .catch((err) => {
        console.error('Error fetching responses:', err);
      });
  }, [eventId]);

  return (
//     <div>
//       <h2>Responses for Event </h2>
//       {responses.length > 0 ? (
//         responses.map((response, index) => (
//           <div key={index}>
//             <h3>Response {index + 1}</h3>
//             {response.responses.map((field, i) => (
//               <div key={i}>
//                 <strong>{field.label}</strong>: {field.value}
//               </div>
//             ))}
//             <hr />
//           </div>
//         ))
//       ) : (
//         <p>No responses available for this event.</p>
//       )}
//     </div>
<div className="response-container">
      <h2 className="response-title">Responses for Event</h2>
      {responses.length > 0 ? (
        responses.map((response, index) => (
          <div key={index} className="response-cart">
            <h3 className="response-header">Response {index + 1}</h3>
            <div className="response-details">
              {response.responses.map((field, i) => (
                <p key={i}>
                  <span className="response-field">{field.label}:</span>
                  <span className="response-value">{field.value}</span>
                </p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-responses">No responses available for this event.</p>
      )}
    </div>
  );
};

window.ResponseDisplay = ResponseDisplay;
export default ResponseDisplay;
