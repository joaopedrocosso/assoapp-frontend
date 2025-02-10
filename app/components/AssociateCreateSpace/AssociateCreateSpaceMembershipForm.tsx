import React from "react";
import styles from "./AssociateCreateSpaceMembershipForm.module.css";
import { AssociateObject, MemberType } from "@/app/types/AssociateType";

import { AssociateCreateSpaceUtils } from "./AssociateCreateSpaceUtils";
import BigLabel from "../UI/BigLabel";
import DateForm from "../UI/DateForm";
import ToggleForm from "../UI/ToggleForm";
import DropBoxForm from "../UI/DropboxForm";
import InputNumberForm from "../UI/InputNumberForm";

interface mainFormProps {
  associate: AssociateObject;
  associateUtils: AssociateCreateSpaceUtils;
  setAssociate: React.Dispatch<React.SetStateAction<AssociateObject>>;
}

const AssociateCreateSpaceMembershipForm: React.FC<mainFormProps> = (props) => {
  return (
    <>
      <BigLabel labelText="Categoria:" />
      <div className={styles.category}>
        <DropBoxForm
          defaultValue={props.associate.data.memberShip.memberType || ""}
          htmlFor="memberType"
          labelText="Status:"
          list="memberTypeList"
          id="memberType"
          name="memberType"
          onChange={props.associateUtils.handleMemberTypeInputChange}
          values={[
            MemberType.potentialMember,
            MemberType.member,
            MemberType.excluded,
          ]}
        />
        <DateForm
          defaultValue={props.associateUtils.handleTimeStampsToDate(
            props.associate.data.memberShip.infoDate
          )}
          htmlFor="infoDate"
          id="infoDate"
          labelText="Data:"
          name="infoDate"
          onChange={props.associateUtils.handleInfoDateInputChange}
        />
        <DateForm
          defaultValue={props.associateUtils.handleTimeStampsToDate(
            props.associate.data.memberShip.lastRegistrationUpdate
          )}
          htmlFor="infoDate"
          id="lastRegistrationUpdate"
          labelText=" Última atualização cadastral:"
          name="lastRegistrationUpdate"
          onChange={
            props.associateUtils.handleLastRegistrationUpdateInputChange
          }
        />

        {props.associate.data.memberShip.memberType === MemberType.excluded ? (
          <>
            <DropBoxForm
              defaultValue={props.associate.data.memberShip.excludedInfo || ""}
              htmlFor="memberType"
              labelText="Motivo da exclusão:"
              list="excludedInfoList"
              id="excludedInfo"
              name="excludedInfo"
              onChange={props.associateUtils.handleExcludedInfoInputChange}
              values={["Pagamento", "Vontade própria", "Determinação do CA"]}
            />
          </>
        ) : (
          ""
        )}
      </div>{" "}
      <InputNumberForm
        placeholder=""
        defaultValue={props.associate.data.personalCode || 0}
        htmlFor="personalCode"
        id="personalCode"
        labelText="Código:"
        onChange={props.associateUtils.handlePersonalCodeInputChange}
      />
      <ToggleForm
        defaultChecked={false}
        labelText={"Está ciente da política de privacidade?"}
        onChange={props.associateUtils.handleIsAwarePrivacyPolicyInputChange}
      />
      <ToggleForm
        defaultChecked={false}
        labelText={"Tem consentimento dos termos de uso de dados?"}
        onChange={props.associateUtils.handleGrantConcentUseDataInputChange}
      />
      <DateForm
        defaultValue={props.associateUtils.handleTimeStampsToDate(
          props.associate.data.dateOfConcentUseData
        )}
        htmlFor="dateOfConcentUseData"
        id="dateOfConcentUseData"
        labelText="Data de consentimento de uso de dados:"
        name="dateOfConcentUseData"
        onChange={props.associateUtils.handledateOfConcentUseDataInputChange}
      />
      <BigLabel labelText=" Adesão:" />
      <ToggleForm
        defaultChecked={props.associate.data.moreThanSixMonthsWithMSF}
        labelText={"Tem mais de 6 (seis) meses como funcionário MSF?"}
        onChange={
          props.associateUtils.handleMoreThanSixMonthsWithMSFInputChange
        }
      />
      <ToggleForm
        defaultChecked={
          `${props.associate.data.moreThanTwelveMonthsInternOrVolunteer}` ==
          "true"
        }
        labelText={
          "Tem mais de 12 (doze) meses como voluntário ou estágio em MSF?"
        }
        onChange={
          props.associateUtils
            .handleMoreThanTwelveMonthsInternOrVolunteerInputChange
        }
      />
      <ToggleForm
        defaultChecked={`${props.associate.data.reciveMessageApp}` == "true"}
        labelText={
          "Tem interesse em participar em grupo de aplicativo de mensagens Asso Brasil?"
        }
        onChange={props.associateUtils.handleReciveMessageAppInputChange}
      />
      <ToggleForm
        defaultChecked={`${props.associate.data.reciveGeneralEmails}` == "true"}
        labelText={"Tem interesse em receber e-mails gerais do Asso Brasil?"}
        onChange={props.associateUtils.handleReciveGeneralEmailsAppInputChange}
      />
    </>
  );
};

export default AssociateCreateSpaceMembershipForm;
