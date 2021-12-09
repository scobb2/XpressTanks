// A Lake Class
function Lake(spawnPos, height, width) {
    this.pos = spawnPos.copy();
    this.width = width
    this. height = height

    // Render - to render the lake to the screen
    this.render = function() {
        // Draw lake
        strokeWeight(4);
        fill(176,224,230);
        ellipse(this.pos.x, this.pos.y, this.width, this.height)
    }
}