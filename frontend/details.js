//const rowId = new URLSearchParams(window.location.search).get("id");
const $tableBody = window.document.querySelector("#detailedData"); // html selector
const $project_name = window.document.querySelector("#project_name");
const $region = window.document.querySelector("#region");
const $contractor = window.document.querySelector("#contractor");
const $project_description = window.document.querySelector("#project_Description");
const $municipal_Assembly = window.document.querySelector("#municipal_Assembly");
const $lot_no = window.document.querySelector("#lot_no");
const $description_of_contract = window.document.querySelector("#description_of_contract");
const $total_contract_amount = window.document.querySelector("#total_contract_amount");
const $approved_amount = window.document.querySelector("#approved_amount");
const $revised_Amount = window.document.querySelector("#revised_Amount");
const $physical_works = window.document.querySelector("#physical_works");
const $status = window.document.querySelector("#status");
const $start_date = window.document.querySelector("#start_date");
const $original_timeline = window.document.querySelector("#original_timeline");
const $expected_completion_date = window.document.querySelector("#expected_completion_date");
const $revised_completion_date = window.document.querySelector("#revised_completion_date");
const $road_length = window.document.querySelector("#road_length");
const $consultant = window.document.querySelector("#consultant");

// console.log({$table_project_name})


//console.log({$tableBody})
const project_name_to_update = window.localStorage.getItem("table_to_update");
const project_item_to_update = window.localStorage.getItem("row_id");

//console.log("zzzzzzzzzzzz",{project_name_to_update, project_item_to_update});
async function getProjectDetails() {
    try {
      const response = await fetch(`http://localhost:3000/projects/${project_name_to_update}/${project_item_to_update}`, {
        method: "GET",
        headers: {    
          "content-type": "application/json",
        },
      });
  
      if (response.status === 200) {
        const detailedData = await response.json();
        console.log({response, detailedData});
        $region.textContent = detailedData.Region;
        $approved_amount.textContent = detailedData.Approved_Cost;
        $project_name.textContent = detailedData.Project_name;
        $contractor.textContent = detailedData.contractor;
        $project_description.textContent = detailedData.Project_description;
        $municipal_Assembly.textContent = detailedData.Municipal_Assembly;
        $physical_works.textContent = detailedData.Physical_Works_Completed;
        $revised_Amount.textContent = detailedData.Revised_Cost;
        $status.textContent = detailedData.Status;
        $description_of_contract.textContent = detailedData.Description_of_Contract;
        $expected_completion_date.textContent = detailedData.Expected_Completion_Date;
        $original_timeline.textContent = detailedData.Original_Duration;
        $start_date.textContent = detailedData.Start;
        // Use the detailedData object to populate the table in details.html
        // $tableBody.innerHTML+=`<tr>
        // <td>${detailedData.Project_name}</td>
        // <td>${detailedData.Region}</td>
        
        // <td>${detailedData.contractor}</td>
        //             </tr>
				// 	<td>${detailedData.Project_description}</td>
				// 	<td>${detailedData.Municipal_Assembly}</td>
				// 	<td>${detailedData.Revised}</td>
				// 	<td>${detailedData.Status}</td>
				// 	<td>
				// 	<button class="button">Update</button>
				// </td>
				// </tr>
				// `;
      } else {
        console.error("Failed to get project details.", await response.json());
      }
    } catch (err) {
      console.error("Error fetching project details.", err);
    }
  }
  

  getProjectDetails();
