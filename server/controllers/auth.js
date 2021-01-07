import jwt from "jsonwebtoken";
import models from "../database/models";
const { users } = models;
class AuthControllers {
  static async login(req, res) {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(404).send({
          status: 404,
          message: "some values are missing",
        });
      }
      const { email, password } = req.body;
      const findUser = await users.findOne({
        where: { email },
      });
      if (!findUser) {
        return res.status(401).json({
          status: 401,
          message: `invalid email or password`,
        });
      }
      if (findUser.password !== req.body.password) {
        return res.status(401).json({
          status: 401,
          message: `invalid email or password`,
        });
      }
      const token = jwt.sign(
        {
          id: findUser.id,
          email: findUser.email,
          is_admin: findUser.is_admin,
        },

        process.env.SECRET_KEY,
        { expiresIn: "24hrs" }
      );
      return res.status(200).send({
        status: 200,
        message: "successfully logged in",
        token,
      });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
  static async currentUser(req, res) {
    return res.status(200).send({
      status: 200,
      message: "current user retrieved successfully",
      profile: req.user,
    });
  }
}
export default AuthControllers;
