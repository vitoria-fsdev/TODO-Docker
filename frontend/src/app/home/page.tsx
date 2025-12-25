'use client';
import React, { useEffect, useState } from 'react';
import {

    Card,
    CardContent,
    Typography,
    Chip,
    Container,
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Alert,
    Stack,
} from '@mui/material';


interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
}

interface DashboardStats {
    totalTodos: number;
    completedTodos: number;
    pendingTodos: number;
    highPriorityTodos: number;
}

export default function HomePage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        totalTodos: 0,
        completedTodos: 0,
        pendingTodos: 0,
        highPriorityTodos: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('/api/todos');
            const data = await response.json();
            setTodos(data);
            calculateStats(data);
        } catch (error) {
            console.error('Erro ao carregar todos:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (todoList: Todo[]) => {
        const completed = todoList.filter((t) => t.completed).length;
        const highPriority = todoList.filter((t) => t.priority === 'high').length;

        setStats({
            totalTodos: todoList.length,
            completedTodos: completed,
            pendingTodos: todoList.length - completed,
            highPriorityTodos: highPriority,
        });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Dashboard
            </Typography>

            {/* Stats Grid */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}  // Vertical no celular, horizontal no tablet+
                spacing={3}
                sx={{ mb: 4 }}
            >
                <StatCard label="Total de Tarefas" value={stats.totalTodos} color="info" />
                <StatCard label="Concluídas" value={stats.completedTodos} color="success" />
                <StatCard label="Pendentes" value={stats.pendingTodos} color="warning" />
                <StatCard label="Alta Prioridade" value={stats.highPriorityTodos} color="error" />
            </Stack>
            
            {/* Todos List */}
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'semibold', mb: 2 }}>
                        Tarefas
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {todos.length === 0 ? (
                        <Alert severity="info">Nenhuma tarefa encontrada</Alert>
                    ) : (
                        <List>
                            {todos.map((todo, index) => (
                                <Box key={todo.id}>
                                    <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        sx={{
                                                            textDecoration: todo.completed ? 'line-through' : 'none',
                                                            color: todo.completed ? 'gray' : 'inherit',
                                                        }}
                                                    >
                                                        {todo.title}
                                                    </Typography>
                                                }
                                                secondary={todo.description}
                                            />
                                            <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                                                <Chip
                                                    label={todo.priority}
                                                    size="small"
                                                    color={getPriorityChipColor(todo.priority)}
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    label={todo.completed ? 'Concluída' : 'Pendente'}
                                                    size="small"
                                                    color={todo.completed ? 'success' : 'warning'}
                                                    variant="outlined"
                                                />
                                            </Box>
                                        </Box>
                                    </ListItem>
                                    {index < todos.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </List>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

function StatCard({ label, value, color }: { label: string; value: number; color: 'info' | 'success' | 'warning' | 'error' }) {
    return (
        <Card sx={{ bgcolor: `${color}.main`, color: 'white', height: '100%' }}>
            <CardContent>
                <Typography gutterBottom sx={{ opacity: 0.9 }}>
                    {label}
                </Typography>
                <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}

function getPriorityChipColor(priority: string): 'error' | 'warning' | 'success' {
    const colors = {
        high: 'error',
        medium: 'warning',
        low: 'success',
    };
    return (colors[priority as keyof typeof colors] || 'success') as 'error' | 'warning' | 'success';
}