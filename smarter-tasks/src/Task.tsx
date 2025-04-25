import React from "react";
import "./TaskCard.css";  // Make sure you have CSS for TaskItem

interface TaskProps {
  title: string;
  dueDate: string;
  description: string;
}

class Task extends React.Component<TaskProps> {
  render() {
    return (
      <div className="TaskItem shadow-md border border-slate-100">
        <h3 className="text-lg font-bold my-2">
          {this.props.title} ({this.props.dueDate})
        </h3>
        <p className="text-sm text-slate-500">{this.props.description}</p>
      </div>
    );
  }
}

export default Task;
