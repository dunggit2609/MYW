import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Button,
  Container,
  Icon,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { VpnKeyRounded } from "@material-ui/icons";
import InputField from "components/FormControl/InputField";
import PasswordField from "components/FormControl/PasswordField";
import AUTH from "constant/auth";
import { _LIST_LINK } from "constant/config";
import { loadCSS } from "fg-loadcss";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import * as yup from "yup";
import "./styles.scss";
RegisterForm.propTypes = {
  OnSubmit: PropTypes.func.isRequired,
};

function RegisterForm(props) {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email address.")
      .email("Your email is wrong format"),
    username: yup.string().required("Please enter Username"),
    fullname: yup.string().required("Please enter your Full Name"),
    retypepassword: yup
      .string()
      .required("Please retype your Password")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password has minimum 8 characters, at least one uppercase letter,one lower letter,one number"
      )
      .oneOf([yup.ref("password")], "Retype Password dose not matchDungf2609"),
    password: yup
      .string()
      .required("Please enter your Password")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password has minimum 8 characters, at leas tone uppercase letter,one lower letter,one number"
      ),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      username: "",
      fullname: "",
      password: "",
      retypepassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const handleOnSubmit = async (values) => {
    const { OnSubmit } = props;
    localStorage.removeItem(AUTH.TOKEN_KEY);
    if (OnSubmit) {
      await OnSubmit(values);
    }
    form.reset();
  };
  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  return (
    <div className="container">
      <Container maxWidth="xs" className="mainBox">
        <div className="registering">
          {isSubmitting && <LinearProgress color="secondary" />}
        </div>

        <Avatar className="mainBox__avatar">
          <VpnKeyRounded></VpnKeyRounded>
        </Avatar>

        <Typography
          component="h1"
          variant="h5"
          className="mainBox__title--auth"
        >
          {t("header.authTitle.register")}
        </Typography>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <InputField
            name="email"
            label={t("header.authField.email")}
            // placeholder="Please enter email"
            form={form}
            disabled={false}
          />
          <InputField
            name="username"
            label={t("header.authField.username")}
            form={form}
            disabled={false}
          />
          <InputField
            name="fullname"
            label={t("header.authField.fullname")}
            form={form}
            disabled={false}
          />

          <PasswordField
            name="password"
            label={t("header.authField.password")}
            form={form}
            disable={false}
          />

          <PasswordField
            name="retypepassword"
            label={t("header.authField.retypepassword")}
            form={form}
            disable={false}
          />

          <Button
            color="secondary"
            className="mainBox__submitButton"
            variant="contained"
            fullWidth
            type="submit"
          >
            {t("header.authButton.registerButton")}
          </Button>
        </form>
        <div className="mainBox__buttonArea">
          <Button
            component={RouterLink}
            to={_LIST_LINK.login}
            className="mainBox__iconSign"
            variant="contained"
            fullWidth
          >
            <span>{t("header.authButton.haveAccount")}</span>
          </Button>
          <Button className="mainBox__iconSign" variant="contained" fullWidth>
            <Icon className="mainBox__icon fab fa-facebook" color="secondary" />
            <span>{t("header.authButton.loginByFb")}</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default RegisterForm;
