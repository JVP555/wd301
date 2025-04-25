import './TaskCard.css'

const TaskCard = (props) => {
  console.log(props);
  return (
    <div className='TaskItem'>
      <h2 className="text-xl font-semi">{props.title}</h2>
      {props.CompletedOn ? (
        <p>Completed on: {props.CompletedOn}</p>
      ) : props.Dueon ? (
        <p>Due on: {props.Dueon}</p>
      ) : null}
      <p>Assignee: {props.Assignee ? props.Assignee : 'Not assigned'}</p>
    </div>
  );
}

export default TaskCard