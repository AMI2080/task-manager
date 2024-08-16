export interface Task {
  id?: number;
  order?: number;
  priority: TaskPriority | null;
  title: string;
  comment?: string | null;
  deadline?: Date | null;
  status: TaskStatus;
}

export enum TaskPriority {
  HEIGH = 1,
  MEDIUM = 2,
  LOW = 3,
}

export interface TaskPriorityOpion {
  value: TaskPriority;
  text: string;
}

export enum TaskStatus {
  TODO = 1,
  IN_PROGRESS = 2,
  DONE = 3,
}

export interface TaskStatusOpion {
  value: TaskStatus;
  text: string;
}
