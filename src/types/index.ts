export type CategoryType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isValid: boolean;
  color: string;
  slug: string;
  todoLists: TodoType[];
};

export type TodoType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content?: string;
  completedDate: Date;
  responsibleUserName?: string;
  isDone: boolean;
  categories: CategoryType[];
};
