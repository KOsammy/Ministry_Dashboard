const $tableBody = window.document.querySelector("#data"); // html selector

console.log({$tableBody})
async function getTableData() {
	try {
		// make api request
		const data = await fetch("http://localhost:3000/projects/UDG_2", {
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
			$tableBody.innerHTML="";
			// if the request method passes
			const content = await data.json();
			console.log("response data ", content);
			const filteredContent = content.filter((element) => {
				// Filter based on project_name property containing "Road"
				
				return element.Project_name.includes("Transport Terminal");
			});
			console.log({filteredContent})
			filteredContent.forEach((element) => {
					$tableBody.innerHTML+=`<tr onclick="window.location.href='details.html'">
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
		}
	} catch (err) {
		// an error in the request.
		console.log("Failed to make the get request to the api. ", err);
	}
}

getTableData();
