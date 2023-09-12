export type Task = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: 'activa' | 'pendiente' | 'completado';
};
