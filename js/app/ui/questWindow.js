class QuestWindow extends UIElement
{
    constructor()
    {
        super("quest");
        this.window = null;
        this.image = null;
        this.text = null;
        this.remnant = null;
        this.params = null;
        this.buttons = [];
        this.buttonText = [];
        this.buttonParam = [];
        this.imageUrl = null;
        this.animator = new Animator();
    }

    get isAnimation()
    {
        var result = this.animator.isAnimation;
        return result;
    }

    setup()
    {
        this.window = document.getElementById("quest");
        this.image = document.getElementById("questImage");
        this.text = document.getElementById("questTextSpan");
        this.remnant = document.getElementById("questRemnantText");
        this.params = document.getElementById("questParamText");
        this.buttons = [];
        this.buttons.push(document.getElementById("questButton0"));
        this.buttons.push(document.getElementById("questButton1"));
        this.buttonText = [];
        this.buttonText.push(document.getElementById("questButtonTextSpan0"));
        this.buttonText.push(document.getElementById("questButtonTextSpan1"));
        this.buttonParam = [];
        this.buttonParam.push(document.getElementById("questButtonTextParam0"));
        this.buttonParam.push(document.getElementById("questButtonTextParam1"));
    }

    update()
    {
        this.animator.update();
    }

    setText(text)
    {
        this.text.innerHTML = text;
    }

    setButton(index, text, params, onSelect)
    {
        this.buttonText[index].innerHTML = "";
        this.buttonParam[index].innerHTML = "";
        this.buttons[index].onclick = null;

        if (StringExtension.isValid(text))
        {
            this.buttonText[index].innerHTML = text;
            var paramText = "";
            for (var i = 0; i < params.length; i++)
            {
                if (params[i] > 0)
                {
                    if (paramText.length > 0)
                    {
                        paramText += "　";
                    }
                    paramText += `${Message.get(`param${i}`)}:+${params[i]}`;
                }
                else if (params[i] < 0)
                {
                    if (paramText.length > 0)
                    {
                        paramText += "　";
                    }
                    paramText += `${Message.get(`param${i}`)}:${params[i]}`;
                }
            }
            if (StringExtension.isValid(paramText))
            {
                this.buttonParam[index].innerHTML = `[${paramText}]`;
            }
            this.buttons[index].onclick = () => { onSelect(); };
        }
    }

    setParam(params)
    {
        var remnant = Message.get("remnant");
        remnant = remnant.replace("{0}", params[0]);
        this.remnant.innerHTML = remnant;

        var text = Message.get("survivorParam");
        text = text.replace("{0}", params[1]);
        text = text.replace("{1}", params[2]);
        text = text.replace("{2}", params[3]);
        text = text.replace("{3}", params[4]);
        this.params.innerHTML = text;
    }

    setImage(image)
    {
        this.image.style.opacity = 0;

        if (StringExtension.isValid(image))
        {
            var url = `url(resources/image/${image}.png)`;
            this.image.style.backgroundImage = url;
            this.image.style.opacity = 1;
        }
    }

    fadeIn(time)
    {
        var imageChanged = (this.imageUrl != this.image.style.backgroundImage);
        if (imageChanged)
        {
            this.image.style.opacity = 0;
            this.animator.opacity(this.image, 0, 1, time, "ease-in");
            this.imageUrl = this.image.style.backgroundImage;
        }

        this.text.style.opacity = 0;
        this.animator.opacity(this.text, 0, 1, time, "ease-in");

        for (var button of this.buttons)
        {
            button.style.opacity = 0;
            this.animator.opacity(button, 0, 1, time, "ease-in");
        }
    }
}

new QuestWindow();
