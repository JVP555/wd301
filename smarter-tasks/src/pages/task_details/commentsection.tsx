import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useCommentDispatch, useCommentState } from "../../context/comment/context";
import { fetchComments, addComment } from "../../context/comment/actions";

interface CommentSectionProps {
  projectID: string;
  taskID: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ projectID, taskID }) => {
  const { comments } = useCommentState();
  const dispatch = useCommentDispatch();
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchComments(dispatch, projectID, taskID);
  }, [dispatch, projectID, taskID]);

  const handleSubmit = async () => {
    if (description.trim()) {
      await addComment(dispatch, projectID, taskID, description);
      setDescription("");
    }
  };

  const closeModal = () => {
    navigate("..");
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-130 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Task Comments
                </Dialog.Title>

                <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto">
                  {comments.map((c, index) => (
                    <div key={index} className="border p-2 rounded">
                      <div>{c.description}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleString(undefined, {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "Unknown time"}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <textarea
                    id="commentBox"
                    className="w-full p-2 border rounded"
                    placeholder="Add a comment..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      id="addCommentBtn"
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={handleSubmit}
                    >
                      Add Comment
                    </button>
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CommentSection;
