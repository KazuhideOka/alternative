class CsvLoader
{
    static load(owner, path, onLoad)
    {
        var req = new XMLHttpRequest();
        req.onload = function ()
        {
            var result = CsvLoader.parse(req.responseText);
            onLoad(owner, result);
        };
        req.open("get", path, true);
        req.send(null);
    }

    static parse(data)
    {
        var result = [];
        var lines = data.split("\n");
        var names = lines[0].split(",");
        for (var i = 0; i < names.length; i++)
        {
            names[i] = names[i].trim();
        }
        lines.shift();
        for (var line of lines)
        {
            if (line.length == 0)
            {
                continue;
            }
            var values = line.split(",");
            var obj = {};
            for (var i = 0; i < names.length; i++)
            {
                if (i < values.length)
                {
                    obj = CsvLoader.parseValue(obj, names[i], values[i]);
                }
                else
                {
                    obj[names[i]] = null;
                }
            }
            result.push(obj);
        }
        return result;
    }

    static parseValue(object, name, value)
    {
        if (value == null)
        {
            object[name] = null;
            return object;
        }

        value = value.trim();
        if (name.indexOf("[]") != -1)
        {
            name = name.replace("[]", "");
            value = value.split("/");
            for (var i = 0; i < value.length; i++)
            {
                value[i] = value[i].trim();
            }
        }

        object[name] = value;
        return object;
    }
}