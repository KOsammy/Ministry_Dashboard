// selectors
const $projectName = document.getElementById("projectName")
const $projectStart = document.getElementById("startDate")
const $projectEndDate = document.getElementById("endDate")
const $projectContractor = document.getElementById("contractorName")
const $region = document.getElementById("region")
const $district = document.getElementById("district")
const $$status = document.getElementById("status")
const $consultant = document.getElementById("consultantName")
const $contractorNumber = document.getElementById("contractorNumber")
const $consultantNumber = document.getElementById("consultantNumber")
const $contractAmount = document.getElementById("contractAmount")
const $amountPaid = document.getElementById("amountPaid")
const theForm = document.querySelector("#urban_Park_form");

console.log({theForm});

theForm.addEventListener("submit", (e)=>{
	e.preventDefault();
	console.log("submission", e);
	/*	
	console.log({
		projectName: $projectName.value,
				projectStart : $projectStart.value,
				projectEnd: $projectEndDate.value,
				projectContractor : $projectContractor.value,
				region: $region.value,
				district: $district.value,
				status: $$status.value,
				consultant: $consultant.value,
				contract: $contractAmount.value,
				amountPaid: $amountPaid.value,
			
	})
	*/
	save();	
})

// try to make the request
async function save() {
	try {
		// make API request
		const response = await fetch("http://localhost:3000/projects/udg1_Urban_parks", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				accept: "application/json",
			},
			body: JSON.stringify({
				projectName: $projectName.value,
				projectStart: $projectStart.value,
				projectEndDate: $projectEndDate.value,
				projectContractor: $projectContractor.value,
				region: $region.value,
				district: $district.value,
				$status: $$status.value,
				consultant: $consultant.value,
                contractorNumber: $contractorNumber.value,
                consultantNumber: $consultantNumber,
				contractAmount: $contractAmount.value,
				amountPaid: $amountPaid.value,
			}),
		});
		// when the response is not sucess
		if (response.status != 200) {
			const content = await response.json();
			console.log("Post request not success! ", content);
		} else {
			const content = await response.json();
			console.log("The content of the post ", content);
		}
	} catch (err) {
		console.log("Failed to post the data ", { err });
	}
}
