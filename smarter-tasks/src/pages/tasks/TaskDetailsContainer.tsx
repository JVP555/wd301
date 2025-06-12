import { useProjectsState } from "../../context/projects/context";
import { useTasksState } from "../../context/task/context";
import { useParams } from "react-router-dom";
import TaskDetails from "./TaskDetails";


const TaskDetailsContainer = () => {
  const { projectID, taskID } = useParams();
  const projectState = useProjectsState();
  const taskListState = useTasksState();
  const isFetchingTasks = taskListState.isLoading;
  const selectedTask = taskListState.projectData.tasks?.[taskID || ""];

  if (isFetchingTasks || !projectState || projectState?.isLoading) {
    return <>Loading...</>;
  }

  if (!selectedTask || !projectID || !taskID) {
    return <>No such task!</>;
  }

  return (
    <div className="space-y-6">
      <TaskDetails />
    </div>
  );
};

export default TaskDetailsContainer;
