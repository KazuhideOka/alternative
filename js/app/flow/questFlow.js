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

        var introduction = globalSystem.eventData.getDataById("introduction00");
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
