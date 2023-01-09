class DIPSwitch
{
    static textbox = null;

    static get elementId()
    {
        return "dipSwitch";
    }

    static setup()
    {
        if (Platform.isMaster)
        {
            return;
        }

        var window = document.getElementById("wrapper");

        var button = document.createElement("div");
        button.style.zIndex = 999;
        button.style.position = "relative";
        button.style.width = "5%";
        button.style.height = "5%";
        button.style.whiteSpace = "nowrap";
        button.id = DIPSwitch.elementId;
        button.onclick = DIPSwitch.show;
        window.appendChild(button);
    }

    static show(event)
    {
        if (event.target.id != DIPSwitch.elementId)
        {
            return;
        }

        var dip = document.getElementById(DIPSwitch.elementId);
        if (dip.children.length > 0)
        {
            return;
        }
        var index = 0;
        DIPSwitch.createTextbox(dip);
        DIPSwitch.createButton(dip, index++, "CLOSE", (e) => { DIPSwitch.close(e); });
    }

    static close(event)
    {
        var dip = document.getElementById(DIPSwitch.elementId);
        var elements = dip.children;
        for (var i = elements.length - 1; i >= 0; i--)
        {
            elements[i].remove();
        }
    }

    static createButton(parent, index, text, onclick)
    {
        var button = document.createElement("button");
        button.innerText = text;
        button.style.zIndex = 999;
        button.style.position = "relative";
        button.onclick = onclick;
        parent.appendChild(button);

        if (index % 5 == 0)
        {
            parent.appendChild(document.createElement("br"));
        }
    }

    static createTextbox(parent)
    {
        var textbox = document.createElement("input");
        textbox.type = "text";
        textbox.style.fontSize = "24px";
        textbox.style.zIndex = 999;
        textbox.style.position = "relative";
        parent.appendChild(textbox);

        parent.appendChild(document.createElement("br"));

        DIPSwitch.textbox = textbox;
    }
}

DIPSwitch.setup();
