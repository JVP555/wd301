import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { updateTask } from "../../context/task/actions";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useProjectsState } from "../../context/projects/context";
import { TaskDetailsPayload } from "../../context/task/types";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { useMembersState } from "../../context/members/context";

import {
  useCommentDispatch,
  useCommentState,
} from "../../context/comment/context";
import { fetchComments, addComment } from "../../context/comment/actions";

type TaskFormUpdatePayload = TaskDetailsPayload & {
  selectedPerson: string;
};

const formatDateForPicker = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const TaskDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [description, setDescription] = useState("");

  const { projectID, taskID } = useParams();
  const navigate = useNavigate();

  const projectState = useProjectsState();
  const taskListState = useTasksState();
  const taskDispatch = useTasksDispatch();
  const memberState = useMembersState();
  const commentDispatch = useCommentDispatch();
  const { comments } = useCommentState();

  const selectedProject = projectState?.projects.find(
    (project) => `${project.id}` === projectID
  );

  const selectedTask = taskListState.projectData.tasks[taskID ?? ""];

  const [selectedPerson, setSelectedPerson] = useState(
    selectedTask.assignedUserName ?? ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormUpdatePayload>({
    defaultValues: {
      title: selectedTask.title,
      description: selectedTask.description,
      selectedPerson: selectedTask.assignedUserName,
      dueDate: formatDateForPicker(selectedTask.dueDate),
    },
  });

  useEffect(() => {
    if (projectID && taskID) {
      fetchComments(commentDispatch, projectID, taskID);
    }
  }, [projectID, taskID, commentDispatch]);

  const handleAddComment = async () => {
    if (description.trim()) {
      await addComment(commentDispatch, projectID ?? "", taskID ?? "", description);
      setDescription("");
    }
  };

  if (!selectedProject) {
    return <>No such Project!</>;
  }

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const onSubmit: SubmitHandler<TaskFormUpdatePayload> = async (data) => {
    const assignee = memberState?.members?.find(
      (member) => member.name === selectedPerson
    );
    await updateTask(taskDispatch, projectID ?? "", {
      ...selectedTask,
      ...data,
      assignee: assignee?.id,
    });
    closeModal();
  };

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Task Details
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                    <input
                      type="text"
                      required
                      placeholder="Enter title"
                      id="title"
                      {...register("title", { required: true })}
                      className="w-full border rounded-md py-2 px-3"
                    />
                    {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

                    <input
                      type="text"
                      required
                      placeholder="Enter description"
                      id="description"
                      {...register("description", { required: true })}
                      className="w-full border rounded-md py-2 px-3"
                    />

                    <input
                      type="date"
                      required
                      id="dueDate"
                      {...register("dueDate", { required: true })}
                      className="w-full border rounded-md py-2 px-3"
                    />

                    <div>
                      <h3 className="text-md font-medium mb-1">Assignee</h3>
                      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
                        <div className="relative">
                          <Listbox.Button className="w-full rounded border px-4 py-2 bg-white text-left">
                            {selectedPerson || "Select a person"}
                          </Listbox.Button>
                          <Listbox.Options className="absolute mt-1 w-full max-h-32 overflow-auto bg-white rounded border z-10">
                            {memberState?.members.map((person) => (
                              <Listbox.Option
                                key={person.id}
                                value={person.name}
                                className={({ active }) =>
                                  `cursor-pointer select-none py-2 px-4 ${
                                    active ? "bg-blue-100" : "text-gray-900"
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span className={selected ? "font-semibold" : ""}>
                                      {person.name}
                                    </span>
                                    {selected && (
                                      <span className="ml-2 text-blue-600">
                                        <CheckIcon className="w-4 h-4 inline" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </div>
                      </Listbox>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                      >
                        Update
                      </button>
                    </div>
                  </form>

                  {/* Comments Section */}
                  <div className="mt-6">
                    <h3 className="text-md font-semibold text-gray-900 mb-2">Comments</h3>
                    <div className="max-h-40 mt-2 overflow-y-auto space-y-2">
                      {comments.map((c, idx) => (
                        <div key={idx} className="comment border p-2 rounded bg-gray-50">
                          <div>{c.description}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Created On: {c.createdAt
                              ?  new Date(c.createdAt).toLocaleString(undefined, {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })
                              : "Unknown time"}, Created by: {c.owner}
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
                      <button
                        id="addCommentBtn"
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                        onClick={handleAddComment}
                      >
                        Add Comment
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-300 text-gray-800 px-4 py-2 ml-5 rounded hover:bg-gray-400"
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

export default TaskDetails;
