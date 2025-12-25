// definições de dados vindos da api
export type user = {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export type task = {
    id: number;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: Date;
    status: 'pending' | 'in_progress' | 'completed';
    userId: number;
    assigned_to: number;
    created_at: Date;
    updated_at: Date;
}