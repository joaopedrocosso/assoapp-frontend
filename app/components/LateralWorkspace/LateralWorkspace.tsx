"use client";

import React, { useState } from "react";
import styles from "./LateralWorkspace.module.css";
import { useGlobalContext } from "@/app/context/store";
import { MdOutlineEditNote } from "react-icons/md";
import { IoCloseSharp, IoSave } from "react-icons/io5";

interface propsWorkspace {}

const LateralWorkspace: React.FC = (props) => {
  const {
    workspaceIsActive,
    setWorkspaceIsActive,
    workspace,
    setActiveItem,
    setBackdrop,
    setWorkspace,
    setEventArray,
  } = useGlobalContext();
  return (
    <div
      className={`${styles.lateralworkspace} ${
        workspaceIsActive ? styles.active : ""
      }`}
    >
      <div className={styles.header}>
        <MdOutlineEditNote />
        <h1>{workspace.title}</h1>
        <div className={styles.leftIcons}>
          {workspace.action !== null ? (
            <IoSave className={styles.saveIcon} onClick={workspace.action} />
          ) : (
            ""
          )}

          <IoCloseSharp
            className={styles.closeIcon}
            onClick={() => {
              setWorkspace({
                title: ``,
                action: null,
                children: <div></div>,
              });
              setWorkspaceIsActive(false);
              setActiveItem("");
              setBackdrop(false);
              setEventArray([]);
            }}
          />
        </div>
      </div>
      {workspace.children}
    </div>
  );
};

export default LateralWorkspace;
