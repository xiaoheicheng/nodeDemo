let mongoose = require("mongoose")

const DB_URL = 'localhost:27017'
const DB_NAME = 'test'
mongoose.set('strictQuery', true)
module.exports = new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`)
    mongoose.connection.on("open", (err) => {
        if (!err) {
            console.log(`位于${DB_URL}的${DB_NAME}数据库连接成功`);
            resolve()
        } else {
            reject(err)
        }
    })
})

// ;(async()=>{
//     await dbPromise
//     console.log(112);
// })()