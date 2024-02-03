import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoDatabase from "../database/connect.mjs"
const router = Express.Router();

router.use(cors())
router.use(bodyParser.json())

router.get('/', async (req, res) => {

  let data = {
    msg: "Empty"
  };

  try {
    let db = await mongoDatabase();
    let collection = await db.collection(process.env.SUBJECTS_DATA);
    data = await collection.findOne({ list: { $exists: true } });
  } catch (error) {
    console.log(error)
  }


  res.json(data.list)
})

router.get('/add', async (req, res) => {

  if (req.query?.name && req.query?.subject && req.query?.classes) {
    let name = req.query?.name;
    let subject = req.query?.subject;
    let classes = req.query?.classes;
    classes = classes.split(",").map((item) => {
      try {
        if (parseInt(item)) {
          return parseInt(item)
        }
      } catch (error) { }
      return item
    });

    console.table({
      name,
      subject,
      classes
    })

    try {
      let db = await mongoDatabase();
      let collection = db.collection(process.env.SUBJECTS_DATA);

      await collection.insertOne({
        name: name,
        subject: subject,
        classes: classes
      })

    } catch (error) {
      console.log(error)
    }


    res.json({
      message: 'Add a teacher to the Teachers list in the database',
      params: {
        name,
        subject,
        classes
      }
    })

  }
  else {


    res.json({
      message: 'Add a teacher to the Teachers list in the database'
    })
  }

  // res.json({
  //   message: 'Add a teacher to the Teachers list in the database'
  // })
})

// router.post('/edit', async (req, res) => {
//   let reqBody = await req.body;
//   let result = "Something went wrong";

//   if (!reqBody?.name || !reqBody?.updatedData?.name) {
//     return res.json({
//       message: 'Edit a teacher in the Teachers list in the database',
//       result: "Enough data not received to update teacher's data",
//       dataReceived: reqBody
//     })
//   }

//   try {
//     let db = await mongoDatabase();
//     let collection = db.collection(process.env.TEACHERS_DATA);

//     let teacher = await collection.findOne({ name: reqBody.name });

//     if (teacher) {
//       result = teacher;

//       await collection.updateOne(
//         { name: reqBody.name },
//         { $set: { name: reqBody.updatedData.name, subject: reqBody.updatedData.subject, classes: reqBody.updatedData.classes } }
//       )

//       return res.json({
//         message: "Update Successful",
//         oldData: teacher,
//         newData: reqBody.updatedData
//       })

//     }
//     else {
//       result = `No teacher named \"${reqBody.name}\" found in the database`
//     }

//     // await collection.updateOne(
//     //   { name: "Albus Dumbeldore" },
//     //   { $set: { subject: "Headmaster" } }
//     // )

//   } catch (error) {
//     console.log(error)
//   }

//   return res.json({
//     message: 'Edit a subject in the subjects list in the database',
//     result
//   })
// })

router.get('/delete', (req, res) => {
  res.json({
    message: 'Delete a subject from the subjects list in the database'
  })
})


export default router;