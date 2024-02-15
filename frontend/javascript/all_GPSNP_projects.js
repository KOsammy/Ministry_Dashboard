const $tableBody = window.document.querySelector("#all"); // html selector
const searchBar = document.getElementById("search-bar");
const rows = document.querySelectorAll("#all tbody tr");
//   const searchTerm = document.getElementById("search-bar").value.toLowerCase();
let tableData = [];
// let searchedData = [];



//console.log({$tableBody})
async function getTableData() {
	try {
		// make api request
		const data = await fetch("http://localhost:3000/projects/GPSNP", {
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
			tableData = content;
			console.log("response data ", tableData);
			
			createNewTable(tableData);
			
		}
	} catch (err) {
		// an error in the request.
		console.log("Failed to make the get request to the api. ", err);
	}
}


function filterTable({target}) {
   
	const the_value = target.value.toLowerCase();
	const searchedData = tableData.filter((v)=>{
		return v.Assembly.toLowerCase().includes(the_value) || v.Zone.toLowerCase().includes(the_value) || v.Status.toLowerCase().includes(the_value);
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
	window.localStorage.setItem("table_to_update", "GPSNP");
	window.localStorage.setItem("row_id", row_id);
	window.location.href="details.html";
};

function createNewTable (temp_data){
	
	temp_data.forEach((element) => {
		//$tableBody.innerHTML+=`<tr onclick="window.location.href='details.html'">
		$tableBody.innerHTML+=`<tr onclick="jl(${element.id})">
		<td>${element.Project_Name}</td>
		<td>${element.Zone}</td>
		<td>${element.Sub_Project}</td>
		<td>${element.Assembly}</td>
		<td>${element.Status}</td>
		<td>
		<button class="button">Update</button>
	</td>
	</tr>
	`;
	});
};


searchBar.addEventListener("keydown", filterTable);
