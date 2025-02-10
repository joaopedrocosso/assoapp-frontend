import { AssociateObject } from "@/app/types/AssociateType";
import { EntriesType, YearResponseType, YearType } from "@/app/types/YearType";

import styles from "./Year.module.css";
import { useState } from "react";
import YearAssociateDescription from "./YearAssociateDescription";
import { IoAdd } from "react-icons/io5";
import { useGlobalContext } from "@/app/context/store";
import YearAssociateAdd from "./YearAssociateAdd";
import { MdClose } from "react-icons/md";

interface YearProps {
  yearDataItem: YearResponseType;
  associatesData: AssociateObject[];
  id: string;
}

const handleTimeStamps = (timestamp: any) => {
  const date = new Date(timestamp.seconds * 1000);
  return date;
};

const Year: React.FC<YearProps> = (props: YearProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const {
    yearData,
    setYearData,
    setInfoModalMessage,
    user,
    associatesData,
    associatesWorkData,
    setAssociatesData,
    setAssociatesWorkData,
    backEndURL,
  } = useGlobalContext();

  const handleYearDelete = async (
    id: string,
    year: number,
    oldEntries: EntriesType[],
    entrieToBeDeleted: EntriesType
  ) => {
    const newEntries: EntriesType[] = [];
    oldEntries.map((oldEntrie) => {
      if (oldEntrie.id === entrieToBeDeleted.id) {
      } else {
        newEntries.push({
          ...oldEntrie,
          date: handleTimeStamps(oldEntrie.date),
        });
      }
    });

    console.log(JSON.stringify({ year: year, entries: newEntries }));

    const response = await fetch(
      `${backEndURL}year/update/${id}/associate/${entrieToBeDeleted.id}?accessKey=${user?.accessToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: year,
          entries: newEntries,
          update: { userId: user?.uid, date: new Date() },
        }),
      }
    )
      .then((response) => response.json())
      .then((responseType) => {
        console.log(responseType);
        const yearDataArray = yearData;
        const yearEdited: YearResponseType = responseType[0].response[0];
        const index = yearDataArray.findIndex(
          (item) => item.id === yearEdited.id
        );

        if (index !== -1) {
          yearDataArray[index] = yearEdited;
        }

        const AssociatesDataArray = associatesData;
        console.log(responseType[1].response[0].response[0]);
        const associateEdited: AssociateObject =
          responseType[1].response[0].response[0];

        const indexAssociate = AssociatesDataArray.findIndex(
          (item) => item.id === associateEdited.id
        );

        if (index !== -1) {
          AssociatesDataArray[indexAssociate] = associateEdited;
        }
        const AssociatesDataWorkArray = associatesWorkData;
        const associateWorkEdited: AssociateObject =
          responseType[1].response[0].response[0];
        const indexWork = AssociatesDataWorkArray.findIndex(
          (item) => item.id === associateEdited.id
        );

        if (indexWork !== -1) {
          AssociatesDataWorkArray[indexWork] = associateWorkEdited;
        }
        setAssociatesData(AssociatesDataArray);

        setIsOpen(false);
        setYearData(yearDataArray);
        setInfoModalMessage({
          status: responseType[0].status,
          message: "Item deletado com sucesso.",
        });
        return responseType;
      })
      .catch((error) => {
        console.log("Error:", error);
        setInfoModalMessage({
          status: 500,
          message: `${error}`,
        });
        setIsOpen(false);
        return error;
      });
    return response;
  };

  const handleYearUpdate = async (
    id: string,
    year: number,
    oldEntries: EntriesType[],
    entrieToBeUpdated: EntriesType
  ) => {
    const newEntries: EntriesType[] = [];
    oldEntries.map((oldEntrie) => {
      if (oldEntrie.id === entrieToBeUpdated.id) {
        oldEntrie.annualFeeValue = entrieToBeUpdated.annualFeeValue;
        oldEntrie.date = entrieToBeUpdated.date;
        oldEntrie.paymentMethod = entrieToBeUpdated.paymentMethod;
        oldEntrie.otherPaymentMethod = entrieToBeUpdated.otherPaymentMethod;
        oldEntrie.receipt = entrieToBeUpdated.receipt;
        oldEntrie.rightToVote = entrieToBeUpdated.rightToVote;
        oldEntrie.otherChoiceRightToVote =
          entrieToBeUpdated.otherChoiceRightToVote;
        oldEntrie.voted = entrieToBeUpdated.voted;
        newEntries.push(oldEntrie);
      } else {
        newEntries.push({
          ...oldEntrie,
          date: handleTimeStamps(oldEntrie.date),
        });
      }
    });

    console.log(JSON.stringify({ year: year, entries: newEntries }));

    const response = await fetch(
      `${backEndURL}year/update/${id}/associate/${entrieToBeUpdated.id}?accessKey=${user?.accessToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: year,
          entries: newEntries,
          update: { userId: user?.uid, date: new Date() },
        }),
      }
    )
      .then((response) => response.json())
      .then((responseType) => {
        console.log(responseType);
        const yearDataArray = yearData;
        const yearEdited: YearResponseType = responseType[0].response[0];
        const index = yearDataArray.findIndex(
          (item) => item.id === yearEdited.id
        );

        if (index !== -1) {
          yearDataArray[index] = yearEdited;
        }

        const AssociatesDataArray = associatesData;
        console.log(responseType[1].response[0].response[0]);
        const associateEdited: AssociateObject =
          responseType[1].response[0].response[0];

        const indexAssociate = AssociatesDataArray.findIndex(
          (item) => item.id === associateEdited.id
        );

        if (index !== -1) {
          AssociatesDataArray[indexAssociate] = associateEdited;
        }
        const AssociatesDataWorkArray = associatesWorkData;
        const associateWorkEdited: AssociateObject =
          responseType[1].response[0].response[0];
        const indexWork = AssociatesDataWorkArray.findIndex(
          (item) => item.id === associateEdited.id
        );

        if (indexWork !== -1) {
          AssociatesDataWorkArray[indexWork] = associateWorkEdited;
        }
        setAssociatesData(AssociatesDataArray);

        setYearData(yearDataArray);
        setInfoModalMessage({
          status: responseType[0].status,
          message: "Item editado com sucesso.",
        });
        return responseType;
      })
      .catch((error) => {
        console.log("Error:", error);
        setInfoModalMessage({
          status: 500,
          message: `${error}`,
        });
        return error;
      });
    return response;
  };



  const handleYearAdd = async (
    id: string,
    year: number,
    oldEntries: EntriesType[],
    entrieToBeAdded: EntriesType
  ) => {
    const newEntries: EntriesType[] = [];

    oldEntries.map((oldEntrie) => {
      newEntries.push({
        ...oldEntrie,
        date: handleTimeStamps(oldEntrie.date),
      });
    });

    newEntries.push(entrieToBeAdded);

    const response = await fetch(
      `${backEndURL}year/update/${id}/associate/${entrieToBeAdded.id}?accessKey=${user?.accessToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          year: year,
          entries: newEntries,
          update: { userId: user?.uid, date: new Date() },
        }),
      }
    )
      .then((response) => response.json())
      .then((responseType) => {
        const yearDataArray = yearData;
        const yearEdited: YearResponseType = responseType[0].response[0];
        const index = yearDataArray.findIndex(
          (item) => item.id === yearEdited.id
        );

        if (index !== -1) {
          yearDataArray[index] = yearEdited;
        }

        const AssociatesDataArray = associatesData;
        console.log(responseType[1].response[0].response[0]);
        const associateEdited: AssociateObject =
          responseType[1].response[0].response[0];

        const indexAssociate = AssociatesDataArray.findIndex(
          (item) => item.id === associateEdited.id
        );

        if (index !== -1) {
          AssociatesDataArray[indexAssociate] = associateEdited;
        }
        const AssociatesDataWorkArray = associatesWorkData;
        const associateWorkEdited: AssociateObject =
          responseType[1].response[0].response[0];
        const indexWork = AssociatesDataWorkArray.findIndex(
          (item) => item.id === associateEdited.id
        );

        if (indexWork !== -1) {
          AssociatesDataWorkArray[indexWork] = associateWorkEdited;
        }
        setAssociatesData(AssociatesDataArray);

        setYearData(yearDataArray);
        setInfoModalMessage({
          status: responseType[0].status,
          message: "Item adicionado com sucesso.",
        });
        setIsAdding(false);
        return responseType;
      })
      .catch((error) => {
        console.log("Error:", error);
        setInfoModalMessage({
          status: 500,
          message: `${error}`,
        });
        return error;
      });
    return response;
  };

  return (
    <>
      <div className={styles.yearHeader}>
        <label
          className={`${styles.yearHeader__title} ${
            isOpen ? styles.yearHeader__title_Selected : ""
          }`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {props.yearDataItem.data.year}
        </label>
        {isAdding ? (
          <MdClose
            className={styles.yearHeader__addIcon}
            onClick={() => {
              setIsAdding(false);
            }}
          />
        ) : (
          <IoAdd
            className={styles.yearHeader__addIcon}
            onClick={() => {
              setIsAdding(true);
            }}
          />
        )}
      </div>
      {isAdding ? (
        <YearAssociateAdd
          associatesData={props.associatesData}
          yearDataItem={props.yearDataItem}
          key={props.id}
          id={props.id}
          year={props.yearDataItem.data.year}
          handleYearAdd={handleYearAdd}
          oldEntries={props.yearDataItem.data.entries}
          isAdding={isAdding}
        />
      ) : (
        ""
      )}

      {isOpen && !isAdding ? (
        <>
          {props.yearDataItem.data.entries.map((year) => {
            const associate: AssociateObject | undefined =
              props.associatesData.find(
                (associate) => associate.id === year.id
              );
            return (
              <>
                <YearAssociateDescription
                  associatesData={props.associatesData}
                  yearDataItem={props.yearDataItem}
                  key={props.id}
                  id={props.id}
                  associate={associate!}
                  entrie={year}
                  year={props.yearDataItem.data.year}
                  handleYearUpdate={handleYearUpdate}
                  handleYearDelete={handleYearDelete}
                  oldEntries={props.yearDataItem.data.entries}
                />
              </>
            );
          })}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Year;
