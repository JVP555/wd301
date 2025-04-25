import React from 'react';
import './TaskCard.css'

const TaskCard = (props) => {
  console.log(props);
  return (
    <div className='TaskItem'>
      <h2 className="text-xl font-semi">{props.title}</h2>
      {props.completedAtDate ? (
        <p>Completed on: {props.completedAtDate}</p>
      ) : props.dueDate ? (
        <p>Due on: {props.dueDate}</p>
      ) : null}
      <p>Assignee: {props.assigneeName ? props.assigneeName : 'Not assigned'}</p>
    </div>
  );
}

export default TaskCard