import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./AssociateCreateSpaceInitiativeForm.module.css";
import {
  AssociateObject,
  Board,
  BoardENUM,
  Committee,
  CommitteeENUM,
  FiscalCouncil,
  FiscalCouncilENUM,
  Iniciatives,
  IniciativesENUM,
} from "@/app/types/AssociateType";

import { AssociateCreateSpaceUtils } from "./AssociateCreateSpaceUtils";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import BigLabel from "../UI/BigLabel";
import AssociateCreateSpaceInitiativeFormNewInitiative from "./AssociateCreateSpaceInitiativeFormNewInitiative";
import AssociateCreateSpaceInitiativeFormNewCommittee from "./AssociateCreateSpaceInitiativeFormNewCommittee";
import AssociateCreateSpaceInitiativeFormNewBoard from "./AssociateCreateSpaceInitiativeFormNewBoard";
import AssociateCreateSpaceInitiativeFormNewFiscalCouncil from "./AssociateCreateSpaceInitiativeFormNewFiscalCouncil";

interface initiativeFormProps {
  associate: AssociateObject;
  associateUtils: AssociateCreateSpaceUtils;
  setAssociate: React.Dispatch<React.SetStateAction<AssociateObject>>;
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
  handleInitiativeDeleteIconClick: (initiative: Iniciatives) => void;
  handleCommitteeDeleteIconClick: (committe: Committee) => void;
  handleBoardDeleteIconClick: (boardEvent: Board) => void;
  handleFiscalCouncilDeleteIconClick: (
    fiscalCouncilEvent: FiscalCouncil
  ) => void;
}

const AssociateCreateSpaceInitiativeForm: React.FC<initiativeFormProps> = (
  props
) => {
  return (
    <>
      <BigLabel labelText="Iniciativas Asso & Conselhos" />
      <div className={styles.labelHeader}>
        <label className={styles.label}>
          Grupo de trabalho & Iniciativas formais:
        </label>
        <div className={styles.labelHeaderIcons}>
          <IoAdd
            className={styles.labelHeaderIcon}
            onClick={() => {
              props.setNewInitiative(!props.newInitiative);
            }}
          />
        </div>
      </div>
      {props.newInitiative ? (
        <AssociateCreateSpaceInitiativeFormNewInitiative
          associateUtils={props.associateUtils}
          newInitiative={props.newInitiative}
          newInitiativeEndDate={props.newInitiativeEndDate}
          newInitiativeIsCurrentlyValid={props.newInitiativeIsCurrentlyValid}
          newInitiativeOtherDescription={props.newInitiativeOtherDescription}
          newInitiativeStartDate={props.newInitiativeStartDate}
          newInitiativeTitle={props.newInitiativeTitle}
          setNewInitiative={props.setNewInitiative}
          setNewInitiativeEndDate={props.setNewInitiativeEndDate}
          setNewInitiativeIsCurrentlyValid={
            props.setNewInitiativeIsCurrentlyValid
          }
          setNewInitiativeOtherDescription={
            props.setNewInitiativeOtherDescription
          }
          setNewInitiativeStartDate={props.setNewInitiativeStartDate}
          setNewInitiativeTitle={props.setNewInitiativeTitle}
        />
      ) : (
        ""
      )}
      {props.associate.data.initiatives.map((iniciative) => {
        const newStartDate = props.associateUtils.handleTimeStampsToDate(
          iniciative.startDate
        );
        const newIniciative = {
          title: iniciative.title,
          startDate: props.associateUtils.handleTimeStampsToDate(
            iniciative.startDate
          ),
          endDate: iniciative.endDate
            ? props.associateUtils.handleTimeStampsToDate(iniciative.endDate)
            : null,
        };
        return (
          <div className={styles.iniciatives} key={Math.random()}>
            <div className={styles.eventsDivTitle}>
              <span className={styles.eventTitle}>{newIniciative.title}</span>
              <MdDelete
                className={styles.arrayDeleteIcon}
                onClick={() => {
                  props.handleInitiativeDeleteIconClick(iniciative);
                }}
              />
            </div>

            <p>Data de início:</p>
            <input
              className={styles.editInput}
              type="date"
              id="iniciativeStartDate"
              name="iniciativeStartDate"
              disabled={true}
              defaultValue={newIniciative.startDate}
            />
            {newIniciative.endDate ? (
              <>
                <p>Data de fim:</p>
                <input
                  className={styles.editInput}
                  type="date"
                  id="iniciativeEndDate"
                  name="iniciativeEndDate"
                  disabled={true}
                  defaultValue={newIniciative.endDate}
                />
              </>
            ) : (
              ""
            )}
          </div>
        );
      })}
      <div className={styles.labelHeader}>
        <label className={styles.label}>Comitê:</label>
        <div className={styles.labelHeaderIcons}>
          <IoAdd
            className={styles.labelHeaderIcon}
            onClick={() => {
              props.setNewCommittee(!props.newCommittee);
            }}
          />
        </div>
      </div>
      {props.newCommittee ? (
        <AssociateCreateSpaceInitiativeFormNewCommittee
          associateUtils={props.associateUtils}
          newCommittee={props.newCommittee}
          newCommitteeEndDate={props.newCommitteeEndDate}
          newCommitteeIsCurrentlyValid={props.newCommitteeIsCurrentlyValid}
          newCommitteeOtherDescription={props.newCommitteeOtherDescription}
          newCommitteeStartDate={props.newCommitteeStartDate}
          newCommitteeTitle={props.newCommitteeTitle}
          setNewCommittee={props.setNewCommittee}
          setNewCommitteeEndDate={props.setNewCommitteeEndDate}
          setNewCommitteeIsCurrentlyValid={
            props.setNewCommitteeIsCurrentlyValid
          }
          setNewCommitteeOtherDescription={
            props.setNewCommitteeOtherDescription
          }
          setNewCommitteeStartDate={props.setNewCommitteeStartDate}
          setNewCommitteeTitle={props.setNewCommitteeTitle}
        />
      ) : (
        ""
      )}
      {props.associate.data.committee.map((committee) => {
        const newCommittee = {
          title: committee.title,
          startDate: props.associateUtils.handleTimeStampsToDate(
            committee.startDate
          ),
          endDate: committee.endDate
            ? props.associateUtils.handleTimeStampsToDate(committee.endDate)
            : null,
        };
        return (
          <div className={styles.committee} key={Math.random()}>
            <div className={styles.eventsDivTitle}>
              <span className={styles.eventTitle}>{newCommittee.title}</span>
              <MdDelete
                className={styles.arrayDeleteIcon}
                onClick={() => {
                  props.handleCommitteeDeleteIconClick(committee);
                }}
              />
            </div>

            <p>Data de início:</p>
            <input
              className={styles.editInput}
              type="date"
              id="committeeStartDate"
              name="committeeStartDate"
              disabled={true}
              defaultValue={newCommittee.startDate}
            />
            <p>Data de fim:</p>
            <input
              className={styles.editInput}
              type="date"
              id="committeeEndDate"
              name="committeeEndDate"
              disabled={true}
              defaultValue={newCommittee.endDate || ""}
            />
          </div>
        );
      })}
      <div className={styles.labelHeader}>
        <label className={styles.label}>Conselho administrativo:</label>
        <div className={styles.labelHeaderIcons}>
          <IoAdd
            className={styles.labelHeaderIcon}
            onClick={() => {
              props.setNewBoard(!props.newBoard);
            }}
          />
        </div>
      </div>
      {props.newBoard ? (
        <AssociateCreateSpaceInitiativeFormNewBoard
          associateUtils={props.associateUtils}
          newBoard={props.newBoard}
          newBoardEndDate={props.newBoardEndDate}
          newBoardExtraInfo={props.newBoardExtraInfo}
          newBoardIsCurrentlyValid={props.newBoardIsCurrentlyValid}
          newBoardStartDate={props.newBoardStartDate}
          newBoardTitle={props.newBoardTitle}
          setNewBoard={props.setNewBoard}
          setNewBoardEndDate={props.setNewBoardEndDate}
          setNewBoardExtraInfo={props.setNewBoardExtraInfo}
          setNewBoardIsCurrentlyValid={props.setNewBoardIsCurrentlyValid}
          setNewBoardStartDate={props.setNewBoardStartDate}
          setNewBoardTitle={props.setNewBoardTitle}
        />
      ) : (
        ""
      )}
      {props.associate.data.board.map((boardMembership) => {
        const newBoardMembership = {
          title: boardMembership.title,
          startDate: props.associateUtils.handleTimeStampsToDate(
            boardMembership.startDate
          ),
          endDate: boardMembership.endDate
            ? props.associateUtils.handleTimeStampsToDate(
                boardMembership.endDate
              )
            : null,
          extraInfo: boardMembership.extraInfo,
        };
        return (
          <div className={styles.boardMembership} key={Math.random()}>
            <div className={styles.eventsDivTitle}>
              <p className={styles.boardMembershipTitle}>
                {newBoardMembership.title}
              </p>
              <MdDelete
                className={styles.arrayDeleteIcon}
                onClick={() => {
                  props.handleBoardDeleteIconClick(boardMembership);
                }}
              />
            </div>

            <p className={styles.boardMembershipTitleDescription}>
              {newBoardMembership.extraInfo}
            </p>
            <p>Data de início:</p>
            <input
              className={styles.editInput}
              type="date"
              id="boardMembershipStartDate"
              name="boardMembershipStartDate"
              disabled={true}
              defaultValue={newBoardMembership.startDate}
            />
            <p>Data de fim:</p>
            <input
              className={styles.editInput}
              type="date"
              id="boardMembershipEndDate"
              name="boardMembershipEndDate"
              disabled={true}
              defaultValue={newBoardMembership.endDate || ""}
            />
          </div>
        );
      })}
      <div className={styles.labelHeader}>
        <label className={styles.label}>Conselho fiscal:</label>
        <div className={styles.labelHeaderIcons}>
          <IoAdd
            className={styles.labelHeaderIcon}
            onClick={() => {
              props.setNewFiscalCouncil(!props.newFiscalCouncil);
            }}
          />
        </div>
      </div>
      {props.newFiscalCouncil ? (
        <AssociateCreateSpaceInitiativeFormNewFiscalCouncil
          associateUtils={props.associateUtils}
          newFiscalCouncil={props.newFiscalCouncil}
          newFiscalCouncilEndDate={props.newFiscalCouncilEndDate}
          newFiscalCouncilExtraInfo={props.newFiscalCouncilExtraInfo}
          newFiscalCouncilIsCurrentlyValid={
            props.newFiscalCouncilIsCurrentlyValid
          }
          newFiscalCouncilStartDate={props.newFiscalCouncilStartDate}
          newFiscalCouncilTitle={props.newFiscalCouncilTitle}
          setNewFiscalCouncil={props.setNewFiscalCouncil}
          setNewFiscalCouncilEndDate={props.setNewFiscalCouncilEndDate}
          setNewFiscalCouncilExtraInfo={props.setNewFiscalCouncilExtraInfo}
          setNewFiscalCouncilIsCurrentlyValid={
            props.setNewFiscalCouncilIsCurrentlyValid
          }
          setNewFiscalCouncilStartDate={props.setNewFiscalCouncilStartDate}
          setNewFiscalCouncilTitle={props.setNewFiscalCouncilTitle}
        />
      ) : (
        ""
      )}
      {props.associate.data.fiscalCouncil.map((fiscalCouncilMembership) => {
        const newFiscalCouncilMembership = {
          title: fiscalCouncilMembership.title,
          startDate: props.associateUtils.handleTimeStampsToDate(
            fiscalCouncilMembership.startDate
          ),
          endDate: fiscalCouncilMembership.endDate
            ? props.associateUtils.handleTimeStampsToDate(
                fiscalCouncilMembership.endDate
              )
            : null,
          extraInfo: fiscalCouncilMembership.extraInfo,
        };
        return (
          <div className={styles.boardMembership} key={Math.random()}>
            <div className={styles.eventsDivTitle}>
              <p className={styles.boardMembershipTitle}>
                {newFiscalCouncilMembership.title}
              </p>
              <MdDelete
                className={styles.arrayDeleteIcon}
                onClick={() => {
                  props.handleFiscalCouncilDeleteIconClick(
                    fiscalCouncilMembership
                  );
                }}
              />
            </div>

            <p className={styles.boardMembershipTitleDescription}>
              {newFiscalCouncilMembership.extraInfo}
            </p>
            <p>Data de início:</p>
            <input
              className={styles.editInput}
              type="date"
              id="boardMembershipStartDate"
              name="boardMembershipStartDate"
              disabled={true}
              defaultValue={newFiscalCouncilMembership.startDate}
            />
            <p>Data de fim:</p>
            <input
              className={styles.editInput}
              type="date"
              id="boardMembershipEndDate"
              name="boardMembershipEndDate"
              disabled={true}
              defaultValue={newFiscalCouncilMembership.endDate || ""}
            />
          </div>
        );
      })}
      <label className={styles.label} htmlFor="otherInitiatives">
        Outras iniciativas:
      </label>
      <textarea
        className={styles.editTextArea}
        placeholder=""
        defaultValue={props.associate.data.otherInitiatives}
        id="otherInitiatives"
        onChange={props.associateUtils.handleOtherInitiativesInputChange}
      />
    </>
  );
};

export default AssociateCreateSpaceInitiativeForm;
