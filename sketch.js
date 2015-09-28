var x = 0;
var boxWidth = 50;
var boxSpacing = 850;
var period = 400;
var pos;
var bricks = [];
var brickRows = 10, brickCols = 10;
var radialDistance = 350;

function Brick(){
  var position = null;
  Object.defineProperty(this, 'position', {
    get : function(){
      return position;
    },
    set : function(value){
      position = value;
    }
  });
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);

  for (var i = 0; i < (brickRows * brickCols); i++) {
    bricks.push(new Brick());
  }

}

function draw() {
  background(0,0,0);
  translate(-width/2,-height/2,0);
  var brickIter = 0;

  push();
    translate(width/2,height/2,-2000.0);
    var dirX = (mouseX / width - 0.5) *2;
    var dirY = (mouseY / height - 0.5) *(-2);
  
    basicMaterial(45, 40, 255, 10);
    sphere(width);
    pointLight(45, 40, 255, 0, 0, -400);
  pop();


  pointLight(255, 100,255, 0, 0, 1.0);
  pointLight(0,0,255, 0,0,2.5);
  
  var theta = asin(random(-width, width) / width);
  for (var i = 0; i < brickRows; i++) {
    for (var j = 0; j < brickCols; j++) {
      var _x = width * cos(theta) * cos(random(TWO_PI));
      var _y = width * cos(theta) * sin(random(TWO_PI));
      var _z = width * sin(theta);

      push();
      
      pos = createVector((i*(width / 10)),
        (j * (width / 10)),
        map(cos(TWO_PI * frameCount / period), -1,1, 0,-100) );
      var distFromMouse = p5.Vector.dist(pos, createVector(mouseX, mouseY, 100));
      distFromMouse /= radialDistance;
      if (distFromMouse < 1.0){
          pos.z -= (distFromMouse * radialDistance * 0.75);
      }

      translate( pos.x,
        pos.y, //0);
        pos.z);
      
      var rotAngle = gaze(mouseY, mouseX, createVector(pos.x, pos.y, pos.z));
      
      //rotateX(rotAngle.x);
      //rotateY(rotAngle.y);
      //rotate(radians(gaze(mouseX, mouseY, pos)), [1,1,1]);
      // ambientMaterial(255,0,255);
      specularMaterial(0,0,255);
      box(boxWidth, boxWidth,  400);
      pop();

      brickIter++;
    }
  }
}

function gaze(targetX, targetY, pos){
  var desired = p5.Vector.sub(createVector(targetX, targetY, 1000), pos);
  desired.normalize();
  var pitch = atan2(desired.x,desired.z);
  var yaw = atan2(desired.y, sqrt(desired.x*desired.x + desired.z*desired.z));
  var azimuth = atan2(-desired.x, -desired.z);
  var gazeAngle = createVector(pitch, yaw, azimuth);
  return gazeAngle;
}