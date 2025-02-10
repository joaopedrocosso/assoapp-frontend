"use client";

import React from "react";
import styles from "./TableItem.module.css";
import { useGlobalContext } from "@/app/context/store";
import { AssociateObject, MemberType } from "@/app/types/AssociateType";

import AssociateWorkspace from "../AssociateWorkspace/AssociateWorkspace";

const TableItem: React.FC<AssociateObject> = (props) => {
  const {
    workspaceIsActive,
    setWorkspaceIsActive,
    setWorkspace,
    setBackdrop,
    backdrop,
    setActiveItem,
    activeItem,
  } = useGlobalContext();

  const handleTimeStamps = (timestamp: any) => {
    const date = new Date(timestamp.seconds * 1000);
    return date;
  };

  return (
    <>
      {props.data ? (
        <div
          className={`${styles.associate} ${
            activeItem == props.id ? styles.selected : ""
          }`}
          onClick={() => {
            setActiveItem(activeItem == "" ? props.id : "");
            setBackdrop(!backdrop);
            setWorkspaceIsActive(!workspaceIsActive);
            setWorkspace(
              workspaceIsActive
                ? {
                    title: ``,
                    action: null,
                    children: "",
                  }
                : {
                    title: `Editando ${props.data.fullName}`,
                    action: null,
                    children: (
                      <AssociateWorkspace id={props.id} data={props.data} />
                    ),
                  }
            );
          }}
        >
          <img
            src={props.data.profilePhoto}
            alt={`Foto de perfil de ${props.data.fullName}`}
          />
          <img
            src={
              "https://th.bing.com/th/id/R.ab1d41168804aeb60c7d61246d5ef2f0?rik=f96PsJlU%2f3sQ8Q&pid=ImgRaw&r=0"
            }
            className={`${styles.memberImg} ${
              props.data.memberShip.memberType == MemberType.member
                ? styles.memberImg__member
                : ""
            } ${
              props.data.memberShip.memberType == MemberType.excluded
                ? styles.memberImg__excluded
                : ""
            }`}
            alt={`${props.data.memberShip.memberType}`}
          />
          <div>
            <div className={styles.associate__title}>
              <span className={styles.associate__name}>
                {props.data.socialName !== ""
                  ? props.data.socialName
                  : props.data.fullName}
              </span>
              <span
                className={styles.associate__email}
              >{`(${props.data.email})`}</span>
            </div>

            <div className={styles.associate__info}>
              <span className={styles.associate__age}>
                {props.data.socialName !== ""
                  ? `Nome do associado: ${props.data.fullName}`
                  : ""}
              </span>
              <span
                className={styles.associate__age}
              >{`Categoria: ${props.data.memberShip.memberType}`}</span>
              <span
                className={styles.associate__age}
              >{`Código: ${props.data.personalCode}`}</span>
              <span
                className={styles.associate__age}
              >{`E-mail secundário: ${props.data.emailSecondary}`}</span>
              <span
                className={styles.associate__age}
              >{`Telefone: ${props.data.phone}`}</span>
              <span
                className={styles.associate__age}
              >{`Tipo de contrato: ${props.data.contractType}`}</span>
              <span
                className={styles.associate__age}
              >{`Última atualização do perfil: ${handleTimeStamps(
                props.data.lastAssociateUpdate[0].date
              ).toLocaleDateString("pt-br")}`}</span>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default TableItem;
