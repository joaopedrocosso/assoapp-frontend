import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./AssociateCreateSpaceMainForm.module.css";
import {
  AccessibilityResources,
  AssociateObject,
  Choices,
  Contract,
  Gender,
  Languages,
  Race,
} from "@/app/types/AssociateType";

import { AssociateCreateSpaceUtils } from "./AssociateCreateSpaceUtils";
import BigLabel from "../UI/BigLabel";
import DateForm from "../UI/DateForm";
import ToggleForm from "../UI/ToggleForm";
import FormInput from "../UI/FormInput";
import DropBoxForm from "../UI/DropboxForm";
import TextAreaForm from "../UI/TextAreaForm";
import CheckBoxForm from "../UI/CheckboxForm";

interface mainFormProps {
  associate: AssociateObject;
  associateUtils: AssociateCreateSpaceUtils;
  setAssociate: React.Dispatch<React.SetStateAction<AssociateObject>>;
}

const AssociateCreateSpacePersonalForm: React.FC<mainFormProps> = (props) => {
  return (
    <>
      <BigLabel labelText="Informações pessoais" />
      <DateForm
        defaultValue={props.associateUtils.handleTimeStampsToDate(
          props.associate.data.dateOfBirth
        )}
        htmlFor=""
        id="dateOfBirth"
        labelText=" Data de nascimento :"
        name="dateOfBirth"
        onChange={props.associateUtils.handleDateOfBirthInputChange}
      />
      <CheckBoxForm
        labelText="Linguagens:"
        defaultCheckType={props.associate.data.languages}
        onChange={props.associateUtils.handleLanguagesInputChange}
        values={[
          { name: "Portuguese", value: Languages.Portuguese },
          { name: "English", value: Languages.English },
          { name: "Spanish", value: Languages.Spanish },
          { name: "French", value: Languages.French },
          { name: "Arabic", value: Languages.Arabic },
          { name: "Libras", value: Languages.Libras },
          { name: "Other", value: Languages.Other },
        ]}
      />
      <FormInput
        defaultValue={props.associate.data.otherLanguages || ""}
        htmlFor="otherLanguages"
        id="otherLanguages"
        labelText="Outras línguas:"
        onChange={props.associateUtils.handleOtherLanguagesInputChange}
        placeholder=""
        isRequired={false}
        isCPF={false}
        isEmail={false}
      />
      <DropBoxForm
        defaultValue={props.associate.data.gender}
        htmlFor="gender"
        name="gender"
        onChange={props.associateUtils.handleGenderInputChange}
        id="gender"
        labelText="Gênero:"
        list="genderList"
        values={[
          Gender.CisMan,
          Gender.CisWoman,
          Gender.NonBinary,
          Gender.TransMan,
          Gender.TransWoman,
          Gender.Travesti,
        ]}
      />
      <DropBoxForm
        defaultValue={props.associate.data.lgbtqiapnplusMember}
        htmlFor="lgbtqiapnplusMember"
        name="lgbtqiapnplusMember"
        onChange={props.associateUtils.handleLgbtqiapnplusMemberInputChange}
        id="lgbtqiapnplusMember"
        labelText="Se identifica como representante da comunidade LGBTQIAPN+:"
        list="lgbtqiapnplusMemberList"
        values={[Choices.Yes, Choices.No, Choices.PreferNotAnswer]}
      />
      <DropBoxForm
        defaultValue={props.associate.data.race}
        htmlFor="race"
        name="race"
        onChange={props.associateUtils.handleRaceInputChange}
        id="race"
        labelText="Raça:"
        list="raceList"
        values={[
          Race.Black,
          Race.BrownMixed,
          Race.Indigenous,
          Race.White,
          Race.Yellow,
          Race.Other,
          Race.PreferNotAnswer,
        ]}
      />
      <FormInput
        defaultValue={props.associate.data.otherRace || ""}
        htmlFor="otherRace"
        id="otherRace"
        labelText="Outra raça:"
        onChange={props.associateUtils.handleOtherRaceInputChange}
        placeholder=""
        isRequired={false}
        isCPF={false}
        isEmail={false}
      />

      {props.associate.data.race === Race.Indigenous ? (
        <>
          <FormInput
            defaultValue={props.associate.data.ethnicity || ""}
            htmlFor="ethnicity"
            id="ethnicity"
            labelText="Etinía:"
            onChange={props.associateUtils.handleEthnicityInputChange}
            placeholder=""
            isRequired={false}
            isCPF={false}
            isEmail={false}
          />
        </>
      ) : (
        ""
      )}
      <FormInput
        defaultValue={props.associate.data.underrepresentedGroup || ""}
        htmlFor="underrepresentedGroup"
        id="underrepresentedGroup"
        labelText="Grupo subrepresentado:"
        onChange={props.associateUtils.handleUnderrepresentedGroupInputChange}
        placeholder=""
        isRequired={false}
        isCPF={false}
        isEmail={false}
      />

      <CheckBoxForm
        labelText="Recursos de acessibilidade comunicacional:"
        defaultCheckType={props.associate.data.communicationAccebilityResources}
        onChange={
          props.associateUtils.handleCommunicationAccebilityResourcesInputChange
        }
        values={[
          {
            name: "audioDescription",
            value: AccessibilityResources.AudioDescription,
          },
          { name: "captioning", value: AccessibilityResources.Captioning },
          {
            name: "librasInterpretation",
            value: AccessibilityResources.LibrasInterpretation,
          },
          { name: "lipReading", value: AccessibilityResources.LipReading },
          {
            name: "writtenDescriptionOfImages",
            value: AccessibilityResources.WrittenDescriptionOfImages,
          },
          { name: "other", value: AccessibilityResources.Other },
          {
            name: "notApplicable",
            value: AccessibilityResources.NotApplicable,
          },
        ]}
      />

      {props.associate.data.communicationAccebilityResources.includes(
        AccessibilityResources.Other
      ) ? (
        <>
          <FormInput
            defaultValue={
              props.associate.data.otherCommunicationAccebilityResources || ""
            }
            htmlFor="otherCommunicationAccebilityResources"
            id="otherCommunicationAccebilityResources"
            labelText="Outro recurso de acessibilidade comunicacional:"
            onChange={
              props.associateUtils
                .handleOtherCommunicationAccebilityResourcesInputChange
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
      <DropBoxForm
        defaultValue={props.associate.data.physicalDisabilityOrReducedMobility}
        htmlFor="physicalDisabilityOrReducedMobility"
        name="physicalDisabilityOrReducedMobility"
        onChange={
          props.associateUtils
            .handlePhysicalDisabilityOrReducedMobilityInputChange
        }
        id="physicalDisabilityOrReducedMobility"
        labelText="Deficiência física ou mobilidade reduzida:"
        list="physicalDisabilityOrReducedMobilityList"
        values={[Choices.Yes, Choices.No, Choices.PreferNotAnswer]}
      />

      {props.associate.data.physicalDisabilityOrReducedMobility ===
      Choices.Yes ? (
        <>
          <FormInput
            defaultValue={
              props.associate.data
                .physicalDisabilityOrReducedMobilityDescription || ""
            }
            htmlFor="physicalDisabilityOrReducedMobilityDescription"
            id="physicalDisabilityOrReducedMobilityDescription"
            labelText="Descrição da deficiência física e/ou mobilidade reduzida:"
            onChange={
              props.associateUtils
                .handlePhysicalDisabilityOrReducedMobilityDescriptionInputChange
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
    </>
  );
};

export default AssociateCreateSpacePersonalForm;
