const $tableBody = window.document.querySelector("#data"); // html selector
const searchBar = document.getElementById("search-bar");
const rows = document.querySelectorAll("#data tbody tr");
//   const searchTerm = document.getElementById("search-bar").value.toLowerCase();
let tableData = [];
// let searchedData = [];



console.log({$tableBody})
async function getTableData() {
	try {
		// make api request
		const data = await fetch("http://localhost:3000/projects/UDG_3", {
			method: "GET",
			headers: {
				"content-type": "application/json",
				accept: "application/json",
			},
		});
		// if the request mthod fails
		if (data.status != 200) {
			console.log("Failed to get table data", await data.json());
		} else {
			// if the request method passes
			const content = await data.json();
			console.log("response data ", content);
			tableData = content.filter((element) => {
				// Filter based on project_name property containing "Market"
				return element.Project_name.includes("Market");
			});
	createNewTable(tableData);
	console.log({tableData})		
		}
	} catch (err) {
		// an error in the request.
		console.log("Failed to make the get request to the api. ", err);
	}
}


function filterTable({target}) {
   
	const the_value = target.value.toLowerCase();
	const searchedData = tableData.filter((v)=>{
		return v.Municipal_Assembly.toLowerCase().includes(the_value) || v.Region.toLowerCase().includes(the_value) || v.Status.toLowerCase().includes(the_value);
	})
	
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
 
getTableData();

const jl = (row_id)=>{
	window.localStorage.setItem("table_to_update", "UDG_3");
	window.localStorage.setItem("row_id", row_id);
	window.location.href="details.html";
};

function createNewTable (temp_data){
	$tableBody.innerHTML="";
	temp_data.forEach((element) => {
		//$tableBody.innerHTML+=`<tr onclick="window.location.href='details.html'">
		$tableBody.innerHTML+=`<tr onclick="jl(${element.id})">
		<td>${element.Project_name}</td>
		<td>${element.Region}</td>
		<td>${element.Project_description}</td>
		<td>${element.revised_Completion_Date}</td>
		<td>${element.Municipal_Assembly}</td>
		<td>${element.Approved_Cost}</td>
		<td>${element.Status}</td>
		<td>
		<button class="button">Update</button>
	</td>
	</tr>
	`;
	});
};


searchBar.addEventListener("keydown", filterTable);
