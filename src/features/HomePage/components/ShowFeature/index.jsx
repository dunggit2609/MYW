import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Grid, Typography } from "@material-ui/core";
ShowFeature.propTypes = {};

function ShowFeature(props) {
  const { data } = props;
  console.log("feature", data);
  return (
    <div className="showFeatureSection">
      {data.imgPos === "left" && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <img className="img-fluid" src={data.img} alt="image" />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5">{data.feature}</Typography>
              <Typography variant="h4">{data.title}</Typography>
              <Typography>{data.description}</Typography>
            </Grid>
          </Grid>
        </>
      )}
      {data.imgPos === "right" && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5">{data.feature}</Typography>
              <Typography variant="h4">{data.title}</Typography>
              <Typography>{data.description}</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <img src={data.img} alt="image" />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export default ShowFeature;
