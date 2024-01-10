console.log("I am here!");

const tableToUpdate = window.localStorage.getItem("table_to_update");
const rowId = window.localStorage.getItem("row_id");
// Project Name
const projectNameInput = document.getElementById("projectName");

// Date of Commencement
const startDateInput = document.getElementById("startDate");

// Date of Completion
const endDateInput = document.getElementById("endDate");

// Project Contractor Name
const contractorInput = document.getElementById("contractor");

// Project Region
const regionInput = document.getElementById("region");

// Select District
const districtInput = document.getElementById("district");

// Status
const statusInput = document.getElementById("status");

// Project Description
const projectDescriptionInput = document.getElementById("projectDescription");

// Description Of Contract
const descriptionOfContractInput = document.getElementById(
	"descriptionOfContract"
);

// Physical works complete
const physicalWorksInput = document.getElementById("physicalWorksCompleted");
// Total Contract Amount
const totalContractAmountInput = document.getElementById("totalContractAmount");

// Original Duration
const originalDurationInput = document.getElementById("originalDuration");


const submitButton = document.querySelector("button#submit");

const projectForm = document.querySelector("#projectForm");

// Approved Revised Amount
const revisedAmountInput = document.getElementById('revisedAmount');

// Time extension months
const timeExtensionMonthsInput = document.getElementById('timeExtensionMonths');

// Approved cost
const approvedAmountInput = document.getElementById('approvedAmount');

// Expected completion date
const expectedCompletionDateInput = document.getElementById('expectedCompletionDate');

async function makeUpdate(e) {
const projectDetails = {
	timeExtension:timeExtensionMonthsInput.value,
	approvedAmount: approvedAmountInput.value,
	expectedCompletionDate: expectedCompletionDateInput.value,
	projectName: projectNameInput.value,
	startDate: startDateInput.value,
	endDate: endDateInput.value,
	contractor: contractorInput.value,
	region: regionInput.value,
	district: districtInput.value,
	status: statusInput.value,
	projectDescription: projectDescriptionInput.value,
	descriptionOfContract: descriptionOfContractInput.value,
	totalContractAmount: totalContractAmountInput.value,
	physicalWorks: physicalWorksInput.value,
	originalDuration: originalDurationInput.value,
	revisedAmount: revisedAmountInput.value,
};
	e.preventDefault();
	try {
		const res = await fetch(
			"http://localhost:3000/api/update/projects/" +
				tableToUpdate +
				"/" +
				rowId,
			{
				method: "PUT",
				body: JSON.stringify(projectDetails),
				headers: {
					"content-type": "application/json",
					accept: "application/json",
				},
			}
		);
		const responseBody = await res.json();
		console.log({ responseBody });
	} catch (e) {
		console.log("Failed to make request ", { e });
	}
}

async function main() {
	try {
		const response = await fetch(
			`http://localhost:3000/projects/${tableToUpdate}/${rowId}`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
				},
			}
		);

		if (response.status === 200) {
			const detailedData = await response.json();

			//console.log({response, detailedData});
			regionInput.value = detailedData.Region;
			revisedAmountInput.value = detailedData.Approved_Cost;
			projectNameInput.value = detailedData.Project_name;
			contractorInput.value = detailedData.contractor;
			projectDescriptionInput.value = detailedData.Project_description;
			districtInput.value = detailedData.Municipal_Assembly;
			physicalWorksInput.value = detailedData.Physical_Works_Completed;
			timeExtensionMonthsInput.value = detailedData.Completion_Date;
			approvedAmountInput.value = detailedData.Approved_Cost;
			expectedCompletionDateInput.value = new Date(detailedData.Expected_Completion_Date).toISOString().slice(0, 10);
			revisedAmountInput.value = detailedData.Revised_Cost;
			statusInput.value = detailedData.Status;
			descriptionOfContractInput.value = detailedData.Description_of_Contract;
			const endDateValue = new Date(detailedData.Time_Extension_mths).toISOString().slice(0, 10);
			endDateInput.value = endDateValue
			originalDurationInput.value = detailedData.Original_Duration;

			const startDateValue = new Date(detailedData.Start).toISOString().slice(0, 10);
			startDateInput.value = startDateValue;
			totalContractAmountInput.value = detailedData["Total_Contract_Amount_GH₵"]

		} else {
			console.error("Failed to get project details.", await response.json());
		}
	} catch (err) {
		console.error("Error updating project details.", err);
	}

	submitButton.addEventListener("click", makeUpdate);
	projectForm.addEventListener("submit", makeUpdate);
}

main();
