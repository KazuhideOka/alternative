class DataHolder
{
    constructor(name)
    {
        this.name = name;
        this.paths = [];
        this.list = [];
        this.dicts = [];
        this.loadFlags = [];
        this.isCompleted = false;

        globalSystem.registerHolder(name, this);
    }

    get isLoading()
    {
        for (var flag of this.loadFlags)
        {
            if (flag)
            {
                return true;
            }
        }
        return false;
    }

    get isComplete()
    {
        if (this.loadFlags.length == 0)
        {
            return false;
        }

        for (var flag of this.loadFlags)
        {
            if (flag)
            {
                return false;
            }
        }

        if (this.isCompleted == false)
        {
            this.isCompleted = true;
            this.setupList();
            this.setupDict();
            this.onLoad();
        }

        return true;
    }

    get isGetShallowCopy()
    {
        return false;
    }

    setupPath(paths)
    {
        this.paths = paths;

        for (var i = 0; i < this.paths.length; i++)
        {
            for (var j = i + 1; j < this.paths.length; j++)
            {
                if (this.paths[i] == this.paths[j])
                {
                    this.paths[i] = null;
                    break;
                }
            }
        }
        this.paths = this.paths.filter(n => n !== null);
    }

    load()
    {
        for (var i = 0; i < this.paths.length; i++)
        {
            var index = i;
            this.loadFlags[index] = true;

            CsvLoader.load(this, this.paths[index], (function (index)
            {
                return function (owner, result)
                {
                    if (result != null)
                    {
                        owner.list[index] = result;
                    }
                    owner.loadFlags[index] = false;
                };
            })(i));
        }
    }

    getLength(index)
    {
        return this.list[index].length;
    }

    setup()
    {
    }

    onLoad()
    {
    }

    onShallowCopied(data)
    {
        return data;
    }

    setupList()
    {
        for (var data of this.list)
        {
            for (var i = data.length - 1; i >= 0; i--)
            {
                var item = data[i];
                if (item.id == null)
                {
                    continue;
                }
                if (StringExtension.isNullOrEmpty(item.id) == false)
                {
                    continue;
                }
                data.splice(i, 1);
            }
        }
    }

    setupDict()
    {
        this.dicts = this.createDicts("id");
    }

    createDicts(key)
    {
        var dicts = [];
        for (var data of this.list)
        {
            var dict = {};
            for (var item of data)
            {
                if (item[key] == null)
                {
                    continue;
                }
                if (dict[item[key]] == null)
                {
                    dict[item[key]] = [];
                }
                dict[item[key]].push(item);
            }
            dicts.push(dict);
        }

        return dicts;
    }

    concatData(concatKey)
    {
        for (var i = 1; i < this.list.length; i++)
        {
            for (var additional of this.list[i])
            {
                // 同じkeyのデータに追加
                var added = false;
                for (var data of this.list[0])
                {
                    if (data[concatKey] != additional[concatKey])
                    {
                        continue;
                    }
                    for (var key of Object.keys(additional))
                    {
                        data[key] = additional[key];
                    }
                    added = true;
                    break;
                }

                // 同じkeyのデータがなければ、末尾に追加
                if (added == false)
                {
                    this.list[0].push(additional);
                }
            }
        }
    }

    getDataByIndex(dataIndex, index)
    {
        return this.list[dataIndex][index];
    }

    getDataById(id, dataIndexs = null)
    {
        var items = this.getListById(id, dataIndexs);
        if (items.length == 0)
        {
            return null;
        }

        return items[0];
    }

    getListById(id, dataIndexs = null)
    {
        if (dataIndexs == null)
        {
            dataIndexs = [];
            for (var i = 0; i < this.dicts.length; i++)
            {
                dataIndexs.push(i);
            }
        }

        var result = [];
        for (var index of dataIndexs)
        {
            var dict = this.dicts[index];
            if (dict[id] != null)
            {
                for (var item of dict[id])
                {
                    var target = item;
                    if (this.isGetShallowCopy)
                    {
                        target = {};
                        target = Object.assign(target, item);
                        target = this.onShallowCopied(target);
                    }
                    result.push(target);
                }
            }
        }
        return result;
    }

    getDataByWhere(where, dataIndexs = null)
    {
        var items = this.getListByWhere(where, dataIndexs);
        if (items.length == 0)
        {
            return null;
        }

        return items[0];
    }

    getListByWhere(where, dataIndexs = null)
    {
        if (dataIndexs == null)
        {
            dataIndexs = [];
            for (var i = 0; i < this.list.length; i++)
            {
                dataIndexs.push(i);
            }
        }

        var result = [];
        for (var index of dataIndexs)
        {
            var data = this.list[index];
            for (var item of data)
            {
                if (where(item) == false)
                {
                    continue;
                }

                var target = item;
                if (this.isGetShallowCopy)
                {
                    target = {};
                    target = Object.assign(target, item);
                    target = this.onShallowCopied(target);
                }
                result.push(target);
            }
        }
        return result;
    }

    getRandomByWhere(where, dataIndexs = null)
    {
        var list = this.getListByWhere(where, dataIndexs);
        if (list.length == 0)
        {
            return null;
        }

        var index = Random.range(list.length);
        var result = list[index];
        return result;
    }

    getDataByKey(key, value, dataIndexs = null)
    {
        var result = this.getDataByWhere((item) => { return item[key] == value; }, dataIndexs);
        return result;
    }

    getListByKey(key, value, dataIndexs = null)
    {
        var result = this.getListByWhere((item) => { return item[key] == value; }, dataIndexs);
        return result;
    }
}
