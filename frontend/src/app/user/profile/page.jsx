"use client";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { getProfile, error } = useAuth();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      if (profileData.status !== "error") {
        setUser(profileData.user);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Name: {user.name || "N/A"}</label>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Email: {user.email || "N/A"}</label>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Verified: {user.is_verified ? "Yes" : "No"}</label>
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default Profile;
