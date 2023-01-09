class GameManager extends GlobalManager
{
    constructor()
    {
        super("gameManager");
    }

    setup()
    {
        // 最初のフローへ
        globalSystem.flowManager.setFlow(new BootFlow());
    }

    update()
    {
    }
}

new GameManager();
