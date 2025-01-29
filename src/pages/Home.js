import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Container, Grid, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Estilos personalizados usando styled
const Root = styled(Box)({
    background: 'url(https://source.unsplash.com/1600x900/?space) no-repeat center center fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
});

const EventContainer = styled(Container)({
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '32px',
    borderRadius: '8px',
    maxWidth: '1000px',
    margin: '0 auto',
});

const EventCard = styled(Paper)(({ confirmed }) => ({
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease',
    position: 'relative',
    '&:hover': {
        transform: 'scale(1.05)',
    },
    '& .check-icon': {
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: confirmed ? 'green' : 'transparent',
        transition: 'color 0.3s ease',
    }
}));

const ConfirmButton = styled(Button)({
    marginTop: '16px',
    backgroundColor: '#6200ea',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#3700b3',
    },
});

const Title = styled(Typography)({
    color: '#fff',
    textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
    fontSize: '3rem',
    textAlign: 'center',
});

const Subtitle = styled(Typography)({
    color: '#fff',
    fontSize: '1.5rem',
    textAlign: 'center',
    marginBottom: '32px',
});

const Home = () => {
    const [events, setEvents] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [confirmedEvents, setConfirmedEvents] = useState({});

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Erro ao buscar eventos', error);
        }
    };

    const handleConfirmPresence = (eventId) => {
        // Lógica para confirmar a presença do usuário (exemplo)
        setConfirmedEvents((prev) => ({
            ...prev,
            [eventId]: true,
        }));
        setSnackbarMessage('Presença confirmada no evento!');
        setSnackbarOpen(true);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <Root>
            <EventContainer>
                <Title variant="h2">
                    Bem-vindo ao Mundo dos Eventos
                </Title>
                <Subtitle variant="h4">
                    Explore os eventos e confirme sua presença
                </Subtitle>

                {events.length === 0 ? (
                    <Typography variant="body1" color="textSecondary" align="center">
                        Nenhum evento encontrado. Tente novamente mais tarde.
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {events.map((event) => (
                            <Grid item xs={12} sm={6} md={4} key={event._id}>
                                <EventCard confirmed={confirmedEvents[event._id]}>
                                    <Typography variant="h6" gutterBottom>
                                        {event.description}
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Início:</strong> {new Date(event.startTime).toLocaleString()}
                                        <br />
                                        <strong>Término:</strong> {new Date(event.endTime).toLocaleString()}
                                    </Typography>
                                    <ConfirmButton
                                        variant="contained"
                                        onClick={() => handleConfirmPresence(event._id)}
                                    >
                                        Confirmar Presença
                                    </ConfirmButton>
                                    <CheckCircleIcon className="check-icon" />
                                </EventCard>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </EventContainer>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Root>
    );
};

export default Home;
