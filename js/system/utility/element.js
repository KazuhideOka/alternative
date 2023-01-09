class Element
{
    static isClass(element, className)
    {
        var e = Element.getClassElement(element, className);
        var result = (e != null);
        return result;
    }

    static getClassElement(element, className)
    {
        var count = 10;
        for (var i = 0; i < count; i++)
        {
            if (element == null)
            {
                break;
            }
            if (element == this.element)
            {
                break;
            }
            if (element.classList == null)
            {
                element = element.parentElement;
                continue;
            }
            for (var c of element.classList)
            {
                if (c == null)
                {
                    continue;
                }
                if (c == className)
                {
                    return element;
                }
            }
            element = element.parentElement;
        }

        return null;
    }

    static getRect(element)
    {
        var rect = element.getBoundingClientRect();
        var x = rect.x + window.pageXOffset;
        var y = rect.y + window.pageYOffset;
        var width = rect.width;
        var height = rect.height;
        var result = { x: x, y: y, width: width, height: height };
        return result;
    }

    static getTransformValues(element)
    {
        var transform = element.style.transform;
        if (transform == null)
        {
            return null;
        }
        var numberStr = transform.replace(/[^0-9-,).]/g, '');
        var numberStrList = numberStr.split(",");
        var result = [];
        for (var str of numberStrList)
        {
            var list = str.split(")");
            for (var value of list)
            {
                if (StringExtension.isNullOrEmpty(value))
                {
                    continue;
                }
                var valueFloat = parseFloat(value);
                result.push(valueFloat);
            }
        }
        if (result.length != 5)
        {
            return null;
        }

        return result;
    }

    static getTranslate(element)
    {
        var values = Element.getTransformValues(element);
        if (values == null)
        {
            return { x: 0, y: 0 };
        }
        var result = { x: values[0], y: values[1] };
        return result;
    }

    static getRotate(element)
    {
        var values = Element.getTransformValues(element);
        if (values == null)
        {
            return 0;
        }
        var result = values[2];
        return result;
    }

    static getScale(element)
    {
        var values = Element.getTransformValues(element);
        if (values == null)
        {
            return { x: 1, y: 1 };
        }
        var result = { x: values[3], y: values[4] };
        return result;
    }
}