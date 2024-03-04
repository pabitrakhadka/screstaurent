import axios from 'axios';
import React from 'react'
import crypto from 'crypto';
import { request } from 'http';
import { headers } from '../../next.config';
 
const esewa = () => {

    // const esewa = () => {
    //     const url = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    //     const secretKey = "8gBm/:&EnhH.1/q(";
    
    //     // Construct the data object with required parameters
    //     const data = {
    //         amount: "100",
    //         tax_amount: "10",
    //         total_amount: "110",
    //         transaction_uuid: "ab14a8f2b02c3",
    //         product_code: "EPAYTEST",
    //         product_service_charge: "0",
    //         product_delivery_charge: "0",
    //         success_url: "https://esewa.com.np",
    //         failure_url: "https://google.com",
    //         signed_field_names: "total_amount,transaction_uuid,product_code"
    //     };
    
    //     // Generate the signature
    //     const signatureData = [
    //         `total_amount=${data.total_amount}`,
    //         `transaction_uuid=${data.transaction_uuid}`,
    //         `product_code=${data.product_code}`
    //     ].join(',');
    
    //     const signature = crypto.createHmac('sha256', secretKey)
    //         .update(signatureData)
    //         .digest('base64');
    
    //     // Add the signature to the data object
    //     data.signature = signature;
    
    //     // Make the POST request
    //     axios.post(url, data)
    //         .then(response => {
    //             console.log('Response:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // };

    const KhaltiPayment = async () => {
         
        const data = JSON.stringify({
            "return_url": "http://localhost:3000/esewa",
            "website_url": "http://localhost:3000/",
            "amount": "1000",
            "purchase_order_id": "Order01",
            "purchase_order_name": "test",
            "customer_info": {
                "name": "Ram Bahadur",
                "email": "test@khalti.com",
                "phone": "9800000001"
            }
        });
        const headers = {
            'Authorization': 'key c14ac25061a7424cb36ed785426934cf',
            'Content-Type': 'application/json' 
        };
    
        try {
            
            const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/',data,{
                headers:headers
            });
    
            console.log("Payment initiated successfully:");
            console.log(response.data);
        } catch (error) {
            
            console.error('Error initiating payment:', error.response ? error.response.data : error.message);
        }
    };
    
    
  return (
    <>
    <div className="image_logo">
        <img onClick={KhaltiPayment} src="https://blog.khalti.com/wp-content/uploads/2021/01/khalti-icon.png" alt="" height={20} width={20} />
    </div>
    <div className="image_logo">
        <img onClick={esewa} src="https://esewa.com.np/common/images/esewa-icon-large.png" alt="" height={20} width={20} />
    </div>
     
    </>
  )
}

export default esewa