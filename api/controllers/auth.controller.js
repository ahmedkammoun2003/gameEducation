import mongoose from "mongoose";
import {User} from "../models/user.model.js"
import Jwt from "jsonwebtoken";
export const google = async (req, res, next) => {
    try {
        console.log(req.body);
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = Jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
          expiresIn: "1d",
        });
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(user);
      } else {
        const newUser = new User({
          username:
            req.body.displayName,
          email: req.body.email,
        });
        await newUser.save();
        const token = Jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN,);
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(newUser);
      }
    } catch (error) {
      next(error);
    }
  };