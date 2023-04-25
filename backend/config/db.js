import mongoose from 'mongoose';

const connectDB = async () =>
{
    try
    {
        console.log("process.env.MONGO_URI",process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log(`Mongo DB Connected : ${ conn.connection.host }`.cyan.underline.bold);
    } catch (error)
    {
        console.log(`Error : ${ error.message }`.red.underline.bold);
        process.exit(1);
    }

}

export default connectDB;