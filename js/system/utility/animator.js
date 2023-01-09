class Animator
{
    constructor()
    {
        this.requests = [];
    }

    get isAnimation()
    {
        var result = (this.requests.length > 0);
        return result;
    }

    update()
    {
        for (var i = this.requests.length - 1; i >= 0; i--)
        {
            var data = this.requests[i];
            if (data == null)
            {
                continue;
            }

            var start = data.keys[0];
            var end = data.keys[1];
            data.time += globalSystem.time.deltaTime;
            if (data.time >= data.duration)
            {
                Animator.animateStyle(data.element, start, end, 1, data.unit, data.easing);
                data.finished = true;
                if (data.onEnd != null)
                {
                    data.onEnd(true);
                }
                this.requests = List.remove(this.requests, data);
            }
            else
            {
                var ratio = data.time / data.duration;
                Animator.animateStyle(data.element, start, end, ratio, data.unit, data.easing);
            }
        }
    }

    cancel(data, executeOnEnd = false)
    {
        if (data == null)
        {
            return;
        }

        if (executeOnEnd && data.onEnd != null)
        {
            data.onEnd(false);
        }
        this.requests = List.remove(this.requests, data);
    }

    transform(element, pos0, pos1, rotate0, rotate1, scale0, scale1, time, easing = "linear", onAnimationEnd = null)
    {
        var anim = this.animate(element,
            [
                { transform: [parseFloat(pos0.x), parseFloat(pos0.y), parseFloat(rotate0), parseFloat(scale0.x), parseFloat(scale0.y)] },
                { transform: [parseFloat(pos1.x), parseFloat(pos1.y), parseFloat(rotate1), parseFloat(scale1.x), parseFloat(scale1.y)] },
            ], "translate({0}%, {1}%) rotate({2}deg) scale({3}, {4})", time, easing, onAnimationEnd);

        return anim;
    }

    opacity(element, opacity0, opacity1, time, easing = "linear", onAnimationEnd = null)
    {
        var anim = this.animate(element,
            [
                { opacity: opacity0 },
                { opacity: opacity1 },
            ], "{0}", time, easing, onAnimationEnd);

        return anim;
    }

    blur(element, blur0, blur1, time, easing = "linear", onAnimationEnd = null)
    {
        var anim = this.animate(element,
            [
                { filter: blur0 },
                { filter: blur1 },
            ], "blur({0}px)", time, easing, onAnimationEnd);

        return anim;
    }

    animate(element, keys, unit, duration, easing, onEnd = null)
    {
        duration = parseFloat(duration);
        if (duration > 0)
        {
            Animator.animateStyle(element, keys[0], keys[1], 0, unit, easing);
        }
        else
        {
            Animator.animateStyle(element, keys[0], keys[1], 1, unit, easing);
        }

        var data = {};
        data.element = element;
        data.keys = keys;
        data.unit = unit;
        data.duration = duration;
        data.easing = easing;
        data.onEnd = onEnd;
        data.finished = false;

        data.time = 0;

        this.requests.push(data);
        return data;
    }

    static animateStyle(element, start, end, ratio, unit, easing)
    {
        for (var key of Object.keys(start))
        {
            var startValue = start[key];
            var endValue = end[key];
            if (startValue.length == null)
            {
                var value = Animator.ease(easing, startValue, endValue, ratio);
                element.style[key] = unit.replace("{0}", value);
            }
            else
            {
                var currentValue = unit;
                for (var i = 0; i < startValue.length; i++)
                {
                    var value = Animator.ease(easing, startValue[i], endValue[i], ratio);
                    currentValue = currentValue.replace(`{${i}}`, value);
                }
                element.style[key] = currentValue;
            }
        }
    }

    static ease(type, start, end, ratio)
    {
        if (ratio >= 1)
        {
            return end;
        }

        var change = end - start;
        var easeRatio = Curve.ease(type, ratio);

        var add = change * easeRatio;
        var result = start + add;
        return result;
    }
}