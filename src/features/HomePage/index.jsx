import { Container } from "@material-ui/core";
import { featureData_En } from "assets/data/featureData-en";
import { featureData_Vi } from "assets/data/featureData-vi";
import React, { useEffect, useState } from "react";
import Introduction from "./components/Introduction";
import ShowFeature from "./components/ShowFeature";
import "./styles.scss";

function HomePage(props) {
  const curLng = localStorage.getItem("language");
  const [featureData, setFeatureData] = useState([]);
  useEffect(() => {
    switch (curLng) {
      case "vi":
        setFeatureData(featureData_Vi);
        break;
      case "en":
        setFeatureData(featureData_En);
        break;
      default:
        break;
    }
  }, []);
  console.log(featureData);
  return (
    
    <Container maxWidth="xl" className="homePageBox">
      <section className="introduction">
      <Introduction />
      </section>
      <section className="feature">
        {featureData.map((value) => 
        <ShowFeature key={value.feature} data={value} />
      )}
      
        </section>
       
      </Container>
   
  );
}

export default HomePage;
