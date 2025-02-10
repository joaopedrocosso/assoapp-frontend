import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./YearAssociateAddForm.module.css";
import { AssociateObject } from "@/app/types/AssociateType";
import {
  PaymentMethodENUM,
  VoteChoicesENUM,
  EntriesType,
} from "@/app/types/YearType";
import { MdClose } from "react-icons/md";
import InputNumberForm from "../UI/InputNumberForm";
import DropBoxForm from "../UI/DropboxForm";
import FormInput from "../UI/FormInput";
import DateForm from "../UI/DateForm";
import ToggleForm from "../UI/ToggleForm";
import { useGlobalContext } from "@/app/context/store";

interface yearAssociateAddFormProps {
  associateToBeAdded: AssociateObject;
  entrieAnnualFeeValue: number | undefined;
  setEntrieAnnualFeeValue: Dispatch<SetStateAction<number | undefined>>;
  entriePaymentMethod: PaymentMethodENUM | undefined;
  setEntriePaymentMethod: Dispatch<
    SetStateAction<PaymentMethodENUM | undefined>
  >;
  entrieOtherPaymentMethod: string | null;
  setEntrieOtherPaymentMethod: Dispatch<SetStateAction<string | null>>;
  entrieDate: Date | undefined;
  setEntrieDate: Dispatch<SetStateAction<Date | undefined>>;
  entrieReceipt: boolean;
  setEntrieReceipt: Dispatch<SetStateAction<boolean>>;
  entrieRightToVote: VoteChoicesENUM[];
  setEntrieRightToVote: Dispatch<SetStateAction<VoteChoicesENUM[]>>;
  entrieOtherRightToVote: string | null;
  setEntrieOtherRightToVote: Dispatch<SetStateAction<string | null>>;
  voteToBeAdded: string;
  setVoteToBeAdded: Dispatch<SetStateAction<string>>;
  entrieVoted: string[];
  setEntrieVoted: Dispatch<SetStateAction<string[]>>;
  id: string;
  year: number;
  oldEntries: EntriesType[];
  isAdding: boolean;
  handleYearAdd: (
    id: string,
    year: number,
    oldEntries: EntriesType[],
    entrieToBeAdded: EntriesType
  ) => {};
}

const YearAssociateAddForm: React.FC<yearAssociateAddFormProps> = (props) => {
  const { setInfoModalMessage } = useGlobalContext();

  const checkEntrieIsValid = (entrie: EntriesType) => {
    let arrayError = [];
    let annualFeeValueIsValidated = entrie.annualFeeValue !== undefined;
    !annualFeeValueIsValidated ? arrayError.push("Valor pago") : "";
    let dateIsValidated = entrie.date !== undefined;
    !dateIsValidated ? arrayError.push("Data") : "";
    let rightToVoteIsValidated = entrie.rightToVote.length !== 0;
    !rightToVoteIsValidated ? arrayError.push("Direito à voto") : "";

    if (
      annualFeeValueIsValidated &&
      dateIsValidated &&
      rightToVoteIsValidated
    ) {
      return true;
    } else {
      console.log("Há campos que precisam de preenchimento!");
      setInfoModalMessage({
        status: 500,
        message: `O campo "${arrayError[0]}" está sem preenchimento ou inválido.`,
      });
      return false;
    }
  };

  return (
    <>
      <>
        <div className={styles.associateItem}>
          <img
            className={styles.associateItem__profilePhoto}
            src={props.associateToBeAdded.data.profilePhoto}
            alt="Foto de perfil."
          />
          <label className={styles.associateItem__titleOpen} htmlFor="fullName">
            {props.associateToBeAdded.data.fullName}
          </label>
        </div>
        <InputNumberForm
          defaultValue={props.entrieAnnualFeeValue || 0}
          htmlFor="annualFeeValue"
          id="annualFeeValue"
          labelText="Valor pago:"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.setEntrieAnnualFeeValue(+event.target.value)
          }
          placeholder=""
        />
        <DropBoxForm
          id="paymentMethod"
          defaultValue={props.entriePaymentMethod || ""}
          htmlFor="paymentMethod"
          labelText="Meio de pagamento:"
          name="paymentMethod"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.setEntriePaymentMethod(
              event.target.value as PaymentMethodENUM
            );
          }}
          list="paymentMethodList"
          values={[
            PaymentMethodENUM.pix,
            PaymentMethodENUM.paypal,
            PaymentMethodENUM.other,
          ]}
        />

        {props.entriePaymentMethod == "Outro" ? (
          <>
            <FormInput
              defaultValue={props.entrieOtherPaymentMethod || ""}
              htmlFor="annualFeeValue"
              id="annualFeeValue"
              labelText="Outro meio de pagamento:"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                props.setEntrieOtherPaymentMethod(event.target.value)
              }
              placeholder=""
              isRequired={false}
              isCPF={false}
              isEmail={false}
            />
          </>
        ) : (
          ""
        )}
        <DateForm
          defaultValue=""
          htmlFor="entrieDate"
          labelText="Data:"
          name="entrieDate"
          id="entrieDate"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const newDate = new Date(event.target.value);
            newDate.setHours(newDate.getHours() + 10);
            props.setEntrieDate(newDate);
          }}
        />
        <ToggleForm
          defaultChecked={`${props.entrieReceipt}` == "true"}
          labelText="Comprovante de pagamento:"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.setEntrieReceipt(event.target.checked);
          }}
        />

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
                const rightToVoteValue = event.target.value as VoteChoicesENUM;
                props.setEntrieRightToVote((prevEntrieRightToVote) =>
                  event.target.checked
                    ? [...prevEntrieRightToVote, rightToVoteValue]
                    : prevEntrieRightToVote.filter(
                        (voteChoice) => voteChoice !== rightToVoteValue
                      )
                );
              }}
              type="checkbox"
              id="AG"
              name="AG"
              className={styles.css_checkbox}
              defaultChecked={
                props.entrieRightToVote
                  ? props.entrieRightToVote.includes(VoteChoicesENUM.ag)
                  : false
              }
              value={VoteChoicesENUM.ag}
            />

            <label htmlFor="AG"> {VoteChoicesENUM.ag}</label>
          </div>
          <div>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const rightToVoteValue = event.target.value as VoteChoicesENUM;
                props.setEntrieRightToVote((prevEntrieRightToVote) =>
                  event.target.checked
                    ? [...prevEntrieRightToVote, rightToVoteValue]
                    : prevEntrieRightToVote.filter(
                        (voteChoice) => voteChoice !== rightToVoteValue
                      )
                );
              }}
              type="checkbox"
              id="OCBGathering"
              name="OCBGathering"
              className={styles.css_checkbox}
              defaultChecked={
                props.entrieRightToVote
                  ? props.entrieRightToVote.includes(
                      VoteChoicesENUM.ocbGathering
                    )
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
                const rightToVoteValue = event.target.value as VoteChoicesENUM;
                props.setEntrieRightToVote((prevEntrieRightToVote) =>
                  event.target.checked
                    ? [...prevEntrieRightToVote, rightToVoteValue]
                    : prevEntrieRightToVote.filter(
                        (voteChoice) => voteChoice !== rightToVoteValue
                      )
                );
              }}
              type="checkbox"
              id="other"
              name="other"
              className={styles.css_checkbox}
              defaultChecked={
                props.entrieRightToVote
                  ? props.entrieRightToVote.includes(VoteChoicesENUM.other)
                  : false
              }
              value={VoteChoicesENUM.other}
            />

            <label htmlFor="other"> {VoteChoicesENUM.other}</label>
          </div>
          <div>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const rightToVoteValue = event.target.value as VoteChoicesENUM;
                props.setEntrieRightToVote((prevEntrieRightToVote) =>
                  event.target.checked
                    ? [...prevEntrieRightToVote, rightToVoteValue]
                    : prevEntrieRightToVote.filter(
                        (voteChoice) => voteChoice !== rightToVoteValue
                      )
                );
              }}
              type="checkbox"
              id="none"
              name="none"
              className={styles.css_checkbox}
              defaultChecked={
                props.entrieRightToVote
                  ? props.entrieRightToVote.includes(VoteChoicesENUM.none)
                  : false
              }
              value={VoteChoicesENUM.none}
            />

            <label htmlFor="none"> {VoteChoicesENUM.none}</label>
          </div>
        </div>
        {props.entrieRightToVote.includes(VoteChoicesENUM.other) ? (
          <>
            <label className={styles.label} htmlFor="other">
              {`Outro(s) evento(s) com direito à voto:`}
            </label>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                props.setEntrieOtherRightToVote(event.target.value);
              }}
              className={styles.editInput}
              placeholder=""
              defaultValue={props.entrieOtherRightToVote || ""}
              id="other"
            />
          </>
        ) : (
          ""
        )}
        <label className={styles.label} htmlFor="annualFeeValue">
          Votos:
        </label>
        {props.isAdding ? (
          <>
            <label className={styles.label} htmlFor="addVote">
              Adicionar voto:
            </label>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                props.setVoteToBeAdded(event.target.value);
              }}
              list="voteToBeAdded"
              className={styles.editInput}
              id="addVote"
              value={props.voteToBeAdded}
            />
            <datalist id="voteToBeAdded">
              <option value={VoteChoicesENUM.ag}></option>
              <option value={VoteChoicesENUM.ocbGathering}></option>
            </datalist>
            <button
              className={styles.saveButton}
              onClick={() => {
                props.setEntrieVoted([
                  ...props.entrieVoted,
                  props.voteToBeAdded,
                ]);
                props.setVoteToBeAdded("");
              }}
            >
              Adicionar
            </button>
          </>
        ) : (
          ""
        )}
        {props.entrieVoted.length !== 0 ? (
          <div className={styles.votedDiv}>
            {props.entrieVoted.map((vote: string) => {
              return (
                <>
                  <span className={styles.votedSpan}>
                    {vote}{" "}
                    {props.isAdding ? (
                      <>
                        <MdClose
                          className={styles.closeIcon}
                          onClick={() => {
                            let newArrayVoted: Array<string> =
                              props.entrieVoted.filter(
                                (voted) => voted !== vote
                              );
                            props.setEntrieVoted(newArrayVoted);
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
        {props.isAdding ? (
          <button
            className={styles.saveButton}
            onClick={() => {
              console.log("Botão de salvar foi clicado.");
              let entrieToBeAdded: EntriesType = {
                id: props.associateToBeAdded.id,
                annualFeeValue: props.entrieAnnualFeeValue!,
                date: props.entrieDate!,
                otherChoiceRightToVote: props.entrieOtherRightToVote!,
                otherPaymentMethod: props.entrieOtherPaymentMethod!,
                paymentMethod: props.entriePaymentMethod!,
                receipt: props.entrieReceipt!,
                rightToVote: props.entrieRightToVote,
                voted: props.entrieVoted,
              };
              if (checkEntrieIsValid(entrieToBeAdded)) {
                console.log(checkEntrieIsValid(entrieToBeAdded));
                props.handleYearAdd(
                  props.id,
                  props.year,
                  props.oldEntries,
                  entrieToBeAdded
                );
              }
            }}
          >
            Salvar
          </button>
        ) : (
          ""
        )}
      </>
    </>
  );
};

export default YearAssociateAddForm;
