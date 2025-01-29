import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from '@mui/material';
import {jwtDecode} from 'jwt-decode';

const CreateEvent = () => {
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(false);  // Novo estado para loading
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDescription('');
        setStartTime('');
        setEndTime('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação das datas
        if (new Date(startTime) >= new Date(endTime)) {
            alert('A data de início deve ser anterior à data de término.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Erro: Usuário não autenticado.');
            return;
        }

        let decoded;
        try {
            decoded = jwtDecode(token); // Decodifica o token
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            alert('Token inválido. Faça login novamente.');
            return;
        }

        const userId = decoded.userId; // Obtém o ID do usuário

        setLoading(true);  // Ativa o loading ao submeter o evento

        try {
            const response = await axios.post(
                'http://localhost:8000/api/events',
                {
                    description,
                    startTime: new Date(startTime).toISOString(),
                    endTime: new Date(endTime).toISOString(),
                    createdBy: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                alert('Evento criado com sucesso!');
                handleClose();  // Fecha o modal e limpa os campos
                navigate('/events'); // Redireciona para a página de eventos
            }
        } catch (error) {
            console.error('Erro ao criar evento:', error);
            alert('Erro ao criar evento: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);  // Desativa o loading
        }
    };

    return (
        <div>
            {/* Botão para abrir o modal */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Criar Evento
            </Button>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Criar Novo Evento</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Preencha os detalhes do evento abaixo:
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Data e Hora de Início"
                        type="datetime-local"
                        fullWidth
                        variant="outlined"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Data e Hora de Término"
                        type="datetime-local"
                        fullWidth
                        variant="outlined"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        color="primary" 
                        disabled={loading} // Desabilita o botão enquanto está carregando
                    >
                        {loading ? <CircularProgress size={24} /> : 'Criar Evento'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateEvent;
