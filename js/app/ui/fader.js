class Fader extends UIElement
{
    constructor()
    {
        super("fade");
        this.element = null;
        this.blackOut = true;
        this.speed = this.defaultSpeed;
        this.isFadeing = false;
        this.fadeInDelay = 0;
    }

    get defaultSpeed()
    {
        return 2.0;
    }

    get minimumSpeed()
    {
        return 0.1;
    }

    setup()
    {
        this.element = document.getElementById("fade");
    }

    update()
    {
        if (this.blackOut)
        {
            if (Number(this.element.style.opacity) < 1.0)
            {
                this.element.style.opacity = Number(this.element.style.opacity) + (this.speed * globalSystem.time.deltaTime);
                this.element.style.display = "inline";
                this.isFadeing = true;
            }
            else
            {
                if (this.isFadeing)
                {
                    this.element.style.opacity = 1.0;
                    this.isFadeing = false;
                    this.speed = this.defaultSpeed;
                }
            }
        }
        else if (this.fadeInDelay > 0)
        {
            // ロード中は待つ
            if (globalSystem.resource.isLoading)
            {
                return;
            }

            // フェードイン遅延
            this.fadeInDelay--;
        }
        else
        {
            if (Number(this.element.style.opacity) > 0.0)
            {
                this.element.style.opacity = Number(this.element.style.opacity) - (this.speed * globalSystem.time.deltaTime);
                this.isFadeing = true;
            }
            else
            {
                if (this.isFadeing)
                {
                    this.element.style.opacity = 0.0;
                    this.element.style.display = "none";
                    this.isFadeing = false;
                    this.speed = this.defaultSpeed;
                }
            }
        }
    }

    in(time = null)
    {
        if (time != null)
        {
            this.speed = 1.0 / Number(time);
        }
        if (this.speed < this.minimumSpeed)
        {
            this.speed = this.minimumSpeed;
        }
        this.blackOut = false;

        // 3フレームはフェードインさせず、裏で処理を走らせる
        this.fadeInDelay = 3;
    }

    out(time = null)
    {
        if (time != null)
        {
            this.speed = 1.0 / Number(time);
        }
        if (this.speed < this.minimumSpeed)
        {
            this.speed = this.minimumSpeed;
        }
        this.blackOut = true;
    }
}

new Fader();
