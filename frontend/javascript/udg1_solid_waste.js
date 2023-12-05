const $tableBody = window.document.querySelector("#data"); // html selector

console.log({$tableBody})
async function getTableData() {
	try {
		// make api request
		const data = await fetch("http://localhost:3000/projects/udg1_Solid_Waste", {
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
				content.forEach(element => {
					$tableBody.innerHTML+=`<tr onclick="window.location.href='details.html'">
					<td>${element.project_name}</td>
					<td>${element.district}</td>
					<td>${element.project_contractor}</td>
					<td>${element.project_consultant}</td>
					<td>${element.project_start}</td>
					<td>${element.contract_amount}</td>
					<td>${element.amount_paid}</td>
					<td>${element.status}</td>
					<td>
					<button class="button">Update</button>
				</td>
				</tr>`
				});
			
		}
	} catch (err) {
		// an error in the request.
		console.log("Failed to make the get request to the api. ", err);
	}
}

getTableData();
