import jwt from "jsonwebtoken";
import { users } from "../database/models";
import constants from "../constants/constants";
const { UNAUTHORIZED, NOT_FOUND } = constants.statusCode;

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(402).send({
      status: 402,
      message: "Access Denied.No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { id } = decoded;
    const findUser = await users.findOne({
      where: { id },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!findUser) {
      return res.status(NOT_FOUND).json({
        status: NOT_FOUND,
        message: `User not found`,
      });
    }
    req.user = findUser;
    next();
  } catch (error) {
    return res.status(UNAUTHORIZED).send({
      status: UNAUTHORIZED,
      message: "Invalid token or expired",
    });
  }
};
export default auth;
