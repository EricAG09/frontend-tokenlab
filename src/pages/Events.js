// src/pages/Events.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import CreateEvent from '../components/createEvent/createEvent';
import EventList from '../components/eventList';

const Events = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <CreateEvent />
            <Typography variant="h4">Eventos</Typography>
            <Typography variant="body1">Aqui você verá todos os eventos criados.</Typography>
            <EventList />
        </Box>
    );
};

export default Events;