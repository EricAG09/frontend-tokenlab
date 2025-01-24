// src/pages/CreateEvent.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const history = useHistory();

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/events/create',
        { title, description, date, startTime, endTime, location },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data)
      history.push('/events');
    } catch (error) {
      console.error('Erro ao criar evento', error);
    }
  };

  return (
    <Box>
      <h2>Criar Evento</h2>
      <form onSubmit={handleCreateEvent}>
        <TextField label="Título" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextField label="Descrição" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} required />
        <TextField label="Data" type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} required />
        <TextField label="Hora de Início" type="time" fullWidth value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        <TextField label="Hora de Fim" type="time" fullWidth value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        <TextField label="Local" fullWidth value={location} onChange={(e) => setLocation(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary">Criar Evento</Button>
      </form>
    </Box>
  );
};

export default CreateEvent;
