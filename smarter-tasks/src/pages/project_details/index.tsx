
import { Link, Outlet, useParams } from "react-router-dom";
import { useProjectsState } from "../../context/projects/context";
import { TasksProvider } from "../../context/task/context";
const ProjectDetails = () => {
  const projectState = useProjectsState();
  const { projectID } = useParams();

  const selectedProject = projectState?.projects.filter(
    (project) => `${project.id}` === projectID
  )?.[0];

  if (!selectedProject) {
    return <>No such Project!</>;
  }

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          {selectedProject.name}
        </h2>
        <Link to={`tasks/new`}>
          <button
            id="newTaskBtn"
            className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            New Task
          </button>
        </Link>
      </div>
    </>
  );
};

const ProjectDetailsIndex: React.FC = () => {
  return (
    <TasksProvider>
      <ProjectDetails />
      <Outlet />
    </TasksProvider>
  );
};  

export default ProjectDetailsIndex;