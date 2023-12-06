const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("mydatabase.db");
const AllTables = process.env.PROJECT_TABLES.split(" ");


db.serialize(() => {

//create tables for each of the table names specified.
AllTables.forEach((table_name)=>{

	db.run(
		`create table if not exists ${table_name} (id int Auto_increment, region text, municipal_assembly text, type text, project_description text, project_name text, contract_description text, total_amount text, physical_work_completed text, status text, start_date text, original_duration text, expected_completion_date text, approved_time_extension text, revised_completion_date text)`
	)

});

});


//function to post data to a table based on the table name
function postDataToTable(table_name, fields){
	const {
			projectRegion,
			projectMunicipal,
			projectType,
			projectDescription,
			projectName,
			contractDescription,
			totalAmount,
			workCompleted,
			$status,
			startDate,
			originalDuration,
			expectedCompletionDate,
			approvedAdditionalTime,
			revisedCompletionDate,
	} = fields
	return new Promise((Resolve, Reject)=>{
	db.run(
		`insert into ${table_name} ( region text, municipal_assembly text, type text, project_description text, project_name text, contract_description text, total_amount text, physical_work_completed text, status text, start_date text, original_duration text, expected_completion_date text, approved_time_extension text, revised_completion_date text) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		[
			projectRegion,
			projectMunicipal,
			projectType,
			projectDescription,
			projectName,
			contractDescription,
			totalAmount,
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
function getTableData(table_name){
	return new Promise((Resolve, Reject)=>{
		db.all(`SELECT * FROM ${table_name}`, (err, rows) => {
			if (err) {
				return Reject(err);
			}
			return Resolve(rows);
		});
	})
}


module.exports = {getTableData, postDataToTable};
