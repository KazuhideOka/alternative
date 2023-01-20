class BootFlow extends Flow
{
    constructor()
    {
        super("", true);
    }

    get fadeIn()
    {
        return false;
    }

    get fadeOut()
    {
        return true;
    }

    setupFlow()
    {
    }

    updateFlow()
    {
        SaveSystem.load();

        globalSystem.flowManager.setFlow(new TitleFlow());
    }

    exitFlow()
    {
    }
}