// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Link, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');// Considerando que o nome é obtido ao fazer login
    
    // Limpa a mensagem de erro quando o usuário começa a digitar
    useEffect(() => {
        if (email && password) {
            setErrorMessage('');
        }
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
    
        try {
            const response = await loginUser (email, password);
            console.log('Resposta do login:', response); // Verifique a resposta
    
            if (response.token) {
                localStorage.setItem('authToken', response.token); 
                localStorage.setItem('username', response.name); 
                alert(`Olá, ${response.username}!`); 
                navigate('/'); // Redirecionar após login
            } else {
                setErrorMessage('Falha no login. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error); // Log do erro
            setErrorMessage(error.response?.data?.message || 'Erro ao fazer login');
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
                backgroundImage: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginTop={-40}
                maxWidth={400}
                p={4}
                borderRadius={2}
                boxShadow={4}
                sx={{ backgroundColor: "white" }}
            >
                <Typography variant="h4" mb={3}>Login</Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
                        <TextField
                            label="E-mail"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errorMessage && (
                            <Typography color="error" variant="body2" aria-live="assertive">
                                {errorMessage}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
                        </Button>
                    </Box>
                </form>
                <Link
                    component="button"
                    variant="body2"
                    mt={2}
                    onClick={() => navigate("/register")}
                >
                    Não tem uma conta? Cadastre-se
                </Link>
            </Box>
        </Box>
    );
};

export default Login;
