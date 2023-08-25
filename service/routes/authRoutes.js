const express = require("express")
const router = express.Router()
const { authorizer } = require("../middlewares/authMiddleware")
const jwt = require("jsonwebtoken")

router.post("/login", (req, res) => {
  const { password } = req.body

  if (password === process.env.REACT_APP_USER_PASSWORD) {
    const token = jwt.sign({ password }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })
    res.json({ success: true, token })
    
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid username or password" })
  }
})

router.post("/verify-token", authorizer, (req, res) => {
  const token = req.body.token

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    res.json({ valid: true })
  } catch (error) {
    res.json({ valid: false })
  }
})

module.exports = router