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
// to switch to player
let happy=document.getElementById("happycard");
happy.onclick= function openplayer()
{
window.open("#player", "_self");
}
// to switch back to home
let homebtn=document.getElementById("homebtn")
homebtn.onclick=function gohome()
{
window.open("#", "_self");
}