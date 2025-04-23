const UserModel = require("../models/UserModel");
const userModel = require('../models/UserModel');
const bcrypt = require("bcrypt");
const mailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const secret= "secret"

const mailUtil = require('../utils/MailUtil'); 
const mongoose = require('mongoose'); // Ensure mongoose is imported

const loginUser = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
   
    const foundUserFromEmail = await UserModel.findOne({ email: email }).populate("roleId")
    console.log(foundUserFromEmail);

    if (foundUserFromEmail != null) {
 
      const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
     
      if (isMatch == true) {
        res.status(200).json({
          message: "login success",
          data: foundUserFromEmail,
        });
      } else {
        res.status(404).json({
          message: "invalid cred..",
        });
      }
    } else {
      res.status(404).json({
        message: "Email not found..",
      });
    }
  };
  
  const signup = async (req, res) => {
    //try catch if else...
    try {
      //password encrupt..
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
      const createdUser = await UserModel.create(req.body);
      //sending mail
      await mailUtil.sendingMail(createdUser.email,"WELCOME TO GREENFUTURE","SUCCESSFULLY REGISTERED IN CAR POOLING");

      res.status(201).json({
        message: "user created..",
        data: createdUser,
      });
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: "error",
        data: err,
      });
    }
  };

const getAllUser = async (req, res) => {
    const users = await UserModel.find().populate("roleId");
    res.json({
        message: "Users fetched successfully",
        data: users,
    });
};

const addUser = async (req, res) => {
    const savedUser = await UserModel.create(req.body);
    // const populatedUser = await UserModel.findById(savedUser._id).populate("roleId");
    res.json({
        message: "User created successfully",
        // data: populatedUser,
        data:savedUser,
    });
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const result = await UserModel.findOneAndDelete({ _id: userId });
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
    const foundUser = await UserModel.findById(req.params.id).populate("roleId");
    res.json({
        message: "User fetched successfully",
        data: foundUser,
    });
};
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret);
    console.log(token);
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
                          <a href ="${url}">rest password</a>
                          </html>`;
    //email...
    await mailUtil.sendingMail(foundUser.email, "reset your password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};

const resetpassword = async (req, res) => {
  const token = req.body.token; 
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  //object -->email,id..
  //password encrypt...
  const salt = bcrypt.genSaltSync(10);
  const hashedPasseord = bcrypt.hashSync(newPassword,salt);

  const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPasseord,
  });
  res.json({
    message: "password updated successfully..",
  });
};


// controllers/UserController.js
const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
      },
      { new: true }
    ).populate('roleId');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = {
    getAllUser,
    addUser,
    deleteUser,
    getUserById,
    signup,
    loginUser,
    forgotPassword,
    resetpassword,
    updateUser
};

