const idNoBtn = document.getElementById('idNoBtn')
const idNoGenerate = document.getElementById('idNoGenerate')
let studentIDNom = ''

idNoBtn.addEventListener("click", ()=>{
    let firstIDnumber = Math.floor(Math.random() * 99) + 1
    let secondIDnumber = Math.floor(Math.random() * 99) + 1

    if (firstIDnumber < 10) {
        firstIDnumber = "0" + firstIDnumber;
    }

    if (secondIDnumber < 10) {
        secondIDnumber = "0" + secondIDnumber;
    }

    studentIDNom = `2023${firstIDnumber}${secondIDnumber}`

    idNoGenerate.innerText = studentIDNom
    drawID()
})


const download = document.getElementById('download')
download.addEventListener('click', ()=>{
  // Get canvas as data URL
  var canvas = document.getElementById(activeCanvasId);
  var dataURL = canvas.toDataURL("image/png");

  // Create new canvas with same dimensions as original canvas
  var newCanvas = document.createElement('canvas');
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;

  // Draw background image onto new canvas
  var ctx = newCanvas.getContext('2d');
  var background = new Image();
  background.onload = function() {
    ctx.drawImage(background, 0, 0, newCanvas.width, newCanvas.height);
    // Draw contents of original canvas onto new canvas
    ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
    // Download new canvas as image
    var link = document.createElement("a");
    link.download = "IDCard.png";
    link.href = newCanvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  //Download the ID's card base on the activeCanvasId
  if (activeCanvasId === "UPcard") {
    background.src = "./Image/UP.png";
  } else if (activeCanvasId === "PUPcard") {
    background.src = "./Image/PUP.png";
  } else if (activeCanvasId === "ATENEOcard") {
    background.src = "./Image/Ateneo.png";
  } else if (activeCanvasId === "USTcard") {
    background.src = "./Image/UST..png";
  } else if (activeCanvasId === "DLSUcard") {
    background.src = "./Image/LASALLE.png";
  }
})


// Initialize the ID of the currently-active canvas to "redCanvas"
var activeCanvasId = "UPcard";

// Define a function that changes the currently-visible canvas
function showHideCanvas(){
  // Get the value of the canvas selector dropdown
  var canvasSelector = document.getElementById("canvasSelector");
  // Concatenate the value with "Canvas" to get the ID of the selected canvas
  var selectedCanvasId = canvasSelector.value;
  
  // Get the currently-active canvas and the selected canvas
  var activeCanvas = document.getElementById(activeCanvasId);
  var selectedCanvas = document.getElementById(selectedCanvasId);
  
  // Hide the currently-active canvas and show the selected canvas
  activeCanvas.style.display = "none";
  selectedCanvas.style.display = "block";
  
  // Update the ID of the currently-active canvas to the selected canvas
  activeCanvasId = selectedCanvasId;
  
  // Redraw the contents of the canvas
  drawID();
}

function drawID(){  
  if (activeCanvasId === "UPcard") {
    UPcard()
  } else if (activeCanvasId === "PUPcard") {
    PUPcard()
  } else if (activeCanvasId === "ATENEOcard") {
    ATENEOcard()
  } else if (activeCanvasId === "USTcard") {
    USTcard()
  } else if (activeCanvasId === "DLSUcard") {
    DLSUcard()
  }
}


function PUPcard(){
  // Get form values
  let inLastName = document.getElementById("inLastName").value
  let inFirstName = document.getElementById("inFirstName").value
  let inMiddleName = document.getElementById("inMiddleName").value
  let yourCourse = document.getElementById("inCourse").value
  var photo = document.getElementById('file').files[0]

  const yourLastName = inLastName.toUpperCase();
  const yourFirstName = inFirstName.toUpperCase();
  const yourMiddleName = inMiddleName.toUpperCase();

  const PUPcanvas = document.getElementById(activeCanvasId)
  const ctxOne = PUPcanvas.getContext("2d"); // now you can put style

  if (photo) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var photoImg = new Image();
        photoImg.onload = function() {
            ctxOne.drawImage(photoImg, 50, 169, 112, 112);
        };
        photoImg.src = event.target.result;
    };
    reader.readAsDataURL(photo);
  }

  PUPcanvas.style.backgroundImage = "url('./Image/PUP.png')";
  ctxOne.clearRect(0, 0, PUPcanvas.width, PUPcanvas.height);
  


  // COURSE
  ctxOne.font = "14px 'Poppins', sans-serif"; // set font size and style
  ctxOne.fillStyle = '#ffff'; // set to a color value
  ctxOne.fillText('BACHELOR OF SCIENCE IN', 90, 305) // 90px for left, 305px for top 

  ctxOne.font = "14px 'Poppins', sans-serif";
  ctxOne.fillStyle = '#fff';
  const maxWidth = 280; // Maximum width of each line
  const text = yourCourse;
    
  // Calculate the lines of text
  const words = text.split(' ');
  let line = '';
  const lines = [];
  for (let i = 0; i < words.length; i++) {
  const testLine = line + words[i] + ' ';
  const metrics = ctxOne.measureText(testLine);
  const testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
    
  // Set the y coordinate of the first line of text
  let lineY = 325;

  // Draw the lines of text
  for (let i = 0; i < lines.length; i++) {
    // Calculate the x coordinate of the line of text to center it horizontally
    const centerX = PUPcanvas.width / 2 - ctxOne.measureText(lines[i]).width / 2 + 25;
    // Draw the line of text
    ctxOne.fillText(lines[i], centerX, lineY);
    // Increase the y coordinate for the next line of text
    lineY += 20;
  }
  // LAST NAME
  ctxOne.font = '20px Noto Serif'; // set font size and style
  ctxOne.fillStyle = '#ffff'; // set to a color value
  ctxOne.fillText(yourLastName, 168, 210) // 168px for left, 210px for top 
  // ctxOne.font = "italic 25px Arial"

  // FIRST NAME
  ctxOne.font = '17px Noto Serif';
  ctxOne.fillStyle = '#ffff'; // set to a color value
  ctxOne.fillText(yourFirstName + " " + yourMiddleName, 168, 235) // 168px for left, 235px for top 
    
  // STUDENT NO.
  ctxOne.font = '20px Noto Serif'; // set font size and style
  ctxOne.fillStyle = '#ffff'; // set to a color value
  ctxOne.fillText(studentIDNom, 168, 265) // 168px for left, 265px for top 
}

function ATENEOcard(){
  // Get form values
  let inLastName = document.getElementById("inLastName").value
  let inFirstName = document.getElementById("inFirstName").value
  let inMiddleName = document.getElementById("inMiddleName").value
  let yourCourse = document.getElementById("inCourse").value
  var photo = document.getElementById('file').files[0]

  const yourLastName = inLastName.toUpperCase();
  const yourFirstName = inFirstName.toUpperCase();
  const yourMiddleName = inMiddleName.toUpperCase();

  const ATENEOcanvas = document.getElementById(activeCanvasId)
  const ctxOne = ATENEOcanvas.getContext("2d"); // now you can put style

  if (photo) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var photoImg = new Image();
        photoImg.onload = function() {
            ctxOne.drawImage(photoImg, 19, 101, 112, 112);
        };
        photoImg.src = event.target.result;
    };
    reader.readAsDataURL(photo);
  }

  ATENEOcanvas.style.backgroundImage = "url('./Image/Ateneo.png')";
  ctxOne.clearRect(0, 0, ATENEOcanvas.width, ATENEOcanvas.height);

  // BS IN
  ctxOne.font = 'italic bold 14px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.fillText('BS IN', 130, 255) // 130px for left, 255px for top 

  // COURSE
  ctxOne.font = 'bold 15px Noto Serif';
  ctxOne.fillStyle = 'black';
  const maxWidth = 300; // Maximum width of each line
  const text = yourCourse;
    
  // Calculate the lines of text
  const words = text.split(' ');
  let line = '';
  const lines = [];
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctxOne.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  // Set the y coordinate of the first line of text
  let lineY = 275;
  // Draw the lines of text
  for (let i = 0; i < lines.length; i++) {
  // Calculate the x coordinate of the line of text to center it horizontally
  const centerX = ATENEOcanvas.width / 2 - ctxOne.measureText(lines[i]).width / 2;
  // Draw the line of text
  ctxOne.fillText(lines[i], centerX, lineY);
  // Increase the y coordinate for the next line of text
  lineY += 20;
  }

  // LAST NAME
  ctxOne.font = 'bold 17px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.fillText(yourLastName, 137, 135) // 137px for left, 135px for top 

  // FIRST NAME
  ctxOne.font = 'bold 16px Noto Serif';
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.fillText(yourFirstName + " " +yourMiddleName, 137, 158) // 137px for left, 158px for top 
    
  // STUDENT NO.
  ctxOne.font = '19px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.fillText(studentIDNom, 137, 190) // 137px for left, 190px for top 
}


function UPcard(){
  // Get form values
  let inLastName = document.getElementById("inLastName").value
  let inFirstName = document.getElementById("inFirstName").value
  let inMiddleName = document.getElementById("inMiddleName").value
  let yourCourse = document.getElementById("inCourse").value
  var photo = document.getElementById('file').files[0]

  const yourLastName = inLastName.toUpperCase();
  const yourFirstName = inFirstName.toUpperCase();
  const yourMiddleName = inMiddleName.toUpperCase();

  const UPcanvas = document.getElementById(activeCanvasId)
  const ctxOne = UPcanvas.getContext("2d"); // now you can put style

  if (photo) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var photoImg = new Image();
        photoImg.onload = function() {
            ctxOne.drawImage(photoImg, 25, 145, 112, 112);
        };
        photoImg.src = event.target.result;
    };
    reader.readAsDataURL(photo);
  }

  UPcanvas.style.backgroundImage = "url('./Image/UP.png')";
  ctxOne.clearRect(0, 0, UPcanvas.width, UPcanvas.height);

  // BS IN
  ctxOne.font = '14px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.fillText('BACHELOR OF SCIENCE IN', 27, 340) // 27px for left, 340px for top 

  // COURSE
  ctxOne.font = '15px Noto Serif';
  ctxOne.fillStyle = 'black';
  const maxWidth = 300; // Maximum width of each line
  const text = yourCourse;

  // Calculate the lines of text
  const words = text.split(' ');
  let line = '';
  const lines = [];
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctxOne.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
    
  // Set the y coordinate of the first line of text
  let lineY = 360;

  // Draw the lines of text
  for (let i = 0; i < lines.length; i++) {
  // Draw the line of text
  ctxOne.fillText(lines[i], 27, lineY);
  // Increase the y coordinate for the next line of text
  lineY += 20;
  }

  // LAST NAME, FIRST NAME and MIDDLENAME
  ctxOne.font = 'bold 17px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.fillText(yourLastName + " " + yourFirstName + " " + yourMiddleName, 27, 295) // 27px for left, 295px for top 

  // STUDENT NO.
  ctxOne.font = '19px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.fillText(studentIDNom, 27, 320) // 27px for left, 320px for top 
}


function DLSUcard(){
  // Get form values
  let inLastName = document.getElementById("inLastName").value
  let inFirstName = document.getElementById("inFirstName").value
  let inMiddleName = document.getElementById("inMiddleName").value
  let yourCourse = document.getElementById("inCourse").value
  var photo = document.getElementById('file').files[0]

  const yourLastName = inLastName.toUpperCase();
  const yourFirstName = inFirstName.toUpperCase();
  const yourMiddleName = inMiddleName.toUpperCase();

  const DLSUcanvas = document.getElementById(activeCanvasId)
  const ctxOne = DLSUcanvas.getContext("2d"); // now you can put style

  if (photo) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var photoImg = new Image();
        photoImg.onload = function() {
            ctxOne.drawImage(photoImg, ((DLSUcanvas.width - 112) / 2), 121, 112, 112);
        };
        photoImg.src = event.target.result;
    };
    reader.readAsDataURL(photo);
  }

  DLSUcanvas.style.backgroundImage = "url('./Image/LASALLE.png')";
  ctxOne.clearRect(0, 0, DLSUcanvas.width, DLSUcanvas.height);

  // BS IN
  ctxOne.font = '14px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.textAlign = "center";
  var x = DLSUcanvas.width / 2;
  ctxOne.fillText('BACHELOR OF SCIENCE IN', x, 325) // x for left, 325px for top 

  // COURSE
  ctxOne.font = '15px Noto Serif';
  ctxOne.fillStyle = 'black';
  const maxWidth = 280; // Maximum width of each line
  const text = yourCourse;

  // Calculate the lines of text
  const words = text.split(' ');
  let line = '';
  const lines = [];
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctxOne.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
    
  // Set the y coordinate of the first line of text
  let lineY = 345;

  // Draw the lines of text
  for (let i = 0; i < lines.length; i++) {
  // Calculate the x coordinate of the line of text to center it horizontally
  const centerX = DLSUcanvas.width / 2;
  // Draw the line of text
  ctxOne.fillText(lines[i], centerX, lineY);
  // Increase the y coordinate for the next line of text
  lineY += 20;
  }

  // LAST NAME & FIRST NAME
  ctxOne.font = 'bold 17px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.textAlign = "center";
  var x = DLSUcanvas.width / 2;
  ctxOne.fillText(yourLastName + " " + yourFirstName + " " + yourMiddleName, x, 280) // x for left, 280px for top 
    
  // STUDENT NO.
  ctxOne.font = '19px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.textAlign = "center";
  var x = DLSUcanvas.width / 2;
  ctxOne.fillText(studentIDNom, x, 305) // x for left, 305px for top 
}


function USTcard(){
  // Get form values
  let inLastName = document.getElementById("inLastName").value
  let inFirstName = document.getElementById("inFirstName").value
  let inMiddleName = document.getElementById("inMiddleName").value
  let yourCourse = document.getElementById("inCourse").value
  var photo = document.getElementById('file').files[0]

  const yourLastName = inLastName.toUpperCase();
  const yourFirstName = inFirstName.toUpperCase();
  const yourMiddleName = inMiddleName.toUpperCase();

  const USTcanvas = document.getElementById(activeCanvasId)
  const ctxOne = USTcanvas.getContext("2d"); // now you can put style

  if (photo) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var photoImg = new Image();
        photoImg.onload = function() {
            ctxOne.drawImage(photoImg, ((USTcanvas.width - 112) / 2), 120, 112, 112);
        };
        photoImg.src = event.target.result;
    };
    reader.readAsDataURL(photo);
  }

  USTcanvas.style.backgroundImage = "url('./Image/UST..png')";
  ctxOne.clearRect(0, 0, USTcanvas.width, USTcanvas.height);

  // BS IN
  ctxOne.font = '14px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.textAlign = "center";
  var x = USTcanvas.width / 2;
  ctxOne.fillText('BACHELOR OF SCIENCE IN', x, 315) // x for left, 315px for top 

  // COURSE
  ctxOne.font = 'italic 15px Noto Serif';
  ctxOne.fillStyle = 'black';
  const maxWidth = 280; // Maximum width of each line
  const text = yourCourse;

  // Calculate the lines of text
  const words = text.split(' ');
  let line = '';
  const lines = [];
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctxOne.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
    
  // Set the y coordinate of the first line of text
  let lineY = 335;

  // Draw the lines of text
  for (let i = 0; i < lines.length; i++) {
  // Calculate the x coordinate of the line of text to center it horizontally
  const centerX = USTcanvas.width / 2;
  // Draw the line of text
  ctxOne.fillText(lines[i], centerX, lineY);
  // Increase the y coordinate for the next line of text
  lineY += 20;
  }

  // LAST NAME, FIRST NAME and MIDDLENAME
  ctxOne.font = 'bold 17px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.textAlign = "center";
  var x = USTcanvas.width / 2;
  ctxOne.fillText(yourLastName + " " + yourFirstName + " " + yourMiddleName, x, 270) // x for left, 270px for top
    
  // STUDENT NO.
  ctxOne.font = '19px Noto Serif'; // set font size and style
  ctxOne.fillStyle = 'black'; // set to a color value
  ctxOne.textAlign = "center";
  var x = USTcanvas.width / 2;
  ctxOne.fillText(studentIDNom, x, 295) // x for left, 295px for top 
}   

