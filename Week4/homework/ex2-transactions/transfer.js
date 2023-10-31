const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

async function transferMoney(fromAccountNumber, toAccountNumber, amount, remark) {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db("transactions");
    const accountsCollection = db.collection("accounts");

    
    const fromAccount = await accountsCollection.findOne({
      account_number: fromAccountNumber,
    });

    const toAccount = await accountsCollection.findOne({
      account_number: toAccountNumber,
    });

    if (!fromAccount || !toAccount) {
      console.error("Source or destination account not found.");
      return;
    }

    if (fromAccount.balance < amount) {
      console.error("Insufficient balance in the source account.");
      return;
    }

    
    const fromChangeNumber = fromAccount.account_changes.length + 1;
    const toChangeNumber = toAccount.account_changes.length + 1;

    
    await accountsCollection.updateOne(
      { _id: fromAccount._id },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: fromChangeNumber,
            amount: -amount,
            changed_date: new Date(),
            remark,
          },
        },
      }
    );

    await accountsCollection.updateOne(
      { _id: toAccount._id },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: toChangeNumber,
            amount: amount,
            changed_date: new Date(),
            remark,
          },
        },
      }
    );

    console.log(`Transferred ${amount} from account ${fromAccountNumber} to account ${toAccountNumber}.`);
  } catch (error) {
    console.error("Error transferring money:", error);
  } finally {
    await client.close();
  }
}

module.exports = transferMoney;
