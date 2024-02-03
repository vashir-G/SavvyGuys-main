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
    let collection = await db.collection(process.env.CLASSES_DATA);
    data = await collection.findOne({ list: { $exists: true } });
  } catch (error) {
    console.log(error)
  }


  res.json(data.list)
})

export default router