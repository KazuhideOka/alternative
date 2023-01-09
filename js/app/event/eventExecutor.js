class EventExecutor
{
    constructor()
    {
        this.current = null;
        this.prev = null;

        this.result = false;
    }

    get isBusy()
    {
        var result = (this.current != null);
        return result;
    }

    update()
    {
        if (this.isBusy == false)
        {
            var next = globalSystem.eventData.getRandomByWhere((data) =>
            {
                if (this.prev != null)
                {
                    if (data.id == this.prev.id)
                    {
                        return false;
                    }
                }
                var random = Random.range(100) / 100.0;
                if (random > Number(data.ratio))
                {
                    return false;
                }
                return true;
            });
            this.execute(next);
        }
    }

    execute(data)
    {
        this.current = data;

        var survivor = globalSystem.survivorManager.getSurvivor();
        globalSystem.uiManager.quest.setText(data.text);
        globalSystem.uiManager.quest.setParam(survivor.params);
        globalSystem.uiManager.quest.setButton(0, data.selection0, () => { this.select(data, 0, survivor); });
        globalSystem.uiManager.quest.setButton(1, data.selection1, () => { this.select(data, 1, survivor); });

        globalSystem.uiManager.quest.fadeInText(1.0);
    }

    select(data, index, survivor)
    {
        if (globalSystem.uiManager.quest.isAnimation)
        {
            return;
        }

        survivor.addParams(data[`param${index}`]);

        this.prev = this.current;
        this.current = null;

        this.effect(data[`effect${index}`], data[`effectArgs${index}`]);

        var result = this.check(survivor);
        if (result)
        {
            this.result = true;
        }
    }

    effect(type, args)
    {
        switch (type)
        {
            case "insertNext":
                {
                    var next = globalSystem.eventData.getDataById(args[0]);
                    if (next != null)
                    {
                        this.execute(next);
                    }
                }
                break;
            case "returnToTitle":
                {
                    location.reload();
                }
                break;
            default:
                break;
        }
    }

    check(survivor)
    {
        if (this.result)
        {
            return false;
        }

        if (survivor.params[0] > 100)
        {
            var next = globalSystem.eventData.getDataById("gameOver00");
            if (next != null)
            {
                this.execute(next);
            }
            return true;
        }
        if (survivor.params[0] <= 0)
        {
            var next = globalSystem.eventData.getDataById("clear00");
            if (next != null)
            {
                this.execute(next);
            }
            return true;
        }

        for (var i = 1; i < 5; i++)
        {
            if (survivor.params[i] <= 0)
            {
                var next = globalSystem.eventData.getDataById(`gameOver0${i}`);
                if (next != null)
                {
                    this.execute(next);
                }
                return true;
            }
        }

        return false;
    }
}