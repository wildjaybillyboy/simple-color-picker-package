// Write your package code here!
selectColor = function (id, e) {
  console.log('clicked #picker');
  var canvas = document.getElementById(id);
  var pos = findPos(canvas, e);
  console.log('x ',pos.x,' y ',pos.y);
  var context = canvas.getContext('2d');
  var rgba = context.getImageData(pos.x,pos.y,1,1).data;
  console.log('getImageData: ',rgba);
  Session.set('pickerRGBA', rgba.toString());
  var hex = rgbToHex(rgba[0],rgba[1],rgba[2]);
  Session.set('pickerHex', hex);
};

gradientCanvas = function (id) {
  var canvas = document.getElementById(id);
  var context = canvas.getContext('2d');
  context.rect(0,0,canvas.width, canvas.height);
  var grd = context.createLinearGradient(0,0,canvas.width,canvas.height);

  grd.addColorStop(0, 'red');
  grd.addColorStop(0.15, 'yellow');
  grd.addColorStop(0.30, 'green');
  grd.addColorStop(0.50, 'cyan');
  grd.addColorStop(0.65, 'blue');
  grd.addColorStop(0.80, 'purple');
  grd.addColorStop(1.0, 'red');

  context.fillStyle = grd;
  context.fill();
};

findPos = function (canvas, evt) {
  console.log('findPos canvas ',canvas);
  try {
    console.log(canvas.offsetParent);
    var curleft = evt.pageX - canvas.offsetLeft;
    var curtop = evt.pageY - canvas.offsetTop;
    return {x : curleft, y : curtop};
  } catch (e) {
    console.error(e);
  }
};

rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    Meteor.throw('Invalid color component');
  }
  return '#'+('000000' + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
};
