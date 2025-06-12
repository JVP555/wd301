import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { MembersState, MembersDispatch} from "./types";

const MembersStateContext = createContext<MembersState>(initialState);
const MembersDispatchContext = createContext<MembersDispatch>(() => {
  throw new Error("useMembersDispatch must be used within a MembersProvider");
});

export const MembersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MembersStateContext.Provider value={state}>
      <MembersDispatchContext.Provider value={dispatch}>
        {children}
      </MembersDispatchContext.Provider>
    </MembersStateContext.Provider>
  );
};

export const useMembersState = () => useContext(MembersStateContext);
export const useMembersDispatch = () => useContext(MembersDispatchContext);
