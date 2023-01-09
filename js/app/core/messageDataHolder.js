class MessageDataHolder extends DataHolder
{
    constructor()
    {
        super("messageData");
    }

    setup()
    {
        this.setupPath(
            [
                "resources/data/message/messageData.csv",
            ]);
    }

    onLoad()
    {
        var keys = Object.keys(this.dicts[0]);
        for (var id of keys)
        {
            var element = document.getElementById(id);
            if (element == null)
            {
                continue;
            }
            var list = this.dicts[0][id];
            if (list.length == 0)
            {
                continue;
            }
            element.innerHTML = list[0].text;
        }
    }
}

new MessageDataHolder();

class Message
{
    static get(id)
    {
        var data = globalSystem.messageData.getDataById(id);
        if (data == null)
        {
            return null;
        }
        var result = data.text;
        return result;
    }
}
