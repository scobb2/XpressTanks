// A Lake Class
function Lake(startPos) {
    Math.floor(Math.random() * (max - min) + min);
    this.width = randomNum(10, 200)
    this.height = randomNum(10, 200)
    this.x = randomNum(200, 800)
    this.y = randomNum(250, 300)

    // Render - to render the lake to the screen
    this.render = function() {
        // Draw lake
        strokeWeight(4);
        fill(176,224,230);
        ellipse(this.x, this.y, this.width, this.height)
    }
}