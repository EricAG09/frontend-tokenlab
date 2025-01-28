// src/components/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = ({ onClose }) => {
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {

        const startDate = new Date(startTime);
            const endDate = new Date(endTime);
          await axios.post('http://localhost:8000/api/events', {
              description,
              startTime: startDate.toISOString(), // Converte para string ISO
              endTime: endDate.toISOString(),
          });
          onClose(); // Fecha o formulário após criar o evento
      } catch (error) {
          console.error('Erro ao criar evento:', error.response.data); // Exibe a resposta do erro
          alert('Erro ao criar evento: ' + error.response.data.message); // Exibe a mensagem de erro
      }
  };

    return (
        <div>
            <h2>Criar Novo Evento</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />
                <button type="submit">Criar Evento</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default CreateEvent;