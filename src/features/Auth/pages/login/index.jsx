import AUTH from "constant/auth";
import { _LIST_LINK } from "constant/config";
import Login from "features/Auth/components/Login";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

function LoginPage(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const isAuth = !!localStorage.getItem(AUTH.TOKEN_KEY);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isAuth) {
      enqueueSnackbar(t("notiStack.hasLogin"), { variant: "success" });
      setTimeout(() => history.push(_LIST_LINK.index), 1000);
    }
  }, []);
  return (
    <div>
      {" "}
      <Login />
    </div>
  );
}

export default LoginPage;
