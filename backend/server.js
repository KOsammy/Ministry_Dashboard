require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const readExcel = require("read-excel-file");
const { postDataToTable, getTableData, getTableItem } = require("./db");


console.log("env data ", process.env.PROJECT_TABLES);

// Create an Express application
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(bodyParser());
app.use(express.json());

// get a table from table
app.get("/projects/:table_name", (req, res) => {
	const { table_name } = req.params;
	if (!table_name)
		return res.status(400).send("Please provide a valid table name");

	getTableData(table_name)
		.then((rows) => res.json(rows))
		.catch((er) => res.status(400).send(er.message));
});

app.get("/projects/:table_name/:project_id", (req, res) => {
	const { table_name, project_id } = req.params;
	if (!table_name)
		return res.status(400).send("Please provide a valid table name");

	getTableItem(table_name, project_id)
		.then((row) => res.json(row))
		.catch((er) => res.status(400).send(er.message));
});

app.post("/api/check-updates", (req, res)=>{
	const {file} = req.body;			
	console.log({file}, req.body, req.files);
})

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

app.put("/api/update/projects/:table_name/:row_id", updateRowData);

// Start the Express server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
