import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@material-ui/core";
import InputField from "components/FormControl/InputField";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import "./styles.scss";

function AddWorkSpaceForm(props) {
  const { handleCloseDialog, handleAddNew } = props;
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
    handleAddNew(values);
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
