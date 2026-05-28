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
    public name: string | undefined;
    public startDate: Date | undefined;
    public endDate: Date | undefined;
    public priority: number | undefined;
    public status: TaskStatus | undefined;
    public assignedToId: string | undefined;

    constructor(props: TaskProps) {
        Object.assign(this, props);
    }
}