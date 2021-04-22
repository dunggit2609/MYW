import { ButtonBase, Grid, Tooltip, Typography } from "@material-ui/core";
import { LanguageOutlined } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import SelectBox from "components/selectBox";
import { _LIST_LINK } from "constant/config";
import languageModel from "core/model/languageModel";

import ToggleMode from "features/darkMode/components/toggleMode";
import { useWindowSize } from "hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useLocation } from "react-router-dom";
import "./styles.scss";

function HamburgerNav(props) {
  const { t } = useTranslation();
  const location = useLocation();
  const [currentLocation, setcurrentLocation] = useState(location.pathname);
  const [isLanguageOpen, setIsLanguageOpen] = useState(null);
  const [width] = useWindowSize();

  const isDisplayAuth = location.pathname === _LIST_LINK.index ? true : false;
  const isDisplayHeader =
    location.pathname !== _LIST_LINK.notFound ? true : false;
  if (currentLocation !== location.pathname) {
    setcurrentLocation(location.pathname);
  }

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

  const handleChooseLng = (value) => {
    localStorage.setItem("language", value);
    window.location.reload();
  };

  useEffect(() => {
    if (width > 1023) {
      let nav = document.getElementById("Hamburger");
      if (!!nav) {
        nav.style.right = "-110%";
      }
    }
  }, [width]);

  const handleCloseHamburgerClick = () => {
    let nav = document.getElementById("Hamburger");
    if (!!nav) {
      nav.style.right = "-110%";
    }
  };

  useEffect(() => {
    let nav = document.getElementById("Hamburger");
    if (!!nav) {
      nav.style.right = "-110%";
    }
  }, [currentLocation]);
  return (
    <div className="navHamburger" id="Hamburger">
      {isDisplayHeader && (
        <div>
          <ButtonBase
            className="btn btn--close"
            onClick={handleCloseHamburgerClick}
          >
            <CloseIcon></CloseIcon>
          </ButtonBase>

          <Grid container space={3} alignItems="center" direction="column">
            {isDisplayAuth && (
              <>
                <ButtonBase
                  color="inherit"
                  className="btn"
                  component={RouterLink}
                  to={_LIST_LINK.login}
                  size="medium"
                >
                  <Typography>{t("header.authButton.loginButton")}</Typography>
                </ButtonBase>

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
              </>
            )}
            <Grid item xs={12}>
              <ToggleMode />
            </Grid>
            <Grid item xs={12}>
              <Tooltip title={t("toolTip.chooseLanguage")} placement="bottom">
                <ButtonBase className="btn" onClick={handleLanguageBoxClick}>
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
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default HamburgerNav;
