// A Lake Class
function Lake(startPos, newlakeid) {
    this.pos = startPos.copy();
    this.lakeid = newlakeid;
    this.width = randInt(10, 200)
    this.height = randInt(10, 200)
    this.x = randInt(200, 800)
    this.y = randInt(250, 300)

    // Render - to render the lake to the screen
    this.render = function() {
        push();

        // Draw lake
        strokeWeight(4);
        ellipse(this.x, this.y, this.width, this.height)
        fill(176,224,230);

        pop();
    }
}