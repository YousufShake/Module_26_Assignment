import { useEffect, useState } from 'react';
import api from '../utils/api';
import EventCard from '../components/EventCard';

function Home() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await api.get('/events');
      setEvents(res.data);
    };
    const fetchCategories = async () => {
      const res = await api.get('/categories');
      setCategories(res.data);
    };
    fetchEvents();
    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="flex space-x-4 mt-4">
          {categories.map((category) => (
            <button key={category._id} className="px-4 py-2 border rounded-full hover:bg-blue-500 hover:text-white">
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
