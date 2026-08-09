import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  FaUser,
  FaBell,
  FaLock,
  FaPalette,
  FaSave,
} from "react-icons/fa";

export default function Settings() {
  const [name, setName] = useState("Gopika");
  const [email, setEmail] = useState("gopika@example.com");

  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const [darkMode, setDarkMode] = useState(true);

  const handleSave = () => {
    localStorage.setItem(
      "idms_settings",
      JSON.stringify({
        name,
        email,
        notifications,
        emailNotifications,
        darkMode,
      })
    );

    alert("Settings saved successfully");
  };

  return (
    <MainLayout>

      {/* ==================== TITLE ==================== */}

      <div className="mb-6">

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-zinc-400 mt-1">
          Manage your IDMS preferences
        </p>

      </div>


      {/* ==================== PROFILE SETTINGS ==================== */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-5">

        <div className="flex items-center gap-3 mb-5">

          <FaUser className="text-purple-400 text-xl" />

          <h2 className="text-xl font-semibold">
            Profile
          </h2>

        </div>


        <div className="grid grid-cols-2 gap-5">

          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
            />

          </div>


          <div>

            <label className="block text-sm text-zinc-400 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-purple-500"
            />

          </div>

        </div>

      </div>


      {/* ==================== NOTIFICATION SETTINGS ==================== */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-5">

        <div className="flex items-center gap-3 mb-5">

          <FaBell className="text-yellow-400 text-xl" />

          <h2 className="text-xl font-semibold">
            Notifications
          </h2>

        </div>


        <div className="space-y-4">

          <label className="flex items-center justify-between bg-zinc-800 rounded-lg p-4 cursor-pointer">

            <div>

              <p className="font-medium">
                Enable Notifications
              </p>

              <p className="text-sm text-zinc-400">
                Receive notifications about document activity
              </p>

            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) =>
                setNotifications(e.target.checked)
              }
              className="w-5 h-5"
            />

          </label>


          <label className="flex items-center justify-between bg-zinc-800 rounded-lg p-4 cursor-pointer">

            <div>

              <p className="font-medium">
                Email Notifications
              </p>

              <p className="text-sm text-zinc-400">
                Receive important updates through email
              </p>

            </div>

            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) =>
                setEmailNotifications(e.target.checked)
              }
              className="w-5 h-5"
            />

          </label>

        </div>

      </div>


      {/* ==================== APPEARANCE ==================== */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-5">

        <div className="flex items-center gap-3 mb-5">

          <FaPalette className="text-blue-400 text-xl" />

          <h2 className="text-xl font-semibold">
            Appearance
          </h2>

        </div>


        <label className="flex items-center justify-between bg-zinc-800 rounded-lg p-4 cursor-pointer">

          <div>

            <p className="font-medium">
              Dark Mode
            </p>

            <p className="text-sm text-zinc-400">
              Use the dark interface for IDMS
            </p>

          </div>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) =>
              setDarkMode(e.target.checked)
            }
            className="w-5 h-5"
          />

        </label>

      </div>


      {/* ==================== SECURITY ==================== */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-5">

        <div className="flex items-center gap-3 mb-5">

          <FaLock className="text-green-400 text-xl" />

          <h2 className="text-xl font-semibold">
            Security
          </h2>

        </div>


        <button
          className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-lg transition"
          onClick={() =>
            alert("Password change feature will be added later")
          }
        >
          Change Password
        </button>

      </div>


      {/* ==================== SAVE ==================== */}

      <div className="flex justify-end">

        <button
          onClick={handleSave}
          className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
        >

          <FaSave />

          Save Settings

        </button>

      </div>

    </MainLayout>
  );
}