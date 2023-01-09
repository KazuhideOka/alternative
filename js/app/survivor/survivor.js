class Survivor
{
    constructor(data)
    {
        this.data = null;
        this.params = [];

        if (data != null)
        {
            this.data = data;
            for (var i = 0; i < this.data.params.length; i++)
            {
                var param = Number(this.data.params[i]);
                this.params.push(param);
            }
        }
    }

    addParams(params)
    {
        for (var i = 0; i < params.length; i++)
        {
            this.params[i] += Number(params[i]);

            if (i != 0)
            {
                var max = Number(this.data.params[i]);
                if (this.params[i] > max)
                {
                    this.params[i] = max;
                }
            }
            if (this.params[i] < 0)
            {
                this.params[i] = 0;
            }
        }
    }
}