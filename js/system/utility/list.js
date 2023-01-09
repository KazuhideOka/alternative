class List
{
    static remove(list, item, removeAll = false)
    {
        for (var i = 0; i < list.length; i++)
        {
            if (list[i] === item)
            {
                list[i] = null;

                if (removeAll == false)
                {
                    break;
                }
            }
        }
        list = list.filter(n => n !== null);
        return list;
    }

    static reverse(list)
    {
        var result = [];
        for (var i = list.length - 1; i >= 0; i--)
        {
            result.push(list[i]);
        }
        return result;
    }

    static duplicate(list)
    {
        var result = [];
        for (var item of list)
        {
            result.push(item);
        }
        return result;
    }

    static contains(listA, listB, invalidResult = false)
    {
        var invalid = invalidResult;
        for (var dataA of listA)
        {
            if (StringExtension.isNullOrEmpty(dataA))
            {
                continue;
            }

            for (var dataB of listB)
            {
                if (StringExtension.isNullOrEmpty(dataA))
                {
                    continue;
                }

                invalid = false;

                if (dataA == dataB)
                {
                    return true;
                }
            }
        }
        var result = invalid;
        return result;
    }
}
