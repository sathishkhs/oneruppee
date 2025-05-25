import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		const options = {
			useNewUrlParser: true, // Use the new URL parser
			useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
			serverSelectionTimeoutMS: 10000, // Timeout after 5 seconds if the server is not responding
			autoIndex: true, // Automatically build indexes (disable for large collections)
		  };
		await mongoose.connect(process.env.MONGO_DB_URI,options);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
