import { unwrapResult } from "@reduxjs/toolkit";
import { _LIST_LINK } from "constant/config";
import { registerSlice } from "core/redux/authSlice";
import { useSnackbar } from "notistack";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import RegisterForm from "../RegisterForm";

function Register(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const OnSubmit = async (values) => {
    try {
      const action = registerSlice(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      //chao mung + user
      enqueueSnackbar(t("notiStack.registerSuccess"), { variant: "success" });
      //tam thoi redirect toi home
      // history.push(_LIST_LINK.manageWork);
      history.push(_LIST_LINK.index);
    } catch (err) {
      //handle err => show err
      console.log("failed", err);
    }
  };
  return (
    <div>
      <RegisterForm OnSubmit={OnSubmit} />
    </div>
  );
}

export default Register;
