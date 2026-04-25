import { Button } from "@/components/Elements";
import { useNavigate } from "react-router-dom";

export const LandingPage = ({ children }: { children: React.ReactNode }) => {
  const naviate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-emerald-600">
          Welcome to BasketBay 🛒
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Buy products with ease and convenience
        </p>
      </div>
      <Button
        variant="inverse"
        size="lg"
        className="mt-6"
        onClick={() => naviate("/auth/login")}
      >
        Continue
      </Button>
      {children}
    </div>
  );
};
