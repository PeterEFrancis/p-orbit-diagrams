
const SIZE = 5000;

var canvas = document.getElementById('output');
var ctx = canvas.getContext('2d');

var m, p, color_style;


function get_settings() {
  p = document.getElementById('p-input').value;
  m = document.getElementById('m-input').value;
  color_style = document.getElementById('color-style').value;
}


function plot() {
  ctx.clearRect(0, 0, SIZE, SIZE);

  // draw circle
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, 2*Math.PI, false);
  ctx.stroke();

  // compute points
  let points = {};
  for (let n = 0; n < m; n++) {
    points[n] = {
      h: SIZE / 2 + (SIZE / 2) * Math.cos(2 * Math.PI * (n / m)),
      k: SIZE / 2 - (SIZE / 2) * Math.sin(2 * Math.PI * (n / m))
    }
  }

  // draw chords
  let visited = new Set();
  for (let n = 0; n < m; n++) {

    // compute chords
    let chords = [];

    let last = null;
    let curr = n;
    while (!visited.has(curr)) {
      last = curr;
      curr = (curr * p) % m;
      chords.push([last, curr]);
      visited.add(last);
    }

    // plot them
    for (let i = 0; i < chords.length; i++) {
      if (color_style == "B&W") {
        ctx.strokeStyle = 'black';
      } else if (color_style == 'LEN_CHORD') {
        let length = Math.sqrt((points[chords[i][0]].h - points[chords[i][1]].h) ** 2 + (points[chords[i][0]].k - points[chords[i][1]].k) ** 2);
        ctx.strokeStyle = 'hsl(' + (length * 360 / SIZE) + ', 100%, 50%)';
      } else if (color_style == 'LEN_ORBIT') {
        ctx.strokeStyle = 'hsl(' + (chords.length * 360 / m) + ', 100%, 50%)';
      }

      ctx.beginPath();
      ctx.moveTo(points[chords[i][0]].h, points[chords[i][0]].k);
      ctx.lineTo(points[chords[i][1]].h, points[chords[i][1]].k);
      ctx.stroke();
    }
  }

}







function order(a, m) {
  let ord = 1;
  let b = a;
  while (b != 0) {
    b = (a + b) % m;
    ord++;
  }
  return ord;
}

function is_prime(a) {
  for (let i = 2; i <= Math.sqrt(a); i++) {
    if (a % i == 0) {
      return false;
    }
  }
  return true;
}

function prime_divisors(a) {
  if (is_prime(a)) {
    return [a];
  }
  let ret = [];
  for (let i = 2; i <= Math.sqrt(a); i++) {
    if (is_prime(i) && (a % i) == 0) {
      ret.push(i);
    }
  }
  return ret;
}

function gcd(a,b) {
  // thanks Euclid ;)
  let x = a;
  let y = b;
  while (y != 0) {
    let t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function units(a) {
  let ret = [];
  for (let i = 1; i < a; i++) {
    if (gcd(a, i) == 1) {
      ret.push(i);
    }
  }
  return ret;
}




// function oninput_range(range) {
//   let variable = range.id.split('-')[0];
//   document.getElementById(variable + '-input').value = range.value;
//   get_settings();
//   plot();
// }
//
//
// function oninput_upper_bound(upperbound) {
//   let variable = upperbound.id.split('-')[0];
//   document.getElementById(variable + '-upper-bound').value = range.value;
//
// }
//
//
// function oninput_input(range) {
//   // let variable = upperbound.id.split('-')[0];
//   get_settings();
//   plot();
// }
