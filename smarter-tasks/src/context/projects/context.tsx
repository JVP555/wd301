import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import type { ProjectsState, ProjectsDispatch } from "./types"; // Move types to another file

const ProjectsStateContext = createContext<ProjectsState>(initialState);

const ProjectsDispatchContext = createContext<ProjectsDispatch>(() => {
  throw new Error("useProjectsDispatch must be used within a ProjectsProvider");
});

export const ProjectsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProjectsStateContext.Provider value={state}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsStateContext.Provider>
  );
};

export const useProjectsState = () => useContext(ProjectsStateContext);
export const useProjectsDispatch = () => useContext(ProjectsDispatchContext);
