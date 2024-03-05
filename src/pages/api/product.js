import prisma from "@/db/db.config.js";
import multer from "multer";

// Define the destination directory for uploads
const uploadDirectory = "./public/images";
const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, cb) => {
        return cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage }).single("image");

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error uploading product image" });
        } else {
          const { name, price, description, special, category } = req.body;
          const imageName = req.file.filename;  

          const addProduct = await prisma.product.create({
            data: {
              name: name,
              price: parseInt(price),
              description: description,
              image: imageName,
              special: special,
              category: category
            }
          });

          return res.status(200).json({ message: "Product Added Successfully", addProduct });   
        }
      });
    } else if (req.method === "GET") {
      const id = parseInt(req.query.id);
      if (id) {
        const data=await prisma.product.findFirst({
          where:{
            id:id
          }
        });
        return res.status(200).json(data);
        
      } else {
        const data = await prisma.product.findMany();
        if (!data || data.length === 0) {
          return res.status(404).json({ message: "No records found" });
        }
        return res.status(200).json(data);
      }
    } else if(req.method=="PUT"){

      const id=parseInt(req.query.id);
      if(id)
      {
        
        upload(req, res, async (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error uploading product image" });
          } else {
            const { name, price, description,category } = req.body;
            const imageName = req.file.filename;  
 
            const updateProduct = await prisma.product.update({
              where:{
                id:id
              },
              data: {
                name: name,
                price: parseInt(price),
                description: description,
                image: imageName,
                
                category: category
              }
            });
  
            return res.status(200).json({ message: "Product Update Successfully",updateProduct });   
          }
        });

       
      
    }
  }else if(req.method==="DELETE")
  {
    const id=parseInt(req.query.id);
    if(id)
    {
      const deleteProduct=await prisma.product.delete({
        where:{
          id:id
        }
      });
      return res.status(200).json({ message: "Product Deleted !" });
    }
  }
      else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
