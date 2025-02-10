import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./AssociateWorkspaceMainForm.module.css";
import { AssociateObject } from "@/app/types/AssociateType";
import { MdOutlineFileUpload } from "react-icons/md";
import { useGlobalContext } from "@/app/context/store";
import FormInput from "../UI/FormInput";
import { AssociateWorkspaceUtils } from "./AssociateWorkspaceUtils";

interface mainFormProps {
  associate: AssociateObject;
  associateUtils: AssociateWorkspaceUtils;
  setAssociate: React.Dispatch<React.SetStateAction<AssociateObject>>;
}

const AsssociateCreateSpaceMainForm: React.FC<mainFormProps> = (props) => {
  const { user, backEndURL } = useGlobalContext();

  const [profilePicUpload, setProfilePicUpload] = useState<File>();

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
        props.setAssociate({
          id: props.associate.id,
          data: { ...props.associate.data, profilePhoto: data[0] },
        });
      })

      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.divProfilePhoto}>
          <img
            className={styles.profilePhoto}
            src={props.associate.data.profilePhoto}
            alt="Imagem de perfil"
          />
        </div>
        <span className={styles.uploadIconSpan}>
          <label htmlFor="profilepic">
            <MdOutlineFileUpload className={styles.uploadIcon} />
          </label>
          <input
            style={{ opacity: 0 }}
            id="profilepic"
            type="file"
            name="profilepic"
            onChange={handleUploadProfilePhoto}
            onBlur={handleUploadProfilePhoto}
          ></input>
        </span>
        <div>
          <FormInput
            defaultValue={props.associate.data.fullName || ""}
            htmlFor="name"
            id="name"
            labelText="Nome do associado:"
            onChange={props.associateUtils.handleFullNameInputChange}
            placeholder=""
            key="name"
            isRequired={true}
            isCPF={false}
            isEmail={false}
          />
        </div>
      </div>
      <FormInput
        defaultValue={props.associate.data.socialName || ""}
        htmlFor="socialName"
        id="socialName"
        labelText="Nome social:"
        onChange={props.associateUtils.handleSocialNameInputChange}
        placeholder=""
        key="socialName"
        isRequired={false}
        isCPF={false}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.profession || ""}
        htmlFor="profession"
        id="profession"
        labelText="Profissão:"
        onChange={props.associateUtils.handleProfessionInputChange}
        placeholder=""
        key="profession"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.cpf || ""}
        htmlFor="cpf"
        id="cpf"
        labelText="CPF:"
        onChange={props.associateUtils.handleCPFInputChange}
        placeholder=""
        key="cpf"
        isRequired={true}
        isCPF={true}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.idPassport || ""}
        htmlFor="passport"
        id="passport"
        labelText="Id ou Passporte:"
        onChange={props.associateUtils.handleIdPassportInputChange}
        placeholder=""
        key="passport"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.email || ""}
        htmlFor="email"
        id="email"
        labelText="Email cadastrado:"
        onChange={props.associateUtils.handleEmailInputChange}
        placeholder=""
        key="email"
        isRequired={true}
        isCPF={false}
        isEmail={true}
      />
      <FormInput
        defaultValue={props.associate.data.emailSecondary || ""}
        htmlFor="emailSecondary"
        id="emailSecondary"
        labelText="Email secundário:"
        onChange={props.associateUtils.handleEmailSecondaryInputChange}
        placeholder=""
        key="emailSecondary"
        isRequired={false}
        isCPF={false}
        isEmail={true}
      />
      <FormInput
        defaultValue={props.associate.data.phone || ""}
        htmlFor="phone"
        id="phone"
        labelText="Telefone:"
        onChange={props.associateUtils.handlePhoneInputChange}
        placeholder=""
        key="phone"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.contryOfResidence || ""}
        htmlFor="contryOfResidence"
        id="contryOfResidence"
        labelText="País de residência:"
        onChange={props.associateUtils.handleContryOfResidenceInputChange}
        placeholder=""
        key="contryOfResidence"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.stateOfResidence || ""}
        htmlFor="stateOfResidence"
        id="stateOfResidence"
        labelText="Estado de residência:"
        onChange={props.associateUtils.handleStateOfResidenceInputChange}
        placeholder=""
        key="stateOfResidence"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.cityOfResidence || ""}
        htmlFor="cityOfResidence"
        id="cityOfResidence"
        labelText="Cidade de residência:"
        onChange={props.associateUtils.handleCityOfResidenceInputChange}
        placeholder=""
        key="cityOfResidence"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.nationality || ""}
        htmlFor="nationality"
        id="nationality"
        labelText="Nacionalidade:"
        onChange={props.associateUtils.handleNationalityInputChange}
        placeholder=""
        key="nationality"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.stateOfBirth || ""}
        htmlFor="stateOfBirth"
        id="stateOfBirth"
        labelText="Estado de nascimento:"
        onChange={props.associateUtils.handleStateOfBirthInputChange}
        placeholder=""
        key="stateOfBirth"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
      <FormInput
        defaultValue={props.associate.data.cityOfBirth || ""}
        htmlFor="cityOfBirth"
        id="cityOfBirth"
        labelText="Cidade de nascimento:"
        onChange={props.associateUtils.handleCityOfBirthInputChange}
        placeholder=""
        key="cityOfBirth"
        isRequired={true}
        isCPF={false}
        isEmail={false}
      />
    </>
  );
};

export default AsssociateCreateSpaceMainForm;
