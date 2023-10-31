const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

async function getPopulationByYearAndAge(year, age) {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db("databaseWeek4");

    const result = await db.collection("population").aggregate([
      { $match: { Year: year, Age: age } },
      {
        $project: {
          Country: 1,
          Year: 1,
          Age: 1,
          M: 1,
          F: 1,
          TotalPopulation: { $add: ["$M", "$F"] },
        },
      },
    ]).toArray();

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    await client.close();
  }
}

const year = 2020;
const age = "100+";

getPopulationByYearAndAge(year, age)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
