class Timer
{
    constructor(time, onComplete)
    {
        this.timers = [];
        this.limitTime = time;
        this.currentTime = 0;
        this.onComplete = onComplete;
    }

    update(deltaTime)
    {
        for (var i = this.timers.length - 1; i >= 0; i--)
        {
            var timer = this.timers[i];
            timer.currentTime += deltaTime;
            if (timer.currentTime >= timer.limitTime)
            {
                if (timer.onComplete != null)
                {
                    timer.onComplete();
                }
                this.timers = List.remove(this.timers, timer);
            }
        }
    }

    add(time, onComplete)
    {
        var timer = { limitTime: time, onComplete: onComplete, currentTime: 0 };
        this.timers.push(timer);
    }

    clear()
    {
        this.timers = [];
    }
}
