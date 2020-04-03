// Enables file drag and drop feature but not used in main project
// EXPERIMENTAL


const globalFile = [];

function dropHandler(event) {

	var uploading = document.getElementById('uploading');
  	var uploaded = document.getElementById('uploaded');
	  
	uploading.style.display = 'none';
	uploaded.style.display = 'block';

    console.log('File(s) dropped');
  
    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
  
    // if (event.dataTransfer.items) {
    //   // Use DataTransferItemList interface to access the file(s)
    //   for (var i = 0; i < event.dataTransfer.items.length; i++) {
    //     // If dropped items aren't files, reject them
    //     if (event.dataTransfer.items[i].kind === 'file') {
	// 	  var file = event.dataTransfer.items[i].getAsFile();
	// 	  globalFile.push(file);
    //       console.log('... file[' + i + '].name = ' + file.name);
    //     }
    //   }
    // } else {
    //   // Use DataTransfer interface to access the file(s)
    //   for (var i = 0; i < event.dataTransfer.files.length; i++) {
    //     console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].name);
    //   }
	// }
}

function dragOverHandler(event) {

	var upload = document.getElementById('upload');
	var uploading = document.getElementById('uploading');
	
	upload.style.display = 'none';
	uploading.style.display = 'block';
	
	console.log('File(s) in drop zone');
    // Prevent default behavior (Prevent file from being opened)
	event.preventDefault();
}

function dragLeaveHandler() {
	var upload = document.querySelector('#upload');
	var uploading = document.querySelector('#uploading');
	upload.style.display = 'block';
	uploading.style.display = 'none';
}

function compareHash() {
	console.log(globalFile);
	// globalFile.forEach((file), () => {
	// 	console.log(file);
	// })
}