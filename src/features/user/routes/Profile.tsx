import { toast } from "react-toastify";
import { useGetUserProfile } from "../api/getUserProfile";

export const Profile = () => {
  const { data: userProfile, error, isLoading } = useGetUserProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return toast.error("Error fetching user profile");
  }

  return (
    <div className="lg:flex p-4 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={userProfile?.avatar}
        alt={userProfile?.name}
        className="w-32 h-32 rounded-full object-cover"
      />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">{userProfile?.name}</h1>
        <p className="text-gray-700 mb-4">{userProfile?.email}</p>
      </div>
    </div>
  );
};
