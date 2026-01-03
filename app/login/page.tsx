"use client";

import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email.endsWith("@ucdavis.edu")) {
      setError("You must use a @ucdavis.edu email");
      return;
    }

    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/login/confirm`,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send sign-in link.");
    }
  }

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold">Unitrans</h1>

      {sent ? (
        <p>Check your UC Davis email for the sign-in link.</p>
      ) : (
        <>
          <input
            className="border p-2 w-full rounded"
            placeholder="yourname@ucdavis.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="w-full bg-black text-white py-2 rounded"
            onClick={handleLogin}
          >
            Send sign-in link
          </button>
        </>
      )}
    </div>
  );
}