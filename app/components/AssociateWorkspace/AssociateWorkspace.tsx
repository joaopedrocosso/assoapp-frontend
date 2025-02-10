"use client";

import React, { ChangeEvent } from "react";
import styles from "./AssociateWorkspace.module.css";
import {
  AssociateObject,
  Board,
  Committee,
  CommitteeENUM,
  FiscalCouncil,
  Iniciatives,
  IniciativesENUM,
  UpdateObject,
} from "@/app/types/AssociateType";
import { YearType, VoteChoicesENUM } from "@/app/types/YearType";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/context/store";
import { AssociateWorkspaceUtils } from "./AssociateWorkspaceUtils";
import AssociateWorkspaceMainForm from "./AssociateWorkspaceMainForm";
import AssociateWorkspaceExpForm from "./AssociateWorkspaceExpForm";
import AssociateWorkspacePersonalForm from "./AssociateWorkspacePersonalForm";
import AssociateWorkspaceMembershipForm from "./AssociateWorkspaceMembershipForm";
import AssociateWorkspaceInitiativeForm from "./AssociateWorkspaceInitiativeForm";

const AssociateWorkspace: React.FC<AssociateObject> = (props) => {
  const handleTimeStamps = (timestamp: any) => {
    const date = new Date(timestamp.seconds * 1000);
    return date;
  };

  const [associate, setAssociate] = useState<AssociateObject>({
    id: props.id,
    data: {
      ...props.data,
      dateOfAdmission: handleTimeStamps(props.data.dateOfAdmission),
      dateLastMSFJob: handleTimeStamps(props.data.dateLastMSFJob),
      dateOfBirth: handleTimeStamps(props.data.dateOfBirth),
      memberShip: {
        ...props.data.memberShip,
        infoDate: handleTimeStamps(props.data.memberShip.infoDate),
        lastRegistrationUpdate: handleTimeStamps(
          props.data.memberShip.lastRegistrationUpdate
        ),
      },
      dateOfConcentUseData: handleTimeStamps(props.data.dateOfConcentUseData),
      initiatives: props.data.initiatives.map(
        (initiative: Iniciatives): Iniciatives => {
          let newEndDate = initiative.endDate
            ? handleTimeStamps(initiative.endDate)
            : null;
          return {
            title: initiative.title as IniciativesENUM,
            startDate: handleTimeStamps(initiative.startDate),
            endDate: newEndDate,
            otherDescription: initiative.otherDescription,
            isCurrentlyValid: initiative.isCurrentlyValid,
          };
        }
      ),
      committee: props.data.committee.map((committee: Committee): Committee => {
        let newEndDate = committee.endDate
          ? handleTimeStamps(committee.endDate)
          : null;
        return {
          title: committee.title as CommitteeENUM,
          otherDescription: committee.otherDescription,
          startDate: handleTimeStamps(committee.startDate),
          endDate: newEndDate,
          isCurrentlyValid: committee.isCurrentlyValid,
        };
      }),
      board: props.data.board.map((board: Board): Board => {
        let newEndDate = board.endDate ? handleTimeStamps(board.endDate) : null;
        return {
          title: board.title,
          extraInfo: board.extraInfo,
          startDate: handleTimeStamps(board.startDate),
          endDate: newEndDate,
          isCurrentlyValid: board.isCurrentlyValid,
        };
      }),
      fiscalCouncil: props.data.fiscalCouncil.map(
        (fiscalCouncil: FiscalCouncil): FiscalCouncil => {
          let newEndDate = fiscalCouncil.endDate
            ? handleTimeStamps(fiscalCouncil.endDate)
            : null;
          return {
            title: fiscalCouncil.title,
            extraInfo: fiscalCouncil.extraInfo,
            startDate: handleTimeStamps(fiscalCouncil.startDate),
            endDate: newEndDate,
            isCurrentlyValid: fiscalCouncil.isCurrentlyValid,
          };
        }
      ),
    },
  });

  const [newInitiative, setNewInitiative] = useState<boolean>(false);
  const [newInitiativeTitle, setNewInitiativeTitle] = useState<string>("");
  const [newInitiativeStartDate, setNewInitiativeStartDate] = useState<Date>();
  const [newInitiativeEndDate, setNewInitiativeEndDate] = useState<Date>();
  const [newInitiativeOtherDescription, setNewInitiativeOtherDescription] =
    useState<string>("");
  const [newInitiativeIsCurrentlyValid, setNewInitiativeIsCurrentlyValid] =
    useState<boolean>(true);
  const [newCommittee, setNewComittee] = useState<boolean>(false);
  const [newCommitteeTitle, setNewCommitteeTitle] = useState<string>("");
  const [newCommitteeStartDate, setNewCommitteeStartDate] = useState<Date>();
  const [newCommitteeEndDate, setNewCommitteeEndDate] = useState<Date>();
  const [newCommitteeOtherDescription, setNewCommitteeOtherDescription] =
    useState<string>("");
  const [newCommitteeIsCurrentlyValid, setNewCommitteeIsCurrentlyValid] =
    useState<boolean>(true);
  const [newBoard, setNewBoard] = useState<boolean>(false);
  const [newBoardTitle, setNewBoardTitle] = useState<string>("");
  const [newBoardExtraInfo, setNewBoardExtraInfo] = useState<string>("");
  const [newBoardStartDate, setNewBoardStartDate] = useState<Date>();
  const [newBoardEndDate, setNewBoardEndDate] = useState<Date>();
  const [newBoardIsCurrentlyValid, setNewBoardIsCurrentlyValid] =
    useState<boolean>(true);
  const [newFiscalCouncil, setNewFiscalCouncil] = useState<boolean>(false);
  const [newFiscalCouncilTitle, setNewFiscalCouncilTitle] =
    useState<string>("");
  const [newFiscalCouncilExtraInfo, setNewFiscalCouncilExtraInfo] =
    useState<string>("");
  const [newFiscalCouncilStartDate, setNewFiscalCouncilStartDate] =
    useState<Date>();
  const [newFiscalCouncilEndDate, setNewFiscalCouncilEndDate] =
    useState<Date>();
  const [
    newFiscalCouncilIsCurrentlyValid,
    setNewFiscalCouncilIsCurrentlyValid,
  ] = useState<boolean>(true);
  const [yearsLoaded, setYearsLoaded] = useState<YearType[]>([]);
  const [profilePicUpload, setProfilePicUpload] = useState<File>();
  const [showMore, setShowMore] = useState<boolean>(false);

  const {
    workspace,
    setWorkspace,
    associatesData,
    setAssociatesData,
    setWorkspaceIsActive,
    setBackdrop,
    backdrop,
    workspaceIsActive,
    setActiveItem,
    setInfoModalMessage,
    associatesWorkData,
    eventArray,
    setEventArray,
    user,
    backOfficeUsers,
    backEndURL,
  } = useGlobalContext();

  const associateWorkspaceUtils = new AssociateWorkspaceUtils(
    setAssociate,
    associate
  );

  const handleUploadProfilePhoto = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.target.files ? setProfilePicUpload(event.target.files[0]) : null;

    console.log(profilePicUpload);
    const formData = new FormData();
    formData.append("profilepic", profilePicUpload as Blob); // 👇 Uploading the file using the fetch API to the server

    await fetch(
      `${backEndURL}associate/profilepic/upload?accessKey=${user?.accessToken}`,
      {
        method: "POST",

        body: formData,
      }
    )
      .then((res) => res.json())

      .then((data) => {
        console.log(data[0]);
        setAssociate({
          id: associate.id,
          data: { ...associate.data, profilePhoto: data[0] },
        });
      })

      .catch((err) => console.error(err));
  };

  const handleInitiativeDeleteIconClick = (initiative: Iniciatives) => {
    let newArray = associate.data.initiatives.filter(
      (ini) => !Object.is(ini, initiative)
    );
    setAssociate((prevAssociate) => ({
      id: prevAssociate.id,
      data: { ...prevAssociate.data, initiatives: newArray },
    }));
  };

  const handleCommitteeDeleteIconClick = (committe: Committee) => {
    let newArray = associate.data.committee.filter(
      (com) => !Object.is(com, committe)
    );
    setAssociate((prevAssociate) => ({
      id: prevAssociate.id,
      data: { ...prevAssociate.data, committee: newArray },
    }));
  };

  const handleBoardDeleteIconClick = (boardEvent: Board) => {
    let newArray = associate.data.board.filter(
      (boa) => !Object.is(boa, boardEvent)
    );
    setAssociate((prevAssociate) => ({
      id: prevAssociate.id,
      data: { ...prevAssociate.data, board: newArray },
    }));
  };

  const handleFiscalCouncilDeleteIconClick = (
    fiscalCouncilEvent: FiscalCouncil
  ) => {
    let newArray = associate.data.fiscalCouncil.filter(
      (fis) => !Object.is(fis, fiscalCouncilEvent)
    );
    setAssociate((prevAssociate) => ({
      id: prevAssociate.id,
      data: { ...prevAssociate.data, fiscalCouncil: newArray },
    }));
  };

  const handleYearsLoad = async (userId: string) => {
    let responseArray: YearType[];
    const res = await fetch(
      `${backEndURL}year/readUser/${userId}?accessKey=${user?.accessToken}`,
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
        responseArray = data;
        setYearsLoaded(responseArray);
      });
  };

  const handleEventsLoad = async (eventIdArray: string[]) => {
    if (eventArray.length <= 0) {
      const responseArray: any = [];
      for (let i = 0; i <= eventIdArray.length - 1; i++) {
        const res = await fetch(
          `${backEndURL}events/read/${eventIdArray[i]}?accessKey=${user?.accessToken}`,
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
            const newEvent = {
              id: data[0].id,
              data: {
                title: data[0].data.title,
                titleDescription: data[0].data.titleDescription,
                date: handleTimeStamps(data[0].data.date),
              },
            };
            responseArray.push(newEvent);
          });
      }
      setEventArray(responseArray);
    }
  };

  const handleEditAction = async (associate: AssociateObject) => {
    const isAssociateValid = handleCheckIfAssociateDataIsValid(associate);
    if (isAssociateValid) {
      let newLastAssociateUpdateArray = associate.data.lastAssociateUpdate;

      newLastAssociateUpdateArray.map((associateUpdate) => {
        associateUpdate = {
          userId: associateUpdate.userId,
          date: handleTimeStamps(associateUpdate.date),
        };
      });

      newLastAssociateUpdateArray.unshift({
        userId: user?.uid || "",
        date: new Date(),
      });

      console.log(newLastAssociateUpdateArray);

      setAssociate({
        id: associate.id,
        data: {
          ...associate.data,
          lastAssociateUpdate: newLastAssociateUpdateArray,
        },
      });

      const response = await fetch(
        `${backEndURL}associate/update/${associate.id}?accessKey=${user?.accessToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...associate.data,
          }),
        }
      )
        .then((response) => response.json())
        .then((responseType) => {
          const AssociatesDataArray = associatesData;
          const associateEdited: AssociateObject = responseType[0].response[0];
          const index = AssociatesDataArray.findIndex(
            (item) => item.id === associateEdited.id
          );

          if (index !== -1) {
            AssociatesDataArray[index] = associateEdited;
          }
          const AssociatesDataWorkArray = associatesWorkData;
          const associateWorkEdited: AssociateObject =
            responseType[0].response[0];
          const indexWork = AssociatesDataWorkArray.findIndex(
            (item) => item.id === associateEdited.id
          );

          if (index !== -1) {
            AssociatesDataWorkArray[indexWork] = associateWorkEdited;
          }
          setAssociatesData(AssociatesDataArray);
          setBackdrop(!backdrop);
          setWorkspaceIsActive(!workspaceIsActive);
          setWorkspace({
            title: ``,
            action: null,
            children: "",
          });
          setActiveItem("");
          setInfoModalMessage({
            status: responseType[0].status,
            message: "Item editado com sucesso.",
          });
          return responseType;
        })
        .catch((error) => {
          console.log("Error:", error);
          setBackdrop(!backdrop);
          setWorkspaceIsActive(!workspaceIsActive);
          setWorkspace({
            title: ``,
            action: null,
            children: "",
          });
          setActiveItem("");
          setInfoModalMessage({
            status: 500,
            message: `${error}`,
          });
          return error;
        });
      return response;
    }
  };

  const handleCheckIfAssociateDataIsValid = (associate: AssociateObject) => {
    let arrayError = [];
    let fullNameIsValidated = associate.data.fullName !== "";
    !fullNameIsValidated ? arrayError.push("Nome do associado") : "";
    let professionIsValidated = associate.data.profession !== "";
    !professionIsValidated ? arrayError.push("Profissão") : "";
    let cpfIsValidated = associate.data.cpf !== "";
    !cpfIsValidated ? arrayError.push("CPF") : "";
    let emailIsValidated = associate.data.email !== "";
    !emailIsValidated ? arrayError.push("E-mail") : "";
    let phoneIsValited = associate.data.phone !== "";
    !phoneIsValited ? arrayError.push("Telefone") : "";
    let contryOfResidenceIsValidated = associate.data.contryOfResidence !== "";
    !contryOfResidenceIsValidated ? arrayError.push("País de residência") : "";
    let nationalityIsValidated = associate.data.nationality !== "";
    !nationalityIsValidated ? arrayError.push("Nacionalidade") : "";
    let dateOfAdmissionIsValited =
      associate.data.dateOfAdmission.toString() !== "";
    !dateOfAdmissionIsValited ? arrayError.push("Data de admissão") : "";
    let lastPositionIsValidated = associate.data.lastPosition !== "";
    !lastPositionIsValidated ? arrayError.push("Última posição em MSF") : "";
    let personalHighlightOfXpWorkingMsfIsValidated =
      associate.data.personalHighlightOfXpWorkingWithMsf !== "";
    !personalHighlightOfXpWorkingMsfIsValidated
      ? arrayError.push("Destaque trabalhando em MSF")
      : "";
    let languagesIsValidated = associate.data.languages.length !== 0;
    !languagesIsValidated ? arrayError.push("Linguagens") : "";
    let genderIsValidated = associate.data.gender !== undefined;
    !genderIsValidated ? arrayError.push("Gênero") : "";
    let communicationAccebilityResourcesIsValitdated =
      associate.data.communicationAccebilityResources.length !== 0;
    !communicationAccebilityResourcesIsValitdated
      ? arrayError.push("Recursos de acessibilidade comunicacional")
      : "";

    let personalCodeIsValidated = associate.data.personalCode !== 0;
    !personalCodeIsValidated ? arrayError.push("Código") : "";
    if (
      fullNameIsValidated &&
      cpfIsValidated &&
      emailIsValidated &&
      phoneIsValited &&
      dateOfAdmissionIsValited &&
      languagesIsValidated &&
      genderIsValidated &&
      communicationAccebilityResourcesIsValitdated &&
      lastPositionIsValidated &&
      personalHighlightOfXpWorkingMsfIsValidated &&
      personalCodeIsValidated &&
      contryOfResidenceIsValidated &&
      nationalityIsValidated &&
      professionIsValidated
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

  useEffect(() => {
    setWorkspace({
      ...workspace,
      action: () => {
        handleEditAction(associate);
      },
    });
    handleEventsLoad(associate.data.events);
    yearsLoaded.length == 0 ? handleYearsLoad(associate.id) : null;
  }, [associate]);

  return (
    <>
      <div className={styles.associate}>
        <AssociateWorkspaceMainForm
          associate={associate}
          associateUtils={associateWorkspaceUtils}
          setAssociate={setAssociate}
        />
        <AssociateWorkspaceExpForm
          associate={associate}
          associateUtils={associateWorkspaceUtils}
          setAssociate={setAssociate}
        />
        <AssociateWorkspacePersonalForm
          associate={associate}
          associateUtils={associateWorkspaceUtils}
          setAssociate={setAssociate}
        />
        <AssociateWorkspaceMembershipForm
          associate={associate}
          associateUtils={associateWorkspaceUtils}
          setAssociate={setAssociate}
        />

        {eventArray.length > 0 ? (
          <label className={`${styles.labelTitle} ${styles.bigTitle}`}>
            Encontros & Eventos
          </label>
        ) : (
          ""
        )}

        {eventArray.map((event) => {
          return (
            <div className={styles.event} key={event.id}>
              <p className={styles.eventTitle}>{event.data.title}</p>
              <p className={styles.eventTitleDescription}>
                <span className={styles.eventTitleDescriptionSpan}>
                  Descrição:
                </span>{" "}
                {event.data.titleDescription}
              </p>
              <input
                onChange={associateWorkspaceUtils.handleDateOfBirthInputChange}
                className={styles.editInput}
                type="date"
                id="eventDate"
                name="eventDate"
                disabled={true}
                defaultValue={associateWorkspaceUtils.handleTimeStampsToDate(
                  event.data.date
                )}
              />
            </div>
          );
        })}
        <AssociateWorkspaceInitiativeForm
          associate={associate}
          associateUtils={associateWorkspaceUtils}
          handleBoardDeleteIconClick={handleBoardDeleteIconClick}
          handleCommitteeDeleteIconClick={handleCommitteeDeleteIconClick}
          handleFiscalCouncilDeleteIconClick={
            handleFiscalCouncilDeleteIconClick
          }
          handleInitiativeDeleteIconClick={handleInitiativeDeleteIconClick}
          newBoard={newBoard}
          newBoardEndDate={newBoardEndDate}
          newBoardExtraInfo={newBoardExtraInfo}
          newBoardIsCurrentlyValid={newBoardIsCurrentlyValid}
          newBoardStartDate={newBoardStartDate}
          newBoardTitle={newBoardTitle}
          newCommittee={newCommittee}
          newCommitteeEndDate={newCommitteeEndDate}
          newCommitteeIsCurrentlyValid={newCommitteeIsCurrentlyValid}
          newCommitteeOtherDescription={newCommitteeOtherDescription}
          newCommitteeStartDate={newCommitteeStartDate}
          newCommitteeTitle={newCommitteeTitle}
          newFiscalCouncil={newFiscalCouncil}
          newFiscalCouncilEndDate={newFiscalCouncilEndDate}
          newFiscalCouncilExtraInfo={newFiscalCouncilExtraInfo}
          newFiscalCouncilIsCurrentlyValid={newFiscalCouncilIsCurrentlyValid}
          newFiscalCouncilStartDate={newFiscalCouncilStartDate}
          newFiscalCouncilTitle={newFiscalCouncilTitle}
          newInitiative={newInitiative}
          newInitiativeEndDate={newInitiativeEndDate}
          newInitiativeIsCurrentlyValid={newInitiativeIsCurrentlyValid}
          newInitiativeOtherDescription={newInitiativeOtherDescription}
          newInitiativeStartDate={newInitiativeStartDate}
          newInitiativeTitle={newInitiativeTitle}
          setAssociate={setAssociate}
          setNewBoard={setNewBoard}
          setNewBoardEndDate={setNewBoardEndDate}
          setNewBoardExtraInfo={setNewBoardExtraInfo}
          setNewBoardIsCurrentlyValid={setNewBoardIsCurrentlyValid}
          setNewBoardStartDate={setNewBoardStartDate}
          setNewBoardTitle={setNewBoardTitle}
          setNewCommittee={setNewComittee}
          setNewCommitteeEndDate={setNewCommitteeEndDate}
          setNewCommitteeIsCurrentlyValid={setNewCommitteeIsCurrentlyValid}
          setNewCommitteeOtherDescription={setNewCommitteeOtherDescription}
          setNewCommitteeStartDate={setNewCommitteeStartDate}
          setNewCommitteeTitle={setNewCommitteeTitle}
          setNewFiscalCouncil={setNewFiscalCouncil}
          setNewFiscalCouncilEndDate={setNewFiscalCouncilEndDate}
          setNewFiscalCouncilExtraInfo={setNewFiscalCouncilExtraInfo}
          setNewFiscalCouncilIsCurrentlyValid={
            setNewFiscalCouncilIsCurrentlyValid
          }
          setNewFiscalCouncilStartDate={setNewFiscalCouncilStartDate}
          setNewFiscalCouncilTitle={setNewFiscalCouncilTitle}
          setNewInitiative={setNewInitiative}
          setNewInitiativeEndDate={setNewInitiativeEndDate}
          setNewInitiativeIsCurrentlyValid={setNewInitiativeIsCurrentlyValid}
          setNewInitiativeOtherDescription={setNewInitiativeOtherDescription}
          setNewInitiativeStartDate={setNewInitiativeStartDate}
          setNewInitiativeTitle={setNewInitiativeTitle}
        />

        <label className={`${styles.labelTitle} ${styles.bigTitle}`}>
          Histórico de pagamento e votação
        </label>
        {yearsLoaded
          .sort(function (a, b) {
            return a.year - b.year;
          })
          .map((year) => {
            let yearEntrieInArray: any = [];
            return (
              <>
                <label className={styles.yearTitle}>{year.year}</label>
                {Object.entries(year.entries).map(([key, value]) => {
                  switch (key) {
                    case "id":
                      yearEntrieInArray[0] = value;
                      break;
                    case "date":
                      yearEntrieInArray[1] = value;
                      break;
                    case "rightToVote":
                      yearEntrieInArray[2] = value;
                      break;
                    case "otherChoiceRightToVote":
                      yearEntrieInArray[3] = value;
                      break;
                    case "voted":
                      yearEntrieInArray[4] = value;
                      break;
                    case "annualFeeValue":
                      yearEntrieInArray[5] = value;
                      break;
                    case "receipt":
                      yearEntrieInArray[6] = value;
                      break;
                    case "paymentMethod":
                      yearEntrieInArray[7] = value;
                      break;
                    case "otherPaymentMethod":
                      yearEntrieInArray[8] = value;
                      break;
                  }
                })}
                <label className={styles.label} htmlFor="annualFeeValue">
                  Valor pago:
                </label>
                <input
                  className={styles.editInput}
                  placeholder=""
                  defaultValue={yearEntrieInArray[5] || ""}
                  id="annualFeeValue"
                  disabled
                />
                <label className={styles.label} htmlFor="annualFeeValue">
                  Meio de pagamento:
                </label>
                <input
                  className={styles.editInput}
                  placeholder=""
                  defaultValue={yearEntrieInArray[7] || ""}
                  id="annualFeeValue"
                  disabled
                />
                {yearEntrieInArray[7] == "Outro" ? (
                  <>
                    <label className={styles.label} htmlFor="annualFeeValue">
                      Outro meio de pagamento:
                    </label>
                    <input
                      className={styles.editInput}
                      placeholder=""
                      defaultValue={yearEntrieInArray[8] || ""}
                      id="annualFeeValue"
                      disabled
                    />
                  </>
                ) : (
                  ""
                )}

                <label className={styles.label} htmlFor="yearDate">
                  Data:
                </label>
                <input
                  onChange={
                    associateWorkspaceUtils.handleDateOfBirthInputChange
                  }
                  className={styles.editInput}
                  type="date"
                  id="yearDate"
                  name="yearDate"
                  disabled
                  defaultValue={associateWorkspaceUtils.handleTimeStampsToDate(
                    handleTimeStamps(yearEntrieInArray[1])
                  )}
                />
                <label className={styles.label}>
                  Comprovante de pagamento:
                </label>
                <label className={styles.switch}>
                  <input
                    disabled
                    defaultChecked={`${yearEntrieInArray[6]}` == "true"}
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
                      disabled
                      type="checkbox"
                      id="AG"
                      name="AG"
                      className={styles.css_checkbox}
                      defaultChecked={
                        yearEntrieInArray[2]
                          ? yearEntrieInArray[2].includes(VoteChoicesENUM.ag)
                          : false
                      }
                      value={VoteChoicesENUM.ag}
                    />

                    <label htmlFor="AG"> {VoteChoicesENUM.ag}</label>
                  </div>
                  <div>
                    <input
                      disabled
                      type="checkbox"
                      id="OCBGathering"
                      name="OCBGathering"
                      className={styles.css_checkbox}
                      defaultChecked={
                        yearEntrieInArray[2]
                          ? yearEntrieInArray[2].includes(
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
                      disabled
                      type="checkbox"
                      id="other"
                      name="other"
                      className={styles.css_checkbox}
                      defaultChecked={
                        yearEntrieInArray[2]
                          ? yearEntrieInArray[2].includes(VoteChoicesENUM.other)
                          : false
                      }
                      value={VoteChoicesENUM.other}
                    />

                    <label htmlFor="other"> {VoteChoicesENUM.other}</label>
                  </div>
                  <div>
                    <input
                      disabled
                      type="checkbox"
                      id="none"
                      name="none"
                      className={styles.css_checkbox}
                      defaultChecked={
                        yearEntrieInArray[2]
                          ? yearEntrieInArray[2].includes(VoteChoicesENUM.none)
                          : false
                      }
                      value={VoteChoicesENUM.none}
                    />

                    <label htmlFor="none"> {VoteChoicesENUM.none}</label>
                  </div>
                </div>
                {yearEntrieInArray[2].includes(VoteChoicesENUM.other) ? (
                  <>
                    <label className={styles.label} htmlFor="other">
                      {`Outro(s) evento(s) com direito à voto:`}
                    </label>
                    <input
                      disabled
                      className={styles.editInput}
                      placeholder=""
                      defaultValue={yearEntrieInArray[3] || ""}
                      id="other"
                    />
                  </>
                ) : (
                  ""
                )}
                <label className={styles.label} htmlFor="annualFeeValue">
                  Votos:
                </label>
                {yearEntrieInArray[4].length !== 0 ? (
                  <div className={styles.votedDiv}>
                    {yearEntrieInArray[4].map((vote: string) => {
                      return (
                        <span className={styles.votedSpan} key={Math.random()}>
                          {vote}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        <label className={`${styles.labelTitle} ${styles.bigTitle}`}>
          Últimas atualizações do associado:
        </label>
        {showMore ? (
          associate.data.lastAssociateUpdate.map(
            (updateObject: UpdateObject) => {
              return backOfficeUsers.map((backOfficeUser) => {
                if (backOfficeUser.data.uid == updateObject.userId) {
                  return (
                    <>
                      <div className={styles.profileDiv}>
                        <img
                          className={styles.profileDiv__profilePic}
                          src={backOfficeUser.data.profilePhoto}
                          alt="Foto de perfil do usuário de backoffice."
                        ></img>
                        <div>
                          <span className={styles.profileDiv__name}>
                            {backOfficeUser.data.name}
                          </span>
                          <span className={styles.profileDiv__email}>
                            {`Dia e horário: ${handleTimeStamps(
                              updateObject.date
                            ).toLocaleDateString("pt-br")} | ${handleTimeStamps(
                              updateObject.date
                            ).toLocaleTimeString("pt-br", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}`}
                          </span>
                        </div>
                      </div>
                    </>
                  );
                }
              });
            }
          )
        ) : (
          <>
            {backOfficeUsers.map((backOfficeUser) => {
              if (
                backOfficeUser.data.uid ==
                associate.data.lastAssociateUpdate[0].userId
              ) {
                return (
                  <>
                    <div className={styles.profileDiv}>
                      <img
                        className={styles.profileDiv__profilePic}
                        src={backOfficeUser.data.profilePhoto}
                        alt="Foto de perfil."
                      ></img>
                      <div>
                        <span className={styles.profileDiv__name}>
                          {backOfficeUser.data.name}
                        </span>
                        <span className={styles.profileDiv__email}>
                          {`Dia e horário: ${handleTimeStamps(
                            associate.data.lastAssociateUpdate[0].date
                          ).toLocaleDateString("pt-br")} | ${handleTimeStamps(
                            associate.data.lastAssociateUpdate[0].date
                          ).toLocaleTimeString("pt-br", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`}
                        </span>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </>
        )}
        <p
          onClick={() => {
            setShowMore(!showMore);
          }}
          className={styles.showMore}
        >
          {showMore ? "Mostrar menos" : "Mostrar mais"}
        </p>
      </div>
    </>
  );
};

export default AssociateWorkspace;
