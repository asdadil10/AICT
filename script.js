let pausebtn=document.getElementById("centerbtn");
pausebtn.onclick=pauseplay;
function pauseplay()
{
    if(pausebtn.textContent=="II") //pause logic goes here
        {
        pausebtn.textContent="▷";
        }
    else //play logic goes here
    {
        pausebtn.textContent="II";
    }
}