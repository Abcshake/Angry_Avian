
const { Engine,World,Bodies,MouseConstraint,Constraint,Mouse } = Matter;
let ground;
const boxes = [];
let bird;
let word, engine;
let mConstraint;
let slingshot;

let dotImg;
let boxImg;
function preload(){
  dotImg = loadImage('bird.png');
  boxImg = loadImage('box.png');
}

function setup() {
  const canvas = createCanvas(600, 400);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2, height-10, width, 20);
  for (let i=0; i<3; i++) {
    boxes[i] = new Box(450, 300-i*75, 60, 60);
  }
  bird = new Bird(150, 300, 16);

  slingshot = new Slingshot(150, 300, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world,mConstraint);
}

function keyPressed() {
  if (key== ' ') {
    alert('Newgame!');
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 16);
    slingshot.attach(bird.body);
    World.remove(world, box.body);
    for (let i=0; i<3; i++) {
      boxes[i] = new Box(450, 300-i*75, 50, 75);
      console.log(boxes[i]);
    }
  }
}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
 }, 100);
}

function draw() {
  background(0);
  Engine.update(engine);
  ground.show();
  for (let box of boxes) {
  box.show();
  }
  slingshot.show();
  bird.show();
}
