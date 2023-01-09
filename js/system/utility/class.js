class Class
{
    static getInstance(classname)
    {
        try
        {
            let c = Function('return (' + classname + ')')();
            var instance = new c();
            return instance;
        }
        catch (e)
        {
            console.error(`can not create instance : ${classname} \n ${e}`);
        }

        return null;
    }

    static getInstance(classname, arg)
    {
        try
        {
            let c = Function('return (' + classname + ')')();
            if (c)
            {
                var instance = new c(arg);
                return instance;
            }
            else
            {
                return null;
            }
        }
        catch (e)
        {
            console.error(`can not create instance : ${classname} \n ${e}`);
        }

        return null;
    }
}