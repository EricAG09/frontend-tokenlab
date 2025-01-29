import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const EventCard = ({ event, onEdit, onDelete }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                margin: '10px',
                borderRadius: 2,
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                },
            }}
        >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {event.description}
                </Typography>
                <Typography color="textSecondary">
                    Início: {new Date(event.startTime).toLocaleString()}
                </Typography>
                <Typography color="textSecondary">
                    Término: {new Date(event.endTime).toLocaleString()}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ fontWeight: 'bold' }}
                        onClick={() => onEdit(event)}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ fontWeight: 'bold' }}
                        onClick={() => onDelete(event._id)}
                    >
                        Excluir
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default EventCard;
