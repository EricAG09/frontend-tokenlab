// src/components/CreateEvent.js
import React, { useState } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
} from '@mui/material';

const CreateEvent = () => {
    const [open, setOpen] = useState(false); // Estado para controlar a visibilidade do diálogo
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleClickOpen = () => {
        setOpen(true); // Abre a caixa de diálogo
    };

    const handleClose = () => {
        setOpen(false); // Fecha a caixa de diálogo
        // Limpa os campos após fechar
        setDescription('');
        setStartTime('');
        setEndTime('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);

            if (isNaN(startDate) || isNaN(endDate)) {
                alert('Por favor, insira datas válidas.');
                return;
            }

            if (startDate >= endDate) {
                alert('A data de término deve ser posterior à data de início.');
                return;
            }

            const response = await axios.post('http://localhost:8000/api/events', {
                description,
                startTime: startDate.toISOString(),
                endTime: endDate.toISOString(),
            });

            if (response && response.data) {
                alert('Evento criado com sucesso!'); // Alerta de sucesso
                handleClose(); // Fecha a caixa de diálogo após criar o evento
            } else {
                alert('Erro ao criar evento: resposta inválida do servidor.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Erro ao criar evento:', error.response.data);
                alert('Erro ao criar evento: ' + error.response.data.message);
            } else {
                console.error('Erro ao criar evento:', error);
                alert('Erro ao criar evento: ' + error.message);
            }
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Criar Novo Evento
            </Button>
            <Dialog open={open} >
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
                            shrink: true, // Faz o label ficar acima do campo quando há valor
                        }}
                        helperText="Selecione a data e hora de início do evento."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'gray', // Cor da borda
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue', // Cor da borda ao passar o mouse
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue', // Cor da borda quando o campo está focado
                                },
                            },
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
                        helperText="Selecione a data e hora de término do evento."
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'gray',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'blue',
                                },
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Criar Evento
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateEvent;