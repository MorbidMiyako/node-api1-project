const express = require("express")
const shortid = require("shortid")

const server = express();

let users = [
  {
    name: "bernd",
    id: "1"
  }, {
    name: "number 2",
    id: "2"
  }
]

server.use(express.json())

server.get("/", (req, res) => {
  res.status(200).json({ api: "running..." })
})

server.get("/hello", (req, res) => {
  res.status(200).json({ hello: "Web 27" })
})

server.post("/api/users", (req, res) => {
  let userInfo = req.body;

  if (!userInfo.name) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }

  userInfo.id = shortid.generate()

  users.push(userInfo)

  res.status(201).json(userInfo)
})

server.get("/api/users", (req, res) => {
  if (!users) {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }
  res.status(200).json(users)
})

server.get("/api/users/:id", (req, res) => {

  let userId = req.params.id


  let user = users.filter(user => user.id === userId)

  if (!userId) {
    res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
  }

  if (!users) {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." })
  }

  res.status(200).json(user)
})

server.patch("/api/users/:id", (req, res) => {

  let updateUser = req.body
  let userId = req.params.id

  if (!userId) {
    res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
  }

  if (!updateUser.name) {
    res.status(404).json({ errorMessage: "Please provide name and bio for the user." })
  }

  if (!users) {
    res.status(500).json({ errorMessage: "The users information could not be updated." })
  }

  users.map(user => {
    if (user.id === userId) {
      user.name = updateUser.name
    }
  })

  res.status(200).json(users)

})

server.delete("/api/users/:id", (req, res) => {

  let userId = req.params.id

  if (!userId) {
    res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
  }

  if (!users) {
    res.status(500).json({ errorMessage: "The users information could not be removed." })
  }

  users = users.filter(user => user.id !== userId)

  res.status(200).json(users.filter(user => user.id !== userId))
})

const PORT = 5000
server.listen(PORT, () => console.log(`\n ** API on http://localhost:${PORT}** \n`))
