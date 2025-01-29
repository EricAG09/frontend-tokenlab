import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './eventCard/eventCard';
import { Box, Typography, Snackbar, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEdit = (event) => {
        setCurrentEvent(event);
        setOpen(true);
    };

    const handleDelete = async (eventId) => {
        if (window.confirm('Tem certeza que deseja excluir este evento?')) {
            try {
                await axios.delete(`http://localhost:8000/api/events/${eventId}`);
                setEvents(events.filter(event => event._id !== eventId));
                setSnackbarMessage('Evento excluído com sucesso!');
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Erro ao excluir evento:', error);
                setSnackbarMessage('Erro ao excluir evento.');
                setSnackbarOpen(true);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSave = async () => {
        if (!currentEvent || !currentEvent.description || !currentEvent.startTime || !currentEvent.endTime) {
            alert('Todos os campos devem ser preenchidos.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put(
                `http://localhost:8000/api/events/${currentEvent._id}`,
                {
                    description: currentEvent.description,
                    startTime: currentEvent.startTime,
                    endTime: currentEvent.endTime,
                }
            );

            if (response.status === 200) {
                setEvents(events.map(event => event._id === currentEvent._id ? currentEvent : event));
                setSnackbarMessage('Evento atualizado com sucesso!');
                setSnackbarOpen(true);
                setOpen(false);
            }
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            setSnackbarMessage('Erro ao atualizar evento.');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            p={3}
            sx={{
                backgroundColor: "#3F2FD",
            }}
        >
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            marginTop={-40}
            maxWidth={1200}
            p={4}
            borderRadius={2}
            boxShadow={4}
            sx={{ background: 'rgba(0, 0, 0, 0.7)', }}
        >
            <Typography variant="h4" mb={3} color="white">Lista de Eventos</Typography>
            <Box
                display="flex"
                flexWrap="wrap" // Permite que os cards se ajustem na tela
                justifyContent="space-evenly" // Distribui os cards com espaçamento
                gap={3} // Espaçamento entre os cards
                width="100%"
            >
            {events.map((event) => (
                <Box key={event._id} width={{ xs: "100%", sm: "45%", md: "30%" }} display="flex" justifyContent="center" color="red">
                <EventCard event={event} onEdit={handleEdit} onDelete={handleDelete} />
                </Box>
            ))}
            </Box>

            {/* Modal de edição */}
            <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Editar Evento</DialogTitle>
            <DialogContent>
                {currentEvent && (
                <>
                    <TextField
                    label="Descrição"
                    fullWidth
                    value={currentEvent.description}
                    onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                    margin="normal"
                    />
                    <TextField
                    label="Data e Hora de Início"
                    fullWidth
                    type="datetime-local"
                    value={currentEvent.startTime}
                    onChange={(e) => setCurrentEvent({ ...currentEvent, startTime: e.target.value })}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <TextField
                    label="Data e Hora de Término"
                    fullWidth
                    type="datetime-local"
                    value={currentEvent.endTime}
                    onChange={(e) => setCurrentEvent({ ...currentEvent, endTime: e.target.value })}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="secondary">
                Cancelar
                </Button>
                <Button onClick={handleSave} color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
                </Button>
            </DialogActions>
            </Dialog>

            {/* Snackbar para mensagens de sucesso ou erro */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                {snackbarMessage}
            </MuiAlert>
            </Snackbar>
        </Box>
        </Box>

            );
        };

export default EventList;
