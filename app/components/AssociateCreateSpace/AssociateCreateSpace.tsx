"use client";

import React, { ChangeEvent } from "react";
import styles from "./AssociateCreateSpace.module.css";
import {
  AccessibilityResources,
  AssociateObject,
  Board,
  BoardENUM,
  Choices,
  Committee,
  CommitteeENUM,
  Contract,
  FiscalCouncil,
  FiscalCouncilENUM,
  Gender,
  Iniciatives,
  IniciativesENUM,
  Languages,
  MemberType,
  Race,
} from "@/app/types/AssociateType";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/context/store";
import { AssociateCreateSpaceUtils } from "./AssociateCreateSpaceUtils";
import AsssociateCreateSpaceMainForm from "./AssociateCreateSpaceMainForm";
import AssociateCreateSpaceExpForm from "./AssociateCreateSpaceExpForm";
import AssociateCreateSpacePersonalForm from "./AssociateCreateSpacePersonalForm";
import AssociateCreateSpaceMembershipForm from "./AssociateCreateSpaceMembershipForm";
import AssociateCreateSpaceInitiativeForm from "./AssociateCreateSpaceInitiativeForm";

const AssociateCreateSpace: React.FC = () => {
  const {
    workspace,
    setWorkspace,
    associatesData,
    setAssociatesData,
    setBackdrop,
    setWorkspaceIsActive,
    backdrop,
    workspaceIsActive,
    setActiveItem,
    setInfoModalMessage,
    setAssociatesWorkData,
    associatesWorkData,
    user,
    backEndURL,
  } = useGlobalContext();

  const [associate, setAssociate] = useState<AssociateObject>({
    id: "",
    data: {
      fullName: "",
      socialName: "",
      cpf: "",
      idPassport: "",
      email: "",
      emailSecondary: "",
      phone: "",
      contryOfResidence: "",
      stateOfResidence: "",
      cityOfResidence: "",
      nationality: "",
      stateOfBirth: "",
      cityOfBirth: "",
      profilePhoto:
        "https://bitslog.files.wordpress.com/2013/01/unknown-person1.gif",
      profession: "",
      dateOfAdmission: new Date(),
      employmentContractIsCurrentlyValid: false,
      dateLastMSFJob: new Date(),
      isHealthcareField: false,
      hasMsfXpOutsideHomeContry: false,
      hasMsfXPinBrazilOrAmerica: false,
      lastPosition: "",
      contractType: Contract.NoContract,
      personalHighlightOfXpWorkingWithMsf: "",
      dateOfBirth: new Date(),
      languages: [Languages.Portuguese],
      otherLanguages: "",
      gender: Gender.NonBinary,
      lgbtqiapnplusMember: Choices.PreferNotAnswer,
      race: Race.PreferNotAnswer,
      otherRace: "",
      ethnicity: "",
      underrepresentedGroup: "",
      communicationAccebilityResources: [],
      otherCommunicationAccebilityResources: "",
      physicalDisabilityOrReducedMobility: Choices.PreferNotAnswer,
      physicalDisabilityOrReducedMobilityDescription: "",
      memberShip: {
        memberType: MemberType.potentialMember,
        infoDate: new Date(),
        lastRegistrationUpdate: new Date(),
        excludedInfo: "",
      },
      personalCode: 0,
      isAwarePrivacyPolicy: false,
      grantConcentUseData: false,
      dateOfConcentUseData: new Date(),
      moreThanSixMonthsWithMSF: false,
      moreThanTwelveMonthsInternOrVolunteer: false,
      reciveMessageApp: false,
      reciveGeneralEmails: false,
      events: [],
      initiatives: [],
      committee: [],
      board: [],
      fiscalCouncil: [],
      otherInitiatives: "",
      lastAssociateUpdate: [
        { userId: user?.uid || "Usuário não encontrado.", date: new Date() },
      ],
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

  const associateCreateSpaceUtils = new AssociateCreateSpaceUtils(
    setAssociate,
    associate
  );

  const handleCheckIfAssociateDataIsValid = (associate: AssociateObject) => {
    let arrayError = [];
    let fullNameIsValidated = associate.data.fullName !== "";
    !fullNameIsValidated ? arrayError.push("Nome completo") : "";
    let cpfIsValidated = associate.data.cpf !== "";
    !cpfIsValidated ? arrayError.push("CPF") : "";
    let emailIsValidated = associate.data.email !== "";
    !emailIsValidated ? arrayError.push("E-mail") : "";
    let phoneIsValited = associate.data.phone !== "";
    !phoneIsValited ? arrayError.push("Telefone") : "";
    let dateOfAdmissionIsValited =
      associate.data.dateOfAdmission.toString() !== "";
    !dateOfAdmissionIsValited ? arrayError.push("Data de admissão") : "";
    let languagesIsValidated = associate.data.languages.length !== 0;
    !languagesIsValidated ? arrayError.push("Linguagens") : "";
    let genderIsValidated = associate.data.gender !== undefined;
    !genderIsValidated ? arrayError.push("Gênero") : "";
    let communicationAccebilityResourcesIsValitdated =
      associate.data.communicationAccebilityResources.length !== 0;
    !communicationAccebilityResourcesIsValitdated
      ? arrayError.push("Recursos de acessibilidade comunicacional")
      : "";
    let lastPositionIsValidated = associate.data.lastPosition !== "";
    !lastPositionIsValidated ? arrayError.push("Última posição em MSF") : "";
    let personalHighlightOfXpWorkingMsfIsValidated =
      associate.data.personalHighlightOfXpWorkingWithMsf !== "";
    !personalHighlightOfXpWorkingMsfIsValidated
      ? arrayError.push("Destaque trabalhando em MSF")
      : "";
    let personalCodeIsValidated = associate.data.personalCode !== 0;
    !personalCodeIsValidated ? arrayError.push("Código") : "";
    let contryOfResidenceIsValidated = associate.data.contryOfResidence !== "";
    !contryOfResidenceIsValidated ? arrayError.push("País de residência") : "";
    let nationalityIsValidated = associate.data.nationality !== "";
    !nationalityIsValidated ? arrayError.push("Nacionalidade") : "";
    let professionIsValidated = associate.data.profession !== "";
    !professionIsValidated ? arrayError.push("Profissão") : "";
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

  const handleEditAction = async (associate: AssociateObject) => {
    const isAssociateValid = handleCheckIfAssociateDataIsValid(associate);
    if (isAssociateValid) {
      const response = await fetch(
        `${backEndURL}associate/create?accessKey=${user?.accessToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...associate.data }),
        }
      )
        .then((response) => response.json())
        .then((responseType) => {
          const AssociatesDataArray = [...associatesData];
          const AssociatesWorkArray = [...associatesWorkData];
          const associateCreated: AssociateObject = responseType[0].response[0];
          AssociatesDataArray.push(associateCreated);
          AssociatesWorkArray.push(associateCreated);
          setAssociatesData(AssociatesDataArray);
          setAssociatesWorkData(AssociatesDataArray);
          setBackdrop(!backdrop);
          setWorkspaceIsActive(!workspaceIsActive);
          setWorkspace({
            title: ``,
            action: null,
            children: "",
          });
          setActiveItem("");
          setInfoModalMessage({
            status: 200,
            message: `Item criado com sucesso.`,
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

  useEffect(() => {
    setWorkspace({
      ...workspace,
      action: () => {
        handleEditAction(associate);
      },
    });
  }, [associate]);

  return (
    <div className={styles.associate}>
      <AsssociateCreateSpaceMainForm
        associate={associate}
        associateUtils={associateCreateSpaceUtils}
        setAssociate={setAssociate}
      />
      <AssociateCreateSpaceExpForm
        associate={associate}
        associateUtils={associateCreateSpaceUtils}
        setAssociate={setAssociate}
      />
      <AssociateCreateSpacePersonalForm
        associate={associate}
        associateUtils={associateCreateSpaceUtils}
        setAssociate={setAssociate}
      />
      <AssociateCreateSpaceMembershipForm
        associate={associate}
        associateUtils={associateCreateSpaceUtils}
        setAssociate={setAssociate}
      />
      <AssociateCreateSpaceInitiativeForm
        associate={associate}
        associateUtils={associateCreateSpaceUtils}
        setAssociate={setAssociate}
        handleBoardDeleteIconClick={handleBoardDeleteIconClick}
        handleCommitteeDeleteIconClick={handleCommitteeDeleteIconClick}
        handleFiscalCouncilDeleteIconClick={handleFiscalCouncilDeleteIconClick}
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
    </div>
  );
};

export default AssociateCreateSpace;
