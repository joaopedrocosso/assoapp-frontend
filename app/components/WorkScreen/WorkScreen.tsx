"use client";
import LateralWorkspace from "../LateralWorkspace/LateralWorkspace";
import { ChangeEvent, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { useGlobalContext } from "../../context/store";
import InfoModal from "../InfoModal/InfoModal";
import Nav from "../Nav/Nav";
import LateralMenu from "../LateralMenu/LateralMenu";

import Table from "../Table/Table";
import styles from "./WorkScreen.module.css";
import { UserType } from "@/app/types/UserType";

const WorkScreen: React.FC = (props) => {
  const {
    setAssociatesData,
    setAssociatesWorkData,
    setYearData,
    user,
    setUser,
    setBackOfficeUsers,
    backEndURL,
  } = useGlobalContext();

  let getUserInfo = async () => {
    await fetch(
      `${backEndURL}user/backoffice/getUserInfo/all?accessKey=${user?.accessToken}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())

      .then(async (data) => {
        console.log(data);
        console.log(user?.uid);
        await data.map((userFetched: any) => {
          if (userFetched.data.uid == user?.uid) {
            let newUser: UserType = {
              accessToken: user?.accessToken,
              email: user?.email,
              uid: user?.uid,
              profilePhoto: userFetched.data.profilePhoto,
              name: userFetched.data.name,
            };
            setUser(newUser);
            console.log("Depois de adicionar foto e nome");
            console.log(user);
            return newUser;
          }
        });
        setBackOfficeUsers(data);
      });
  };

  useEffect(() => {
    fetch(`${backEndURL}associate/readall?accessKey=${user?.accessToken}`).then(
      (response) => {
        console.log(user);
        response.json().then((data) => {
          setAssociatesData(data);
          setAssociatesWorkData(data);
        });
      }
    );
    fetch(`${backEndURL}year/readall?accessKey=${user?.accessToken}`).then(
      (response) => {
        response.json().then((data) => {
          setYearData(data);
        });
      }
    );
    getUserInfo();
  }, []);

  return (
    <>
      <Nav />
      <div className={styles.mainBody}>
        <LateralMenu />
        <div className={styles.content}>
          <Table />
          <LateralWorkspace />
        </div>
      </div>
      <InfoModal />
    </>
  );
};

export default WorkScreen;
