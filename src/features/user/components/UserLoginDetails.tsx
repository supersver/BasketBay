import { Button } from "@/components/Elements";
import { Copy, CaretDown, CaretUp } from "phosphor-react";
import { toast } from "react-toastify";
import { useGetUsersLoginCredentials } from "../api/getUsersLoginCredentials";
import { useState } from "react";

export const UserLoginDetails = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);

  const {
    data: userCredentials,
    isLoading,
    error,
  } = useGetUsersLoginCredentials({ limit: 3 });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => toast.success("Copied to clipboard!"),
      (err) => {
        toast.error("Failed to copy!");
        console.error("Clipboard copy failed:", err);
      },
    );
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md p-4 border rounded-md shadow-sm">
        Loading credentials...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md p-4 border rounded-md shadow-sm text-red-500">
        Failed to load credentials.
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-xl shadow-sm border border-slate-200 bg-white">
      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <h2 className="text-xl font-bold">Demo Login Accounts</h2>
        {isAccordionOpen ? (
          <CaretUp size={22} className="text-gray-600" />
        ) : (
          <CaretDown size={22} className="text-gray-600" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isAccordionOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {" "}
        {userCredentials?.map((user) => (
          <div key={user.id} className="rounded-lg p-4 bg-gray-50 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                readOnly
                value={user.email}
                className="flex-1 border border-gray-300 rounded-md p-2 bg-white text-sm"
              />
              <Button
                variant="inverse"
                onlyIcon
                startIcon={<Copy size={18} />}
                onClick={() => handleCopy(user.email)}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={user.password}
                className="flex-1 border border-gray-300 rounded-md p-2 bg-white text-sm"
              />
              <Button
                variant="inverse"
                onlyIcon
                startIcon={<Copy size={18} />}
                onClick={() => handleCopy(user.password)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
