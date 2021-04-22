import { ButtonBase, Grid, Tooltip } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, LanguageOutlined } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import SelectBox from "components/selectBox";
import AUTH from "constant/auth";
import { _LIST_LINK } from "constant/config";
import languageModel from "core/model/languageModel";
import userLoginedModel from "core/model/userLoginedModel";

import ToggleMode from "features/darkMode/components/toggleMode";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import "./styles.scss";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [isScroll, setscrollPos] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(null);
  const [isUserAvartaOpen, setIsUserAvartaOpen] = useState(null);
  const isAuthPage =
    location.pathname === _LIST_LINK.register ||
    location.pathname === _LIST_LINK.login
      ? true
      : false;
  const scrollClass =
    isScroll || isAuthPage ? "toolBar--scroll" : "toolBar--unScroll";
  const isDisplayAuth = location.pathname === _LIST_LINK.index ? true : false;
  const isDisplayHeader =
    location.pathname === _LIST_LINK.notFound ? true : false;
  const isLogin = !!localStorage.getItem(AUTH.TOKEN_KEY);
  const handleLanguageBoxClick = (event) => {
    console.log(isLanguageOpen);
    if (!isLanguageOpen) {
      setIsLanguageOpen(event.currentTarget);
    }
    if (!!isLanguageOpen) {
      setIsLanguageOpen(null);
    }
  };
  const handleLanguageBoxClose = () => {
    setIsLanguageOpen(null);
  };

  const handleUserBoxClick = (event) => {
    console.log(isUserAvartaOpen);
    if (!isUserAvartaOpen) {
      setIsUserAvartaOpen(event.currentTarget);
    }
    if (!!isUserAvartaOpen) {
      setIsUserAvartaOpen(null);
    }
  };
  const handleUserBoxClose = () => {
    setIsUserAvartaOpen(null);
  };
  const handleScroll = () => {
    let scroll = document.getElementsByClassName("App")[0].scrollTop > 0;
    setscrollPos(scroll);
  };
  setTimeout(() => {
    if (!!document.getElementsByClassName("App")[0]) {
      document
        .getElementsByClassName("App")[0]
        .addEventListener("scroll", handleScroll);
    }
  }, 100);

  const handleChooseLng = (value) => {
    localStorage.setItem("language", value);
    window.location.reload();
  };
  const handleChooseUserAction = (value) => {
    switch (value) {
      case "Log out":
        localStorage.removeItem(AUTH.STORAGE_KEY);
        localStorage.removeItem(AUTH.TOKEN_KEY);
        history.push(_LIST_LINK.index);
        enqueueSnackbar(t("notiStack.logoutSuccess"), { variant: "success" });
        break;
      default:
        break;
    }
  };
  const handleHamburgerClick = () => {
    let nav = document.getElementById("Hamburger");
    nav.style.right = "0";
  };
  return (
    <div>
      {!isDisplayHeader && (
        <>
          <AppBar position="fixed" color="transparent" className="appBar">
            <Toolbar className={scrollClass}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <div className="toolbar__extraFeature" id="extraFeature">
                    <Tooltip
                      title={t("toolTip.chooseLanguage")}
                      placement="bottom"
                    >
                      <ButtonBase
                        className="btn"
                        onClick={handleLanguageBoxClick}
                      >
                        <LanguageOutlined />
                      </ButtonBase>
                    </Tooltip>
                    <SelectBox
                      handleItemSelected={handleChooseLng}
                      listValue={languageModel}
                      isOpen={isLanguageOpen}
                      handleSelectBoxClose={handleLanguageBoxClose}
                      menuPos={{ vertical: "top", horizontal: "left" }}
                      displayPos={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      selected={true}
                    />
                    <ToggleMode></ToggleMode>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="toolbar__center">
                    <ButtonBase
                      className="btn"
                      color="inherit"
                      component={RouterLink}
                      to={_LIST_LINK.index}
                    >
                      <Typography variant="h4" className="toolbar__title">
                        {t("header.appName")}
                      </Typography>
                    </ButtonBase>
                  </div>
                </Grid>
                <div className="hamburgerIcon">
                  <ButtonBase
                    className="handleHamburgerClick"
                    onClick={handleHamburgerClick}
                  >
                    <MenuIcon></MenuIcon>
                  </ButtonBase>
                </div>
                <Grid item xs={3}>
                  {isDisplayAuth && !isLogin && (
                    <>
                      <div className="float-right-block">
                        <ButtonBase
                          color="inherit"
                          className="btn"
                          component={RouterLink}
                          to={_LIST_LINK.login}
                          size="medium"
                        >
                          <Typography>
                            {t("header.authButton.loginButton")}
                          </Typography>
                        </ButtonBase>

                        <Typography className="toolbar__separateIcon">
                          |
                        </Typography>

                        <ButtonBase
                          color="inherit"
                          className="btn"
                          component={RouterLink}
                          to={_LIST_LINK.register}
                          size="medium"
                        >
                          <Typography>
                            {t("header.authButton.registerButton")}
                          </Typography>
                        </ButtonBase>
                      </div>
                    </>
                  )}
                  {isLogin && (
                    <>
                      <div className="float-right-block">
                        <Tooltip
                          title={t("toolTip.userAction")}
                          placement="bottom"
                        >
                          <ButtonBase
                            className="btn"
                            onClick={handleUserBoxClick}
                          >
                            <AccountCircle />
                          </ButtonBase>
                        </Tooltip>
                        <SelectBox
                          handleItemSelected={handleChooseUserAction}
                          listValue={userLoginedModel}
                          isOpen={isUserAvartaOpen}
                          handleSelectBoxClose={handleUserBoxClose}
                          menuPos={{ vertical: "top", horizontal: "right" }}
                          displayPos={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          selected={true}
                        />
                      </div>
                    </>
                  )}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </>
      )}
    </div>
  );
}
