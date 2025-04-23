import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await api.get('/events/user');
      setEvents(res.data);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Events</h2>
      <Link to="/create" className="mb-6 inline-block bg-blue-500 text-white p-2 rounded">Create New Event</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{event.name}</h3>
            <p className="text-gray-600 mt-2">{event.location}</p>
            <p className="text-gray-500 mt-2">{new Date(event.date).toLocaleDateString()}</p>
            <div className="mt-4">
              <Link to={`/event/${event._id}`} className="text-blue-500 hover:underline">View</Link> <button onClick={() => handleDelete(event._id)} className="ml-4 text-red-500 hover:underline">Delete</button> </div> </div> ))} </div> </div> ); }
