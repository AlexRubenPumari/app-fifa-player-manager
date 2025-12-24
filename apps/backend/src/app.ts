import express from "express"
const app = express()

const PORT: number = 3000

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
