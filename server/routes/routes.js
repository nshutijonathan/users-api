import express from "express";
const router = express.Router();
import UsersControllers from "../controllers/users";
import AuthControllers from "../controllers/auth";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
router.get("/api/users", [[auth]], UsersControllers.getUsers);
router.get("/api/users/:id", UsersControllers.getSingleUser);
router.post("/api/users", UsersControllers.addUser);
router.delete(
  "/api/users/:id",
  [auth, admin],
  UsersControllers.deleteSingelUser
);
router.put("/api/users/:id", UsersControllers.editUser);
//auth
router.post("/api/users/login", AuthControllers.login);
router.get("/api/users/me", AuthControllers.currentUser);
export default router;
