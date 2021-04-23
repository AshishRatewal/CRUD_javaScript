// getting data from document
let dltRecord = document.querySelector("#dltRecord"),
addRecord = document.querySelector("#addRecord"),
searchInput = document.querySelector("#searchInput"),
firstName = document.querySelector("#firstName"),
lastName = document.querySelector("#lastName"),
superHero = document.querySelector("#superHero"),
emailInput = document.querySelector("#emailInput"),
gender = document.getElementsByName("gender"),
age = document.querySelector("#age"),
addData = document.querySelector("#addData"),
resetData = document.querySelector("#resetData"),
firstPage = document.querySelector(".firstPage"),
addRecordForm = document.querySelector(".addRecordForm"),getGender,
err = document.getElementsByClassName("err"),mainArray = [],finalArray=[],
crossBtn = document.querySelector(".crossBtn"),
sortFun = document.querySelector(".sortFun"),checkIndex;
const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// Add Record page
addRecord.addEventListener('click', () => {
    addRecordForm.style.display = "block";
    document.body.style.backgroundColor = '#00000045';
});
crossBtn.addEventListener('click', () => {
    addRecordForm.style.display = "none";
    document.body.style.backgroundColor = '#fff';
});
// Add Data From Form
addData.addEventListener('click',() => {
    // getting value of gender
    gender.forEach(radio => {
        if(radio.checked){
            getGender = radio.value;
        }
    });
    if(firstName.value.trim().length == 0){
        err[0].innerHTML = "Please enter name without spaces";
    }else if(isNaN(firstName.value) == false){
        err[0].innerHTML = "Please enter only string";
    }else if(lastName.value.trim().length == 0){
        err[0].innerHTML = "";
        err[1].innerHTML = "Please enter lastname without spaces";
    }else if(isNaN(lastName.value) == false){
        err[1].innerHTML = "Please enter only string";
    }else if(superHero.value.trim().length == 0){
        err[1].innerHTML = "";
        err[2].innerHTML = "Please enter without spaces";
    }else if(isNaN(superHero.value) == false){
        err[2].innerHTML = "Please enter only string";
    }else if(pattern.test(emailInput.value.trim()) == false){
        err[2].innerHTML = "";
        if(emailInput.value.trim().length == 0){
            err[3].innerHTML = "Please enter email without spaces";
        }else{
            err[3].innerHTML = "Please enter an valid email";
        }
    }else if(getGender == "" || getGender == null){
        err[3].innerHTML = "";
        err[4].innerHTML = "Please Select Gender";
    }else if(age.value == "" || age.value == null){
        err[4].innerHTML = "";
        err[5].innerHTML = "Please Enter Age";
    }else if(age.value >=1 && age.value <= 100){
        err[0].innerHTML=err[1].innerHTML=err[2].innerHTML=err[3].innerHTML=err[4].innerHTML=err[5].innerHTML="";
        err[5].innerHTML = "";
        let getObject = makeObj(firstName.value,lastName.value,superHero.value,emailInput.value,getGender,age.value);
        getLocalStorage();
        mainArray.push(getObject);
        localStorage.setItem("crud",JSON.stringify(mainArray));
        alert("Data Stored");
        mainArray.splice(0,mainArray.length);
        gender.forEach(radio => {
            radio.checked = false;
        });
        firstName.value=lastName.value=superHero.value=emailInput.value=age.value="";
        addRecordForm.style.display = "none";
        document.body.style.backgroundColor = '#fff';
        showDataFun();
    }else{
        err[5].innerHTML = "Please Enter in between 1 to 100";
    }
    event.preventDefault();
});
// make object
let makeObj = (firstName,lastName,superHero,email,gender,age) => {
    return {firstName,lastName,superHero,email,gender,age}
}
// getData from localstorage
let getLocalStorage = () => {
    let localStorageData = JSON.parse(localStorage.getItem('crud'));
    if(localStorageData != null){
        mainArray.splice(0,mainArray.length);
        for(let i=0;i<localStorageData.length;i++){
            mainArray.push(localStorageData[i]);
        }
    }
}
// shoe all data
let showDataFun = () => {
    getLocalStorage();
    showData.innerHTML = "";
    let tr = "";
    for(let i=0;i<mainArray.length;i++){
        tr += `
            <tr>
                <td><input type="checkbox" name="check" class="check" id="${i}"></td>
                <td>${i+1}</td>
                <td>${mainArray[i].firstName}</td>
                <td>${mainArray[i].lastName}</td>
                <td>${mainArray[i].superHero}</td>
                <td>${mainArray[i].email}</td>
                <td>${mainArray[i].gender}</td>
                <td>${mainArray[i].age}</td>
            </tr>`;
    }
    showData.innerHTML = tr;
}
showDataFun();
// search button
searchInput.addEventListener('keyup', () => {
    let tag = searchInput.value;
    let lower = tag.toLowerCase();
    let tRows = showData.getElementsByTagName("tr");
    for(let i=0;i<tRows.length;i++){
        let tData1 = tRows[i].getElementsByTagName("td")[2];
        let tData2 = tRows[i].getElementsByTagName("td")[3];
        let tData3 = tRows[i].getElementsByTagName("td")[4];
        let tData4 = tRows[i].getElementsByTagName("td")[5];
        if(tData1 || tData2 || tData3 || tData4){
            let tDataTxt1 = tData1.innerText;
            let tDataTxt2 = tData2.innerText;
            let tDataTxt3 = tData3.innerText;
            let tDataTxt4 = tData4.innerText;
            if(tDataTxt1.toLowerCase().indexOf(lower) >- 1 || tDataTxt2.toLowerCase().indexOf(lower) >- 1 || tDataTxt3.toLowerCase().indexOf(lower) >- 1 || tDataTxt4.toLowerCase().indexOf(lower) >- 1){
                tRows[i].style.display = "";
            }else{
                tRows[i].style.display = "none";
            }
        }
    }
});
// Delete Button
dltRecord.addEventListener('click', () => {
    let blankArray = [],getChecked = document.getElementsByClassName("check");
    blankArray.splice(0,blankArray.length);
    for(let i=0;i<getChecked.length;i++){
        if(getChecked[i].checked){
            blankArray.push(i);
        }
    }       
    blankArray.reverse();
    for(let j=0;j<blankArray.length;j++){
        mainArray.splice(blankArray[j],1);
    }
    localStorage.setItem("crud",JSON.stringify(mainArray));
    showDataFun();
    blankArray.splice(0,blankArray.length);
});
// sorting
checkIndex = 0;
sortFun.addEventListener('click',() => {
    if(checkIndex==0){
        getLocalStorage();
        let sortedArray = [],sortedArrayFinal = [];
        for(let i=0;i<mainArray.length;i++){
            sortedArray.push(mainArray[i].firstName);
        }
        sortedArray.sort();
        for(let j=0;j<sortedArray.length;j++){
            for(let k=0;k<mainArray.length;k++){
                if(sortedArray[j] == mainArray[k].firstName){
                    sortedArrayFinal.push(mainArray[k]);
                }
            }
        }
        // SHOwING DATA
        localStorage.setItem("crud",JSON.stringify(sortedArrayFinal));
        getLocalStorage();
        showDataFun();
        sortedArrayFinal.splice(0,sortedArrayFinal.length);
        checkIndex = 1;
    }else{
        getLocalStorage();
        let sortedArray = [],sortedArrayFinal = [];
        for(let i=0;i<mainArray.length;i++){
            sortedArray.push(mainArray[i].firstName);
        }
        sortedArray.sort();
        sortedArray.reverse();
        for(let j=0;j<sortedArray.length;j++){
            for(let k=0;k<mainArray.length;k++){
                if(sortedArray[j] == mainArray[k].firstName){
                    sortedArrayFinal.push(mainArray[k]);
                }
            }
        }
        // SHOwING DATA
        localStorage.setItem("crud",JSON.stringify(sortedArrayFinal));
        getLocalStorage();
        showDataFun();
        sortedArrayFinal.splice(0,sortedArrayFinal.length);
        checkIndex = 0;
    }
});