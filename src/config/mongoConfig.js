import env from 'dotenv'
import mongoose from 'mongoose';
env.config()

mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.pass}@living-challenge-cluste.chbkahh.mongodb.net/?retryWrites=true&w=majority`)
const db = mongoose.connection

export { db }