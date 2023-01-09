class TitleWindow extends UIElement
{
    constructor()
    {
        super("title");
        this.window = null;
        this.animator = new Animator();
    }

    setup()
    {
        this.window = document.getElementById("title");
        this.window.onclick = () =>
        {
            globalSystem.flowManager.setFlow(new QuestFlow());
        };
    }

    update()
    {
        this.animator.update();
    }
}

new TitleWindow();
