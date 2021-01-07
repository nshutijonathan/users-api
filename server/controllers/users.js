import jwt from "jsonwebtoken";
import models from "../database/models";
const { users } = models;
class UsersControllers {
  static async getUsers(req, res) {
    try {
      const userList = await users.findAll({});
      return res.status(200).json({ data: userList, total: userList.length });
    } catch (error) {
      return error.message;
    }
  }
  static async getSingleUser(req, res) {
    try {
      const { id } = req.params;
      const SingleUser = await users.findOne({
        where: { id },
      });
      if (!SingleUser) {
        return res.status(404).json({
          status: 404,
          message: `id not found `,
        });
      }
      return res.status(200).json({ profile: SingleUser });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async addUser(req, res) {
    try {
      const { email } = req.body;
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        is_admin: req.body.is_admin,
      };
      const findUser = await users.findOne({
        where: { email },
      });
      if (findUser) {
        return res.status(409).json({
          status: 409,
          message: `Email address ${email} already in use!`,
        });
      }
      const newUser = await users.create(data);
      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          is_admin: newUser.is_admin,
        },

        process.env.SECRET_KEY,
        { expiresIn: "24hrs" }
      );
      return res.status(201).json({
        status: 201,
        message: "user is added successfully",
        token: token,
        employee: newUser,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async deleteSingelUser(req, res) {
    try {
      const { id } = req.params;
      const SingleUser = await users.findOne({
        where: { id },
      });
      if (SingleUser) {
        const deleted = await users.destroy({
          where: { id },
        });
        return res.status(200).json({
          status: 200,
          message: `user with id ${req.params.id} deleted successfully`,
        });
      }
      return res.status(404).json({
        status: 404,
        message: `user with id ${req.params.id} not found `,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async editUser(req, res) {
    try {
      const { id } = req.params;
      const SingleUser = await users.findOne({
        where: { id },
      });
      if (!SingleUser) {
        return res.status(404).json({
          status: 404,
          message: `user with id ${req.params.id} not found `,
        });
      }

      const [edited] = await users.update(req.body, {
        where: { id },
      });
      if (edited) {
        const editedUser = await users.findOne({ where: { id } });
        return res.status(200).json({
          status: 200,
          message: `edited user with id ${id} successfully`,
          employee: editedUser,
        });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
export default UsersControllers;
