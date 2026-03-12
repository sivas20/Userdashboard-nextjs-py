"use client";
import { useState } from "react";
export default function DashboardNotifications() {

  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  const [sms, setSms] = useState(false);
  const [app, setApp] = useState(false);
  const Toggle = ({enabled, setEnabled}:{enabled:boolean,setEnabled:(v:boolean)=>void}) => (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
        enabled ? "bg-green-700" : "bg-gray-400"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          enabled ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
  return (
    <div className="flex min-h-screen bg-zinc-100 font-sans">
      <main className="flex-1 p-16 bg-white">
        <h1 className="text-3xl font-semibold mb-6 text-black">
          <i>Notification Preferences</i>
        </h1>
        <p className="text-lg text-zinc-600">
          Manage how you receive updates and alerts from your dashboard.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="p-6 bg-zinc-100 hover:bg-zinc-200 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-black">
                Email Notifications
              </h2>
              <Toggle enabled={email} setEnabled={setEmail}/>
            </div>
            <p className="text-zinc-600">
              Receive updates and alerts via email for important activities.
            </p>
          </div>
          <div className="p-6 bg-zinc-100 hover:bg-zinc-200 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-black">
                Push Notifications
              </h2>
              <Toggle enabled={push} setEnabled={setPush}/>
            </div>
            <p className="text-zinc-600">
              Get real-time notifications for reminders and messages.
            </p>
          </div>
          <div className="p-6 bg-zinc-100 hover:bg-zinc-200 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-black">
                SMS Notifications
              </h2>
              <Toggle enabled={sms} setEnabled={setSms}/>
            </div>
            <p className="text-zinc-600">
              Receive important updates directly to your phone.
            </p>
          </div>
          <div className="p-6 bg-zinc-100 hover:bg-zinc-200 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold text-black">
                In-App Notifications
              </h2>
              <Toggle enabled={app} setEnabled={setApp}/>
            </div>
            <p className="text-zinc-600">
              Stay informed about updates inside the application.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}