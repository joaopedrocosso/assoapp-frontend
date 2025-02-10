import React, { ChangeEvent } from "react";
import styles from "./EventWorkspaceForm.module.css";
import { useGlobalContext } from "@/app/context/store";

interface eventWorkspaceFormProps {
  eventTitle: string;
  setEventTitle: React.Dispatch<React.SetStateAction<string>>;
  eventDescription: string;
  setEventDescription: React.Dispatch<React.SetStateAction<string>>;
  eventDate: Date;
  setEventDate: React.Dispatch<React.SetStateAction<Date>>;
  handleEventAdd: (
    title: string,
    titleDescription: string,
    date: Date
  ) => Promise<any>;
}

interface EventInput {
  title: string;
  description: string;
  date: Date;
}

const EventWorkspaceForm: React.FC<eventWorkspaceFormProps> = (props) => {
  const { setInfoModalMessage } = useGlobalContext();
  const checkEventIsValid = (event: EventInput) => {
    let arrayError = [];
    let eventTitleIsValidated = event.title !== "";
    !eventTitleIsValidated ? arrayError.push("Título") : "";
    let eventDescriptionIsValidated = event.description !== "";
    !eventDescriptionIsValidated ? arrayError.push("Descrição") : "";
    let eventDateIsValidated = event.date !== undefined;
    !eventDateIsValidated ? arrayError.push("Data") : "";

    if (
      eventTitleIsValidated &&
      eventDescriptionIsValidated &&
      eventDateIsValidated
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
      <div className={styles.event}>
        <p className={styles.eventInputParagraph}>Título:</p>
        <input
          className={styles.editInput}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            props.setEventTitle(event.target.value);
          }}
          id="eventTitle"
          name="eventTitle"
        />
        <p className={styles.eventInputParagraph}>Descrição:</p>{" "}
        <p className={styles.eventTitleDescription}>
          <input
            className={styles.editInput}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              props.setEventDescription(event.target.value);
            }}
            id="eventDescription"
            name="eventDescription"
          />
        </p>
        <p className={styles.eventInputParagraph}>Data:</p>{" "}
        <input
          className={styles.editInput}
          type="date"
          id="eventDate"
          name="eventDate"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const newDate = new Date(event.target.value);
            newDate.setHours(newDate.getHours() + 10);
            props.setEventDate(newDate);
          }}
        />
      </div>
      <button
        className={styles.saveButton}
        onClick={() => {
          let isEventValid = checkEventIsValid({
            title: props.eventTitle,
            date: props.eventDate,
            description: props.eventDescription,
          });
          if (isEventValid) {
            props.handleEventAdd(
              props.eventTitle,
              props.eventDescription,
              props.eventDate
            );
          }
        }}
      >
        Salvar
      </button>
    </>
  );
};

export default EventWorkspaceForm;
