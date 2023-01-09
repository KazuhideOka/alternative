class TimeManager extends GlobalManager
{
    constructor()
    {
        super("time");
        var date = new Date();
        this.lastTime = date.getTime();
        this.deltaTime = 0;
        this.pauseTime = 0;
        this.scale = 1.0;
        this.elapsedTime = 0;
    }

    update()
    {
        var date = new Date();
        var current = date.getTime();
        var deltaMilliSec = current - this.lastTime;
        var deltaTime = (deltaMilliSec / 1000.0);
        this.deltaTime = deltaTime * this.scale;
        this.lastTime = current;
        this.elapsedTime += deltaTime;
    }

    pause()
    {
        var date = new Date();
        var current = date.getTime();
        this.pauseTime = current;
    }

    resume()
    {
        var date = new Date();
        var current = date.getTime();
        var deltaMilliSec = current - this.pauseTime;
        this.lastTime += deltaMilliSec;
    }

    setElapsedTime(time)
    {
        this.elapsedTime = time;
    }
}

new TimeManager();
