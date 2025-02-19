"use client";

import styles from "./page.module.css";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import { useState } from "react";
import WorkScreen from "./components/WorkScreen/WorkScreen";
import { useGlobalContext } from "./context/store";

export default function Home() {
  const { user, setBackendURL } = useGlobalContext();

  setBackendURL("https://assoapp-backend.onrender.com/");

  return (
    <main className={styles.main}>
      {user ? (
        <>
          <WorkScreen />
        </>
      ) : (
        <>
          <LoginScreen />
        </>
      )}
    </main>
  );
}
