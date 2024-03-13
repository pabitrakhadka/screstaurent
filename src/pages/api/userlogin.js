import prisma from '@/db/db.config.js';
import { userLoginSchema } from "./fieldValidate/index.js";
import { hashPassword, verifyPassword } from "./validate/hash";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import generateOpt from './validate/generateOpt.js'; 
// import { otp } from "@/schemas/index.jsx";

export default async function handler(req, res) {
    try {
        if (req.method == 'POST') {
            let {em, pin } = req.query;
            

            if (em && pin) {
              pin=pin.toString();
                const check = await prisma.user.findFirst({
                    where: {
                        user_email: em,
                        user_token:pin
                    }
                });
                if (check) {

                  const deleteToken=await prisma.user.update({
                    where:{
                      user_email:em
                    },data:{
                      user_token:null
                    }
                  })
                    return res.status(200).json({ message: "Verify" ,deleteToken});
                } else {
                  console.log(error);
                    return res.status(400).json({ message: "Pin Don't Match " });
                }
            }

            const { error, value } = userLoginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const { email, password } = req.body;
            const findUser = await prisma.user.findUnique({
                where: {
                    user_email: email,
                }
            });
            if (!findUser || !verifyPassword(password, findUser.user_password)) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            let token;
            if (!findUser.user_token) {
                token = jwt.sign(
                    { id: findUser.user_id, email: findUser.user_email },
                    process.env.JWT_SECRET_KEY
                );
                await prisma.user.update({
                    where: { user_id: findUser.user_id },
                    data: { user_token: token },
                });
            } else {
                token = findUser.user_token;
            }

            return res.status(200).json({
                message: "Login successful",
                token: token,
                id: findUser.user_id,
                name: findUser.user_name,
                email: findUser.user_email,
            });
        } else if (req.method == "GET") {
            const email = req.query.email;
            console.log("Email=",email);
            if (email) {
                const userData = await prisma.user.findFirst({
                    where: {
                        user_email: email
                    },
                });
                if (userData) {
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.ethereal.email',
                        port: 587,
                        auth: {
                            user: 'richard.blanda@ethereal.email',
                            pass: 'fBfrkGSPkWgyPGsnur'
                        }
                    });
                    const otp =  generateOpt(); // Corrected the usage of  
                    console.log(otp, "opt");
                    var mailOptions = {
                        from: 'richard.blanda@ethereal.email',
                        to: `${email}`, // Corrected variable name
                        subject: 'Sending OTP ',
                        text: `1212`
                    };
                    transporter.sendMail(mailOptions, async function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                       const otpUpdate=await prisma.user.update({
                        where:{
                      user_email:email
                        },data:{
                        user_token:otp.toString(),
                        }
                       });

                            return res.status(200).json({ status: true, message: "Email Found" });
                        }
                    });

                } else {
                    return res.status(400).json({ message: 'Your Email is Not Found Our Database', })
                }
            }

        }else if(req.method=="PUT")
        {
          try {
            const changepassword=req.query.changepassword;
            if(changepassword==='c'){

              const {emails,newpassword,confirm_password}=req.body;
              console.log(emails,newpassword);
              const updatePassword=await prisma.user.update({
                where:{
                  user_email:emails
                },data:{
                  user_password:hashPassword(newpassword)
                }
              });
              return res.status(200).json({ message: 'Successflly Change Password',updatePassword});
            }else{
              return res.status(500).json({ message: 'Internal Server Error'})
            }
         
          } catch (error) {
             return res.status(500).json({ error: 'Internal Server Error'})
          }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: 'Internal Server Error', error: error })
    }
}
