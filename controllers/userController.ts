import { Router } from "../serverDeps.ts";

const userController = new Router();

// handle user routes
userController.get("/", (req, res) => {
  res.send({
    firstName: "Aaron",
    lastName: "Lee",
  });
});

// handle user errors
userController.error("/", (error, req, res) => {
  console.error("error", error.message);
  res.status(404).send({ message: error.message });
});

export default userController;
