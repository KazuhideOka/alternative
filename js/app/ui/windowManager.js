class WindowManager extends UIElement
{
    constructor()
    {
        super("window");
        this.element = null;
        this.rootSelecter = null;
        this.aspectRatio = 3.0 / 4.0;
        this.left = 0;
        this.top = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.touchTimer = 0;
        this.touchStartPosition = null;
        this.isTouching = false;
        this.isScrolling = false;
        this.isFullscreen = false;
        this.currentSizeIndex = 0;
        this.width = 960;
        this.height = 1280;
    }

    static get size()
    {
        var types =
            [
                { w: 960, h: 1280 },
                { w: 960, h: 1280 },
                { w: 960, h: 1280 },
                { w: 960, h: 1280 },
                { w: 960, h: 1280 },
            ];
        return types;
    }

    static get sizeType()
    {
        var result = [];
        for (var size of WindowManager.size)
        {
            var text = `${size.w}x${size.h}`;
            result.push(text);
        }
        return result;
    }

    static get sizeCount()
    {
        var result = WindowManager.size.length;
        return result;
    }

    setup()
    {
        this.element = document.getElementById("wrapper");
        this.rootSelecter = document.querySelector(':root');
        document.body.addEventListener("touchstart", this.createTouchEvent(), { passive: false });
        document.body.addEventListener("touchmove", this.createTouchMoveEvent(), { passive: false });
        document.body.addEventListener("touchend", this.createTouchEndEvent(), { passive: false });

        document.body.addEventListener("click", this.playButtonSe, false);
        document.body.addEventListener("contextmenu", this.playButtonSe, false);

        var loading = document.getElementById("loading");
        loading.style.display = "none";
    }

    update()
    {
        var ratio = window.innerWidth / window.innerHeight;
        if (ratio < this.aspectRatio)
        {
            // 幅を合わせる
            this.updateSize(window.innerWidth, window.innerWidth * (1 / this.aspectRatio));
        }
        else
        {
            // 高さを合わせる
            this.updateSize(window.innerHeight * this.aspectRatio, window.innerHeight);
        }

        // タッチタイマー更新
        this.touchTimer += globalSystem.time.deltaTime;
    }

    updateSize(w, h)
    {
        w = parseInt(w);
        h = parseInt(h);

        if (this.windowWidth == w && this.windowHeight == h)
        {
            return;
        }

        var scale = w / this.width;
        var left = parseInt(window.innerWidth - w) / 2;
        var top = parseInt(window.innerHeight - h) / 2;

        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.transform = `scale(${scale})`;
        this.element.style.transformOrigin = "top left";
        this.element.style.fontSize = `${parseInt(this.width / 50.0)}px`;

        // 0.5倍する都合で、ratioの倍数でなければならない
        this.element.style.marginLeft = `${(left)}px`;
        this.element.style.marginTop = `${(top)}px`;

        this.rootSelecter.style.setProperty('--dynamic-wrapper-width', `${w}px`);
        this.rootSelecter.style.setProperty('--dynamic-wrapper-height', `${h}px`);

        this.left = left;
        this.top = top;
        this.windowWidth = w;
        this.windowHeight = h;
    }

    switchFullscreen()
    {
        this.setFullscreen(!this.isFullscreen);
    }

    setFullscreen(fullscreen)
    {
        if (this.isFullscreen == fullscreen)
        {
            return;
        }

        this.isFullscreen = fullscreen;
        if (fullscreen)
        {
            Window.requestFullscreen();
        }
        else
        {
            Window.exitFullscreen();
        }
    }

    getCurrentSizeType()
    {
        var result = WindowManager.sizeType[this.currentSizeIndex];
        return result;
    }

    switchWindowSize()
    {
        var index = this.currentSizeIndex + 1;
        if (index >= WindowManager.sizeCount)
        {
            index = 0;
        }

        this.setWindowSize(index);
    }

    setWindowSize(index)
    {
        if (index >= WindowManager.sizeCount)
        {
            return;
        }

        if (this.currentSizeIndex == index)
        {
            return;
        }

        // 枠のサイズを取得
        var frameWidth = window.outerWidth - window.innerWidth;
        var frameHeight = window.outerHeight - window.innerHeight;

        // サイズ指定
        var size = WindowManager.size[index];
        window.resizeTo(size.w + frameWidth, size.h + frameHeight);

        this.currentSizeIndex = index;
    }

    getWidthPercentage(x)
    {
        var contentX = x - this.left;
        var result = (contentX / this.windowWidth) * 100;
        return result;
    }

    getHeightPercentage(y)
    {
        var contentY = y - this.top;
        var result = (contentY / this.windowHeight) * 100;
        return result;
    }

    createTouchEvent()
    {
        return function (window)
        {
            return function (e)
            {
                window.isTouching = true;

                var x = parseInt(e.touches[0].clientX);
                var y = parseInt(e.touches[0].clientY);
                window.touchStartPosition = { x: x, y: y };

                if (Element.isClass(e.target, "scrollable"))
                {
                    window.isScrolling = true;
                }

                if (e.touches.length > 1)
                {
                    e.preventDefault();
                    return;
                }

                /*
                if (window.touchTimer < 0.5)
                {
                    e.preventDefault();
                    return;
                }
                */

                window.touchTimer = 0;
            };
        }(this);
    }

    createTouchMoveEvent()
    {
        return function (window)
        {
            return function (e)
            {
                if (e.touches.length > 1)
                {
                    e.preventDefault();
                }

                if (e.target == null)
                {
                    e.preventDefault();
                }

                var x = parseInt(e.touches[0].clientX);
                var y = parseInt(e.touches[0].clientY);
                var dir = { x: x - window.touchStartPosition.x, y: y - window.touchStartPosition.y };
                if (window.isScrollable(e.target, dir) == false)
                {
                    e.preventDefault();
                }
            };
        }(this);
    }

    createTouchEndEvent()
    {
        return function (window)
        {
            return function (e)
            {
                window.isTouching = false;
                window.isScrolling = false;
                window.touchStartPosition = null;
            };
        }(this);
    }

    isScrollable(element, moveDirection)
    {
        var scrollable = Element.getClassElement(element, "scrollable");
        if (scrollable == null)
        {
            return false;
        }

        if (scrollable.scrollHeight <= scrollable.clientHeight)
        {
            return false;
        }

        if (moveDirection.y > 0)
        {
            var top = parseInt(scrollable.scrollTop);
            if (top <= 1)
            {
                return false;
            }
        }
        else
        {
            var bottom = parseInt(scrollable.scrollHeight) - (parseInt(scrollable.clientHeight) + parseInt(scrollable.scrollTop));
            if (bottom <= 1)
            {
                return false;
            }
        }

        return true;
    }

    playButtonSe(event)
    {
        var element = event.target;
        var count = 10;
        for (var i = 0; i < count; i++)
        {
            if (element == null)
            {
                break;
            }

            // ウィンドウそのものなら何もしない
            if (element == this.element)
            {
                break;
            }
            // ボタンじゃないなら何もしない
            if (element.tagName != "BUTTON")
            {
                element = element.parentElement;
                continue;
            }
            // classが空なら何もしない
            if (element.classList == null)
            {
                element = element.parentElement;
                continue;
            }
            else
            {
                for (var c of element.classList)
                {
                    if (c == null)
                    {
                        continue;
                    }
                    if (c == "any")
                    {
                        // ここでclassごとのSEを呼ぶ？
                        return;
                    }
                }

                // 汎用SE再生
                globalSystem.soundManager.playSe("button00");
                return;
            }
        }
    }
}

new WindowManager();
