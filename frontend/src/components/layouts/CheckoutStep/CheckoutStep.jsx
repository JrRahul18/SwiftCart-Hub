import React from "react";
import styles from "./CheckoutStep.module.css";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutStep.css"

const CheckoutStep = (props) => {
  const stepsArray = [
    {
      label: <Typography className="stepLabel">Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography className="stepLabel">Confirm Order</Typography>,
      icon: <ShoppingBagIcon />,
    },
    {
      label: <Typography className="stepLabel">Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];
  const stepsStyle = {
    boxSizing: "border-box",
  };
  return (
    <>
      <Stepper style={stepsStyle} alternativeLabel activeStep={props.activeStep}>
        {stepsArray.map((item, index) => (
          <Step active={props.activeStep === index ? true : false} completed={props.activeStep >= index ? true : false} key={index}>
            <StepLabel sx={{"& .MuiStepLabel-label": {color:props.activeStep >= index? "var(--button-color)" : ""},}} style={{color: props.activeStep >= index ? "var(--button-color)" : "rgba(0, 0, 0, 0.649)"}} className={styles.stepLabel} icon={item.icon}>
                {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutStep;
