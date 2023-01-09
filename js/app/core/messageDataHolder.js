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
