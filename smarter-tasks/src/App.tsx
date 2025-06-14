// src/App.tsx

import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes"
import { ThemeContext } from "./context/theme";

// To do that, first I'll import the `ProjectsProvider` in the `App` component.

import { ProjectsProvider } from "./context/projects/context";
import { MembersProvider } from "./context/members/context";
import { CommentProvider } from "./context/comment/context";


// Then I'll wrap the RouterProvider component with the <ProjectsProvider> component.
const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
     <div className={`h-screen w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <CommentProvider>
        <ProjectsProvider>
          <MembersProvider>
            <RouterProvider router={router} />
          </MembersProvider>
        </ProjectsProvider>
      </CommentProvider>
    </div>
  );
}
export default App;