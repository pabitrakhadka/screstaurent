import axios from 'axios';
import createSignature from './validate/createSignature';
import Cors from 'cors';
import { runMiddleware } from '../../utils/runMiddleware';
import prisma from '@/db/db.config';

export default async function handler(req, res) {
  try {
    // Initialize the CORS middleware
    const cors = Cors({
      origin: 'http://localhost:3000', // Allow requests from this origin
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
      optionsSuccessStatus: 200, // Allow successful preflight requests (OPTIONS)
    });

    // Run the CORS middleware
    await runMiddleware(req, res, cors);

    if (req.method === 'POST') {
      const { total_amount, transaction_uuid, product_code } = req.body;
      console.log(total_amount, transaction_uuid, product_code);

      const signature = createSignature(`${total_amount},${transaction_uuid},${product_code}`);
      console.log('signature: ', signature);

      const formData = {
        amount: '100',
        failure_url: 'http://localhost:3000/',
        product_delivery_charge: '0',
        product_service_charge: '0',
        signature: signature, // No need for template string here
        product_code: 'EPAYTEST',
        signed_field_names: 'total_amount,transaction_uuid,product_code',
        success_url: 'http://localhost:3000/check',
        tax_amount: '10',
        total_amount: '110',
        transaction_uuid: 'test',
      };
console.log("data",formData);
      const response = await axios.post("https://rc-epay.esewa.com.np/api/epay/main/v2/form", formData);
      if (response.status === 200) {
        console.log("Success");
        // Send a success response if needed
        res.status(200).json({ message: 'Success' });
      } else {
        console.log("Error");
        // Send an error response if needed
        res.status(500).json({ message: 'Error' });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// Handler function for your API route

// export default async function handler(req, res) {
//   // Set CORS headers
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   try {
//     if (req.method === 'POST') {
//       const { total_amount, transaction_uuid, product_code } = req.body;
//       console.log(total_amount, transaction_uuid, product_code);

//        const signature =   createSignature(`${total_amount},${transaction_uuid},${product_code}`);
//      console.log('signature: ', signature);

//       const formData = {
//         amount: '100',
//         failure_url: 'http://localhost:3000/',
//         product_delivery_charge: '0',
//         product_service_charge: '0',
//         signature: `${signature}`,
//         product_code: 'EPAYTEST',
//         signed_field_names: 'total_amount,transaction_uuid,product_code',
//         success_url: 'http://localhost:3000/check',
//         tax_amount: '10',
//         total_amount: '110',
//         transaction_uuid: 'test',
//       };
       

//        const response = await axios.post("https://rc-epay.esewa.com.np/api/epay/main/v2/form", formData);
//        if(response.status==200)
//        {
// console.log("Success");
//        }else{
//         console.log("error");
//        }

//       // // Send response
   
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }

 