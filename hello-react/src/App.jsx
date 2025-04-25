import TaskCard from "./TaskCard";

function App() {
  return (
    <div className="grid grid-cols-5 mt-20">
      <div className="TaskItem col-start-2 col-span-1">
        <h1 className="font-bold">Pending</h1>
        <TaskCard title="Build the website with static content" Dueon="10th April" Assignee="Rohit S"/>
        <TaskCard title="Add a Blog" Dueon="22nd March" Assignee="Rohit M"/>
      </div>
      <div className="TaskItem col-start-4 col-span-1">
        <h1 className="font-bold">Done</h1>
          <TaskCard title="Design the Mockup" CompletedOn="10th March" Assignee="Rohit M"/>
          <TaskCard title="Get the approval from principal" CompletedOn="20th April" Assignee="Ajay S"/>
        </div>
    </div>
  )
}

export default App;
