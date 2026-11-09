// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)

// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")

const express = require("express")
const app = express()
const PORT = 3000

app.use(express.json())

app.get("/greet", (req, res) => {
    const timestamp = new Date().toISOString();
    res.json({ msg: `hi from get endpoint ${timestamp}` })
})
app.get("/greet/:name", async (req, res) => {
    const name = req.params.name
    res.json({ msg: `got name: ${name}` })
    console.log(`i got name: ${name}`)
})
app.get("/test", async (req, res) => {
    try {
        const response = await fetch("http://localhost:3000/greet/Alice")
        const data = await response.json()
        if (data.msg === "got name: Alice") {
            res.json({ result: "ok" })
        }
    } catch (error) {
        res.status(500).send("Something went wrong");

    }

})
app.post("/action", async (req, res) => {
    if(!req.body || typeof req.body.action!=="string"){
       return res.status(400).json({"msg":"body is malformed"})
    }
    const action = req.body.action
    if (action === "joke") {
const response= await fetch("https://v2.jokeapi.dev/joke/Any?type=single&safe-mode")
const data=await response.json()
const joke=data.joke.toUpperCase()
res.json({"joke": joke})
    }
    else if (action === "cat fact") {
const response=await fetch("https://api.thecatapi.com/v1/images/search?limit=11", {
    headers:{"x-api-key":process.env.CAT_API_KEY}
})
const data=await response.json()
const length=data.length
res.json({length})

    }
    else { res.status(400).json({"msg":"body is malformed"}) }
})

app.listen(PORT, () => { console.log(`listening on port ${PORT}`) })