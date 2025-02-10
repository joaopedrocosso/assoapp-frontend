"use client";

import React from "react";
import styles from "./LateralMenu.module.css";
import { IoMenu, IoChevronBack } from "react-icons/io5";
import { useState } from "react";
import SpanButton from "../UI/SpanButton";
import { useGlobalContext } from "@/app/context/store";
import AssociateCreateSpace from "../AssociateCreateSpace/AssociateCreateSpace";
import YearWorkspace from "../YearWorkspace/YearWorkspace";
import EventWorkspace from "../EventWorkspace/EventWorkspace";

const LateralMenu: React.FC = (props) => {
  const {
    workspaceIsActive,
    setWorkspaceIsActive,
    setWorkspace,
    setBackdrop,
    backdrop,
  } = useGlobalContext();
  const [isMenuOpen, setMenuOpen] = useState<Boolean>(false);

  return (
    <div className={`${styles.lateralmenu} ${isMenuOpen ? styles.open : ""}`}>
      {isMenuOpen ? (
        <>
          <span
            onClick={() => {
              setMenuOpen(!isMenuOpen);
            }}
          >
            <IoChevronBack className={styles.menuIcon} />
          </span>
          <div className={styles.lateralmenu__item}>
            <SpanButton
              text="Cadastro"
              img=""
              background={true}
              onClick={() => {
                setBackdrop(!backdrop);
                setWorkspaceIsActive(!workspaceIsActive);
                setWorkspace({
                  title: `Criando novo associado`,
                  action: null,
                  children: <AssociateCreateSpace />,
                });
                setMenuOpen(false);
              }}
            />
          </div>
          <div className={styles.lateralmenu__item}>
            <SpanButton
              text="Editar anos"
              img=""
              background={true}
              onClick={() => {
                setBackdrop(!backdrop);
                setWorkspaceIsActive(!workspaceIsActive);
                setWorkspace({
                  title: `Editando anos`,
                  action: null,
                  children: <YearWorkspace />,
                });
                setMenuOpen(false);
              }}
            />
          </div>
          <div className={styles.lateralmenu__item}>
            <SpanButton
              text="Eventos"
              img=""
              background={true}
              onClick={() => {
                setBackdrop(!backdrop);
                setWorkspaceIsActive(!workspaceIsActive);
                setWorkspace({
                  title: `Editando eventos`,
                  action: null,
                  children: <EventWorkspace />,
                });
                setMenuOpen(false);
              }}
            />
          </div>
          <div className={styles.lateralmenu__item}>
            <SpanButton
              text="Consulta"
              img=""
              background={true}
              onClick={() => []}
            />
          </div>
          <div className={styles.lateralmenu__item}>
            <SpanButton
              text="Relatório"
              img=""
              background={true}
              onClick={() => []}
            />
          </div>
        </>
      ) : (
        <span
          onClick={() => {
            setMenuOpen(!isMenuOpen);
          }}
        >
          <IoMenu className={styles.menuIcon} />
        </span>
      )}
    </div>
  );
};

export default LateralMenu;
