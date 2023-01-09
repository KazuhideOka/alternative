class SurvivorDataHolder extends DataHolder
{
    constructor()
    {
        super("survivorData");
    }

    setup()
    {
        this.setupPath(
            [
                "resources/data/survivor/survivorData.csv",
            ]);
    }
}

new SurvivorDataHolder();
