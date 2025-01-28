// src/components/eventCard/EventCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const EventCard = ({ event }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{event.description}</Typography>
        <Typography color="textSecondary">
          Início: {new Date(event.startTime).toLocaleString()}<br />
          Término: {new Date(event.endTime).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;