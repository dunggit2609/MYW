import AUTH from "constant/auth";
import { _LIST_LINK } from "constant/config";
import Register from "features/Auth/components/Register";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

function RegisterPage(props) {
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
      <Register />
    </div>
  );
}

export default RegisterPage;
