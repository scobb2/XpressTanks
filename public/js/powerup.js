function Powerup(spawnPos, color, id, type) {
    this.pos = spawnPos.copy();
    this.color = color
    this.id = id;

    this.render = function () {

        fill(this.color);
        ellipse(this.pos.x, this.pos.y, 40, 40)
        text("POWERUP", this.pos.x - 30, this.pos.y +30)

    }
}