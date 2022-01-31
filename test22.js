const { model, Schema, connection, connect } = require('mongoose')
const SzavazokorSchema = new Schema({}, { collection: process.argv[2] || 'ogy2022_TESZT_szavazokors' })

  ; (async () => {
    await connect(process.env.MONGODB_URI, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DBNAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: false,
    },
      async err => {
        if (err) {
          console.log('connection error', err.message)
        }

        console.log('connected to DB', connection.readyState)
        console.log('collections:')
        connection.db.listCollections().toArray(function (err, names) {
          console.log(names.map(({ name }) => name))
        })

        const Szavazokors = model(process.argv[2] || 'ogy2022_TESZT_szavazokors', SzavazokorSchema)

        result = await Szavazokors.find({}).limit(9)
        console.log(result)
      })
  })()