import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./AssociateCreateSpaceExpForm.module.css";
import { AssociateObject, Contract } from "@/app/types/AssociateType";

import { AssociateCreateSpaceUtils } from "./AssociateCreateSpaceUtils";
import BigLabel from "../UI/BigLabel";
import DateForm from "../UI/DateForm";
import ToggleForm from "../UI/ToggleForm";
import FormInput from "../UI/FormInput";
import DropBoxForm from "../UI/DropboxForm";
import TextAreaForm from "../UI/TextAreaForm";

interface expFormProps {
  associate: AssociateObject;
  associateUtils: AssociateCreateSpaceUtils;
  setAssociate: React.Dispatch<React.SetStateAction<AssociateObject>>;
}

const AssociateCreateSpaceExpForm: React.FC<expFormProps> = (props) => {
  return (
    <>
      <BigLabel labelText="Experiência em MSF" />
      <DateForm
        defaultValue={props.associateUtils.handleTimeStampsToDate(
          props.associate.data.dateOfAdmission
        )}
        htmlFor="dateOfAdmission"
        id="dateOfAdmission"
        labelText="Data de admissão:"
        name="dateOfAdmission"
        onChange={props.associateUtils.handleDateOfAdmissionInputChange}
      />
      <ToggleForm
        labelText="Contrato de trabalho vigente:"
        defaultChecked={props.associate.data.employmentContractIsCurrentlyValid}
        onChange={
          props.associateUtils
            .handleEmploymentContractIsCurrentlyValidInputChange
        }
      />
      {!props.associate.data.employmentContractIsCurrentlyValid ? (
        <>
          <DateForm
            defaultValue={props.associateUtils.handleTimeStampsToDate(
              props.associate.data.dateLastMSFJob
            )}
            htmlFor="Data do último trabalho em MSF:"
            id="dateLastMSFJob"
            labelText="Data de admissão:"
            name="dateLastMSFJob"
            onChange={props.associateUtils.handleDateLastMSFJobInputChange}
          />
        </>
      ) : (
        ""
      )}
      <ToggleForm
        labelText="Pertence ao campo da saúde:"
        defaultChecked={props.associate.data.isHealthcareField}
        onChange={props.associateUtils.handleIsHealthcareFieldInputChange}
      />
      <ToggleForm
        labelText="Tem experiência com MSF fora do país de origem:"
        defaultChecked={props.associate.data.hasMsfXpOutsideHomeContry}
        onChange={
          props.associateUtils.handleHasMsfXpOutsideHomeContryInputChange
        }
      />
      <ToggleForm
        labelText="Tem experiência com MSF no Brasil ou na América:"
        defaultChecked={props.associate.data.hasMsfXPinBrazilOrAmerica}
        onChange={
          props.associateUtils.handleHasMsfXPinBrazilOrAmericaInputChange
        }
      />
      <FormInput
        defaultValue={props.associate.data.lastPosition || ""}
        htmlFor="lastPosition"
        id="lastPosition"
        labelText="Última posição em MSF:"
        onChange={props.associateUtils.handleLastPositionInputChange}
        placeholder=""
        key="lastPosition"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
      <DropBoxForm
        defaultValue={props.associate.data.contractType}
        htmlFor="contractType"
        id="contractType"
        labelText="Tipo de contrato:"
        list="contractTypeList"
        name="contractType"
        onChange={props.associateUtils.handleContractTypeInputChange}
        values={[
          Contract.BrazilOffice,
          Contract.BrazilProject,
          Contract.NoContract,
          Contract.OutsideOffice,
          Contract.OutsideProject,
        ]}
      />
      <TextAreaForm
        defaultValue={props.associate.data.personalHighlightOfXpWorkingWithMsf}
        htmlFor="personalHighlightOfXpWorkingWithMsf"
        id="personalHighlightOfXpWorkingWithMsf"
        labelText="Destaque trabalhando com MSF:"
        onChange={
          props.associateUtils
            .handlePersonalHighlightOfXpWorkingWithMsfInputChange
        }
        placeholder=""
      />
    </>
  );
};

export default AssociateCreateSpaceExpForm;
