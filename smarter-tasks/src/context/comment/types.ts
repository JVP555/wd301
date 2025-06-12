// types.ts
export interface Comment {
    id: number;
    description: string;
    taskId: number;
    owner: number;
    createdAt: string;
}

export interface CommentState {
  comments: Comment[];
}

export type CommentDispatch = React.Dispatch<CommentAction>;

export enum ActionType {
  SET_COMMENTS = "SET_COMMENTS",
}

export type CommentAction =
  | { type: ActionType.SET_COMMENTS; payload: Comment[] };