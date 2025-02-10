"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./EventWorkspace.module.css";
import { useGlobalContext } from "@/app/context/store";
import { EventObject } from "@/app/types/EventType";
import { GrReturn } from "react-icons/gr";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { AssociateObject } from "@/app/types/AssociateType";
import Input from "../UI/Input";
import { json } from "stream/consumers";
import EventWorkspaceForm from "./EventWorkspaceForm";

const EventWorkspace: React.FC = () => {
  const {
    setEventData,
    eventData,
    setInfoModalMessage,
    setAssociatesData,
    associatesData,
    associatesWorkData,
    setAssociatesWorkData,
    user,
    backEndURL,
  } = useGlobalContext();

  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventIdSelected, setEventIdSelected] = useState<string>("");
  const [participants, setParticipants] = useState<AssociateObject[]>([]);
  const [isAddingParticipant, setIsAddingParticipant] =
    useState<boolean>(false);
  const [associatesSearchData, setAssociatesSearchData] =
    useState<AssociateObject[]>(associatesData);

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleEventAdd = async (
    title: string,
    titleDescription: string,
    date: Date
  ) => {
    const response = await fetch(
      `${backEndURL}events/create?accessKey=${user?.accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          titleDescription: titleDescription,
          date: date,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseType) => {
        const eventDataArray = eventData;
        const eventEdited = responseType[0].response[0];
        const index = eventDataArray.findIndex(
          (item) => item.id === eventEdited.id
        );

        if (index !== -1) {
          eventDataArray[index] = eventEdited;
        }
        setEventData(eventDataArray);
        setInfoModalMessage({
          status: responseType[0].status,
          message: "Item adicionado com sucesso.",
        });
        setIsAdding(false);
        handleEventsLoad();
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

  const handleReloadAssociates = () => {
    fetch(`${backEndURL}associate/readall?accessKey=${user?.accessToken}`).then(
      (response) => {
        response.json().then((data) => {
          setAssociatesData(data);
          setAssociatesWorkData(data);
        });
      }
    );
  };

  const handleEventDelete = async (id: string) => {
    const response = await fetch(
      `${backEndURL}events/delete/${id}?accessKey=${user?.accessToken}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseType) => {
        const eventDataArray = eventData;
        const index = eventDataArray.findIndex((item) => item.id === id);

        if (index !== -1) {
          eventDataArray.filter((event) => event !== eventDataArray[index]);
        }
        setEventData(eventDataArray);

        setInfoModalMessage({
          status: 200,
          message: "Evento ou encontro deletado com sucesso.",
        });
        setIsAdding(false);
        handleEventsLoad();
        handleReloadAssociates();
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

  const handleParticipantsAdd = async (
    eventId: string,
    associateId: string
  ) => {
    const response = await fetch(
      `${backEndURL}events/update/participants/${eventId}/add/${associateId}?accessKey=${user?.accessToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.uid,
          date: new Date(),
        }),
      }
    )
      .then((response) => response.json())
      .then((responseType) => {
        const updatedAssociates: AssociateObject[] = responseType;

        updatedAssociates.map((associateUpdated: AssociateObject) => {
          const AssociatesDataArray = associatesData;
          const associateEdited: AssociateObject = associateUpdated;
          const index = AssociatesDataArray.findIndex(
            (item) => item.id === associateEdited.id
          );

          if (index !== -1) {
            AssociatesDataArray[index] = associateEdited;
          }
          const AssociatesDataWorkArray = associatesWorkData;
          const associateWorkEdited: AssociateObject = associateUpdated;
          const indexWork = AssociatesDataWorkArray.findIndex(
            (item) => item.id === associateEdited.id
          );

          if (index !== -1) {
            AssociatesDataWorkArray[indexWork] = associateWorkEdited;
          }
          setAssociatesData(AssociatesDataArray);
        });

        setParticipants(responseType);
        handleReloadAssociates();
        setInfoModalMessage({
          status: 200,
          message: "Associado adicionado ao evento com sucesso.",
        });
        setIsAddingParticipant(false);
        handleEventsLoad();
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

  const handleParticipantsRemove = async (
    eventId: string,
    associateId: string
  ) => {
    const response = await fetch(
      `${backEndURL}events/update/participants/${eventId}/remove/${associateId}?accessKey=${user?.accessToken}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.uid,
          date: new Date(),
        }),
      }
    )
      .then((response) => response.json())
      .then((responseType) => {
        const updatedAssociates: AssociateObject[] = responseType;

        updatedAssociates.map((associateUpdated: AssociateObject) => {
          const AssociatesDataArray = associatesData;
          const associateEdited: AssociateObject = associateUpdated;
          const index = AssociatesDataArray.findIndex(
            (item) => item.id === associateEdited.id
          );

          if (index !== -1) {
            AssociatesDataArray[index] = associateEdited;
          }
          const AssociatesDataWorkArray = associatesWorkData;
          const associateWorkEdited: AssociateObject = associateUpdated;
          const indexWork = AssociatesDataWorkArray.findIndex(
            (item) => item.id === associateEdited.id
          );

          if (index !== -1) {
            AssociatesDataWorkArray[indexWork] = associateWorkEdited;
          }
          setAssociatesData(AssociatesDataArray);
        });

        setParticipants(responseType);
        handleReloadAssociates();
        setInfoModalMessage({
          status: 200,
          message: "Associado removido ao evento com sucesso.",
        });
        setIsAddingParticipant(false);
        handleEventsLoad();
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

  const handleParticipantsLoad = async (eventId: string) => {
    const response = await fetch(
      `${backEndURL}events/participantsof/${eventId}?accessKey=${user?.accessToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseType) => {
        console.log(responseType);
        setParticipants(responseType);
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

  const handleEventsLoad = async () => {
    let responseData: EventObject[] = [];
    const res = await fetch(
      `${backEndURL}events/readall?accessKey=${user?.accessToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((dataItem: EventObject) => {
          const newEvent = {
            id: dataItem.id,
            data: {
              title: dataItem.data.title,
              titleDescription: dataItem.data.titleDescription,
              date: handleTimeStamps(dataItem.data.date),
            },
          };
          responseData.push(newEvent);
        });
      });
    setEventData(responseData);
  };

  useEffect(() => {
    eventData ? handleEventsLoad() : null;
  }, [participants]);

  return (
    <div className={styles.eventDiv}>
      <div className={styles.eventHeader}>
        <label className={`${styles.labelTitle} ${styles.bigTitle}`}>
          Encontros & Eventos
        </label>
        {!isAdding ? (
          <IoAdd
            className={styles.addIcon}
            onClick={() => {
              setIsAdding(true);
            }}
          />
        ) : (
          <GrReturn
            className={styles.addIcon}
            onClick={() => {
              setIsAdding(false);
            }}
          />
        )}
      </div>
      {isAdding ? (
        <EventWorkspaceForm
          eventDate={eventDate}
          eventDescription={eventDescription}
          eventTitle={eventTitle}
          handleEventAdd={handleEventAdd}
          setEventDate={setEventDate}
          setEventDescription={setEventDescription}
          setEventTitle={setEventTitle}
        />
      ) : (
        <>
          {eventData.map((event: EventObject) => {
            return (
              <>
                {eventIdSelected == "" || eventIdSelected == event.id ? (
                  <div
                    className={`${styles.event} ${
                      eventIdSelected == event.id ? styles.eventSelected : ""
                    } `}
                    key={event.id}
                    onClick={() => {
                      handleParticipantsLoad(event.id);
                      eventIdSelected == event.id
                        ? setEventIdSelected("")
                        : setEventIdSelected(event.id);
                    }}
                  >
                    <div className={styles.divTitle}>
                      <span className={styles.eventTitle}>
                        {event.data.title}
                      </span>
                      <MdDelete
                        className={styles.iconDelete}
                        onClick={(eventMouse: any) => {
                          eventMouse.stopPropagation();
                          handleEventDelete(event.id);
                        }}
                      />
                    </div>
                    <p className={styles.eventTitleDescription}>
                      <span className={styles.eventTitleDescriptionSpan}>
                        Descrição:
                      </span>{" "}
                      {event.data.titleDescription}
                    </p>
                    <input
                      className={styles.editInput}
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      disabled={true}
                      defaultValue={handleTimeStampsToDate(event.data.date)}
                    />

                    {eventIdSelected == event.id ? (
                      <>
                        {!isAddingParticipant ? (
                          <>
                            <p className={styles.eventParticipantsText}>
                              Participantes:
                            </p>
                            <>
                              {participants.map((associate, index) => {
                                console.log(participants[index].id);
                                return (
                                  <>
                                    <div
                                      className={styles.associateItem}
                                      onClick={(eventMouse) => {
                                        eventMouse.stopPropagation();
                                        handleParticipantsRemove(
                                          event.id,
                                          participants[index].id
                                        );
                                      }}
                                    >
                                      <img
                                        className={
                                          styles.associate_profilePhoto
                                        }
                                        src={associate.data.profilePhoto}
                                        alt="Foto de perfil."
                                      />
                                      <label
                                        className={`${styles.associate_title}`}
                                        htmlFor="fullName"
                                      >
                                        {associate.data.fullName}
                                      </label>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                            <button
                              className={styles.saveButton}
                              onClick={(event) => {
                                event.stopPropagation();
                                setIsAddingParticipant(true);
                              }}
                            >
                              Adicionar
                            </button>
                          </>
                        ) : (
                          <>
                            <p className={styles.eventParticipantsText}>
                              Selecione o associado que participou do evento:
                            </p>
                            <>
                              {" "}
                              <Input
                                placeholder="Procure por um associado"
                                value=""
                                disabled={false}
                                id="search"
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>
                                ) => {
                                  const searchResult = associatesData.filter(
                                    (associate) =>
                                      Object.values(associate.data).some(
                                        (value) => {
                                          const valueInString =
                                            String(value).toUpperCase();
                                          const valueSearched =
                                            event.target.value;
                                          return valueInString.includes(
                                            valueSearched.toUpperCase()
                                          );
                                        }
                                      )
                                  );
                                  setAssociatesSearchData(searchResult);
                                }}
                              />
                              {associatesSearchData.map(
                                (associate: AssociateObject) => {
                                  {
                                    if (
                                      participants.some(
                                        (associateParticipant) =>
                                          associateParticipant.id ===
                                          associate.id
                                      )
                                    ) {
                                      return <></>;
                                    } else {
                                      return (
                                        <>
                                          <div
                                            className={styles.associateItem}
                                            onClick={(eventMouse) => {
                                              eventMouse.stopPropagation();
                                              handleParticipantsAdd(
                                                event.id,
                                                associate.id
                                              );
                                            }}
                                          >
                                            <img
                                              className={
                                                styles.associate_profilePhoto
                                              }
                                              src={associate.data.profilePhoto}
                                              alt="Foto de perfil."
                                            />
                                            <label
                                              className={styles.associate_title}
                                              htmlFor="fullName"
                                            >
                                              {associate.data.fullName}
                                            </label>
                                          </div>
                                        </>
                                      );
                                    }
                                  }
                                }
                              )}
                            </>
                            <button
                              className={styles.saveButton}
                              onClick={(event) => {
                                event.stopPropagation();
                                setIsAddingParticipant(false);
                              }}
                            >
                              Voltar
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <> </>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default EventWorkspace;
