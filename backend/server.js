import Express from "express";
const port = 3000;
import teachers from "./routes/teachers.js"
import subjects from "./routes/subjects.js"
import classes from "./routes/classes.js"

const app = Express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello API"
  })
})

app.use('/api/teachers', teachers);
app.use('/api/subjects', subjects);
app.use("/api/classes", classes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
