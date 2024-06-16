export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    priority: number;
    memberId: string;
    coperatorId?: string;
    isUserTask?: boolean;
}