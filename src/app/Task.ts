export interface Task {
    id: string;
    text: string;
    day: string; 
    completed: boolean;
    priority: string;
    time: string;
    dateAdded?: string;
}
