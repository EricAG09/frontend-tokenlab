import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para cadastrar o usuário
    console.log("Register Form Data: ", form);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar
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
  );
};

export default Register;
