import React from "react";
import styles from "./AssociateWorkspaceInitiativeFormNewFiscalCouncil.module.css";
import { FiscalCouncilENUM } from "@/app/types/AssociateType";
import { AssociateWorkspaceUtils } from "./AssociateWorkspaceUtils";

interface associateCreateSpaceFiscalCouncilFormNewBoardProps {
  associateUtils: AssociateWorkspaceUtils;
  newFiscalCouncil: boolean;
  setNewFiscalCouncil: React.Dispatch<React.SetStateAction<boolean>>;
  newFiscalCouncilTitle: string;
  setNewFiscalCouncilTitle: React.Dispatch<React.SetStateAction<string>>;
  newFiscalCouncilExtraInfo: string;
  setNewFiscalCouncilExtraInfo: React.Dispatch<React.SetStateAction<string>>;
  newFiscalCouncilStartDate: Date | undefined;
  setNewFiscalCouncilStartDate: React.Dispatch<
    React.SetStateAction<Date | undefined>
  >;
  newFiscalCouncilEndDate: Date | undefined;
  setNewFiscalCouncilEndDate: React.Dispatch<
    React.SetStateAction<Date | undefined>
  >;
  newFiscalCouncilIsCurrentlyValid: boolean;
  setNewFiscalCouncilIsCurrentlyValid: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const AssociateCreateSpaceFiscalCouncilFormNewBoard: React.FC<
  associateCreateSpaceFiscalCouncilFormNewBoardProps
> = (props) => {
  return (
    <>
      <div className={styles.newIniciatives}>
        <input
          className={styles.editInput}
          list="newFiscalCouncilList"
          id="newFiscalCouncil"
          name="newFiscalCouncil"
          onChange={(event) => {
            props.setNewFiscalCouncilTitle(event.target.value);
          }}
        />

        <datalist id="newFiscalCouncilList">
          <option value={FiscalCouncilENUM.candidate}></option>
          <option value={FiscalCouncilENUM.interested}></option>
          <option value={FiscalCouncilENUM.notInterested}></option>
        </datalist>
        <input
          className={styles.editInput}
          placeholder=""
          defaultValue={""}
          id="newFiscalCouncil"
          onChange={(event) => {
            props.setNewFiscalCouncilExtraInfo(event.target.value);
          }}
        />
        <p className={styles.eventTitle}>{}</p>
        <p>Data de início:</p>
        <input
          className={styles.editInput}
          type="date"
          id="newFiscalCouncilStartDate"
          name="newFiscalCouncilStartDate"
          onChange={(event) => {
            const date = new Date(event.target.value);
            date.setHours(date.getHours() + 10);
            props.setNewFiscalCouncilStartDate(date);
          }}
        />
        <p>Data de fim:</p>
        <input
          className={styles.editInput}
          type="date"
          id="newFiscalCouncilEndDate"
          name="newFiscalCouncilEndDate"
          onChange={(event) => {
            const date = new Date(event.target.value);
            date.setHours(date.getHours() + 10);
            props.setNewFiscalCouncilEndDate(date);
          }}
        />
        <button
          className={styles.saveButton}
          onClick={() => {
            props.associateUtils.handleFiscalCouncilChange(
              props.newFiscalCouncilTitle,
              props.newFiscalCouncilExtraInfo,
              props.newFiscalCouncilStartDate || new Date(),
              props.newFiscalCouncilEndDate || new Date(),
              props.newFiscalCouncilIsCurrentlyValid || false
            );
            props.setNewFiscalCouncil(false);
          }}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default AssociateCreateSpaceFiscalCouncilFormNewBoard;
