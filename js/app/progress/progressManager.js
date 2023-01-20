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
}

new ProgressManager();
