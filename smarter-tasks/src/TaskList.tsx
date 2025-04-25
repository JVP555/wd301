import React from "react";
import Task from "./Task";
import { TaskItem } from "./types";

interface Props {
  tasks: TaskItem[];
}

interface State {}

class TaskList extends React.Component<Props, State> {
  render() {
    return this.props.tasks.map((task, idx) => (
      <Task 
        key={idx} 
        title={task.title} 
        dueDate={task.dueDate} 
        description={task.description}  // Add description here
      />
    ));
  }
}

export default TaskList;
