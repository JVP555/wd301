import { useParams } from "react-router-dom";
import { CommentProvider } from "../../context/comment/context";
import CommentSection from "./commentsection";

const TaskDetailsPage = () => {
  const { projectID, taskID } = useParams();

  if (!projectID || !taskID) return <div>Invalid URL</div>;

  return (
    <CommentProvider>
      <CommentSection projectID={projectID} taskID={taskID} />
    </CommentProvider>
  );
};

export default TaskDetailsPage;
