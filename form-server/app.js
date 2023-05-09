const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// set EJS as the view engine
app.set("view engine", "ejs");

// middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// render the form page
app.get("/", (req, res) => {
	res.render("form");
});

// handle the form submission
app.post("/", (req, res) => {
	const data = {
		name: req.body.name,
		description: req.body.description,
		tags: req.body.tags.split(","),
		comments: [
			{
				author: req.body.author,
				text: req.body.comment,
			},
		],
		transactions: [
			{
				name: req.body.transactionName,
				price: req.body.price,
				date: req.body.date,
			},
		],
		sizes: [
			{
				name: req.body.sizeName,
				width: req.body.width,
				height: req.body.height,
				depth: req.body.depth,
			},
		],
	};

	// write the data to a file
	fs.writeFile("data.json", JSON.stringify(data), (err) => {
		if (err) throw err;
		console.log("Data saved to file");
		res.redirect("/");
	});
});

// start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
