"use client";

import { Card, Box, Typography, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { Lock, Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { register } from "@/services/auth";
import Link from "next/link";

export default function Home() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleRegister = async () => {
        try {
            const data = await register(name, email, password);
            localStorage.setItem('token', data.token);
            window.location.href = '/home';
        } catch (error) {
            console.error("Erro ao criar conta:", error);
            setError("Falha ao criar conta." + error);
        }
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ padding: 2, margin: 2 }}>
                <Typography textAlign={"center"} variant="h3" gutterBottom>To-Do Go</Typography>
                <Typography textAlign={"left"} variant="h5">Criar Conta</Typography>
                <TextField
                    id="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    id="email"
                    label="E-mail"
                    type="email"
                    fullWidth
                    margin="normal"
                    slotProps={{ input: { startAdornment: (<Email />) } }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    slotProps={{
                        input: {
                            startAdornment: (<Lock />),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error" variant="body2">{error}</Typography>}
                <Card sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, padding: 1 }}>
                    <Button variant="outlined" color="primary" LinkComponent={Link} href="/" >Entrar</Button>
                    <Button variant="contained" color="primary" onClick={handleRegister} >Criar Conta</Button>
                </Card>

            </Card>
        </Box>
    );
}