import React, { useState } from 'react'
import styles from "./Shipping.module.css";
import { CgHome } from 'react-icons/cg';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PublicIcon from '@mui/icons-material/Public';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { useDispatch, useSelector } from 'react-redux';
import {Country, State} from "country-state-city"
import HomeIcon from '@mui/icons-material/Home';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from '../layouts/MetaData/MetaData';
import CheckoutStep from '../layouts/CheckoutStep/CheckoutStep';
import { saveShippingInfo } from '../../actions/cartAction';
import { useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';

const Shipping = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const {shippingInfo} = useSelector(store=> store.cartCombine.cartReducer)
    const[address, setAddress]=useState(shippingInfo.address);
    const[city, setCity]=useState(shippingInfo.city);
    const[pinCode, setPinCode]= useState(shippingInfo.pinCode);
    const[state, setState]=useState(shippingInfo.state);
    const[country, setCountry]=useState(shippingInfo.country);
    const[contactNumber, setContactNumber]=useState(shippingInfo.contactNumber);

    const shippingFormSubmitHandler = (event) =>{
      event.preventDefault();

      if(contactNumber.length < 10 || contactNumber.length > 10){
        toast.error("Phone Number should be 10 digits", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }
      dispatch(saveShippingInfo({address, city, state, country, pinCode, contactNumber}));
      navigate("/order/confirm")
    }

  return (
    <>
    <MetaData title={"Shipping Information"}/>
    <div className={styles.outerContainer}>
        <div className={styles.headingBox}>
          <h1 className={styles.heading}>Shipping Information</h1>
        </div>
        <hr className={styles.horizontalLine} />
        <div className={styles.shippingStepperBox}>
          <CheckoutStep activeStep={0}/>
        </div>
        <div className={styles.shippingInfoBox}>
          <form className={styles.shippingForm} encType='multipart/form-data' onSubmit={shippingFormSubmitHandler} action="">
            
            <div className={styles.addressInputBox}>
              <HomeIcon className={styles.addressIcon}/>
              <input name="text" value={address} onChange={(event)=>setAddress(event.target.value)} required className={styles.addressInput} type="text" placeholder="Address" />
            </div>
            
            <div className={styles.cityInputBox}>
              <ApartmentIcon className={styles.cityIcon}/>
              <input name="text" value={city} onChange={(event)=>setCity(event.target.value)} required className={styles.cityInput} type="text" placeholder="City" />
            </div>

            <div className={styles.pinCodeInputBox}>
              <FmdGoodIcon className={styles.pinCodeIcon}/>
              <input name="text" value={pinCode} onChange={(event)=>setPinCode(event.target.value)} required className={styles.pinCodeInput} type="number" placeholder="Pin Code" />
            </div>

            <div className={styles.phoneNumberInputBox}>
              <PhoneInTalkIcon className={styles.phoneNumberIcon}/>
              <input name="text" value={contactNumber} onChange={(event)=>setContactNumber(event.target.value)} required className={styles.phoneNumberInput} type="number" placeholder="Phone Number" />
            </div>

            <div className={styles.countryInputBox}>
              <PublicIcon className={styles.countryIcon}/>
              <select name="Country" value={country} onChange={(event)=>setCountry(event.target.value)} required id="" className={styles.countryInput}>
                <option value=""> Country</option>
                {Country && Country.getAllCountries().map((val) =>(
                  <option key={val.isoCode} value={val.isoCode} className={styles.countryOptions}>
                    {val.name}
                  </option>
                ))}
              </select>
            </div>

            {country && (
              <div className={styles.stateInputBox}> 
                <TransferWithinAStationIcon className={styles.stateIcon}/>
                <select name='State' required value={state} onChange={(event)=> setState(event.target.value)} id="" className={styles.stateInput}>
                  <option value="">State</option>
                  {State && State.getStatesOfCountry(country).map((val)=>(
                    <option key={val.isoCode} value={val.isoCode} className={styles.stateOptions}>
                      {val.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={styles.shippingButtonBox}>
              <button disabled={state ? false : true} className={styles.shippingButton} type='submit' >Continue</button>
            </div>

          </form>
        </div>
    </div>
    <ToastContainer containerId={"shipping"}/>
    </>
  )
}

export default Shipping