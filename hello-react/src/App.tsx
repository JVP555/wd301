import React from "react";
import TaskCard from "./TaskCard";

function App() {
  return (
    <div className="grid grid-cols-5 mt-20">
      <div className="TaskItem col-start-2 col-span-1">
        <h1 className="font-bold">Pending</h1>
        <TaskCard title="Build the website with static content" dueDate="10th April" assigneeName="Rohit S"/>
        <TaskCard title="Add a Blog" dueDate="22nd March" assigneeName="Rohit M"/>
      </div>
      <div className="TaskItem col-start-4 col-span-1">
        <h1 className="font-bold">Done</h1>
          <TaskCard title="Design the Mockup" completedAtDate="10th March" assigneeName="Rohit M"/>
          <TaskCard title="Get the approval from principal" completedAtDate="20th April" assigneeName="Ajay S"/>
        </div>
    </div>
  )
}

export default App;
