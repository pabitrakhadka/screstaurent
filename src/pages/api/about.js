import prisma from "@/db/db.config";
import { ContactSchema } from "./fieldValidate/index";
export default async function handler(req,res){
    try {
        if(req.method=="POST")
        {
            const {error,values}=ContactSchema.validate(req.body);
            if(error)
            {
                return res.status(400).json({ error: error.details[0].message });
            }
            const {name,email,subject,message}=req.body;
            const addContact=await prisma.contact.create({
                data:{
                    name:name,
                    email:email,
                    subject:subject,
                    message:message
                }
            });
            return res.status(200).json({ message:"Successful Send Message"},addContact);
        }else if(req.method=="GET"){
            const data=await prisma.contact.findMany();
            if(!data||data.length<=0)
            {
                return res.status(400).json({ message: "No Record Found"});
            }else{
                return res.status(200).json(data);   
            }
        }else if(req.method=="DELETE")
        {
            const id=parseInt(req.query.id);
            if(id)
            {
                const deleteContact=await prisma.contact.delete({
                    where:{
                        id:id
                    }
                });
                return res.status(200).json({ message: "Delete Record",deleteContact});
            }
        }
    } catch (error) {
        console.error("Error:", error);  
        return res.status(500).json({ message: "Internal Server Error", error: error });  
    }
}