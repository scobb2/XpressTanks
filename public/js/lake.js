const minWidth = 100
const minHeight = 100
// A Lake Class
function Lake(x, y, height, width) {
    this.x = x
    this.y = y
    this.width = width + minWidth
    this.height = height + minHeight

    // Render - to render the lake to the screen
    this.render = function() {
        // Draw lake
        strokeWeight(4);
        fill(176,224,230);
        ellipse(this.x, this.y, this.width, this.height)
    }
}