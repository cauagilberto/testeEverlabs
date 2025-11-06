export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface TaskProps {
    id?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    status: TaskStatus;
    assignedToId: string;
}

export class Task {
    public readonly id?: string;
    public name: string;
    public startDate: Date;
    public endDate: Date;
    public priority: number;
    public status: TaskStatus;
    public assignedToId: string;

    constructor(props: TaskProps) {
        Object.assign(this, props);
    }
}