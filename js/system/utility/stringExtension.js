class StringExtension
{
    static get empty()
    {
        return "";
    }

    static isNullOrEmpty(source)
    {
        if (source == null)
        {
            return true;
        }
        if (source == "")
        {
            return true;
        }
        if (source == "-")
        {
            return true;
        }
        return false;
    }

    static isValid(source)
    {
        var result = !StringExtension.isNullOrEmpty(source);
        return result;
    }

    static clamp(source, count)
    {
        if (source.length <= count)
        {
            return source;
        }
        var result = source.substr(0, count - 1) + Terminology.get("omit_symbol");
        return result;
    }

    static toNumber(source)
    {
        var found = source.replace(/[^0-9]/g, '');
        var result = Number(found);
        return result;
    }

    static toNumbers(source)
    {
        var founds = source.match(/\d+/g);
        var result = [];
        for (var found of founds)
        {
            var number = Number(found);
            result.push(number);
        }
        return result;
    }
}
