class Flow
{
    constructor(elementId)
    {
        this.elementId = elementId;
    }

    get fadeIn()
    {
        return true;
    }

    get fadeOut()
    {
        return true;
    }

    get fadeTime()
    {
        return 0.5;
    }

    setup()
    {
        this.enableUi(this.elementId);
        this.setupFlow();
    }

    update()
    {
        this.updateFlow();
    }

    exit()
    {
        this.disableUi(this.elementId);
        this.exitFlow();

        SaveSystem.save();
    }

    setupFlow()
    {
    }

    updateFlow()
    {
    }

    exitFlow()
    {
    }

    enableUi(id)
    {
        if (id)
        {
            var ui = document.getElementById(id);
            if (ui != null)
            {
                ui.style.display = "inline";
            }
        }
    }

    disableUi(id)
    {
        if (id)
        {
            var ui = document.getElementById(id);
            if (ui != null)
            {
                ui.style.display = "none";
            }
        }
    }
}