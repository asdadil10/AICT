let pausebtn=document.getElementById("centerbtn");
pausebtn.onclick=pauseplay;
function pauseplay()
{
    if(pausebtn.textContent=="I I") //pause logic goes here
        {
        pausebtn.textContent="▷";
        }
    else //play logic goes here
    {
        pausebtn.textContent="I I";
    }
}