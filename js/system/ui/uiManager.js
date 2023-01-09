class UIManager extends GlobalManager
{
    constructor()
    {
        super("uiManager");
        this.elements = [];
    }

    setup()
    {
        for (var element of this.elements)
        {
            element.setup();
        }
    }

    update()
    {
        for (var element of this.elements)
        {
            element.update();
        }
    }

    registerElement(element)
    {
        this.elements.push(element);
        this[element.name] = element;
    }

    registerElements(element, index)
    {
        this.elements.push(element);

        if (this[element.name] == null)
        {
            this[element.name] = [];
        }
        this[element.name][index] = element;
    }
}

new UIManager();
