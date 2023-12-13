import React, { useState, useEffect } from "react";
import style from "./home.module.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CreateUser = () => {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate=useNavigate()

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'https://api.countrystatecity.in/v1/countries',
          {
            headers: {
              'X-CSCAPI-KEY': 'U0JaTUZ1d3RkWE1iMVk4Z2NpbjBIdThENjlIeUVVd0h1RGo1VzNOeQ=='
            }
          }
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    const fetchStates = async () => {
      try {
        const response = await axios.get(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`,
          {
            headers: {
              'X-CSCAPI-KEY': 'U0JaTUZ1d3RkWE1iMVk4Z2NpbjBIdThENjlIeUVVd0h1RGo1VzNOeQ=='
            }
          }
        );
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchCountries();
    if (selectedCountry) {
      fetchStates(); 
    }
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };


  const handlePhoneNumberChange = (value) => {
 
    const cleanPhoneNumber = value.replace(/\D/g, "");
  

    if (cleanPhoneNumber.length === 12) {
      setMobile(cleanPhoneNumber);
    } else {
      
      console.log("Invalid Phone Number");
    }
  };








  const formHandler = (e) => {
    e.preventDefault();
      
    

    
    if (!firstname || firstname.length < 5) {
      alert("First Name is required and must be at least 5 characters");
      return;
    }


    if (!lastName || lastName.length < 5) {
      alert("Last Name is required and must be at least 5 characters");
      return;
    }


   
    const emailR = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailR.test(email)) {
      alert("Invalid Email address");
      return;
    }


   
    if(mobile.length!==12){
      alert('invalid Number')
      return;
     }


    if (!address1) {
      alert("Address 1 is required");
      return;
    }

  
    console.log(
      firstname,
      lastName,
      email,
      mobile,
      address1,
      address2,
      selectedCountry,
      selectedState,
      zipCode
    );

     axios.post("http://localhost:3500/sentusers",{firstname,lastName,email,mobile,address1,address2,selectedCountry,selectedState,zipCode})
     .then(()=>{
      console.log("Data sent");
     })
     .catch(()=>{
      console.log("Error");
     })
     navigate("/users")
  };

  return (
    <>
      <div className={style.forms} key="forms">
        <form action="" method="post">
          <label htmlFor="">Firstname</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <label htmlFor="">Lastname</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        <label htmlFor="">Mobile Number</label>
          <PhoneInput
            placeholder="Enter phone number"
            value={mobile}
            onChange={handlePhoneNumberChange}
          />
          <label htmlFor="">Address 1</label>
          <input
            type="text"
            value={address1}
            onChange={(e) => {
              setAddress1(e.target.value);
            }}
          />
          <label htmlFor="">Address 2</label>
          <input
            type="text"
            value={address2}
            onChange={(e) => {
              setAddress2(e.target.value);
            }}
          />
          <label htmlFor="">Zip Code</label>
          <input
            type="number"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
          />
          <select name="" id="" onChange={handleCountryChange}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.iso2} value={country.iso2}>
                {country.name}
              </option>
            ))}
          </select>
          <div key="dropdowns">
            <select name="" id="" onChange={handleStateChange}>
              <option value="">Select a state</option>
              {states && states.map((state) => (
                <option key={state.isoCode} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={formHandler}>Submit</button>
          <Link to="/">Go to Home</Link>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
