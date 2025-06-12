/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from '../../config/constants';
import { ActionType, Comment } from "./types";

export const fetchComments = async (
  dispatch: any,
  projectId: string,
  taskId: string
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    const response = await fetch(`${API_ENDPOINT}/projects/${projectId}/tasks/${taskId}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Fetched comments:", JSON.stringify(data, null, 2));
    const mapped: Comment[] = data.map((c: any) => ({
      id: c.id,
      description: c.description ?? "",
      taskId: c.task_id,
      owner: c.User?.name ?? "Unknown",
      createdAt: c.createdAt ?? "",
    }));

    // Sort in reverse chronological order (latest first)
    mapped.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    dispatch({ type: ActionType.SET_COMMENTS, payload: mapped });

  } catch (error) {
    console.error('Error fetching comments:', error);
    dispatch({ type: ActionType.SET_COMMENTS, payload: [] });
  }
};

export const addComment = async (
  dispatch: any,
  projectId: string,
  taskId: string,
  content: string
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectId}/tasks/${taskId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description: content }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to add comment');
    }

    await fetchComments(dispatch, projectId, taskId);
  } catch (error) {
    console.error('Add comment failed:', error);
  }
};
