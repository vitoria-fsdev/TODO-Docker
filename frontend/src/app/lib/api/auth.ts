import connection from './conn';

export const login = async (username: string, password: string) => {
    const response = await connection.post('/auth/login', { username, password });
    return response.data;
};

export const logout = async () => {
    const response = await connection.post('/auth/logout');
    return response.data;
};

export const createUser = async (username: string, password: string, email: string) => {
    const response = await connection.post('/auth/register', { username, password, email });
    return response.data;
}