"use client";

import React from "react";
import styles from "./Table.module.css";
import TableItem from "./TableItem";
import Input from "../UI/Input";
import { useGlobalContext } from "@/app/context/store";

const Table: React.FC = () => {
  const {
    associatesData,
    associatesWorkData,
    backdrop,
    setBackdrop,
    setWorkspaceIsActive,
    setActiveItem,
    setWorkspace,
    setAssociatesWorkData,
    setEventArray,
  } = useGlobalContext();
  return (
    <>
      {backdrop ? (
        <div
          className={`${styles.background} ${styles.active}`}
          onClick={() => {
            setBackdrop(false);
            setWorkspaceIsActive(false);
            setActiveItem("");
            setWorkspace({
              title: ``,
              action: null,
              children: <div></div>,
            });
            setEventArray([]);
          }}
        >
          {""}
        </div>
      ) : (
        ""
      )}
      <div className={styles.table}>
        <Input
          placeholder="Procure por um associado"
          value=""
          disabled={false}
          id="search"
          onChange={(event) => {
            const searchResult = associatesData.filter((associate) =>
              Object.values(associate.data).some((value) => {
                const valueInString = String(value).toUpperCase();
                const valueSearched = event.target.value;
                return valueInString.includes(valueSearched.toUpperCase());
              })
            );
            setAssociatesWorkData(searchResult);
          }}
        />
        <span className={styles.tableTitle}>Lista de associados:</span>
        {associatesWorkData.map((associate) => {
          return (
            <TableItem
              key={associate.id}
              id={associate.id}
              data={associate.data}
            />
          );
        })}
      </div>
    </>
  );
};

export default Table;
