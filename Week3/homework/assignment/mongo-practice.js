const { MongoClient} = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

db.movies.insertMany([
    {
      title: 'Fight Club',
      writer: 'Chuck Palahniuk',
      year: 1999,
      actors: [
        'Brad Pitt',
        'Edward Norton'
      ]
    },
    {
      title: 'Pulp Fiction',
      writer: 'Quentin Tarantino',
      year: 1994,
      actors: [
        'John Travolta',
        'Uma Thurman'
      ]
    },
    {
      title: 'Inglorious Basterds',
      writer: 'Quentin Tarantino',
      year: 2009,
      actors: [
        'Brad Pitt',
        'Diane Kruger',
        'Eli Roth'
      ]
    },
    {
      title: 'The Hobbit: An Unexpected Journey',
      writer: 'J.R.R. Tolkein',
      year: 2012,
      franchise: 'The Hobbit'
    },
    {
      title: 'The Hobbit: The Desolation of Smaug',
      writer: 'J.R.R. Tolkein',
      year: 2013,
      franchise: 'The Hobbit'
    },
    {
      title: 'The Hobbit: The Battle of the Five Armies',
      writer: 'J.R.R. Tolkein',
      year: 2012,
      franchise: 'The Hobbit',
      synopsis: 'Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.'
    },
    {
      title: "Pee Wee Herman's Big Adventure"
    },
    {
      title: 'Avatar'
    }
  ]);

db.movies.createIndex({ synopsis: "text" })

  
  print('Documents inserted successfully.');
  
db.movies.find({})

db.movies.find({ writer: "Quentin Tarantino" })

db.movies.find({ actors: "Brad Pitt" })

db.movies.find({ franchise: "The Hobbit" })

db.movies.find({ year: { $gte: 1990, $lte: 1999 } })

db.movies.find({ $or: [{ year: { $lt: 2000 } }, { year: { $gt: 2010 } }] })


db.movies.updateOne(
{title : "The Hobbit: An Unexpected Journey"},
{$set :{ synopsis: "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug." }}
)

db.movies.updateOne(
    { title: "The Hobbit: The Desolation of Smaug" },
    { $set: { synopsis: "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring." } }
)

db.movies.updateOne(
    {title:  "Pulp Fiction"},
    {$push: {actors: "Samuel L. Jackson"}}
)



db.movies.find({$text: {$search: "Bilbo"}})

db.movies.find({$text: {$search: "Gandalf"}})

db.movies.find({ $text: { $search: "Bilbo -Gandalf" } })

db.movies.find({ $text: { $search: "dwarves hobbit" } })

db.movies.find({ $text: { $search: "gold dragon" } })




db.movies.deleteOne({ title: "Pee Wee Herman's Big Adventure" });

db.movies.deleteOne({ title: "Avatar" });

// ## Relationships
db.users.insertMany(
   [ {
   username : GoodGuyGreg,
   first_name : "Good Guy",
   last_name : "Greg" },
   {
    username : ScumbagSteve,
    full_name : {
        first : "Scumbag",
        last : "Steve"
    }}
])

db.posts.insertMany(
    [
   {username : GoodGuyGreg,
    title : 'Passes out at party',
    body : 'Wakes up early and cleans house' },
   
{username : GoodGuyGreg,
title : 'Steals your identity',
body : 'Raises your credit score'},

{username : GoodGuyGreg,
title : 'Reports a bug in your code',
body : 'Sends you a Pull Request'},

{username : ScumbagSteve,
title : 'Borrows something',
body : 'Sells it'},

{username : ScumbagSteve,
title : 'Borrows everything',
body : 'The end'},

{username : ScumbagSteve,
title : 'Forks your repo on github',
body : 'Sets to private'}
    ])

const posts = db.posts.find().toArray();
posts.forEach((post) => {
  console.log(`Title: ${post.title}, ObjectId: ${post._id}`);
});



const postBorrowsSomething_obj_id = ObjectId('Borrows_something_object_id_here');
const postBorrowsEverything_obj_id = ObjectId('Borrows_everything_object_id_here');
const postForksRepo_obj_id = ObjectId('Forks_repo_on_github_object_id_here');
const postPassesOutAtParty_obj_id = ObjectId('Passes_out_at_party_object_id_here');
const postReportsBug_obj_id = ObjectId('Reports_a_bug_in_your_code_object_id_here');

db.comments.insertMany([
  {
    username: 'GoodGuyGreg',
    comment: 'Hope you got a good deal!',
    post: postBorrowsSomething_obj_id
  },
  {
    username: 'GoodGuyGreg',
    comment: "What's mine is yours!",
    post: postBorrowsEverything_obj_id
  },
  {
    username: 'GoodGuyGreg',
    comment: "Don't violate the licensing agreement!",
    post: postForksRepo_obj_id
  },
  {
    username: 'ScumbagSteve',
    comment: "It still isn't clean",
    post: postPassesOutAtParty_obj_id
  },
  {
    username: 'ScumbagSteve',
    comment: 'Denied your PR cause I found a hack',
    post: postReportsBug_obj_id
  }
]);


db.users.find({})


db.posts.find({})


db.posts.find([
    {username : "GoodGuyGreg"}
])


db.posts.find([
    {username : "ScumbagSteve"}
])


db.comments.find({})


db.comments.find({
    username : "GoodGuyGreg"
})


db.comments.find({
    username : "ScumbagSteve"
})

const postReportsBugObjectId = ObjectId('id');
db.comments.find({ post: postReportsBugObjectId })