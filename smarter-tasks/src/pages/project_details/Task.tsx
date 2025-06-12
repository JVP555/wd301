import "./TaskCard.css";
import { Link,useParams } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import React, { forwardRef } from "react";
import { useTasksDispatch } from "../../context/task/context";
import { deleteTask } from "../../context/task/actions";
import { TaskDetails } from "../../context/task/types";

const Task = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ task: TaskDetails }>
>((props, ref) => {
  const taskDispatch = useTasksDispatch();
  const { projectID } = useParams();

  const { task } = props;

  return (
    <div ref={ref} {...props} className="m-2 flex">
      <Link
        className="TaskItem w-full shadow-md border border-slate-100 bg-white"
        to={`tasks/${task.id}`}
      >
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div>
            <h2 className="text-base font-bold my-1">{task.title}</h2>
            <p className="text-sm text-slate-500">
              {new Date(task.dueDate).toDateString()}
            </p>
            <p className="text-sm text-slate-500">Description: {task.description}</p>
            <p className="text-sm text-slate-500">
              Assignee: {task.assignedUserName ?? "-"}
            </p>
          </div>
          <button
            className="deleteTaskButton cursor-pointer mt-10 mb-10 py-2 px-4 text-sm mr-10 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={(event) => {
              event.preventDefault(); // Prevent navigation from <Link />
              deleteTask(taskDispatch, projectID ?? "", task);
            }}
          >
            Delete
          </button>
        </div>
      </Link>
    </div>
  );
});

const Container = (
  props: React.PropsWithChildren<{
    task: TaskDetails;
    index: number;
  }>
) => {
  return (
    <Draggable index={props.index} draggableId={`${props.task.id}`}>
      {(provided) => (
        <Task
          task={props.task}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        />
      )}
    </Draggable>
  );
};

export default Container;
