// Dependencies
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cross-origin requests
app.use(cors());

const PORT = process.env.PORT || 3001;

//connect to mlab database
mongoose
	.connect(
		"mongodb+srv://graphqlUser:Test123@cluster0-uq6pl.mongodb.net/test?retryWrites=true&w=majority",
		{
			dbName: "soccer_teams",
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	.catch(error => {
		console.log(error);
	});

//confirm connection
mongoose.connection.once("open", () => {
	console.log("Connected to mLab instance.");
});
// Middleware
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

// Start server
app.listen(PORT, error => {
	if (error) res.status(500).send(res.json(error));

	console.log(`Server listening on PORT: ${PORT}`);
});
