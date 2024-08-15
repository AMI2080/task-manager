export interface Task {
  id?: number;
  order?: number;
  priority: number;
  title: string;
  comment?: string;
  isDone?: boolean;
  deadline?: Date;
}
