class Random
{
    static range(n)
    {
        var number = parseInt(n);
        return Math.floor(Math.random() * number);
    }

    static shuffle(array)
    {
        for (var i = array.length - 1; i > 0; i--)
        {
            var r = Math.floor(Math.random() * (i + 1));
            var tmp = array[i];
            array[i] = array[r];
            array[r] = tmp;
        }
        return array;
    }
}