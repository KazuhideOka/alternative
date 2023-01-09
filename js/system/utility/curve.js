class Curve
{
    static ease(type, x)
    {
        var result = 0;
        if (type == "linear")
        {
            result = x;
        }
        else if (type == "ease-in")
        {
            //result = Math.pow(2, 10 * (x - 1));
            //result = x * x;
            result = 1 - Math.cos((x * Math.PI) / 2);
        }
        else if (type == "ease-out")
        {
            //result = -1 * Math.pow(2, -10 * x) + 1;
            //result = 1 - (1 - x) * (1 - x);
            result = Math.sin((x * Math.PI) / 2);
        }
        else if (type == "ease-in-out")
        {
            if (x < 0.5)
            {
                result = 2 * x * x;
            }
            else
            {
                result = 1 - Math.pow(-2 * x + 2, 2) / 2;
            }
        }
        else if (type == "out-elastic")
        {
            const c4 = (2 * Math.PI) / 3;
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        }
        else
        {
            result = x;
        }

        return result;
    }
}