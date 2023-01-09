class MovieDataHolder extends DataHolder
{
    constructor()
    {
        super("movieData");
    }

    setup()
    {
        this.setupPath(
            [
                "resources/data/movie/movieData.csv",
            ]);
    }
}

new MovieDataHolder();
