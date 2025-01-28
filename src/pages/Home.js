// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const Home = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Erro ao buscar eventos', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Eventos
            </Typography>
            {events.length === 0 ? (
                <Typography variant="body1">Nenhum evento encontrado.</Typography>
            ) : (
                events.map((event) => (
                    <Box key={event._id} p={2} border={1} marginBottom={2}>
                        <Typography variant="h6">{event.description}</Typography>
                        <Typography variant="body1">
                            Início: {new Date(event.startTime).toLocaleString()}<br />
                            Término: {new Date(event.endTime).toLocaleString()}
                        </Typography>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default Home;