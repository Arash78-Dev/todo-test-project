export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type GetTodosResponse = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
};

export type DeleteTodoRequest = {
  query: {
    todoId: string;
  };
};

export type UpdateTodoRequest = {
  query: {
    todoId: string;
  };
  body?: {
    todo?: string;
    completed?: boolean;
  };
};

export type AddTodoRequest = {
  todo: string;
  completed: boolean;
  userId: number;
};

export type DeleteTodoResponse = Todo & {
  isDeleted: boolean;
  deletedOn: string;
};
