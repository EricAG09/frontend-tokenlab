import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import EventList from '../components/eventList';
import CreateEvent from '../components/createEvent/createEvent';

const Events = () => {
    return (
        <Box sx={{ 
            backgroundColor: '#f4f6f8', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: 4 
        }}>
            <Container sx={{ maxWidth: 'lg' }}>
                {/* Seção de Criação de Evento */}
                <Box sx={{ 
                    backgroundColor: '#ffffff', 
                    padding: 3, 
                    borderRadius: 2, 
                    boxShadow: 3, 
                    marginBottom: 4 
                }}>
                    <CreateEvent />
                </Box>

                {/* Título da Página */}
                <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                        Eventos
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Aqui você verá todos os eventos criados.
                    </Typography>
                </Box>

                {/* Lista de Eventos */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 3 }}>
                            <EventList />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Events;
