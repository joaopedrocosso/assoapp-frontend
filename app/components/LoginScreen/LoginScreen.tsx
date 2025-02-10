"use client";

import { useGlobalContext } from "@/app/context/store";
import styles from "./LoginScreen.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { UserType } from "@/app/types/UserType";

const LoginScreen: React.FC = (props) => {
  const { user, setUser, backEndURL } = useGlobalContext();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (emailInput: string, passwordInput: string) => {
    let getAuth = await fetch(`${backEndURL}user/backoffice/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data[0]);
        setIsError(false);
        setUser({
          email: data[0].email,
          uid: data[0].uid,
          accessToken: data[0].stsTokenManager.accessToken,
          profilePhoto: "",
          name: "",
        });
        console.log("Antes de adicionar foto e nome");
        return;
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
        setError("autenticação negada.");
      });
    console.log(user);
  };
  return (
    <>
      <div className={styles.background}>
        <div className={styles.login__window}>
          <h1>AssoApp - BackOffice</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              handleLogin(userEmail, userPassword);
              setUserEmail("");
              setUserPassword("");
            }}
          >
            <label className={styles.label}>E-mail:</label>
            <input
              className={styles.editInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUserEmail(event.target.value);
              }}
              value={userEmail}
              type="email"
            ></input>
            <label className={styles.label}>Senha:</label>
            <input
              className={styles.editInput}
              type="password"
              value={userPassword}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setUserPassword(event.target.value);
              }}
            ></input>
            <button className={styles.saveButton}>Entrar</button>
            {isError ? (
              <p className={styles.error}>Erro ao realizar login: {error}</p>
            ) : (
              ""
            )}
          </form>
        </div>
        <span className={styles.backgroundClip}></span>
      </div>
    </>
  );
};

export default LoginScreen;
