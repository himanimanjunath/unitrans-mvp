"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    const href = window.location.href;
    const email = window.localStorage.getItem("emailForSignIn");

    if (!email) {
      router.push("/login");
      return;
    }

    if (isSignInWithEmailLink(auth, href)) {
      signInWithEmailLink(auth, email, href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          router.push("/home");
        })
        .catch(() => {
          router.push("/login");
        });
    } else {
      router.push("/login");
    }
  }, []);

  return <p className="p-6">Signing you in…</p>;
}
