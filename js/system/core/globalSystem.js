class GlobalSystem
{
    constructor()
    {
        this.setupManagersComplete = false;
        this.managers = [];
        this.holders = [];
    }

    setup()
    {
    }

    update()
    {
        if (this.isLoadingHolders())
        {
            return;
        }
        if (this.isWaitManagers())
        {
            return;
        }

        this.setupManagers();
        this.updateManagers();
    }

    isLoadingHolders()
    {
        for (var holder of this.holders)
        {
            if (holder.isComplete == false)
            {
                if (holder.isLoading)
                {
                    return true;
                }
                else
                {
                    holder.setup();
                    holder.load();
                    return true;
                }
            }
        }
        return false;
    }

    isWaitManagers()
    {
        for (var manager of this.managers)
        {
            if (manager.isReady == false)
            {
                return true;
            }
        }
        return false;
    }

    setupManagers()
    {
        if (this.setupManagersComplete)
        {
            return;
        }

        for (var manager of this.managers)
        {
            manager.setup();
        }

        this.setupManagersComplete = true;
    }

    updateManagers()
    {
        for (var manager of this.managers)
        {
            manager.update();
        }
    }

    resetManagers()
    {
        for (var manager of this.managers)
        {
            manager.reset();
        }
    }

    registerManager(name, instance)
    {
        this[name] = instance;
        this.managers.push(instance);
    }

    registerHolder(name, instance)
    {
        this[name] = instance;
        this.holders.push(instance);
    }
}

var globalSystem = new GlobalSystem();
