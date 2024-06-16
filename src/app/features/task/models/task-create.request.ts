export interface TaskCreateRequest {
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    priority: number;
    memberId: string;
    coperatorId?: string;
}