/* eslint-disable no-use-before-define */
import { Menu, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
SelectBox.propTypes = {
  handleItemSelected: PropTypes.func.isRequired,
};

export default function SelectBox(props) {
  const {
    listValue,
    handleItemSelected,
    isOpen,
    handleSelectBoxClose,
    menuPos,
    selected,
    displayPos,
  } = props;
  const { t } = useTranslation();
  const lng = localStorage.getItem("language");
  const [selectedItem, setselectedItem] = useState(isOpen);

  useEffect(() => {
    setselectedItem(isOpen);
  }, [isOpen]);

  const handleClose = (event) => {
    if (!handleSelectBoxClose) return;
    handleSelectBoxClose();
  };

  const handleClickItem = (event) => {
    setselectedItem(null);
    if (!handleItemSelected) {
      return;
    }
    if (event) {
      handleItemSelected(event.target.firstChild.data);
    }
  };
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={selectedItem}
        keepMounted
        open={Boolean(selectedItem)}
        onClose={handleClose}
        anchorOrigin={displayPos}
        transformOrigin={menuPos}
        getContentAnchorEl={null}
      >
        {listValue.map((value) => {
          return (
            <MenuItem
              key={value}
              selected={!!selected && value === lng}
              onClick={handleClickItem}
            >
              {value}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
