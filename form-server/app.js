const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// set EJS as the view engine
app.set("view engine", "ejs");

// middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from the "public" directory
app.use(express.static("public"));

// render the form page
app.get("/", (req, res) => {
	res.render("form");
});

// handle the form submission
app.post("/", (req, res) => {
	const newItem = {
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		tags: req.body.tags.split(","),
		notes: [
			{
				title: req.body.title,
				text: req.body.note,
			},
		],
		transactions: [
			{
				name: req.body.transactionName,
				price: req.body.price,
				date: req.body.date,
				currency: req.body.currency,
			},
		],
		sizes: [
			{
				name: req.body.sizeName,
				width: req.body.width,
				height: req.body.height,
				depth: req.body.depth,
				unit: req.body.unit,
			},
		],
		quantities: [
			{
				name: req.body.quantityname,
				count: req.body.quantityvalue,
			},
		],
	};

	// read the existing data from file
	fs.readFile("data.json", (err, fileData) => {
		if (err) throw err;

		let data = {};
		if (fileData.length !== 0) {
			data = JSON.parse(fileData);
		}

		// append the new item to the existing data
		if (!data.items) {
			data.items = [];
		}
		data.items.push(newItem);

		// write the updated data back to the file
		fs.writeFile("data.json", JSON.stringify(data), (err) => {
			if (err) throw err;
			console.log("Data saved to file");
			res.redirect("/");
		});
	});
});

// start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
