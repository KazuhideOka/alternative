class MovieManager extends GlobalManager
{
    constructor()
    {
        super("movieManager");
        this.window = null;
        this.fill = null;
        this.videoElement = null;
    }

    setup()
    {
        this.window = document.getElementById("movie");
        this.fill = document.getElementById("movieFill");
        this.videoElement = document.getElementById("movieVideo");

        this.window.style.display = "none";
    }

    play(id, onEnd = null)
    {
        var data = globalSystem.movieData.getDataById(id);
        if (data == null)
        {
            return;
        }
        this.videoElement.onended = onEnd;
        this.videoElement.onloadedmetadata = () =>
        {
            this.videoElement.volume = globalSystem.soundManager.bgmVolume;
            this.videoElement.play();
            this.fill.style.display = "none";
        };
        this.videoElement.src = data.path;
        this.videoElement.load();

        this.fill.style.display = "inline";
        this.window.style.display = "inline";
    }

    stop()
    {
        this.videoElement.pause();
    }

    disable()
    {
        this.stop();
        this.window.style.display = "none";
    }
}

new MovieManager();
