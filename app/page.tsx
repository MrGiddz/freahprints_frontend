"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./components/button";
import SearchField from "./components/search-field";

type UserDataType = {
  username: string;
  avatarUrl: string;
  profileUrl: string;
  bio: string;
  repos: string[];
  followers: string;
  following: string;
};

export const fetchGitHubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    return {
      username: data.login,
      avatarUrl: data.avatar_url,
      profileUrl: data.html_url,
      bio: data.bio,
      repos: data.public_repos,
      followers: data.followers,
      following: data.following,
    };
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [error, setError] = useState("");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 


  

  const handleSearch = async () => {
    setError("");
    setUserData(null);

    if (!searchTerm.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    const user = await fetchGitHubUser(searchTerm);
    if (!user) {
      setError("GitHub user not found");
      saveToHistory(searchTerm, "GitHub user not found");
      return;
    }

    setUserData(user);
    saveToHistory(searchTerm, user);
  };

  const saveToHistory = (term: string, user: UserDataType | string) => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    history.unshift({ term, user });
    localStorage.setItem("searchHistory", JSON.stringify(history));
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Search Box */}
      <h1 className="mx-auto text-xl font-semibold text-center my-4 text-gray-500">
        Search Github User
      </h1>
      <div className="p-6 w-full max-w-md">
        <SearchField
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          name="search"
          placeholder="Search"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Search Results */}
      <div className="mt-6 w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Search Results</h2>

        {error && (
          <p className="text-red-500 bg-red-100 border border-red-400 px-4 py-2 rounded-md mt-2">
            {error}
          </p>
        )}

        {userData ? (
          <div className="grid grid-cols-2 gap-4 bg-white p-6 border">
            <div className="flex flex-col items-start col-span-1">
              <p className="text-gray-700 font-medium mb-2 text-left">
                User Image
              </p>
              <div className="w-28 h-28 border rounded-md overflow-hidden">
                <Image
                  src={userData.avatarUrl}
                  alt="User Avatar"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col items-start col-span-1">
              <p className="text-gray-700 font-medium mb-2">GitHub Username</p>
              <p className="text-lg font-semibold text-gray-900">
                {userData.username}
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
