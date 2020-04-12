// Main scripts for calculating and comaprison of file hashes

var fileRef = document.querySelector("#file3");
var hashMethod = document.querySelector("#hashMethods");
var hashChecksum = document.querySelector("#hash-field");
var inputFile = null;
var fileData = null;
var hash = '';

fileRef.addEventListener("input", (event) => {
    inputFile = event.target.files;
    console.log("fired!");
});

hashMethod.addEventListener("change", (event) => {
    console.log(event.target.value);
    hashMethod.value = event.target.value;
});

if(hashChecksum != null)
{
    hashChecksum.addEventListener('change', event => {
        console.log(event.target.value);
    });
}

var reader = new FileReader();

reader.onload = (event) => {
    fileData = event.target.result;
}

function validateInput()
{
    var valid = false;

    if (inputFile == null || hashMethod.value == 'default' || hashChecksum.value == '') {
        document.querySelector('#error').style.display = '';
    } else {
        document.querySelector('#error').style.display = 'none';
        valid = true;
    }
    return valid;
}

function compareHash() {

    var result = false;
    var valid = false;

    valid = validateInput();

    reader.readAsBinaryString(inputFile[0]);
    
    if(valid)
    {
        reader.onloadend = () => {

            if(hashMethod.value === 'SHA-1') {
                hash = CryptoJS.SHA1(fileData).toString();
            }
        
            else if(hashMethod.value === 'SHA-2') {
                hash = CryptoJS.SHA256(fileData).toString();
            }

            else if(hashMethod.value === 'SHA-3') {  
                hash = CryptoJS.SHA3(fileData).toString();
            }
            
            else if(hashMethod.value === 'MD5') {
                hash = CryptoJS.MD5(fileData).toString();
            }

            if(hashChecksum.value == hash)
                result = true;

            localStorage.setItem("result" , result);
            window.location.replace("result.html");
        }
    }
    else {
        console.log("Please provide valid input!");
    }
}

function calculateHash() {

    reader.readAsBinaryString(inputFile[0]);

    reader.onloadend = () => {

        if(hashMethod.value === 'SHA-1')
        {
            console.log("Performing SHA-1");
            hash = CryptoJS.SHA1(fileData).toString();
        }
    
        else if(hashMethod.value === 'SHA-2') {
            
            console.log("Performing SHA-2");
            hash = CryptoJS.SHA256(fileData).toString();
        }

        else if(hashMethod.value === 'SHA-3') {
            
            console.log("Performing SHA-3");
            hash = CryptoJS.SHA3(fileData).toString();
        }
        
        else if(hashMethod.value === 'MD5') {
            
            console.log("Performing MD5");
            hash = CryptoJS.MD5(fileData).toString();
        }

        let result = document.querySelector('#result');
        
        result.innerHTML = hash;
        document.getElementById("copy").setAttribute("data-clipboard-text", hash);
        document.querySelector('.result-row').style.display = '';
    }
}

function copy() {
    
    new ClipboardJS('#copy');
    let btn = document.getElementById("copy");
    let prev = btn.innerHTML;
    btn.innerHTML = 'Copied!';

    setTimeout(() => {
        btn.innerHTML = prev;
    }, 1000);

}