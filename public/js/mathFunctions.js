function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// function spawn() {
//     let spawn = Math.random()
//     let startPos
//     if (spawn < .25) {
//       startPos = createVector(Math.floor(Math.random()*(.25 * win.width - 40)+20), Math.floor(Math.random()*(win.height-40)+20));
//     }
//     // right padding spawn
//     else if (spawn < .50) {
//       startPos = createVector(Math.floor((Math.random()*(.25 * win.width - 40)+20) + (.75 * win.width)), Math.floor(Math.random()*(win.height-40)+20));
//     }
//     // top padding spawn
//     else if (spawn < .75) {
//       startPos = createVector(Math.floor(Math.random()*(win.width - 40)+20), Math.floor(Math.random()*(.25 * win.height-40)+20));
//     }
//     // bottom padding spawn
//     else {
//       startPos = createVector(Math.floor(Math.random()*(win.width - 40)+20), Math.floor((Math.random()*(.25 * win.height-40)+20) + (.75 * win.height)));
//     }
// }