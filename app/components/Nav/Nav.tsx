"use client";

import { useGlobalContext } from "@/app/context/store";
import SpanButton from "../UI/SpanButton";
import styles from "./Nav.module.css";
import { useEffect, useState } from "react";

const Nav: React.FC = () => {
  const { user, setUser, setBackOfficeUsers } = useGlobalContext();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>();

  return (
    <nav className={styles.nav}>
      <img
        className={styles.nav__headerLogo}
        src="https://logodownload.org/wp-content/uploads/2017/04/Msf-logo-medicos-sem-fronteiras-logo.png"
        alt="Logo de Médicos Sem Fronteiras"
      />
      <SpanButton
        text={`Bem vindo, ${user?.name}`}
        img={
          user?.profilePhoto
            ? user.profilePhoto
            : "https://th.bing.com/th/id/R.ab1d41168804aeb60c7d61246d5ef2f0?rik=f96PsJlU%2f3sQ8Q&pid=ImgRaw&r=0"
        }
        background={false}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      />
      {isMenuOpen ? (
        <div className={styles.profileDiv}>
          <img
            className={styles.profileDiv__profilePic}
            src={
              user?.profilePhoto
                ? user.profilePhoto
                : "https://th.bing.com/th/id/R.ab1d41168804aeb60c7d61246d5ef2f0?rik=f96PsJlU%2f3sQ8Q&pid=ImgRaw&r=0"
            }
            alt="Foto de perfil."
          ></img>
          <div>
            <span className={styles.profileDiv__name}>{user?.name}</span>
            <span className={styles.profileDiv__email}>{user?.email}</span>
            <button
              className={styles.exitButton}
              onClick={() => {
                setUser(undefined);
                setBackOfficeUsers([]);
              }}
            >
              Sair
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Nav;
