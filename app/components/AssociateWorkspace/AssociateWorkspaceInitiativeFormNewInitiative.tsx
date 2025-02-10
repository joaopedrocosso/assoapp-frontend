import React from "react";
import styles from "./AssociateWorkspaceInitiativeFormNewInitiative.module.css";
import { IniciativesENUM } from "@/app/types/AssociateType";
import { AssociateWorkspaceUtils } from "./AssociateWorkspaceUtils";

interface associateCreateSpaceInitiativeFormNewInitiativeProps {
  associateUtils: AssociateWorkspaceUtils;
  newInitiative: boolean;
  setNewInitiative: React.Dispatch<React.SetStateAction<boolean>>;
  newInitiativeTitle: string;
  setNewInitiativeTitle: React.Dispatch<React.SetStateAction<string>>;
  newInitiativeStartDate: Date | undefined;
  setNewInitiativeStartDate: React.Dispatch<
    React.SetStateAction<Date | undefined>
  >;
  newInitiativeEndDate: Date | undefined;
  setNewInitiativeEndDate: React.Dispatch<
    React.SetStateAction<Date | undefined>
  >;
  newInitiativeOtherDescription: string;
  setNewInitiativeOtherDescription: React.Dispatch<
    React.SetStateAction<string>
  >;
  newInitiativeIsCurrentlyValid: boolean;
  setNewInitiativeIsCurrentlyValid: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const AssociateCreateSpaceInitiativeFormNewInitiative: React.FC<
  associateCreateSpaceInitiativeFormNewInitiativeProps
> = (props) => {
  return (
    <>
      <div className={styles.newIniciatives}>
        <input
          className={styles.editInput}
          list="newInitiativeList"
          id="newInitiative"
          name="newInitiative"
          onChange={(event) => {
            props.setNewInitiativeTitle(event.target.value);
          }}
        />

        <datalist id="newInitiativeList">
          <option value={IniciativesENUM.facilitadores}></option>
          <option value={IniciativesENUM.gtEquidade}></option>
          <option value={IniciativesENUM.gtGovernanca}></option>
          <option value={IniciativesENUM.gtSMAsso}></option>
          <option value={IniciativesENUM.outros}></option>
        </datalist>
        {props.newInitiativeTitle === IniciativesENUM.outros ? (
          <input
            className={styles.editInput}
            placeholder=""
            id="newInitiativeOtherDescription"
            onChange={(event) => {
              props.setNewInitiativeOtherDescription(event.target.value);
            }}
          />
        ) : (
          ""
        )}
        <p className={styles.eventTitle}>{}</p>
        <p>Data de início:</p>
        <input
          className={styles.editInput}
          type="date"
          id="newInitiativeStartDate"
          name="newInitiativeStartDate"
          onChange={(event) => {
            const date = new Date(event.target.value);
            date.setHours(date.getHours() + 10);
            props.setNewInitiativeStartDate(date);
          }}
        />
        <p>Está ativo? {props.newInitiativeIsCurrentlyValid}</p>
        <div className={styles.iniciativeSwitch}>
          <label className={styles.switch}>
            <input
              onChange={(event) => {
                props.setNewInitiativeIsCurrentlyValid(event.target.checked);
              }}
              defaultChecked={true}
              type="checkbox"
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        {!props.newInitiativeIsCurrentlyValid ? (
          <>
            <p>Data de fim:</p>
            <input
              className={styles.editInput}
              type="date"
              id="newInitiativeEndDate"
              name="newInitiativeEndDate"
              onChange={(event) => {
                const date = new Date(event.target.value);
                date.setHours(date.getHours() + 10);
                props.setNewInitiativeEndDate(date);
              }}
            />
          </>
        ) : (
          ""
        )}

        <button
          className={styles.saveButton}
          onClick={() => {
            props.associateUtils.handleInitiativeChange(
              props.newInitiativeTitle,
              props.newInitiativeStartDate!,
              props.newInitiativeEndDate!,
              props.newInitiativeIsCurrentlyValid || false,
              props.newInitiativeOtherDescription || ""
            );
            props.setNewInitiative(false);
          }}
        >
          Salvar
        </button>
      </div>
    </>
  );
};

export default AssociateCreateSpaceInitiativeFormNewInitiative;
