let isEdit = false;

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Get the current date
const today = new Date();

// Set the current date in the input field
const currentDateInputElement = document.getElementById('currentDateInput');

// Set the value of the date input field
currentDateInputElement.valueAsDate = today;

// show sidebar
menuBtn.addEventListener('click',() => {
    sideMenu.style.display = 'block';
} )

// close sidebar
closeBtn.addEventListener('click',() => {
    sideMenu.style.display = 'none';
})

// change theme
themeToggler.addEventListener('click',() => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

var form = document.getElementById("projectform"),
projectName = document.getElementById("projectName"),
startDate = document.getElementById("startDate"),
endDate = document.getElementById("endDate"),
contractorName = document.getElementById("contractorName"),
consultantName = document.getElementById("consultantName"),
region = document.getElementById("region"),
district = document.getElementById("district"),
amount = document.getElementById("contractAmount"),
amountPaid = document.getElementById("amountpaid"),
balancedue = document.getElementById("balancedue"),
projectData = document.getElementById("data")


let getData = localStorage.getItem('projectInfo') ? JSON.parse(localStorage.getItem('projectInfo')) : []

let isData = false, editId
file.onChange = function() {
    if(file.files[0].size < 1000000){
        var fileReader = new FileReader();
         fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
         }
         fileReader.readAsDataURL(file.files[0])
    }
    else {
        alert("This file size is too large")
    }
}
 form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const info = {
        projectName: projectName.value,
        startDate: startDate.value,
        endDate: endDate.value,
        contractorName: contractorName.value,
        consultantName: consultantName.value,
        region: region.value,
        district: district.value,
        amount: amount.value,
        amountPaid: amountPaid.value,
        balancedue: balancedue.value,
        }

        if(!isEdit){
            getData.push(info)
        }
        else {
            isEdit = false
            getData[editId] = info
        }

        localStorage.setItem('projectInfo', JSON.stringify(getData));

 })



