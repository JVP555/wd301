// context.ts
import React, { createContext, useReducer, useContext } from "react";
import { commentReducer, initialCommentState } from "./reducer";
import { CommentState, CommentDispatch } from "./types";

const StateContext = createContext<CommentState>(initialCommentState);
const DispatchContext = createContext<CommentDispatch>(() => {});

export const CommentProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialCommentState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useCommentState = () => useContext(StateContext);
export const useCommentDispatch = () => useContext(DispatchContext);