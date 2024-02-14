const $tableBody = window.document.querySelector("#all");
const searchBar = document.getElementById("search-bar");
const rows = document.querySelectorAll("#data tbody tr");
let tableData = [];

console.log($tableBody); // Corrected parentheses

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

    $tableBody.innerHTML = ""; // Clear existing table content

    data.forEach((element) => { // Iterate through the data array
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
  } catch (err) {
    console.log("Failed to make the GET request to the API.", err);
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
