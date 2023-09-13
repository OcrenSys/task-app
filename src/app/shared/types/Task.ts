export type Task = {
  id?: number | string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
};
