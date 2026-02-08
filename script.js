var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

// Detect mobile and set frame increment speed
var isMobile = window.innerWidth < 600;
var frameIncrement = isMobile ? 3 : 1; // 3x faster on mobile

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
  if (button.textContent === "Click Me! ❤") {
    button.textContent = "loading...";
    
    // Using EmailJS for simple email sending
    emailjs.send("service_8ndysij", "template_na1ns9l", {
      to_email: "jophits@gmail.com",
      to_name: "Dhiya",
      message: "wt if im serious,gn❤️\n\n~j",
      from_name: "J"
    }).then(
      function(response) {
        console.log('SUCCESS!', response.status, response.text);
        button.textContent = "Check Your Email 🙃";
      },
      function(error) {
        console.log('FAILED...', error);
        button.textContent = "Error 😞";
      }
    );
  }
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    
    // glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    // Adjust opacity increment speed for mobile
    var opacityIncrement = isMobile ? 0.03 : 0.01;

    if(frameNumber < 250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("everyday day I cannot believe how lucky", canvas.width/2, canvas.height/2);
        opacity = Math.min(1, opacity + opacityIncrement);
    }
    //hold at full opacity for 5 seconds
    if(frameNumber >= 250 && frameNumber < 550){
        context.fillStyle = `rgba(45, 45, 255, 1)`;
        context.fillText("everyday day I cannot believe how lucky", canvas.width/2, canvas.height/2);
    }
    //fades out the text by decreasing the opacity
    if(frameNumber >= 550 && frameNumber < 800){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("everyday day I cannot believe how lucky", canvas.width/2, canvas.height/2);
        opacity = Math.max(0, opacity - opacityIncrement);
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if(frameNumber == 800){
        opacity = 0;
    }
    if(frameNumber > 1100 && frameNumber < 1350){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {           //shortens long sentence for mobile screens
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = Math.min(1, opacity + opacityIncrement);
    }
    if(frameNumber >= 1350 && frameNumber < 1650){
        context.fillStyle = `rgba(45, 45, 255, 1)`;
        
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width/2, canvas.height/2);
        }
    }
    if(frameNumber >= 1650 && frameNumber < 1900){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width/2, canvas.height/2);
        }

        opacity = Math.max(0, opacity - opacityIncrement);
    }

    if(frameNumber == 1900){
        opacity = 0;
    }
    if(frameNumber > 2200 && frameNumber < 2450){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("to be alive, and to get to share this clg with", canvas.width/2, canvas.height/2);
        opacity = Math.min(1, opacity + opacityIncrement);
    }
    if(frameNumber >= 2450 && frameNumber < 2750){
        context.fillStyle = `rgba(45, 45, 255, 1)`;
        context.fillText("to be alive, and to get to share this clg with", canvas.width/2, canvas.height/2);
    }
    if(frameNumber >= 2750 && frameNumber < 3000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("to be alive, and to get to share this clg with", canvas.width/2, canvas.height/2);
        opacity = Math.max(0, opacity - opacityIncrement);
    }

    if(frameNumber == 3000){
        opacity = 0;
    }
    if(frameNumber > 3300 && frameNumber < 3550){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
        opacity = Math.min(1, opacity + opacityIncrement);
    }
    if(frameNumber >= 3550 && frameNumber < 3850){
        context.fillStyle = `rgba(45, 45, 255, 1)`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
    }
    if(frameNumber >= 3850 && frameNumber < 4100){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width/2, canvas.height/2);
        opacity = Math.max(0, opacity - opacityIncrement);
    }

    if(frameNumber == 4100){
        opacity = 0;
    }
    if(frameNumber > 4400 && frameNumber < 4650){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and yet here we r to get the impossible", "chance to know each other"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and yet here we r to get the impossible chance to know each other", canvas.width/2, canvas.height/2);
        }

        opacity = Math.min(1, opacity + opacityIncrement);
    }
    if(frameNumber >= 4650 && frameNumber < 4950){
        context.fillStyle = `rgba(45, 45, 255, 1)`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and yet here we r to get the impossible", "chance to know each other"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and yet here we r to get the impossible chance to know each other", canvas.width/2, canvas.height/2);
        }
    }
    if(frameNumber >= 4950 && frameNumber < 5200){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and yet here we r to get the impossible", "chance to know each other"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("and yet here we r to get the impossible chance to know each other", canvas.width/2, canvas.height/2);
        }
        
        opacity = Math.max(0, opacity - opacityIncrement);
    }

    if(frameNumber == 5200){
        opacity = 0;
    }
    if(frameNumber > 5500 && frameNumber < 5750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["U too goated Dihh❤️, more than", "all the atoms and moles the universe can contain"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("U too goated Dihh❤️, more than all the atoms and moles the universe can contain", canvas.width/2, canvas.height/2);
        }

        opacity = Math.min(1, opacity + opacityIncrement);
    }
    if(frameNumber >= 5750 && frameNumber < 99999){
        context.fillStyle = `rgba(45, 45, 255, 1)`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["U too goated Dihh❤️, more than", "all the atoms and moles the universe can contain"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("U too goated Dihh❤️, more than all the atoms and moles the universe can contain", canvas.width/2, canvas.height/2);
        }
    }
    
    if(frameNumber >= 6000 && frameNumber < 99999){
        context.fillStyle = `rgba(45, 45, 255, ${secondOpacity})`;


        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["(pls come more often", "to canteen!)"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("(pls come more often to canteen!)", canvas.width/2, (canvas.height/2 + 50));
        }

        secondOpacity = Math.min(1, secondOpacity + opacityIncrement);
    }

    if(frameNumber >= 6250 && frameNumber < 99999){
        context.fillStyle = `rgba(45, 45, 255, ${thirdOpacity})`;
        context.fillText("Happy Dihh's Day Dihh❤️<3", canvas.width/2, (canvas.height/2 + 120));
        thirdOpacity = Math.min(1, thirdOpacity + opacityIncrement);

        button.style.display = "block";
    }   

     // Reset the shadow effect after drawing the text
     context.shadowColor = "transparent";
     context.shadowBlur = 0;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber += frameIncrement; // Use variable increment speed
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
    // Update mobile detection on resize
    isMobile = window.innerWidth < 600;
    frameIncrement = isMobile ? 3 : 1;
});

window.requestAnimationFrame(draw);
