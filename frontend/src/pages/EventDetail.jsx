import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={event.image} alt={event.name} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-3xl font-semibold mt-6">{event.name}</h1>
      <p className="text-gray-600 mt-2">{event.location}</p>
      <p className="text-gray-500 mt-2">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-700 mt-4">{event.description}</p>
    </div>
  );
}

export default EventDetail;
