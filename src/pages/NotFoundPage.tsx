import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="text-center">Oooopss... Page Not Found 🥺</h1>
      <Button
        className="w-48 cursor-pointer bg-gray-800"
        onClick={() => navigate("/")}
      >
        Go to Home Page
      </Button>
    </div>
  );
};
