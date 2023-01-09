class GlobalManager
{
    constructor(name)
    {
        this.name = name;
        globalSystem.registerManager(this.name, this);
    }

    get isReady()
    {
        return true;
    }

    setup()
    {
    }

    update()
    {
    }

    reset()
    {
    }
}