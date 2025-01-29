// src/components/navbar/navbar.js
import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useUser } from "../../context/useContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useUser(); // Usando o hook de contexto

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Links da navbar
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Eventos", path: "/events" },
  ];

  // Se o usuário estiver logado, exibe o nome e o botão de logout
  if (user) {
    navLinks.push({
      label: `Olá, ${user?.name}`, // Exibe o nome do usuário
      path: "/login", // Caminho do perfil
    });
    navLinks.push({
      label: "Logout",
      path: "/logout",
      onClick: logout, // Chama a função de logout
    });
  } else {
    navLinks.push({ label: "Login", path: "/login" });
  }

  // Menu móvel (Drawer)
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TokenLab
      </Typography>
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Button
              component={Link}
              to={item.path}
              sx={{ textAlign: "center", width: "100%" }}
              onClick={item.onClick ? item.onClick : null} // Verifica se tem uma função onClick (logout)
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            TokenLab
          </Typography>
          {/* Menu desktop */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ color: "#fff" }}
                onClick={item.onClick ? item.onClick : null} // Verifica se tem uma função onClick (logout)
              >
                {item.label}
              </Button>
            ))}
          </Box>
          {/* Botão do menu móvel */}
          <IconButton
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Drawer para o menu móvel */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
