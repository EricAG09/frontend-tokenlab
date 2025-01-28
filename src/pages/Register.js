import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importando o axios

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    setLoading(true); // Inicia o carregamento ao submeter o formulário
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', form);
      localStorage.setItem('token', response.data.token);
      navigate('/login'); // Redireciona após login
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Erro ao fazer registrar');
      } else {
        setErrorMessage('Erro de rede ou servidor');
      }
    }
    setLoading(false); 
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
        backgroundColor: "#E3F2FD", // Azul claro
        backgroundImage: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)", // Gradiente sutil
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
              boxShadow={4} // Suave sombra
              sx={{
                backgroundColor: "white",
              }}
            >
      <Typography variant="h4" mb={3}>
        Cadastro
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
          <TextField
            label="Nome"
            type="text"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="E-mail"
            type="email"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Senha"
            type="password"
            name="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirme a Senha"
            type="password"
            name="confirmPassword"
            fullWidth
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
                          {loading ? <CircularProgress size={24} color="inherit" /> : "Cadastrar"}
          </Button>
        </Box>
      </form>
      <Link
        component="button"
        variant="body2"
        mt={2}
        onClick={() => navigate("/login")}
      >
        Já tem uma conta? Faça login
      </Link>
      </Box>
    </Box>
  );
};

export default Register;