class QuestFlow extends Flow
{
    constructor()
    {
        super("quest", true);

        this.eventExecutor = new EventExecutor();
    }

    setupFlow()
    {
        globalSystem.survivorManager.setupSurvivor();

        var introduction = globalSystem.eventData.getDataById("start00");
        this.eventExecutor.execute(introduction);
    }

    updateFlow()
    {
        this.eventExecutor.update();
    }

    exitFlow()
    {
    }
}
