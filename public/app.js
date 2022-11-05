//step 4. socket connection
let socket = io();
let r;
let g;
let b;
let size;

//connect socket client
socket.on('connect', () =>{
    console.log('connected');
})

//step 8. listen for data from the server
socket.on('data', (data)=>{
    console.log(data);

    //draw with data coming in
    drawObj(data);
    // fill(180,130,230);
    // noStroke();
    // circle(data.x, data.y, 20);
});

//step 1. p5 code
function setup(){
    createCanvas(windowWidth, windowHeight);
    background(255);

    //assign random values
    r = random(100,255);
    g = random(100,255);
    b = random(100,255);
    size = random(60);
}

function mouseMoved(){
    // fill(180,130,230);
    // noStroke();
    // circle(mouseX, mouseY, 20);

    let mousePos = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b,
        size: size
    }

    //step 5. emit data to the server
    socket.emit('data', mousePos);
}

function drawObj(obj){
    fill(obj.r,obj.g,obj.b);
    noStroke();
    circle(obj.x, obj.y, obj.size);
    fill(255);
    circle(obj.x-obj.size/3, obj.y, obj.size);
}