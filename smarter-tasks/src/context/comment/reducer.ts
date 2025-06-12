// reducer.ts
import { CommentAction, CommentState, ActionType } from "./types";

export const initialCommentState: CommentState = {
  comments: [],
};

export const commentReducer = (state: CommentState, action: CommentAction): CommentState => {
  switch (action.type) {
    case ActionType.SET_COMMENTS:
      return { ...state, comments: action.payload };
    default:
      return state;
  }
};