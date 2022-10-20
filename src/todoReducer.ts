import { TodoListTask } from "./model";

export type TodoState = {
  todoListTasks: TodoListTask[];
};

const initialState = {
  todoListTasks: [],
};

type Action = { type: "SET"; payload: TodoListTask[] };

export const todoReducer = (
  state: TodoState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "SET":
      return { ...state, todoListTasks: action.payload };
    default:
      return state;
  }
};
