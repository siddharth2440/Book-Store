const removeTheErrorMessage = document.querySelector('#message');
const removeTheDiv = document.querySelector('.displayMessage');
removeTheErrorMessage.addEventListener("click",()=>{
    removeTheDiv.style.display='none'
})