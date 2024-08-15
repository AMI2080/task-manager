export interface Task {
  id?: number;
  order?: number;
  priority: Priority | null;
  title: string;
  comment?: string | null;
  isDone?: boolean;
  deadline?: Date | null;
}

export enum Priority {
  HEIGH = 1,
  MEDIUM = 2,
  LOW = 3,
}

export interface PriorityOpion {
  value: Priority;
  text: string;
}
