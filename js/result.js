function returnHome()
{
    window.location.replace("index.html");
    localStorage.clear();
}

window.onload = () => {

    var result = localStorage.getItem('result');
    console.log(result);
    
    if(result == 'true')
    {
        document.querySelector(".verified").style.display = '';
        document.querySelector(".unverified").style.display = 'none';
    }
    else {
        document.querySelector(".unverified").style.display = '';
        document.querySelector(".verified").style.display = 'none';
    }
}