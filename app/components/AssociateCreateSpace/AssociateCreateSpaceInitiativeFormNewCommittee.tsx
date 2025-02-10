import React from "react";
import styles from "./AssociateCreateSpaceInitiativeFormNewInitiative.module.css";
import { CommitteeENUM, IniciativesENUM } from "@/app/types/AssociateType";
import { AssociateCreateSpaceUtils } from "./AssociateCreateSpaceUtils";

interface associateCreateSpaceInitiativeFormNewCommitteeProps {
  associateUtils: AssociateCreateSpaceUtils;
  newCommittee: boolean;
  setNewCommittee: React.Dispatch<React.SetStateAction<boolean>>;
  newCommitteeTitle: string;
  setNewCommitteeTitle: React.Dispatch<React.SetStateAction<string>>;
  newCommitteeStartDate: Date | undefined;
  setNewCommitteeStartDate: React.Dispatch<
    React.SetStateAction<Date | undefined>
  >;
  newCommitteeEndDate: Date | undefined;
  setNewCommitteeEndDate: React.Dispatch<
    React.SetStateAction<Date | undefined>
  >;
  newCommitteeOtherDescription: string;
  setNewCommitteeOtherDescription: React.Dispatch<React.SetStateAction<string>>;
  newCommitteeIsCurrentlyValid: boolean;
  setNewCommitteeIsCurrentlyValid: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  
}

const AssociateCreateSpaceInitiativeFormNewCommittee: React.FC<
  associateCreateSpaceInitiativeFormNewCommitteeProps
> = (props) => {
  return (
    <>
      <div className={styles.newIniciatives}>
        <input
          className={styles.editInput}
          list="newCommitteeList"
          id="newCommittee"
          name="newCommittee"
          onChange={(event) => {
            props.setNewCommitteeTitle(event.target.value);
          }}
        />

        <datalist id="newCommitteeList">
          <option value={CommitteeENUM.candidaturas}></option>
          <option value={CommitteeENUM.mocoes}></option>
          <option value={CommitteeENUM.outros}></option>
        </datalist>

        <p className={styles.eventTitle}>{}</p>
        <p>Data de início:</p>
        <input
          className={styles.editInput}
          type="date"
          id="newCommitteeStartDate"
          name="newCommitteeStartDate"
          onChange={(event) => {
            const date = new Date(event.target.value);
            date.setHours(date.getHours() + 10);
            props.setNewCommitteeStartDate(date);
          }}
        />
        <p>Data de fim:</p>
        <input
          className={styles.editInput}
          type="date"
          id="newCommitteeEndDate"
          name="newCommitteeEndDate"
          onChange={(event) => {
            const date = new Date(event.target.value);
            date.setHours(date.getHours() + 10);
            props.setNewCommitteeEndDate(date);
          }}
        />
        <button
          className={styles.saveButton}
          onClick={() => {
            props.associateUtils.handleCommitteeChange(
              props.newCommitteeTitle,
              props.newCommitteeStartDate || new Date(),
              props.newCommitteeEndDate || new Date(),
              props.newCommitteeIsCurrentlyValid || false,
              props.newCommitteeOtherDescription || ""
            );
            props.setNewCommittee(false);
          }}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default AssociateCreateSpaceInitiativeFormNewCommittee;
