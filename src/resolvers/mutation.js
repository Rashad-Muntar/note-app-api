const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt  = require("jsonwebtoken");
require("dotenv").config();
const { AuthenticationError, ForbiddenError } = require("apollo-server-express");

module.exports = {
  newNote: async (parent, args, { models }) => {
    return await models.Note.create({
      content: args.content,
      author: "Adam Scott",
    });
  },

  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({
        _id: id,
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  updateNote: async (parent, { id, content }, { models }) => {
    try {
      return await models.Note.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            content,
          },
        },
        {
          new: true,
        }
      );
    } catch (err) {
      return false;
    }
  },

  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const avatar = gravatar.url(email);
    const hashed = await bcrypt.hash(password, 10);

    try {
      const user = await models.User.create({
        username,
        email,
        password: hashed,
        avatar,
      });
      return jwt.sign({ id: user._id }, process.env.JWT_SECRETE);
    } catch (err) {
      throw new Error("Opps there is something wrong in creating the account");
    }
  },

  signIn: async(parent, {username, email, password}, {models}) => {
    email = email.trim().toLowerCase()

   
        const user = await models.User.findOne({
          $or: [{email}, {username}]
        })
        if(!user) throw new AuthenticationError("No user is found")
        const valid = bcrypt.compare(password, user.password)
        if(!valid) throw new AuthenticationError("Password does not match")
        return jwt.sign({user: user._id}, process.env.JWT_SECRETE)
   
  }
};
