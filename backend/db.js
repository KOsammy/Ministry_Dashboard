const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("mydatabase.db");
const AllTables = process.env.PROJECT_TABLES.split(" ");


db.serialize(() => {

//create tables for each of the table names specified.
AllTables.forEach((table_name)=>{

	db.run(
		`create table if not exists ${table_name} (id int Auto_increment, project_name text, project_start text, project_end text, project_contractor text, project_consultant text, district text, region text, status text, amount_paid text, contract_amount text,contractor_phone_number text, consultant_phone_number text, image text)`
	)

});

});


//function to post data to a table based on the table name
function postDataToTable(table_name, fields){
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
	} = fields
	return new Promise((Resolve, Reject)=>{
	db.run(
		`insert into ${table_name} ( project_name, project_start, project_end, project_contractor, region, district, status, project_consultant, contract_amount, amount_paid,contractor_phone_number, consultant_phone_number, image) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
