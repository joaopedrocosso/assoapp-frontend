import {
  AccessibilityResources,
  AssociateObject,
  BoardENUM,
  Choices,
  CommitteeENUM,
  Contract,
  FiscalCouncilENUM,
  Gender,
  Iniciatives,
  IniciativesENUM,
  Languages,
  MemberType,
  Race,
} from "@/app/types/AssociateType";
import { ChangeEvent, SetStateAction } from "react";

export class AssociateWorkspaceUtils {
  private setAssociate: (value: SetStateAction<AssociateObject>) => void;
  private associate: AssociateObject;

  constructor(
    setAssociate: (value: SetStateAction<AssociateObject>) => void,
    associate: AssociateObject
  ) {
    this.setAssociate = setAssociate;
    this.associate = associate;
  }

  public handleTimeStampsToDate = (timestamp: Date) => {
    // timestamp.setHours(13, 0, 0, 0);
    const year = timestamp.getFullYear();
    const month = (timestamp.getMonth() + 1).toString().padStart(2, "0");
    const day = timestamp.getDate().toString().padStart(2, "0");
    const formatedDate = `${year}-${month}-${day}`;
    return formatedDate;
  };

  public handleFullNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, fullName: event.target.value },
    }));
  };

  public handleSocialNameInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, socialName: event.target.value },
    }));
  };

  public handleProfessionInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, profession: event.target.value },
    }));
  };

  public handleCPFInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, cpf: event.target.value },
    }));
  };

  public handleEmailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, email: event.target.value },
    }));
  };

  public handleEmailSecondaryInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, emailSecondary: event.target.value },
    }));
  };

  public handlePhoneInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, phone: event.target.value },
    }));
  };

  public handleContryOfResidenceInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, contryOfResidence: event.target.value },
    }));
  };

  public handleStateOfResidenceInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, stateOfResidence: event.target.value },
    }));
  };

  public handleCityOfResidenceInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, cityOfResidence: event.target.value },
    }));
  };

  public handleNationalityInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, nationality: event.target.value },
    }));
  };

  public handleStateOfBirthInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, stateOfBirth: event.target.value },
    }));
  };

  public handleCityOfBirthInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, cityOfBirth: event.target.value },
    }));
  };

  public handleIdPassportInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: { ...prevAssociate.data, idPassport: event.target.value },
    }));
  };

  public handleDateOfAdmissionInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value);
    newDate.setHours(newDate.getHours() + 10);
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        dateOfAdmission: newDate,
      },
    }));
  };

  public handleDateLastMSFJobInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value);
    newDate.setHours(newDate.getHours() + 10);
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        dateLastMSFJob: newDate,
      },
    }));
  };

  public handleEmploymentContractIsCurrentlyValidInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        employmentContractIsCurrentlyValid: event.target.checked,
      },
    }));
  };

  public handleIsHealthcareFieldInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        isHealthcareField: event.target.checked,
      },
    }));
  };

  public handleHasMsfXpOutsideHomeContryInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        hasMsfXpOutsideHomeContry: event.target.checked,
      },
    }));
  };

  public handleHasMsfXPinBrazilOrAmericaInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        hasMsfXPinBrazilOrAmerica: event.target.checked,
      },
    }));
  };

  public handleLastPositionInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        lastPosition: event.target.value,
      },
    }));
  };

  public handleContractTypeInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const contractType = event.target.value as Contract;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        contractType: contractType,
      },
    }));
  };

  public handlePersonalHighlightOfXpWorkingWithMsfInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        personalHighlightOfXpWorkingWithMsf: event.target.value,
      },
    }));
  };

  public handleDateOfBirthInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value);
    newDate.setHours(newDate.getHours() + 10);
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        dateOfBirth: newDate,
      },
    }));
  };

  public handleLanguagesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const languageValue = event.target.value as Languages;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        languages: event.target.checked
          ? [...prevAssociate.data.languages, languageValue]
          : prevAssociate.data.languages.filter(
              (lang) => lang !== languageValue
            ),
      },
    }));
  };

  public handleOtherLanguagesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        otherLanguages: event.target.value,
      },
    }));
  };

  public handleGenderInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const gender = event.target.value as Gender;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        gender: gender,
      },
    }));
  };

  public handleLgbtqiapnplusMemberInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const lgbtqiapnplusMember = event.target.value as Choices;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        lgbtqiapnplusMember: lgbtqiapnplusMember,
      },
    }));
  };

  public handleRaceInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const race = event.target.value as Race;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        race: race,
      },
    }));
  };

  public handleOtherRaceInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        otherRace: event.target.value,
      },
    }));
  };

  public handleEthnicityInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        ethnicity: event.target.value,
      },
    }));
  };

  public handleUnderrepresentedGroupInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        underrepresentedGroup: event.target.value,
      },
    }));
  };

  public handleCommunicationAccebilityResourcesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const accessibilityResource = event.target.value as AccessibilityResources;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        communicationAccebilityResources: event.target.checked
          ? [
              ...prevAssociate.data.communicationAccebilityResources,
              accessibilityResource,
            ]
          : prevAssociate.data.communicationAccebilityResources.filter(
              (resource) => resource !== accessibilityResource
            ),
      },
    }));
  };

  public handleOtherCommunicationAccebilityResourcesInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        otherCommunicationAccebilityResources: event.target.value,
      },
    }));
  };

  handlePhysicalDisabilityOrReducedMobilityInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const physicalDisabilityOrReducedMobilityValue = event.target
      .value as Choices;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        physicalDisabilityOrReducedMobility:
          physicalDisabilityOrReducedMobilityValue,
      },
    }));
  };

  public handlePhysicalDisabilityOrReducedMobilityDescriptionInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        physicalDisabilityOrReducedMobilityDescription: event.target.value,
      },
    }));
  };

  public handlePersonalCodeInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        personalCode: +event.target.value,
      },
    }));
  };

  public handleMemberTypeInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newMemberType = event.target.value as MemberType;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        memberShip: {
          ...prevAssociate.data.memberShip,
          memberType: newMemberType,
        },
      },
    }));
  };

  public handledateOfConcentUseDataInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value);
    newDate.setHours(newDate.getHours() + 10);
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        dateOfConcentUseData: newDate,
      },
    }));
  };

  public handleInfoDateInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    newDate.setHours(newDate.getHours() + 10);
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        memberShip: {
          ...prevAssociate.data.memberShip,
          infoDate: newDate,
        },
      },
    }));
  };
  public handleLastRegistrationUpdateInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newDate = new Date(event.target.value);
    newDate.setHours(newDate.getHours() + 10);
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        memberShip: {
          ...prevAssociate.data.memberShip,
          lastRegistrationUpdate: newDate,
        },
      },
    }));
  };
  public handleExcludedInfoInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        memberShip: {
          ...prevAssociate.data.memberShip,
          excludedInfo: event.target.value,
        },
      },
    }));
  };

  public handleMoreThanSixMonthsWithMSFInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        moreThanSixMonthsWithMSF: event.target.checked,
      },
    }));
  };

  public handleIsAwarePrivacyPolicyInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        isAwarePrivacyPolicy: event.target.checked,
      },
    }));
  };

  public handleGrantConcentUseDataInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        grantConcentUseData: event.target.checked,
      },
    }));
  };

  public handleMoreThanTwelveMonthsInternOrVolunteerInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        moreThanTwelveMonthsInternOrVolunteer: event.target.checked,
      },
    }));
  };

  public handleReciveMessageAppInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        reciveMessageApp: event.target.checked,
      },
    }));
  };

  public handleReciveGeneralEmailsAppInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        reciveGeneralEmails: event.target.checked,
      },
    }));
  };

  public handleOtherInitiativesInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        otherInitiatives: event.target.value,
      },
    }));
  };

  public handleInitiativeChange = (
    titleToBeAdded: string,
    startDateToBeAdded: Date,
    endDateToBeAdded: Date,
    isCurrentlyValidToBeAdded: boolean,
    otherDescriptionToBeAdded: string
  ) => {
    const titleEnum = titleToBeAdded as IniciativesENUM;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        initiatives: [
          ...prevAssociate.data.initiatives,
          {
            title: titleEnum,
            startDate: startDateToBeAdded,
            endDate: endDateToBeAdded,
            isCurrentlyValid: isCurrentlyValidToBeAdded,
            otherDescription: otherDescriptionToBeAdded,
          },
        ],
      },
    }));
  };

  public handleCommitteeChange = (
    titleToBeAdded: string,
    startDateToBeAdded: Date,
    endDateToBeAdded: Date,
    otherDescriptionToBeAdded: string,
    isCurrentlyValidToBeAdded: boolean
  ) => {
    const titleEnum = titleToBeAdded as CommitteeENUM;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        committee: [
          ...prevAssociate.data.committee,
          {
            title: titleEnum,
            startDate: startDateToBeAdded,
            endDate: endDateToBeAdded,
            otherDescription: otherDescriptionToBeAdded,
            isCurrentlyValid: isCurrentlyValidToBeAdded,
          },
        ],
      },
    }));
  };

  public handleBoardChange = (
    titleToBeAdded: string,
    extraInfoToBeAdded: string,
    startDateToBeAdded: Date,
    endDateToBeAdded: Date,
    isCurrentlyValidToBeAdded: boolean
  ) => {
    const titleEnum = titleToBeAdded as BoardENUM;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        board: [
          ...prevAssociate.data.board,
          {
            title: titleEnum,
            extraInfo: extraInfoToBeAdded,
            startDate: startDateToBeAdded,
            endDate: endDateToBeAdded,
            isCurrentlyValid: isCurrentlyValidToBeAdded,
          },
        ],
      },
    }));
  };

  public handleFiscalCouncilChange = (
    titleToBeAdded: string,
    extraInfoToBeAdded: string,
    startDateToBeAdded: Date,
    endDateToBeAdded: Date,
    isCurrentlyValidToBeAdded: boolean
  ) => {
    const titleEnum = titleToBeAdded as FiscalCouncilENUM;
    this.setAssociate((prevAssociate) => ({
      id: this.associate.id,
      data: {
        ...prevAssociate.data,
        fiscalCouncil: [
          ...prevAssociate.data.fiscalCouncil,
          {
            title: titleEnum,
            extraInfo: extraInfoToBeAdded,
            startDate: startDateToBeAdded,
            endDate: endDateToBeAdded,
            isCurrentlyValid: isCurrentlyValidToBeAdded,
          },
        ],
      },
    }));
  };
}
