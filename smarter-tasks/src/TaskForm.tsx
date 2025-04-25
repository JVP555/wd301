import React from "react";
import { TaskItem } from "./types";

interface TaskFormProps {
  addTask: (task: TaskItem) => void;
}

interface TaskFormState {
  title: string;
  dueDate: string;
  description: string;  // Add description to the state
}

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  constructor(props: TaskFormProps) {
    super(props);
    this.state = {
      title: "",
      dueDate: "",
      description: "",  // Initialize description state
    };
  }

  handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ title: event.target.value });
  };

  handleDueDateChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ dueDate: event.target.value });
  };

  handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ description: event.target.value });  // Handle description change
  };

  addTask: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const newTask: TaskItem = {
      title: this.state.title,
      dueDate: this.state.dueDate,
      description: this.state.description,  // Include description when adding the task
    };
    this.props.addTask(newTask);
    this.setState({ title: "", dueDate: "", description: "" });  // Reset form after submission
  };

  render() {
    return (
      <form onSubmit={this.addTask}>
        <input
          type="text" className="border"
          id="todoTitle"
          value={this.state.title}
          onChange={this.handleTitleChange}
          required
          placeholder="Enter title"
        />
        <input className="border mx-2"
          type="date"
          id="todoDueDate"
          value={this.state.dueDate}
          onChange={this.handleDueDateChange}
          required
        />
        <input
          type="text" className="border"
          id="todoDescription"  // Add description field
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          placeholder="Enter description"  // Placeholder for clarity
        />
        <button id="addTaskButton" className="border rounded bg-green-400 px-1 mx-2 my-1" type="submit">Add Item</button>
      </form>
    );
  }
}

export default TaskForm;
