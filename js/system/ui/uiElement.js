class UIElement
{
    constructor(name, index = null)
    {
        this.name = name;

        if (index == null)
        {
            globalSystem.uiManager.registerElement(this);
        }
        else
        {
            globalSystem.uiManager.registerElements(this, index);
        }
    }

    setup()
    {
    }

    update()
    {
    }
}