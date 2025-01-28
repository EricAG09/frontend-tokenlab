// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateEvent from './createEvent/createEvent';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

    

    const handleCloseForm = () => {
        setShowForm(false);
        fetchEvents(); // Atualiza a lista de eventos após criar um novo
    };

    return (
        <div>
            <h2>Lista de Eventos</h2>
            
            {showForm && <CreateEvent onClose={handleCloseForm} />}
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <h3>{event.description}</h3>
                        <p>Início: {new Date(event.startTime).toLocaleString()}</p>
                        <p>Término: {new Date(event.endTime).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;