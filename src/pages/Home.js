// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box, Typography } from '@mui/material';
import CreateEvent from '../components/createEvent/createEvent'; // Importa o componente de criação de eventos

const Home = () => {
  const [events, setEvents] = useState([]);
  const [participation, setParticipation] = useState({});
  const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do formulário

  // Função para buscar eventos
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos', error);
    }
  };

  useEffect(() => {
    fetchEvents(); // Chama a função para buscar eventos ao montar o componente
  }, []);

  const handleParticipation = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Você precisa estar logado para participar!");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/events/participate/${eventId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setParticipation((prev) => ({
        ...prev,
        [eventId]: !prev[eventId], // Alterna o estado de participação
      }));
    } catch (error) {
      console.error('Erro ao participar do evento', error);
    }
  };

  const handleCreateEvent = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchEvents(); // Recarrega eventos após criar um novo
  };

  return (
    <Box>
      <Typography variant="h4">Eventos</Typography>
      <Button variant="contained" color="primary" onClick={handleCreateEvent}>
        Criar Novo Evento
      </Button>
      {showForm && <CreateEvent onClose={handleCloseForm} />}
      {events.map((event) => (
        <Box key={event._id} p={2} border={1} marginBottom={2}>
          <Typography variant="h6">{event.description}</Typography>
          <Typography variant="body1">
            Início: {new Date(event.startTime).toLocaleString()}<br />
            Término: {new Date(event.endTime).toLocaleString()}
          </Typography>
          <Button
            variant="contained"
            color={participation[event._id] ? "secondary" : "primary"}
            onClick={() => handleParticipation(event._id)}
          >
            {participation[event._id] ? "Cancelar Participação" : "Participar"}
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default Home;