import  express, { Request, Response } from "express";
import { contentModel } from "../models/content";
import authenticateToken from "../middlewares/tokenMid";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// add content 
router.post("/add", authenticateToken, async (req: Request, res: Response) => {
    const {title, link, type} = req.body;
    if(!type || !link) {
        return void res.json({
            msg: "Type and Link are required"
        })
    }

    await contentModel.create({
        title,
        link,
        type,
        userId: (req as any).user,
    })

    res.json({
        msg: "Content Added", 
    })
});

// get user content 
router.get("/getContent", authenticateToken, async (req: Request, res: Response) => {
    const userId = (req as any).user; // User ID is fetched from middleware
// The `populate` function is used to include additional details from the referenced `userId`. For example, it will fetch the username linked to the userId.
    const content = await contentModel.find({userId}).populate("userId", "username"); 
    res.json({content});
});

// delete content
router.delete("/deleteContent/:contentId", authenticateToken, async (req: Request, res: Response) => {
    const contentId = req.params.contentId;
    const userId = (req as any).user;

    if(!contentId) {
        return void res.json({
            msg: "Content id is required"
        })
    }

    const content = await contentModel.find({_id: contentId});
    if(!content) {
        return void res.json({
            msg: "The content does not exist"
        })
    }

    // Delete content based on contentId and userId.
    await contentModel.deleteOne({ _id: contentId, userId });
    res.json({ message: "Deleted" }); // Send success response.
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async () => {
        return {
            folder: "second-brain",      
            resource_type: "auto",       
            use_filename: true,          
            unique_filename: true,       
        };
    },
});

const upload = multer({ storage: storage })

router.post("/uploadFile", authenticateToken, upload.single("file"), async (req: Request, res: Response) => {
    console.log(req.file);
    console.log("Request received");
    console.log("File:", req.file);
    console.log("Body:", req.body);
    const { title, type } = req.body;
    if(!type) {
        return void res.json({
            msg: "Type and Link are required"
        })
    }


    await contentModel.create({
        title,
        link: req.file?.path,
        type,
        userId: (req as any).user,
    })

    res.status(200).json({
        msg: "File Uploaded"
    })
})


// share content link
// router.post("/share", authenticateToken, async (req: Request, res: Response) => {
//     const share = req.body.share;
//     const hash = uuidv4();

//     if(share) {
//         const existingLink = await linkModel.findOne({userId: (req as any).user})
//         if(existingLink) {
//             return void res.json({
//                 hash: existingLink.hash
//             })
//         }

//         await linkModel.create({
//             userId: (req as any).user,
//             hash
//         })
//         return void res.json({
//             hash
//         })
//     } else {
//         await linkModel.deleteOne({
//             userId: (req as any).user,
//         })
//         return void res.json({
//             msg: "Link is removed"
//         })
//     }

// });

// // get shared content
// router.get("/brain/:hash", authenticateToken, async (req: Request, res: Response) => {
//     const hash = req.params.hash;
//     const link = await linkModel.findOne({hash});
//     if(!link) {
//         return void res.status(411).json({
//             msg: "Link is not valid"
//         })
//     }

//     const content = await contentModel.find({
//         userId: link.userId
//     })

//     const user = await userModel.findOne({
//         userId: link.userId 
//     })

//     res.status(200).json({
//         content: content,
//         username: user?.username
//     })

// });


export default router;