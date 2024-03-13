import React from "react";
import axios from "axios";
import crypto from 'crypto';
 

const esewa = () => {
  const esewaPayment = async () => {
    // const data = {
    //   amount: 100,
    //   total_amount: 100,
    //   transaction_uuid: "test",
    //   product_code: "EPAYTEST",
    // };
    // console.log(data);
    // const headers = {
    //   "Content-Type": "application/json"
    // };
    // const res = await axios.post("api/esewa", data,{
    //   headers:headers
    // });
    // if (res.status === 200) {
    //   console.log("successs");
    // } else {
    //   console.log("error");
    // }

    
    const generateSignature = (message) => {
      const sicret = "8gBm/:&EnhH.1/q";
      const hmac = crypto.createHmac("sha256", sicret);
      hmac.update(message);
      var hashInBase64 = hmac.digest('base64');
      return hashInBase64;
    }
    const signature = generateSignature('110,test,EPAYTES');

    const formData = {
      amount: "100",
      failure_url: "http://localhost:3000/",
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "EPAYTEST",
      signature: `${signature}`,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "http://localhost:3000/check",
      tax_amount: "10",
      total_amount: "110",
      transaction_uuid: "ab14a8f2b02c3"
    };
    
    console.log(formData);
    try {
      // Using a CORS proxy service

      const apiUrl = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
      const res = await axios.post(apiUrl,JSON.stringify(formData)
        

      );
      if (res.status === 200) {
        console.log('success');
      } else {
        console.log('error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="image_logo">
        <img
          src="https://blog.khalti.com/wp-content/uploads/2021/01/khalti-icon.png"
          alt=""
          height={20}
          width={20}
        />
      </div>
      <div className="image_logo">
        <button className="btn btn-danger m-5" onClick={esewaPayment}>
          Esewa
        </button>
      </div>
    </>
  );
};

export default esewa;
