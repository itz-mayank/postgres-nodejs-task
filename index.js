const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

//middlesware
app.use(cors());
app.use(express.json());


//ROUTES

//insert student data

app.post("/students", async (req, res) => {
    try {
        const { name } = req.body;
        const newStudent = await pool.query(
            "INSERT INTO students (name) VALUES($1) RETURNING *",
            [name]
        );

        res.json(newStudent.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});



//get all students data
app.get("/students", async (req, res) => {
    try {
        const allStudents = await pool.query("SELECT * FROM students");
        res.json(allStudents.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get data of a student
app.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const student = await pool.query("SELECT * FROM students WHERE roll_no = $1", [
            id
        ]);

        res.json(student.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update data of student

app.put("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateStudent = await pool.query(
            "UPDATE students SET name = $1 WHERE roll_no = $2",
            [name, id]
        );

        res.json("Student updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//delete a student

app.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteStudent = await pool.query("DELETE FROM students WHERE roll_no = $1", [
            id
        ]);
        res.json("Student deleted!");
    } catch (err) {
        console.log(err.message);
    }
});


app.listen(5000, () => {
    console.log("server started on port 5000");
});