import type { ITask } from "../../types";

export const countIncompleteTasks = (data: ITask[]) => {
  let incompleteTasksCount = 0;
  data.forEach((task) =>
    !task.completed ? (incompleteTasksCount = incompleteTasksCount + 1) : null,
  );
  return incompleteTasksCount;
};

export const countCompletedTasks = (data: ITask[]) => {
  let completedTasksCount = 0;
  data.forEach((task) =>
    task.completed ? (completedTasksCount = completedTasksCount + 1) : null,
  );
  return completedTasksCount;
};
