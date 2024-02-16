const e = require("express");
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("mydatabase.db");
const AllTables = process.env.PROJECT_TABLES.split(" ");

db.serialize(() => {
	//create tables for each of the table names specified.
	AllTables.forEach((table_name) => {
		if (table_name.includes("SOCO")) {
			db.run(
				`CREATE TABLE IF NOT EXISTS ${table_name} (id INTEGER PRIMARY KEY, ASsEMBLY,LOT,TPYE,DESCRIPTION_OF_SUBPROJECT,RECOMMENDED_BIDDER, BID_PRICE, CONTRACT_SUM)`
			);
		}
		if (table_name.includes("GPSNP")) {
			db.run(
				`CREATE TABLE IF NOT EXISTS ${table_name} (id int PRIMARY KEY, Zone, Assembly, Project_Name, Sub_Project, Status)`
			);
		} else {
			db.run(
				`create table if not exists ${table_name} (id int Auto_increment, Region text, Municipal_Assembly text, type text, Project_description text, Project_name text, Lot_No text,  contractor text, Description_of_Contract text, Total_Contract_Amount_GH₵ text, Approved_Cost text, Revised_Cost text,  Physical_Works_Completed text, Status text,	Start Date text, Original_Duration mths text, Expected_Completion_Date text, Completion_Date Approved text, Time_Extension_mths text, revised_Completion_Date text)`
			);
		}
	});
});

//function to post data to a table based on the table name
function postDataToTable(table_name, fields) {
	const {
		projectRegion,
		projectMunicipal,
		projectType,
		projectDescription,
		projectName,
		contractor,
		contractDescription,
		totalAmount,
		approvedCost,
		revisedCost,
		workCompleted,
		$status,
		startDate,
		originalDuration,
		expectedCompletionDate,
		approvedAdditionalTime,
		revisedCompletionDate,
	} = fields;
	return new Promise((Resolve, Reject) => {
		db.run(
			`insert into ${table_name} ( id, Region, Municipal_Assembly, type, Project_description, Project_name, lot_no, contractor, Description_of_Contract, Total_Contract_Amount_GH₵ , Approved_Cost, Revised_Cost,  Physical_Works_Completed, Status,	Start Date, Original_Duration mths, Expected_Completion_Date, Completion_Date Approved, Time_Extension_mths, revised_Completion_Date) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[
				projectRegion,
				projectMunicipal,
				projectType,
				projectDescription,
				projectName,
				contractor,
				contractDescription,
				totalAmount,
				approvedCost,
				revisedCost,
				workCompleted,
				$status,
				startDate,
				originalDuration,
				expectedCompletionDate,
				approvedAdditionalTime,
				revisedCompletionDate,
			],
			(err, rows) => {
				if (err) {
					console.log("posting error ", err);
					return Reject(err);
				}
				console.log("successfully inserted data ", rows);
				Resolve(rows);
			}
		);
	});
}

// function to get all data on a specific table
function getTableData(table_name) {
	return new Promise((Resolve, Reject) => {
		db.all(`SELECT * FROM ${table_name}`, (err, rows) => {
			if (err) {
				return Reject(err);
			}
			return Resolve(rows);
		});
	});
}

function getTableItem(table_name, id) {
	return new Promise((Resolve, Reject) => {
		db.get(`SELECT * FROM ${table_name} WHERE id = '${id}' `, (err, rows) => {
			if (err) {
				return Reject(err);
			}
			return Resolve(rows);
		});
	});
}

function countTable(tableName) {
	return new Promise((Resolve, Reject) => {
		db.get(`SELECT COUNT(*) total from ${tableName}`, (err, {total}) => {
			if (err) return Reject(err);
			console.log({total});
			return Resolve(total);
		});
	});
}

countTable("UDG_1");

function completedPercentage(tableName) {
	return new Promise((Resolve, Reject) => {
		db.get(
			`
			 SELECT COUNT(*) completed FROM ${tableName} 
 WHERE Status = 'Completed'`,
			(err, { completed }) => {
				if (err) return Reject(err);
				db.get(`SELECT COUNT(*) total FROM ${tableName}`, (err1, { total }) => {
					if (err1) return Reject(err1);
					return Resolve(Math.round((completed / total) * 100));
				});
			}
		);
	});
}

//completedPercentage("UDG_1");

function updateRowData(req, res) {
	const { table_name, row_id } = req.params;
	const {
		timeExtension,
		approvedAmount,
		expectedCompletionDate,
		physicalWorks,
		projectName,
		startDate,
		endDate,
		contractor,
		region,
		district,
		status,
		projectDescription,
		descriptionOfContract,
		totalContractAmount,
		originalDuration,
		revisedAmount,
	} = req.body;

	console.log({ table_name, row_id }, req.body);
	db.run(
		`UPDATE 
		${table_name} 
		SET 
		Region=?, 
		Municipal_Assembly=?, 
		Project_description=?, 
		Project_name=?, 
		contractor=?, 
		Description_of_Contract=?, 
		Total_Contract_Amount_GH₵=? , 
		Approved_Cost=?, 
		Revised_Cost=?,  
		Physical_Works_Completed=?, 
		Status=?,	
		Start=?, 
		Original_Duration=?, 
		Expected_Completion_Date=?, 
		Completion_Date=?, 
		Time_Extension_mths=?

		where id=?`,
		[
			region,
			district,
			projectDescription,
			projectName,
			contractor,
			descriptionOfContract,
			totalContractAmount,
			approvedAmount,
			revisedAmount,
			physicalWorks,
			status,
			startDate,
			originalDuration,
			expectedCompletionDate,
			endDate,
			timeExtension,
			row_id,
		],
		(err, row) => {
			if (err) return res.status(400).send("bad request");
			return res.send("Row updated successfully");
		}
	);
}

function getAllTableData(table_name) {
	return new Promise((Resolve, Reject) => {
		db.all(`SELECT * FROM ${table_name} `, (err, rows) => {
			if (err) {
				return Reject(err);
			}
			//console.log(rows);
			return Resolve(rows);
		});
	});
}

async function GSCSPprojects(req, res) {
	try {
		const Udg_1 = await getAllTableData("UDG_1");
		const UDG_2 = await getAllTableData("UDG_2");
		const UDG_3 = await getAllTableData("UDG_3");
		return res.status(200).json([...Udg_1, ...UDG_2, ...UDG_3]);
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports = {
	getTableData,
	postDataToTable,
	getTableItem,
	updateRowData,
	GSCSPprojects,
completedPercentage,
countTable,
};
