// Main scripts for calculating and comaprison of file hashes

var fileRef = document.querySelector("#file3");
var hashMethod = document.querySelector("#hashMethods");
var hashChecksum = document.querySelector("#hash-field");
var inputFile = null;
var fileData = null;
var hash = '';

var reader = new FileReader();

fileRef.addEventListener("input", (event) => {
    inputFile = event.target.files;
    reader.readAsBinaryString(inputFile[0]);
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

reader.onload = (event) => {
    let progressBar = document.querySelector('#progress-bar').ldBar;
    progressBar.set(100);
    fileData = event.target.result;
    return fileData;
}

reader.onprogress = event => {
    let progressBar = document.querySelector('#progress-bar').ldBar;

    if(document.querySelector('#progress-bar').classList.contains('disappear'))
    {
        console.log('here');
        document.querySelector('#progress-bar').classList.replace('disappear', 'appear');
    }
    
    if (event.lengthComputable) {
        let percentLoaded = Math.round((event.loaded / event.total) * 100);
        if (percentLoaded < 100) {
            progressBar.set(percentLoaded);
        }
    }
}

reader.onloadend = () => {
    setTimeout(() => {
        document.querySelector('#progress-bar').classList.replace('appear', 'disappear');
    }, 2000);
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
    
    if(valid)
    {        
        if(reader.readyState === 2) {

            console.log('hehreh');

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

    if(reader.readyState === 2) {

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