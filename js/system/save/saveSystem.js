class SaveSystem
{
    static get key()
    {
        return "app-save";
    }

    static save()
    {
        var saveData = {};
        for (var manager of globalSystem.managers)
        {
            var data = manager.save();
            if (data == null)
            {
                continue;
            }
            var name = manager.name;
            saveData[name] = data;
        }

        var str = JSON.stringify(saveData);
        localStorage.setItem(SaveSystem.key, str);
    }

    static load()
    {
        var str = localStorage.getItem(SaveSystem.key);
        if (str == null)
        {
            return;
        }

        var saveData = JSON.parse(str);
        for (var key of Object.keys(saveData))
        {
            var manager = globalSystem[key];
            if (manager == null)
            {
                continue;
            }
            var data = saveData[key];
            manager.load(data);
        }
    }
}
