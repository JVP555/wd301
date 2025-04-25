import React from "react";
import TaskCard from "./TaskCard";

function App() {
  return (
    <div className="grid grid-cols-4 mt-20 gap-16">
      <div className="TaskItem col-start-2 col-span-1 rounded">
        <h1 className="font-bold text-xl text-center mb-2">Pending</h1>
        <TaskCard title="Build the website with static content" dueDate="10th April" assigneeName="Rohit S"/>
        <TaskCard title="Add a Blog" dueDate="22nd March" assigneeName="Rohit M"/>
        <div className="TaskItem bg-gray-200">
          <h1> + New Task</h1>
        </div>
      </div>
      <div className="TaskItem col-start-3 col-span-1 rounded">
      <h1 className="font-bold text-xl text-center mb-2">Done</h1>
          <TaskCard title="Design the Mockup" completedAtDate="10th March" assigneeName="Rohit M"/>
          <TaskCard title="Get the approval from principal" completedAtDate="20th April" assigneeName="Ajay S"/>
        </div>
    </div>
  )
}

export default App;
