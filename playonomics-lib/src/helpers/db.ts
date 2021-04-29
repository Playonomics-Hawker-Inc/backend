import mongoose from "mongoose";

/**
 * Connec Db
 *
 */
const connectDb = async () => {
    //mongo db connection configuration
    try {
        const conn = await mongoose.connect(process.env.DATABASE as string, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch (e) {
        console.log("entering catch block", e);
    }
};

export { connectDb };
