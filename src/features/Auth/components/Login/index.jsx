import { unwrapResult } from "@reduxjs/toolkit";
import { _LIST_LINK } from "constant/config";
import { loginSlice } from "core/redux/authSlice";
import { useSnackbar } from "notistack";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import LoginForm from "../LoginForm";

function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const history = useHistory();
  const OnSubmit = async (values) => {
    try {
      const data = { ...values };
      const payload = {
        identifier: data.email,
        password: data.password,
      };
      const action = loginSlice(payload);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      enqueueSnackbar(t("notiStack.loginSuccess"), { variant: "success" });
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
      <LoginForm OnSubmit={OnSubmit} />
    </div>
  );
}

export default Login;
