import type { ITask } from "../../types";
import { toast } from "react-toastify";

export function useBulkComplete(
  taskData: ITask[],
  completeTask: (id: string) => Promise<any>,
) {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const completeAll = async () => {
    const completePromises = taskData
      .filter((task) => !task.completed)
      .map(async (task) => {
        try {
          const res = await completeTask(task.id);
          await sleep(10);
          if (res.error) {
            return { success: false, taskId: task.id, error: res.error.status };
          } else {
            return { success: true, taskId: task.id };
          }
        } catch (err) {
          return { success: false, taskId: task.id, error: err };
        }
      });

    const results = await Promise.all(completePromises);
    const failed = results.filter((res) => !res.success);
    if (failed.length > 0) {
      failed.forEach(({ taskId, error }) => {
        toast.error(`Failed to complete task ${taskId}: ${error}`);
      });
    } else {
      toast.success("All tasks marked as completed!");
    }
  };

  return { completeAll };
}
