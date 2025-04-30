
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <button
        id="backToHomeButton"
        onClick={() => {
          const isAuthenticated = localStorage.getItem("authenticated");
          if (isAuthenticated === "true") {
            navigate("/home");
          } else navigate("/")}
        }
        className="px-4 py-2 bg-blue-600 text-white rounded hover:cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
}
