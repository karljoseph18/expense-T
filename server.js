import express from "express";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    password: "",
    host: "localhost",
    port: 5432,
    database: "expenses_tracker",
});
db.connect();

const userId = 1;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");


app.get("/dashboard", async (req, res) => {
    try {
        const budget = await db.query("SELECT * FROM budget WHERE userId = $1;", [userId])
        const categories = await db.query("SELECT * FROM category WHERE userId = $1;", [userId])
     res.render("dashb.ejs", {budget: budget.rows[0], categories: categories.rows});
    } catch (error) {
        console.log(error);
    }
});


app.get("/", (req, res) => {
  res.send("roah bayot");
});

app.listen(port, () => {
  console.log(`✅ Server is listening on http://localhost:${port}`);
});
