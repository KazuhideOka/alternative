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
        this.buttonText = [];
        this.buttons = [];
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
        this.buttonText = [];
        this.buttonText.push(document.getElementById("questButtonText0"));
        this.buttonText.push(document.getElementById("questButtonText1"));
        this.buttons = [];
        this.buttons.push(document.getElementById("questButton0"));
        this.buttons.push(document.getElementById("questButton1"));
    }

    update()
    {
        this.animator.update();
    }

    setText(text)
    {
        this.text.innerHTML = text;
    }

    setButton(index, text, onSelect)
    {
        this.buttonText[index].innerHTML = "";
        this.buttons[index].onclick = null;

        if (StringExtension.isValid(text))
        {
            this.buttonText[index].innerHTML = text;
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

        for (var button of this.buttonText)
        {
            button.style.opacity = 0;
            this.animator.opacity(button, 0, 1, time, "ease-in");
        }
    }
}

new QuestWindow();
