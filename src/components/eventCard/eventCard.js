// src/components/EventCard.js
import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const EventCard = ({ event }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{event.title}</Typography>
        <Typography variant="body2">{event.description}</Typography>
        <Typography variant="body1">{event.location}</Typography>
        <Typography variant="body2">{event.date}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Ver Detalhes</Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
