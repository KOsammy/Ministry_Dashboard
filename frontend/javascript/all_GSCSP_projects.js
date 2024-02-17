const $tableBody = window.document.querySelector("#all");
const searchBar = document.getElementById("search-bar");
const rows = document.querySelectorAll("#data tbody tr");
let tableData = [];

console.log({ searchBar }); // Corrected parentheses

searchBar.addEventListener("keydown", (e) => {
	console.log("a change !");
	filterTable(e);
});

async function getTableData() {
	try {
		const response = await fetch("http://localhost:3000/api/getGSCSPprojects", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			console.log("Failed to get table data", await response.json());
			return; // Exit the function if the request fails
		}

		const data = await response.json();
		console.log("Response data:", data);
		tableData = data;
		createNewTable(data);
	} catch (err) {
		console.log("Failed to make the GET request to the API.", err);
	}
}

function createNewTable(temp_data) {
	$tableBody.innerHTML = ""; // Clear existing table content

	temp_data.forEach((element) => {
		// Iterate through the data array
		$tableBody.innerHTML += `
        <tr onclick="window.location.href='details.html?project=${element.id}'">
          <td>${element.Project_name}</td>
          <td>${element.Region}</td>
          <td>${element.Project_description}</td>
          <td>${element.revised_Completion_Date}</td>
          <td>${element.Municipal_Assembly}</td>
          <td>${element.Approved_Cost}</td>
          <td>${element.Status}</td>
          <td><button class="button">Update</button></td>
        </tr>
      `;
	});
}

function filterTable({ target }) {
	console.log({ target });
	const the_value = target.value.toLowerCase();
	const searchedData = tableData.filter((v) => {
		return (
			v.Municipal_Assembly?.toLowerCase()?.includes(the_value) ||
			v.Region?.toLowerCase()?.includes(the_value) ||
			v.Status?.toLowerCase()?.includes(the_value) ||
			v.Project_name?.toLowerCase()?.includes(the_value)
		);
	});

	createNewTable(searchedData);
	// for (const row of rows) {
	//   const Project_name = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
	//   if (!Project_name.includes(searchTerm)) {
	//     row.style.display = "none"; // Hide rows that don't match the search term
	//   } else {
	//     row.style.display = ""; // Show rows that match the search term
	//   }
	// }
}

// set count and percentage of projects.
	async function countAndPercentage(){
		try{
			// count the udg tables 
			const udg_1Count = await fetch("http://localhost:3000/api/countTable?tableName=UDG_1");
			if (udg_1Count.status == 200){
				const count_body1 = await udg_1Count.json();
				console.log({count_body1});
				window.document.querySelector("#udg1_count").innerHTML =  "Total: "+count_body1; 
			} else  console.error("Failed to make count for udg1", udg_1Count);

			const udg_2Count = await fetch("http://localhost:3000/api/countTable?tableName=UDG_2");
			if (udg_2Count.status == 200){
				const count_body2 = await udg_2Count.json();
				console.log({count_body2});
				window.document.querySelector("#udg2_count").innerHTML =  "Total: "+count_body2; 
			} else  console.error("Failed to make count for udg1", udg_2Count);

			const udg_3Count = await fetch("http://localhost:3000/api/countTable?tableName=UDG_3");
			if (udg_3Count.status == 200){
				const count_body3 = await udg_3Count.json();
				console.log({count_body3});
				window.document.querySelector("#udg3_count").innerHTML =  "Total: "+count_body3; 
			} else  console.error("Failed to make count for udg1", udg_3Count);


			// percentages for all udg tables.
			const udg_1Completed = await fetch("http://localhost:3000/api/completedPercentage?tableName=UDG_1");
			if (udg_1Completed.status == 200){
				const completed_body1 = await udg_1Completed.json();
				console.log({completed_body1});
				window.document.querySelector("#udg1_completed_status").innerHTML =  "<b>"+completed_body1 +"% completed</b>"
			} else  console.error("Failed to make count for udg1", udg_1Completed);

			const udg_2Completed = await fetch("http://localhost:3000/api/completedPercentage?tableName=UDG_2");
			if (udg_2Completed.status == 200){
				const completed_body2 = await udg_2Completed.json();
				console.log({completed_body2});
				window.document.querySelector("#udg2_completed_status").innerHTML =  "<b>"+completed_body2 +"% completed</b>"
			} else  console.error("Failed to make count for udg1", udg_2Completed);

			const udg_3Completed = await fetch("http://localhost:3000/api/completedPercentage?tableName=UDG_3");
			if (udg_3Completed.status == 200){
				const completed_body3 = await udg_3Completed.json();
				console.log({completed_body3});
				window.document.querySelector("#udg3_completed_status").innerHTML = "<b>"+completed_body3 +"% completed</b>"
			} else  console.error("Failed to make count for udg1", udg_3Completed);
		}catch(e){
			console.error("Failed to perform count!");
			console.error(e);
		}

	};


getTableData();
countAndPercentage();
