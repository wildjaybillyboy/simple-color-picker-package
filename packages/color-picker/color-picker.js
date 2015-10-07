// Write your package code here!
selectColor = function (id, e) {
  console.log('clicked #',id);
  var canvas = document.getElementById(id);
  var pos = findPos(canvas, e);
  console.log('x ',pos.x,' y ',pos.y);
  var context = canvas.getContext('2d');
  var rgba = context.getImageData(pos.x,pos.y,1,1).data;
  console.log('getImageData: ',rgba);
  Session.set('pickerRGBA', rgba.join(","));
  var hex = rgbToHex(rgba[0],rgba[1],rgba[2]);
  Session.set('pickerHex', hex);
};

gradientCanvas = function (id) {
  var canvas = document.getElementById(id);
  var context = canvas.getContext('2d');
/*  context.rect(0,0,canvas.width, canvas.height*0.1);
  var grd = context.createLinearGradient(0,0,canvas.width,0);

  grd.addColorStop(0, 'red');
  grd.addColorStop(0.15, 'yellow');
  grd.addColorStop(0.30, 'green');
  grd.addColorStop(0.50, 'cyan');
  grd.addColorStop(0.65, 'blue');
  grd.addColorStop(0.80, 'purple');
  grd.addColorStop(1.0, 'red');

  context.fillStyle = grd;
  context.fill();*/

  var img = new Image();
  HTTP.get('https://upload.wikimedia.org/wikipedia/commons/7/72/Colormap.png', function (error,result) {
      if (!error) {
          console.log('result: ',result);
          img.src = result.content;
          context.drawImage(img, 0, 0);
      }
  });
};

//safari
if (typeof Uint8ClampedArray.prototype.join === 'undefined') {
    Uint8ClampedArray.prototype.join = function (sep) {
        str = this[0].toString();
        for (i = 1; i < this.length; i++) {
            str += sep+this[i].toString();
        }
        return str;
    };
}

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
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
