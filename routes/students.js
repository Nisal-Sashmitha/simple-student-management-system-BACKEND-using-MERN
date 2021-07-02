const router = require("express").Router();

let student = require("../models/student");


//add data
router.route("/add").post((req, res) => {

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new student({
        name,
        age,
        gender
    })
    newStudent.save().then(() => {
        res.json("Student Addesd")
    }).catch((err) => {
        console.log(err);
    })
})

//fetch data
router.route("/").get((req, res) => {
    student.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err)
    })
})


//update
router.route("/update/:id").put(async (req, res) => {
    let userID = req.params.id;
    const { name, age, gender } = req.body;

    const updateStdent = {
        name,
        age,
        gender
    }

    const update = await student.findByIdAndUpdate(userID, updateStdent).then(() => {
        res.status(200).send({ status: "user updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })

})

//delete
router.route("/delete/:id").delete(async (req, res) => {
    let userID = req.params.id;

    await student.findByIdAndDelete(userID)
        .then(() => {
            res.status(200).send({ status: "user deleted" });

        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user", error: err.message });
        })
})

//get details of a specific user
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await student.findById(userId).then((out) => {
        res.status(200).send({ status: "user fetched", out })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message })
    })
})

module.exports = router;