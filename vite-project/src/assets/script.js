let form = document.querySelector('form');
let toast  = document.querySelector('.success-message');

function displayToast(){
    toast.style.display = 'flex';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let firstName = document.querySelector('#first-name');
    let lastName = document.querySelector('#last-name');
    let email = document.querySelector('#email');
    let queryType = document.querySelector('input[name="query-type"]:checked')
    let message = document.querySelector('#message');
    let consent = document.querySelector('#consent');

    let isValid = true

    if(firstName.value ===""){
        isValid=false;
        document.querySelector('#first-name + .required-error').style.display = "block";
    }
    else{
        isValid=true
        document.querySelector('#first-name + .required-error').style.display = "none";
    }
    if(lastName.value ===""){
        isValid=false;
        document.querySelector('#last-name + .required-error').style.display = "block";
    }
    else{
        isValid=true
        document.querySelector('#last-name + .required-error').style.display = "none";
    }
    if(email.value ===""){
        isValid=false;
        document.querySelector('#email + .required-error').style.display = "block";
    }

    
    else if(!validateEmail(email)){
       // valid=false;
        document.querySelector('#email + .required-error + .error-message').style.display = "block"

    }
    else{
        isValid=true
        document.querySelector('#email + .required-error').style.display = "none";
    }
    if(!queryType){
        isValid=false;
        document.querySelector('.radio-inputs  + .required-error').style.display = "block";
    }
    else{
        isValid=true
        document.querySelector('.radio-inputs  + .required-error').style.display = "none";
        
    }
    if(message.value ===""){
       
        isValid=false;
        document.querySelector('#message + .error-message').style.display = "block";
    }
    else{
        isValid=true
       
        document.querySelector('#message + .error-message').style.display = "none";
    }
    if(!consent.checked){
        isValid=false;
        document.querySelector('.consent-checkbox + .error-message').style.display = "block";
    }
    else{
        isValid=true
        document.querySelector('.consent-checkbox + .error-message').style.display = "none";
    }
    if(isValid){
        displayToast()
    }

       
})



function validateEmail(email) {
  
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }