// Import required modules
/*
import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";
*/
const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");

// Create an Express application
const app = express();
const port = 3000;

// SQLite database connection to a file (replace 'mydatabase.db' with your desired file name)
const db = new sqlite3.Database("mydatabase.db");

// Create a table for demonstration purposes (if not exists)
// db.serialize (()=>{


// })

db.serialize(() => {
	db.run(
		"create table if not exists soco_water_dams (id int Auto_increment, project_name text, project_start text, project_end text, project_contractor text, project_consultant text, district text, region text, status text, amount_paid text, contract_amount text,contractor_phone_number text, consultant_phone_number text, image text)"
	)
	// db.run(
	// 	"CREATE TABLE IF NOT EXISTS Water_dams (id INT AUTO_INCREMENT, name TEXT, project_name TEXT, region text, district text, project_consultant TEXT, project_consultant_number Text, project_contructor text, project_contractor_number text, project_start_date text, project_end_date text, project_budget text, status text, contract_amount text, amount_paid)"
	// );
	// db.run(
	// 	"CREATE TABLE IF NOT EXISTS School_blocks (id INT AUTO_INCREMENT, name TEXT, project_name TEXT, project_location text, project_consultant TEXT, project_consultant_number Text, project_contructor text, project_contractor_number text, project_start_date text, project_end_date text, project_budget text)"
	// );
	//db.run("CREATE TABLE IF NOT EXISTS GSCSP (id INT, name TEXT)");
	//db.run('INSERT INTO users (id, name) VALUES (1, "John"), (2, "Jane")');
	/*
	 */
});

db.serialize(() => {
	"create table if not exsits (id in Auto_increment,)"
}
)

app.use(cors());
app.use(express.json())

// Express route to fetch users from the database
app.get("/projects/water_dams", (req, res) => {
	db.all("SELECT * FROM water_dams", (err, rows) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(rows);
	});
});

app.post("/projects/water_dams", (req, res) => {
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

	// console.log("request body", req.body);
	db.run(
		"insert into water_dams( project_name, project_start, project_end, project_contractor, region, district, status, project_consultant, contract_amount, amount_paid,contractor_phone_number, consultant_phone_number, image) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		[
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
			//contract_amount text,contractor_phone_number text, consultant_phone_number text, image text
			"0505995958",
			"0595854994",
			"teuueg"

		],
		(err, rows) => {
			if (err) {
				console.log("posting error ", err);
				return res.status(500).json({ error: err.message });
			}
			console.log("successfully inserted data ", rows);
			res.json(rows);
		}
	);
});

// Start the Express server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
