"use client";

import React from "react";
import styles from "./YearWorkspace.module.css";
import { useGlobalContext } from "@/app/context/store";
import { YearResponseType } from "@/app/types/YearType";

import Year from "./Year";

const YearWorkspace: React.FC = () => {
  const { yearData, associatesData } = useGlobalContext();

  return (
    <div className={styles.year}>
      {yearData
        .sort(function (a, b) {
          return a.data.year - b.data.year;
        })
        .map((yearDataItem: YearResponseType) => {
          return (
            <Year
              yearDataItem={yearDataItem}
              associatesData={associatesData}
              id={yearDataItem.id}
              key={yearDataItem.id}
            />
          );
        })}
    </div>
  );
};

export default YearWorkspace;
