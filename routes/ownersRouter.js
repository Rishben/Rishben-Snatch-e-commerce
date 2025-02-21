const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", async (req, res) => {
 res.render("owner-login")
});

// Route to create an owner (Only in Development Mode)
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      let { fullname, email, password} = req.body;
      let owners = await ownerModel.find();
      if (owners.length > 0) {
        return res.status(400).send({ response: "There can be only 1 owner" });
      }
  
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
        contact,
      });
      res.send("you can create an owner");
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
}

router.get("/admin", async (req, res) => {
  let success = req.flash("success");
  res.render("createproduct", { success });
});

module.exports = router;
