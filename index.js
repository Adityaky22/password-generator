const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay =  document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("#copy");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#Numbers");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generatebtn= document.querySelector(".generatbutton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+[{;:"}],<.>/?|';
 let password ="";
 let passwordLength =10;
 let checkCount = 0;


 function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
 }  
 handleSlider();
 console.log('hi');
 console.log(lengthDisplay);

 function setIndicator(){
    indicator.style.backgroundColor = color;
    //shadow
 }

  function getRndint(max ,min){
    return Math.floor(Math.random() * (max-min)) +min; 
  }

function generateRandomNumber(){
    return getRndint(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndint(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndint(65,91));
}

function generateSymbol(){
  const random = getRndint(0,symbols.length);
  return symbols.charAt(random);

}

//check password
function calcStrength(){
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;

  if(uppercaseCheck.checked) hasUpper = true;
  if(lowercaseCheck.checked) hasLower = true;
  if(numberCheck.checked) hasNum = true;
  if(symbolCheck.checked) hasSym = true;

  if(hasUpper && hasLower &&(hasNum || hasSym) && passwordLength >=8){
    setIndicator("#0ff0");
  }else if(
    (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >=6
  ){
    setIndicator("#ff0");
  }else{
    setIndicator("#f00");
  }

  
}

//copy content

async function copyContent(){
  try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerHTML ="copied";
  }
  catch(e){
    copyMsg.innerHTML = "Failed";
  }
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}
function shufflePassword(array){
  //fisher yates method
 
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() *(i+1));
      const temp = array[i];
      array[i]=array[randomIndex];
      array[randomIndex] = temp;
    }
    let str ="";
    array.forEach((el)=>(str += el));
    return str;
  
 }

   function handleCheckBoxChange(){
    checkCount =0;
    allCheckBox.forEach((checkbox) =>{
      if(checkbox.checked)
      checkCount++;

    });

           if(passwordLength<checkCount){
            passwordLength = checkCount;
            handleSlider();
           }
     
   }


    
allCheckBox.forEach( (checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input' , (el) => {
  passwordLength = el.target.value;
  console.log('input slider event happened');
  handleSlider();
})



copyBtn.addEventListener('click',() => {
  if(passwordDisplay.value)
      copyContent();
})

generatebtn.addEventListener('click' ,  () =>{
if(checkCount ==0){
  return;
}
if(passwordLength < checkCount){
  passwordLength = checkCount;
  handleSlider();

}

//let's start the journey to generate password


//removw old password
password="";

   //lets put the stuff metioned by checkbox

  // if(uppercaseCheck.checked){
  //  password += generateUpperCase();
  // }
  //   if(lowercaseCheck.checked){
 //   password += generateLowerCase();
 //  }
   //  if(numberCheck.checked){
 // password += generateRandomNumber();
//
 //  }
    // if(symbolCheck.checked){
 //   password += generateSymbol();
   //}
   let funcArr =[];
   if(uppercaseCheck.checked){
      funcArr.push(generateUpperCase);
     }
    if(lowercaseCheck.checked){
      funcArr.push(generateLowerCase);
    }
  if(numberCheck.checked){
    funcArr.push(generateRandomNumber);
  
   }
     if(symbolCheck.checked){
    funcArr.push(generateSymbol);
     }


   
   for(let i=0; i<funcArr.length;i++){
    password += funcArr[i]();
   }
   console.log("COmpulsory adddition done");

   for(let i=0;i<passwordLength-funcArr.length;i++){
    let randomIndex = getRndint(0,funcArr.length);
    password +=funcArr[randomIndex]();
   }

   password = shufflePassword(Array.from(password));

   passwordDisplay.value = password;

   calcStrength();



})





 