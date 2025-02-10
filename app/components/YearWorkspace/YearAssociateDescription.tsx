import { AssociateObject } from "@/app/types/AssociateType";
import {
  EntriesType,
  PaymentMethodENUM,
  YearResponseType,
} from "@/app/types/YearType";
import { VoteChoicesENUM } from "@/app/types/YearType";
import styles from "./YearAssociateDescription.module.css";
import { ChangeEvent, useState } from "react";

import { MdDelete, MdEdit, MdClose } from "react-icons/md";
import { useGlobalContext } from "@/app/context/store";

interface YearAssociateDescriptionProps {
  yearDataItem: YearResponseType;
  associatesData: AssociateObject[];
  associate: AssociateObject;
  entrie: EntriesType;
  id: string;
  year: number;
  oldEntries: EntriesType[];
  handleYearUpdate: (
    id: string,
    year: number,
    oldEntries: EntriesType[],
    entrieToBeUpdated: EntriesType
  ) => {};
  handleYearDelete: (
    id: string,
    year: number,
    oldEntries: EntriesType[],
    entrieToBeUpdated: EntriesType
  ) => {};
}

const handleTimeStamps = (timestamp: any) => {
  const date = new Date(timestamp.seconds * 1000);
  return date;
};

const handleTimeStampsToDate = (timestamp: Date) => {
  // timestamp.setHours(13, 0, 0, 0);
  const year = timestamp.getFullYear();
  const month = (timestamp.getMonth() + 1).toString().padStart(2, "0");
  const day = timestamp.getDate().toString().padStart(2, "0");
  const formatedDate = `${year}-${month}-${day}`;
  return formatedDate;
};

const YearAssociateDescription: React.FC<YearAssociateDescriptionProps> = (
  props: YearAssociateDescriptionProps
) => {
  const { yearData } = useGlobalContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [entrieDate, setEntrieDate] = useState<Date>(
    handleTimeStamps(props.entrie.date)
  );
  const [entrieRightToVote, setEntrieRightToVote] = useState<VoteChoicesENUM[]>(
    props.entrie.rightToVote
  );
  const [entrieOtherRightToVote, setEntrieOtherRightToVote] = useState<
    string | null
  >(props.entrie.otherChoiceRightToVote);
  const [entrieVoted, setEntrieVoted] = useState<string[]>(props.entrie.voted);
  const [entrieAnnualFeeValue, setEntrieAnnualFeeValue] = useState<number>(
    props.entrie.annualFeeValue
  );
  const [entrieReceipt, setEntrieReceipt] = useState<boolean>(
    props.entrie.receipt
  );
  const [entriePaymentMethod, setEntriePaymentMethod] =
    useState<PaymentMethodENUM>(props.entrie.paymentMethod);
  const [entrieOtherPaymentMethod, setEntrieOtherPaymentMethod] = useState<
    string | null
  >(props.entrie.otherPaymentMethod);

  const [voteToBeAdded, setVoteToBeAdded] = useState<string>("");

  return (
    <>
      <>
        {props.associate ? (
          <div className={styles.associateItem}>
            <img
              className={styles.associateItem__profilePhoto}
              src={props.associate.data.profilePhoto}
            />
            <label
              className={`${styles.associateItem__title} ${
                isOpen ? styles.associateItem__titleOpen : ""
              }`}
              htmlFor="fullName"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {props.associate.data.fullName}
            </label>
            {isOpen ? (
              <div className={styles.associateItem__menu}>
                <MdEdit
                  className={`${styles.associateItem__menu_Edit} ${
                    isEdit ? styles.associateItem__menu_EditToggled : ""
                  }`}
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                />
                <MdDelete
                  className={styles.associateItem__menu_Delete}
                  onClick={() => {
                    props.handleYearDelete(
                      props.id,
                      props.year,
                      props.oldEntries,
                      {
                        id: props.entrie.id,
                        annualFeeValue: entrieAnnualFeeValue,
                        date: entrieDate,
                        otherChoiceRightToVote: entrieOtherRightToVote,
                        otherPaymentMethod: entrieOtherRightToVote,
                        paymentMethod: entriePaymentMethod,
                        receipt: entrieReceipt,
                        rightToVote: entrieRightToVote,
                        voted: entrieVoted,
                      }
                    );
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <label className={styles.label} htmlFor="fullName">
            Associado não encontrado.
          </label>
        )}
        {isOpen ? (
          <>
            <label className={styles.label} htmlFor="annualFeeValue">
              Valor pago:
            </label>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEntrieAnnualFeeValue(+event.target.value)
              }
              type="number"
              className={styles.editInput}
              placeholder=""
              defaultValue={entrieAnnualFeeValue || ""}
              id="annualFeeValue"
              disabled={!isEdit}
            />
            <label className={styles.label} htmlFor="annualFeeValue">
              Meio de pagamento:
            </label>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setEntriePaymentMethod(event.target.value as PaymentMethodENUM);
              }}
              list="paymentMethodList"
              className={styles.editInput}
              placeholder=""
              defaultValue={entriePaymentMethod || ""}
              id="annualFeeValue"
              disabled={!isEdit}
            />
            <datalist id="paymentMethodList">
              <option value={PaymentMethodENUM.pix}></option>
              <option value={PaymentMethodENUM.paypal}></option>
              <option value={PaymentMethodENUM.other}></option>
            </datalist>
            {entriePaymentMethod == "Outro" ? (
              <>
                <label className={styles.label} htmlFor="annualFeeValue">
                  Outro meio de pagamento: {entrieOtherPaymentMethod}
                </label>
                <input
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setEntrieOtherPaymentMethod(event.target.value)
                  }
                  className={styles.editInput}
                  placeholder=""
                  defaultValue={entrieOtherPaymentMethod || ""}
                  id="annualFeeValue"
                  disabled={!isEdit}
                />
              </>
            ) : (
              ""
            )}

            <label className={styles.label} htmlFor="props.entrieDate">
              Data:
            </label>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const newDate = new Date(event.target.value);
                newDate.setHours(newDate.getHours() + 10);
                setEntrieDate(newDate);
              }}
              className={styles.editInput}
              type="date"
              id="props.entrieDate"
              name="props.entrieDate"
              disabled={!isEdit}
              defaultValue={handleTimeStampsToDate(entrieDate)}
            />
            <label className={styles.label}>Comprovante de pagamento:</label>
            <label className={styles.switch}>
              <input
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setEntrieReceipt(event.target.checked);
                }}
                disabled={!isEdit}
                defaultChecked={`${entrieReceipt}` == "true"}
                type="checkbox"
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            <label
              className={styles.label}
              htmlFor="communicationAccebilityResources"
            >
              Direito à voto:
            </label>
            <div className={styles.inputPreview}>
              <div>
                <input
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const rightToVoteValue = event.target
                      .value as VoteChoicesENUM;
                    setEntrieRightToVote((prevEntrieRightToVote) =>
                      event.target.checked
                        ? [...prevEntrieRightToVote, rightToVoteValue]
                        : prevEntrieRightToVote.filter(
                            (voteChoice) => voteChoice !== rightToVoteValue
                          )
                    );
                  }}
                  disabled={!isEdit}
                  type="checkbox"
                  id="AG"
                  name="AG"
                  className={styles.css_checkbox}
                  defaultChecked={
                    entrieRightToVote
                      ? entrieRightToVote.includes(VoteChoicesENUM.ag)
                      : false
                  }
                  value={VoteChoicesENUM.ag}
                />

                <label htmlFor="AG"> {VoteChoicesENUM.ag}</label>
              </div>
              <div>
                <input
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const rightToVoteValue = event.target
                      .value as VoteChoicesENUM;
                    setEntrieRightToVote((prevEntrieRightToVote) =>
                      event.target.checked
                        ? [...prevEntrieRightToVote, rightToVoteValue]
                        : prevEntrieRightToVote.filter(
                            (voteChoice) => voteChoice !== rightToVoteValue
                          )
                    );
                  }}
                  disabled={!isEdit}
                  type="checkbox"
                  id="OCBGathering"
                  name="OCBGathering"
                  className={styles.css_checkbox}
                  defaultChecked={
                    entrieRightToVote
                      ? entrieRightToVote.includes(VoteChoicesENUM.ocbGathering)
                      : false
                  }
                  value={VoteChoicesENUM.ocbGathering}
                />

                <label htmlFor="OCBGathering">
                  {" "}
                  {VoteChoicesENUM.ocbGathering}
                </label>
              </div>
              <div>
                <input
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const rightToVoteValue = event.target
                      .value as VoteChoicesENUM;
                    setEntrieRightToVote((prevEntrieRightToVote) =>
                      event.target.checked
                        ? [...prevEntrieRightToVote, rightToVoteValue]
                        : prevEntrieRightToVote.filter(
                            (voteChoice) => voteChoice !== rightToVoteValue
                          )
                    );
                  }}
                  disabled={!isEdit}
                  type="checkbox"
                  id="other"
                  name="other"
                  className={styles.css_checkbox}
                  defaultChecked={
                    entrieRightToVote
                      ? entrieRightToVote.includes(VoteChoicesENUM.other)
                      : false
                  }
                  value={VoteChoicesENUM.other}
                />

                <label htmlFor="other"> {VoteChoicesENUM.other}</label>
              </div>
              <div>
                <input
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const rightToVoteValue = event.target
                      .value as VoteChoicesENUM;
                    setEntrieRightToVote((prevEntrieRightToVote) =>
                      event.target.checked
                        ? [...prevEntrieRightToVote, rightToVoteValue]
                        : prevEntrieRightToVote.filter(
                            (voteChoice) => voteChoice !== rightToVoteValue
                          )
                    );
                  }}
                  disabled={!isEdit}
                  type="checkbox"
                  id="none"
                  name="none"
                  className={styles.css_checkbox}
                  defaultChecked={
                    entrieRightToVote
                      ? entrieRightToVote.includes(VoteChoicesENUM.none)
                      : false
                  }
                  value={VoteChoicesENUM.none}
                />

                <label htmlFor="none"> {VoteChoicesENUM.none}</label>
              </div>
            </div>
            {entrieRightToVote.includes(VoteChoicesENUM.other) ? (
              <>
                <label className={styles.label} htmlFor="other">
                  {`Outro(s) evento(s) com direito à voto:`}
                </label>
                <input
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setEntrieOtherRightToVote(event.target.value);
                  }}
                  disabled={!isEdit}
                  className={styles.editInput}
                  placeholder=""
                  defaultValue={entrieOtherRightToVote || ""}
                  id="other"
                />
              </>
            ) : (
              ""
            )}
            <label className={styles.label} htmlFor="annualFeeValue">
              Votos:
            </label>
            {isEdit ? (
              <>
                <label className={styles.label} htmlFor="addVote">
                  Adicionar voto:
                </label>
                <input
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setVoteToBeAdded(event.target.value);
                  }}
                  list="voteToBeAdded"
                  className={styles.editInput}
                  id="addVote"
                  value={voteToBeAdded}
                />
                <datalist id="voteToBeAdded">
                  <option value={VoteChoicesENUM.ag}></option>
                  <option value={VoteChoicesENUM.ocbGathering}></option>
                </datalist>
                <button
                  className={styles.saveButton}
                  onClick={() => {
                    setEntrieVoted([...entrieVoted, voteToBeAdded]);
                    setVoteToBeAdded("");
                  }}
                >
                  Adicionar
                </button>
              </>
            ) : (
              ""
            )}
            {entrieVoted.length !== 0 ? (
              <div className={styles.votedDiv}>
                {entrieVoted.map((vote: string) => {
                  return (
                    <>
                      <span className={styles.votedSpan}>
                        {vote}{" "}
                        {isEdit ? (
                          <>
                            <MdClose
                              className={styles.closeIcon}
                              onClick={() => {
                                let newArrayVoted: Array<string> =
                                  entrieVoted.filter((voted) => voted !== vote);
                                setEntrieVoted(newArrayVoted);
                              }}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </span>
                    </>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            {isEdit ? (
              <button
                className={styles.saveButton}
                onClick={() => {
                  props.handleYearUpdate(
                    props.id,
                    props.year,
                    props.oldEntries,
                    {
                      id: props.entrie.id,
                      annualFeeValue: entrieAnnualFeeValue,
                      date: entrieDate,
                      otherChoiceRightToVote: entrieOtherRightToVote!,
                      otherPaymentMethod: entrieOtherPaymentMethod!,
                      paymentMethod: entriePaymentMethod,
                      receipt: entrieReceipt,
                      rightToVote: entrieRightToVote,
                      voted: entrieVoted,
                    }
                  );
                }}
              >
                Salvar
              </button>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </>
    </>
  );
};

export default YearAssociateDescription;
