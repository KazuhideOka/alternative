class EventDataHolder extends DataHolder
{
    constructor()
    {
        super("eventData");
    }

    setup()
    {
        this.setupPath(
            [
                "resources/data/event/eventData.csv",
            ]);
    }
}

new EventDataHolder();
