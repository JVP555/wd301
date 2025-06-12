

import { Outlet } from "react-router-dom";
import { TasksProvider } from "../../context/task/context";
import ProjectDetails from "./ProjectDetails";

const ProjectDetailsIndex: React.FC = () => {
  return (
    <TasksProvider>
      <ProjectDetails />
      <Outlet />
    </TasksProvider>
  );
};  

export default ProjectDetailsIndex;