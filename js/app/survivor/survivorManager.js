class SurvivorManager extends GlobalManager
{
    constructor()
    {
        super("survivorManager");
    }

    setup()
    {
        this.setupSurvivor();
    }

    getSurvivor(index = 0)
    {
        return this.survivor;
    }

    setupSurvivor()
    {
        var data = globalSystem.survivorData.getDataById("survivor00");
        this.survivor = new Survivor(data);
    }
}

new SurvivorManager();
