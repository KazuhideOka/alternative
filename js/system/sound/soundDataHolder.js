class SoundDataHolder extends DataHolder
{
    constructor()
    {
        super("soundData");
    }

    setup()
    {
        this.setupPath(
            [
                "resources/data/sound/soundData.csv",
            ]);
    }
}

new SoundDataHolder();
