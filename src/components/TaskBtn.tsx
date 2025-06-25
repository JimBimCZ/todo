// this button enables adding a new task or changing task status

interface Props {
  isAddTask: boolean;
}

export const TaskBtn: FC = ({ isAddTask }: Props) => {
  return (
    <button className="btn btn-primary">
      {isAddTask ? "Add task" : "Rename task"}
    </button>
  );
};
