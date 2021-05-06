import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-ui/core";
import InputField from "components/FormControl/InputField";
import CustomizedRadios from "components/RadioButtonCustom";
import { listWorkSpaceBackGround } from "constant/config";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import "./styles.scss";

function AddWorkSpaceForm(props) {
  const { handleCloseDialog, handleAddNew } = props;
  const [backGroundChecked, setBackGroudChecked] = useState({
    image: listWorkSpaceBackGround[0],
  });
  const handleChangeRadioButtonBackgroundWorkSpace = (value) => {
    setBackGroudChecked({ image: value });
  };
  const { t } = useTranslation();
  const schema = yup.object().shape({
    workSpace: yup.string().required("Please enter your work space's name ."),
  });
  const form = useForm({
    defaultValues: {
      workSpace: "",
    },
    resolver: yupResolver(schema),
  });
  const handleOnSubmit = (values) => {
    if (!handleAddNew) return;
    if (!handleCloseDialog) return;
    console.log({ ...values, ...backGroundChecked });
    handleAddNew({ ...values, ...backGroundChecked });
    handleCloseDialog();
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleOnSubmit)}>
      <InputField
        name="workSpace"
        label={t("work-space.dialog.inputFieldLabel")}
        form={form}
        disabled={false}
      />

      <CustomizedRadios
        handleChangeRadioButtonBackgroundWorkSpace={
          handleChangeRadioButtonBackgroundWorkSpace
        }
      />

      <Button
        color="secondary"
        className="mainBox__submitButton"
        variant="contained"
        fullWidth
        type="submit"
      >
        {t("work-space.dialog.addButton")}
      </Button>
    </form>
  );
}

export default AddWorkSpaceForm;
