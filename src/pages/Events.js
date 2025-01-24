import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import EventCard from '../components/eventCard/eventCard';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar eventos', error);
      });
  }, []);

  return (
    <div>
      <h2>Eventos</h2>
      <Button variant="contained" color="primary" href="/create-event">Criar Evento</Button>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item key={event._id} xs={12} sm={6} md={4}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Events;
