class ProgressManager extends GlobalManager
{
    constructor()
    {
        super("progressManager");

        this.progress = 0;
    }

    setup()
    {

    }

    setProgress(progress)
    {
        this.progress = progress;
    }

    save()
    {
        var result =
        {
            progress: this.progress,
        };
        return result;
    }

    load(data)
    {
        this.progress = data.progress;
    }
}

new ProgressManager();
