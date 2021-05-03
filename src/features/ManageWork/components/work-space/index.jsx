import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useRouteMatch } from "react-router";
import "./styles.scss";
WorkSpace.propTypes = {};

function WorkSpace(props) {
  const { data } = props;
  const match = useRouteMatch();
  const prefix = "tables";
  return (
    <Grid item lg={3} md={4} xs={6} className="workSpace">
      <a
        rel="preload"
        as="iamge"
        href={`${match.path}/${data._id}/${prefix}`}
        className="workSpace__Link"
      >
        <div className="workSpace__Name">
          <Typography variant="h5">{data.name}</Typography>
        </div>
        <Paper className="workSpace__Cover">
          {/* <div className="buttonGroup">
            <Tooltip title={t("toolTip.deleteWorkSpace")} placement="bottom">
              <ButtonBase className="btn btn--hoverBottomSpot ">
                <DeleteOutlined />
              </ButtonBase>
            </Tooltip>

            <Tooltip title={t("toolTip.editWorkSpace")} placement="bottom">
              <ButtonBase className="btn btn--hoverBottomSpot ">
                <EditOutlined />
              </ButtonBase>
            </Tooltip>
          </div> */}
        </Paper>
      </a>
    </Grid>
  );
}

export default WorkSpace;
