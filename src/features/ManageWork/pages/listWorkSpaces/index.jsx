import {
  ButtonBase,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";
import DialogSlide from "components/DialogSlide";
import AddWorkSpaceForm from "features/ManageWork/components/AddWorkSpaceForm";
import FilterArea from "features/ManageWork/components/filter";
import WorkSpace from "features/ManageWork/components/work-space";
import { useGetWorkSpacesData } from "hooks/useWorkSpacesData";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import queryString from "query-string";
import "./styles.scss";
import { listWorkSpaceBackGround } from "constant/config";
ListWorkSpaces.propTypes = {};
function ListWorkSpaces(props) {
  const {
    workSpaces,
    handleFilter,
    handleAddNewWorkSpaceClick,
  } = useGetWorkSpacesData();
  const listLinkImage = listWorkSpaceBackGround;
  useEffect(() => {
    listLinkImage.map((value, index) => {
      let a = <img src={value} />;
      return a;
    });
  }, []);
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();
  const handleAddNewClick = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const param = queryString.parse(location.search);
  const isHavePermissionAddNew = param.status === "joined" ? false : true;
  return (
    <div className="myWorkSpace">
      <Grid container spacing={10}>
        <Grid item xs={3} className="none-mobile"></Grid>
        <Grid item xs={12} md={9} className="pageTitle">
          <Typography variant="h4">{t("work-space.pageTitle")}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        <Grid item md={3} xs={12} className="filterSection">
          <FilterArea handleFilter={handleFilter} />
        </Grid>
        <Grid item md={9} xs={12} className="workSpacesSection">
          {workSpaces.length > 0 && (
            <>
              <Grid container spacing={5}>
                {workSpaces.map((value) => (
                  //chon key=idworkspace
                  <WorkSpace key={value._id} data={value}></WorkSpace>
                ))}
                {isHavePermissionAddNew && (
                  <>
                    <Grid
                      item
                      lg={3}
                      md={4}
                      xs={6}
                      className="displayCenterByFlex"
                    >
                      <ButtonBase
                        className="displayColumnFlex btn btn--hoverBottomSpot"
                        onClick={handleAddNewClick}
                      >
                        <AddOutlined />
                        <Typography>{t("work-space.addNewButton")}</Typography>
                      </ButtonBase>
                      <DialogSlide
                        component={
                          <AddWorkSpaceForm
                            handleAddNew={handleAddNewWorkSpaceClick}
                            handleCloseDialog={handleDialogClose}
                          />
                        }
                        openStatus={openDialog}
                        handleCloseDialog={handleDialogClose}
                        dialogTitle={t("work-space.dialog.title")}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </>
          )}
          {workSpaces.length === 0 && (
            <>
              {!isHavePermissionAddNew && (
                <>
                  <div className="displayCenterByFlex">
                    <Typography variant="h5">
                      {t("work-space.noWorkSpaceJoined")}
                    </Typography>
                  </div>
                </>
              )}
              {isHavePermissionAddNew && (
                <>
                  <div className="displayCenterByFlex">
                    <Typography variant="h5">
                      {t("work-space.noWorkSpace")}
                    </Typography>
                  </div>
                  <Grid item xs={12} className="displayCenterByFlex">
                    <ButtonBase
                      className="displayColumnFlex btn btn--hoverBottomSpot"
                      onClick={handleAddNewClick}
                    >
                      <AddOutlined />
                      <Typography>{t("work-space.addNewButton")}</Typography>
                    </ButtonBase>
                    <DialogSlide
                      component={
                        <AddWorkSpaceForm
                          handleAddNew={handleAddNewWorkSpaceClick}
                          handleCloseDialog={handleDialogClose}
                        />
                      }
                      openStatus={openDialog}
                      handleCloseDialog={handleDialogClose}
                      dialogTitle={t("work-space.dialog.title")}
                    />
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ListWorkSpaces;
