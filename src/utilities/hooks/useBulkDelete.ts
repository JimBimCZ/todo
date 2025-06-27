import { toast } from "react-toastify";
import type { ITask } from "../../types";

export function useBulkDelete(
  taskData: ITask[],
  deleteTask: (id: string) => Promise<any>,
) {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const deleteAll = async () => {
    const deletePromises = taskData
      .filter((task) => task.completed)
      .map(async (task) => {
        try {
          const res = await deleteTask(task.id);
          await sleep(10);
          console.log(res);
          if (res.error) {
            return { success: false, taskId: task.id, error: res.error.status };
          } else {
            return { success: true, taskId: task.id };
          }
        } catch (err) {
          return { success: false, taskId: task.id, error: err };
        }
      });

    const results = await Promise.all(deletePromises);
    const failed = results.filter((res) => !res.success);
    if (failed.length === 0) {
      toast.success("All completed tasks deleted!");
    } else {
      failed.forEach(({ taskId, error }) => {
        toast.error(`Failed to delete task ${taskId}: ${error}`);
      });
    }
  };

  return { deleteAll };
}
