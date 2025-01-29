// src/pages/Logout.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login'); // Redireciona para a página de login
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
                backgroundColor: "#E3F2FD",
                backgroundImage: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
            }}
        >
            <Typography variant="h4" mb={3}>
                Você foi desconectado
            </Typography>
            <Typography variant="body1" mb={3}>
                Sua sessão foi encerrada com sucesso. Você pode fazer login novamente a qualquer momento.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleRedirect}
            >
                Voltar para Login
            </Button>
        </Box>
    );
};

export default Logout;