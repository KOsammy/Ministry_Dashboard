<?php

print_r($_POST);
// Process the form data here

echo "Project Name: " . $_POST['projectName'] . "<br>";
echo "Date of Commencement: " . $_POST['startDate'] . "<br>";
echo "Date of Completion: " . $_POST['endDate'] . "<br>";
echo "Project Constructor Name: " . $_POST['contractorName'] . "<br>";
echo "Project Region: " . $_POST['region'] . "<br>";
echo "Select District: " . $_POST['district'] . "<br>";
echo "Status: " . $_POST['status'] . "<br>";
echo "Project Consultant Name: " . $_POST['consultantName'] . "<br>";
echo "Contract Amount: " . $_POST['contractAmount'] . "<br>";
echo "Amount Paid: " . $_POST['amountPaid'] . "<br>";
?>
