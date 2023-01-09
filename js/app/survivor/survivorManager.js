class SurvivorManager extends GlobalManager
{
    constructor()
    {
        super("survivorManager");
    }

    setup()
    {
        var data = globalSystem.survivorData.getDataById("survivor00");
        this.survivor = new Survivor(data);
    }

    getSurvivor(index = 0)
    {
        return this.survivor;
    }
}

new SurvivorManager();
