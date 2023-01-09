class ResourceManager extends GlobalManager
{
    constructor()
    {
        super("resource");

        this.loadElements = [];
    }

    get isLoading()
    {
        var result = this.loadElements.length > 0;
        return result;
    }

    setup()
    {
    }

    update()
    {
    }

    loadBackgroundImage(element, path, onLoad = null)
    {
        this.loadImage(path, onLoad);
        element.style.backgroundImage = `url(${path})`;
    }

    loadImage(path, onLoad = null)
    {
        var image = new Image();
        image.onload = () =>
        {
            globalSystem.resource.finish(path);
            if (onLoad != null)
            {
                onLoad();
            }
        };

        this.start(path);

        image.src = path;

        return image;
    }

    start(path)
    {
        this.loadElements.push(path);
    }

    finish(path)
    {
        this.loadElements = List.remove(this.loadElements, path);
    }
}

new ResourceManager();
