import * as Yup from 'yup';



export const signUpSchemas = Yup.object({
  name: Yup.string().min(2).max(20).required("Please Enter Your Name"),
  address: Yup.string().required("Please Enter Address"),
  phone: Yup.number()
    .min(1000000000, "Phone number must be at least 10 digits")
    .max(9999999999, "Phone number can't exceed 10 digits")
    .required("Please enter a phone number"),
  email: Yup.string().email().required("Please Enter Email"),
  password: Yup.string().min(4).max(20).required("Please Enter Password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null, "Password must Match"]),
});
export const validates = Yup.object({
  name: Yup.string().min(2).max(20).required("Please Enter Your Name"),
  phone: Yup.number()
    .min(1000000000, "Phone number must be at least 10 digits")
    .max(9999999999, "Phone number can't exceed 10 digits")
    .required("Please enter a phone number"),
  email: Yup.string().email().required("Please Enter Email"),
  location: Yup.string().min(2).max(20).required("Please Enter Your Location")
});


export const forgotSchema = Yup.object({
  newpassword: Yup.string().min(4).max(20).required("Please enter password"),
  confirm_password: Yup.string().required().oneOf([Yup.ref("newpassword"), null, ("Confirm Password must match")])
});


export const registerDataValidate = Yup.object({
  name: Yup.string().min(2).max(20).required("Please Enter Your Name "),
  address: Yup.string().required("Please Enter Address"),
  phone: Yup.number().required("Please Enter Phone Number"),
  email: Yup.string().email().required("Please Enter Email"),
  password: Yup.string().min(4).max(20).required("Please Enter Password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null, "Password must Match"]),
  location: Yup.string().required('Please select a Location'),
});

export const contactform = Yup.object({
  name: Yup.string().min(3).max(15).required("Please Enter Your Name"),
  email: Yup.string().email().required("Please Enter Email"),
  subject: Yup.string().required("Please Enter Subject"),
  message: Yup.string().required("Please Enter Message"),
});
export const otp = Yup.object({
  one:Yup.number().min(1).max(1).required(),
  two:Yup.number().min(1).max(1).required(),
  three:Yup.number().min(1).max(1).required(),
  four:Yup.number().min(1).max(1).required(),
});
