
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

async function setupDatabase() {
  const uri = process.env.MONGO_URI;

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db("transactions");
    const accountsCollection = db.collection("accounts");

 
    await accountsCollection.deleteMany({});

   
    const sampleData = [
      {
        account_number: 101,
        balance: 10000,
        account_changes: [],
      },
      {
        account_number: 102,
        balance: 5000,
        account_changes: [],
      },
    ];

    
    await accountsCollection.insertMany(sampleData);

    console.log("Database setup completed.");
  } catch (error) {
    console.error("Error setting up the database:", error);
  } finally {
    await client.close();
  }
}

module.exports = setupDatabase;
