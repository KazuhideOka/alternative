class Shaker
{
    constructor()
    {
        this.addTransform = null;
        this.size = { x: 0, y: 0 };
        this.time = 0;
        this.timer = 0;
    }

    static easeOutElastic(x)
    {
        const c4 = (2 * Math.PI) / 3;
        return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4);
    }

    update()
    {
        if (this.addTransform != null)
        {
            var prevRatio = this.timer / this.time;
            var prevX = Shaker.easeOutElastic(prevRatio);

            this.timer += globalSystem.time.deltaTime;
            var currentRatio = this.timer / this.time;
            var currentX = Shaker.easeOutElastic(currentRatio);

            var diff = currentX - prevX;

            this.addTransform(diff * this.size.x, diff * this.size.y);

            if (currentRatio >= 1)
            {
                this.addTransform = null;
            }
        }
    }

    shake(size, time, addTransform)
    {
        this.addTransform = addTransform;
        this.size = size;
        this.time = time;
        this.timer = 0;
    }
}