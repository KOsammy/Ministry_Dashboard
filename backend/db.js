const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("mydatabase.db");
const AllTables = process.env.PROJECT_TABLES.split(" ");

db.serialize(() => {
	//create tables for each of the table names specified.
	AllTables.forEach((table_name) => {
		db.run(
			`create table if not exists ${table_name} (id int Auto_increment, Region text, Municipal_Assembly text, type text, Project_description text, Project_name text,  contractor text, Description_of_Contract text, Total_Contract_Amount_GH₵ text, Approved_Cost text, Revised_Cost text,  Physical_Works_Completed text, Status text,	Start Date text, Original_Duration mths text, Expected_Completion_Date text, Completion_Date Approved text, Time_Extension_mths text, revised_Completion_Date text)`
		);
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

module.exports = { getTableData, postDataToTable, getTableItem, updateRowData };
