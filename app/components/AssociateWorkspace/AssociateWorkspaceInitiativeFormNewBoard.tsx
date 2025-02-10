import React from "react";
import styles from "./AssociateWorkspaceInitiativeFormNewBoard.module.css";
import {
  BoardENUM,
  CommitteeENUM,
  IniciativesENUM,
} from "@/app/types/AssociateType";
import { AssociateWorkspaceUtils } from "./AssociateWorkspaceUtils";

interface associateCreateSpaceInitiativeFormNewBoardProps {
  associateUtils: AssociateWorkspaceUtils;
  newBoard: boolean;
  setNewBoard: React.Dispatch<React.SetStateAction<boolean>>;
  newBoardTitle: string;
  setNewBoardTitle: React.Dispatch<React.SetStateAction<string>>;
  newBoardExtraInfo: string;
  setNewBoardExtraInfo: React.Dispatch<React.SetStateAction<string>>;
  newBoardStartDate: Date | undefined;
  setNewBoardStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  newBoardEndDate: Date | undefined;
  setNewBoardEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  newBoardIsCurrentlyValid: boolean;
  setNewBoardIsCurrentlyValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssociateCreateSpaceInitiativeFormNewBoard: React.FC<
  associateCreateSpaceInitiativeFormNewBoardProps
> = (props) => {
  return (
    <>
      <div className={styles.newIniciatives}>
        <input
          className={styles.editInput}
          list="newBoardList"
          id="NewBoard"
          name="NewBoard"
          onChange={(event) => {
            props.setNewBoardTitle(event.target.value);
          }}
        />

        <datalist id="newBoardList">
          <option value={BoardENUM.candidate}></option>
          <option value={BoardENUM.interested}></option>
          <option value={BoardENUM.notInterested}></option>
        </datalist>
        <input
          className={styles.editInput}
          placeholder=""
          id="newBoardExtraInfo"
          onChange={(event) => {
            props.setNewBoardExtraInfo(event.target.value);
          }}
        />
        <p className={styles.eventTitle}>{}</p>
        <p>Data de início:</p>
        <input
          className={styles.editInput}
          type="date"
          id="newBoardStartDate"
          name="newBoardStartDate"
          onChange={(event) => {
            const date = new Date(event.target.value);
            date.setHours(date.getHours() + 10);
            props.setNewBoardStartDate(date);
          }}
        />
        <p>Data de fim:</p>
        <input
          className={styles.editInput}
          type="date"
          id="newBoardEndDate"
          name="newBoardEndDate"
          onChange={(event) => {
            const date = new Date(event.target.value);
            date.setHours(date.getHours() + 10);
            props.setNewBoardEndDate(date);
          }}
        />
        <button
          className={styles.saveButton}
          onClick={() => {
            props.associateUtils.handleBoardChange(
              props.newBoardTitle,
              props.newBoardExtraInfo,
              props.newBoardStartDate || new Date(),
              props.newBoardEndDate || new Date(),
              props.newBoardIsCurrentlyValid || false
            );
            props.setNewBoard(false);
          }}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default AssociateCreateSpaceInitiativeFormNewBoard;
