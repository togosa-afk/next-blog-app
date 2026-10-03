"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  const isError = type === "error";

  return (
    <div className="mx-auto max-w-6xl px-5 pt-4 sm:px-8">
      <p
        data-testid="notification"
        role={isError ? "alert" : "status"}
        aria-live={isError ? "assertive" : "polite"}
        className={`rounded-md border px-4 py-3 text-sm font-medium ${isError ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}
      >
        {message}
      </p>
    </div>
  );
}
