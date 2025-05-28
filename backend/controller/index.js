import User from './models/User.js'

app.post('/register', async (req, res) => {
  try {
    console.log("Received data:", req.body)

    const user = await User.create(req.body)

    res.status(201).json({ message: "User created", user })
  } catch (error) {
    console.error("Error saving user:", error.message)
    res.status(500).json({ error: "Failed to save user" })
  }
})
