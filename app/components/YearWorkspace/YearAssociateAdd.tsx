import { AssociateObject } from "@/app/types/AssociateType";
import {
  EntriesType,
  PaymentMethodENUM,
  YearResponseType,
} from "@/app/types/YearType";
import { VoteChoicesENUM } from "@/app/types/YearType";
import styles from "./YearAssociateAdd.module.css";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { MdDelete, MdEdit, MdClose } from "react-icons/md";
import { useGlobalContext } from "@/app/context/store";
import Input from "../UI/Input";
import YearAssociateAddForm from "./YearAssociateAddForm";

interface YearAssociateAddProps {
  yearDataItem: YearResponseType;
  associatesData: AssociateObject[];
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

const YearAssociateAdd: React.FC<YearAssociateAddProps> = (
  props: YearAssociateAddProps
) => {
  const { associatesData } = useGlobalContext();

  const [associatesSearchData, setAssociatesSearchData] =
    useState<AssociateObject[]>(associatesData);
  const [associateToBeAdded, setAssociateToBeAdded] =
    useState<AssociateObject>();
  const [entrieDate, setEntrieDate] = useState<Date>();
  const [entrieRightToVote, setEntrieRightToVote] = useState<VoteChoicesENUM[]>(
    []
  );
  const [entrieOtherRightToVote, setEntrieOtherRightToVote] = useState<
    string | null
  >(null);
  const [entrieVoted, setEntrieVoted] = useState<string[]>([]);
  const [entrieAnnualFeeValue, setEntrieAnnualFeeValue] = useState<number>();
  const [entrieReceipt, setEntrieReceipt] = useState<boolean>(false);
  const [entriePaymentMethod, setEntriePaymentMethod] =
    useState<PaymentMethodENUM>();
  const [entrieOtherPaymentMethod, setEntrieOtherPaymentMethod] = useState<
    string | null
  >(null);

  const [voteToBeAdded, setVoteToBeAdded] = useState<string>("");

  return (
    <>
      <>
        {!associateToBeAdded ? (
          <>
            {" "}
            <Input
              placeholder="Procure por um associado"
              value=""
              disabled={false}
              id="search"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const searchResult = associatesData.filter((associate) =>
                  Object.values(associate.data).some((value) => {
                    const valueInString = String(value).toUpperCase();
                    const valueSearched = event.target.value;
                    return valueInString.includes(valueSearched.toUpperCase());
                  })
                );
                setAssociatesSearchData(searchResult);
              }}
            />
            {associatesSearchData.map((associate: AssociateObject) => {
              return (
                <div
                  key={Math.random()}
                  className={styles.associateItem}
                  onClick={() => {
                    setAssociateToBeAdded(associate);
                  }}
                >
                  <img
                    className={styles.associateItem__profilePhoto}
                    src={associate.data.profilePhoto}
                    alt="Foto de perfil"
                  />
                  <label
                    className={styles.associateItem__titleOpen}
                    htmlFor="fullName"
                  >
                    {associate.data.fullName}
                  </label>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}

        {props.isAdding && associateToBeAdded ? (
          <YearAssociateAddForm
            associateToBeAdded={associateToBeAdded}
            entrieAnnualFeeValue={entrieAnnualFeeValue}
            entrieDate={entrieDate}
            entrieOtherPaymentMethod={entrieOtherPaymentMethod}
            entrieOtherRightToVote={entrieOtherRightToVote}
            entriePaymentMethod={entriePaymentMethod}
            entrieReceipt={entrieReceipt}
            entrieRightToVote={entrieRightToVote}
            entrieVoted={entrieVoted}
            handleYearAdd={props.handleYearAdd}
            id={props.id}
            isAdding={props.isAdding}
            oldEntries={props.oldEntries}
            setEntrieAnnualFeeValue={setEntrieAnnualFeeValue}
            setEntrieDate={setEntrieDate}
            setEntrieOtherPaymentMethod={setEntrieOtherPaymentMethod}
            setEntrieOtherRightToVote={setEntrieOtherRightToVote}
            setEntriePaymentMethod={setEntriePaymentMethod}
            setEntrieReceipt={setEntrieReceipt}
            setEntrieRightToVote={setEntrieRightToVote}
            setEntrieVoted={setEntrieVoted}
            setVoteToBeAdded={setVoteToBeAdded}
            voteToBeAdded={voteToBeAdded}
            year={props.year}
          />
        ) : (
          ""
        )}
      </>
    </>
  );
};

export default YearAssociateAdd;
