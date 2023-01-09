class SoundElement
{
    constructor(data)
    {
        this.data = data;
        this.elements = [];
        this.currentIndex = 0;
        this.playing = false;
        this.masterVolume = 1;
        this.volumeScales = [];
        this.volumeScaleSpeeds = [];
    }

    static get soundType()
    {
        var types =
        {
            bgm: "bgm",
            se: "se"
        };
        return types;
    }

    get element()
    {
        return this.elements[this.currentIndex];
    }

    get id()
    {
        return this.data.id;
    }

    get duration()
    {
        return this.element.duration;
    }

    get currentTime()
    {
        return this.element.currentTime;
    }
    set currentTime(value)
    {
        this.element.currentTime = value;
    }

    get volume()
    {
        return this.masterVolume;
    }
    set volume(value)
    {
        this.masterVolume = value;
    }

    get type()
    {
        return this.data.type;
    }

    load()
    {
        this.element.load();
    }

    update()
    {
        if (this.playing == false)
        {
            return;
        }

        this.updateVolumeScale();
        this.updateVolume();
        this.updateLoop();

        if (this.playing && this.element.paused)
        {
            this.playing = false;
        }
    }

    play()
    {
        this.updateVolume();
        this.element.play();
        this.playing = true;
    }

    pause()
    {
        this.element.pause();
        this.playing = false;
    }

    nextIndex()
    {
        this.currentIndex++;
        if (this.currentIndex >= this.elements.length)
        {
            this.currentIndex = 0;
        }
    }

    updateVolume()
    {
        for (var i = 0; i < this.elements.length; i++)
        {
            var prevVolume = this.elements[i].volume;
            var currentVolume = this.masterVolume * this.volumeScales[i] * Number(this.data.volume);
            if (prevVolume != currentVolume)
            {
                this.elements[i].volume = currentVolume;
            }
        }
    }

    updateVolumeScale()
    {
        for (var i = 0; i < this.elements.length; i++)
        {
            var speed = this.volumeScaleSpeeds[i];
            this.volumeScales[i] += speed * globalSystem.time.deltaTime;
            if (speed > 0 && this.volumeScales[i] > 1)
            {
                this.volumeScales[i] = 1;
                this.volumeScaleSpeeds[i] = 0;
            }
            else if (speed < 0 && this.volumeScales[i] < 0)
            {
                this.volumeScales[i] = 0;
                this.volumeScaleSpeeds[i] = 0;
                this.elements[i].pause();
            }
        }
    }

    updateLoop()
    {
        var loopFadeTime = Number(this.data.loopFadeTime);
        if (loopFadeTime == -1)
        {
            return;
        }

        var isOver = this.currentTime >= this.duration - loopFadeTime;
        var isOverPaused = this.element.paused && this.playing;
        if (isOver || isOverPaused)
        {
            if (loopFadeTime == 0)
            {
                this.nextIndex();
                this.currentTime = 0;
                this.element.play();
            }
            else
            {
                this.fadeOut(this.currentIndex, loopFadeTime);
                this.nextIndex();
                this.fadeIn(this.currentIndex, loopFadeTime);
            }
        }
    }

    createElement(parent)
    {
        var audio = this.createAudio(parent);
        this.elements.push(audio);
        this.volumeScales.push(1);
        this.volumeScaleSpeeds.push(0);

        if (this.data.type == SoundElement.soundType.bgm)
        {
            var audio = this.createAudio(parent);
            this.elements.push(audio);
            this.volumeScales.push(1);
            this.volumeScaleSpeeds.push(0);
        }
    }

    createAudio(parent)
    {
        var audio = document.createElement("audio");
        audio.id = this.data.id;
        audio.className = this.data.class;
        audio.type = this.data.fileType;
        audio.src = this.data.src;
        parent.appendChild(audio);

        return audio;
    }

    fadeIn(index, time)
    {
        if (time <= 0)
        {
            return;
        }

        this.elements[index].currentTime = 0;
        this.elements[index].volume = 0;
        this.elements[index].play();

        this.volumeScales[index] = 0;
        this.volumeScaleSpeeds[index] = 1 / time;
    }

    fadeOut(index, time)
    {
        if (time <= 0)
        {
            return;
        }

        this.volumeScaleSpeeds[index] = -1 / time;
    }
}
