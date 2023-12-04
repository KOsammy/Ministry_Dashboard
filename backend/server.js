require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { postDataToTable, getTableData } = require("./db");

console.log("env data ", process.env.PROJECT_TABLES);

// Create an Express application
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Express route to fetch users from the database
app.get("/projects/:table_name", (req, res) => {
	const { table_name } = req.params;
	if (!table_name)
		return res.status(400).send("Please provide a valid table name");

	getTableData(table_name)
		.then((rows) => res.json(rows))
		.catch((er) => res.status(400).send(er.message));
});

app.post("/projects/:table_name", (req, res) => {
	const { table_name } = req.params;
	if (!table_name)
		return res.status(400).send("Please provide a valid table name");

	/**
	const {
		projectName,
		projectStart,
		projectEndDate,
		projectContractor,
		region,
		district,
		$status,
		consultant,
		contractAmount,
		amountPaid,
	} = req.body;
	**/

	postDataToTable(table_name, req.body)
		.then((status) => res.send(status))
		.catch((er) => res.status(400).send(er.message));
});

// Start the Express server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
