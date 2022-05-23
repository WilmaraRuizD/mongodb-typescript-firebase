import express, { Request, Response } from "express";
import auth from "../firebase/auth";
import authSchema from "../schemas-joi/user_joi"
import validator from "../utilities/validator"

export const authRouter =express.Router();
authRouter.use(express.json());

authRouter.post('/createUser',validator.body(authSchema),async (req: Request, res: Response) => {
    try{
     const {email,password}=req.body   
     const result=await auth.createUser(email,password);
     res.status(201).json(result)
    }
    catch(error){
        res.status(500).send(error.message)

    }
})


authRouter.post("/login", validator.body(authSchema), async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await auth.logIn(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

