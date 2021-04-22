import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, Container, Icon, Typography } from "@material-ui/core";
import { LockOpenRounded } from "@material-ui/icons";
import InputField from "components/FormControl/InputField";
import PasswordField from "components/FormControl/PasswordField";
import { _LIST_LINK } from "constant/config";
import { loadCSS } from "fg-loadcss";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";
import "./styles.scss";
LoginForm.propTypes = {
  OnSubmit: PropTypes.func.isRequired,
};

function LoginForm(props) {
  const { t } = useTranslation();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email address or username."),
    password: yup
      .string()
      .required("Please enter your password.")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password has minimum 8 characters, at least one uppercase letter,one lower letter,one number"
      ),
  });
  const form = useForm({
    defaultValues: {
      email: "",

      password: "",
    },
    resolver: yupResolver(schema),
  });
  const handleOnSubmit = (values) => {
    const { OnSubmit } = props;
    if (OnSubmit) {
      OnSubmit(values);
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
      <Container maxWidth="xs" className="mainBox mainBox--loginBox">
        <Avatar className="mainBox__avatar">
          <LockOpenRounded />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          className="mainBox__title--auth"
        >
          {t("header.authTitle.login")}
        </Typography>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <InputField
            name="email"
            label={t("header.authField.emailLogin")}
            form={form}
            disabled={false}
          />

          <PasswordField
            name="password"
            label={t("header.authField.password")}
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
            {t("header.authButton.loginButton")}
          </Button>
        </form>
        <div className="mainBox__buttonArea">
          <Button
            component={RouterLink}
            to={_LIST_LINK.register}
            className="mainBox__iconSign"
            variant="contained"
            fullWidth
          >
            <span>{t("header.authButton.noAccount")}</span>
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

export default LoginForm;
