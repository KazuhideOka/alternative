class SoundManager extends GlobalManager
{
    constructor()
    {
        super("soundManager");
        this.enabled = false;
        this.soundElements = [];
        this.soundIDs = [];
        this.soundFadeIDs = [];
        this.currentBgmIndex = -1;
        this.bgmVolume = 1;
        this.seVolume = 1;
        this.bgmVolumeIndex = 3;
        this.seVolumeIndex = 3;
        this.currentBgmId = null;
    }

    static get bgmVolumeIndexMax()
    {
        return 5;
    }

    static get seVolumeIndexMax()
    {
        return 5;
    }

    setup()
    {
        var soundElement = document.getElementById("sound");
        if (soundElement == null)
        {
            return;
        }

        var count = globalSystem.soundData.getLength(0);
        for (var i = 0; i < count; i++)
        {
            var data = globalSystem.soundData.getDataByIndex(0, i);
            this.register(data, soundElement);
        }

        this.load();
    }

    update()
    {
        for (var element of this.soundElements)
        {
            element.update();
        }
    }

    load()
    {
        var elements = this.getElements();
        for (var audio of elements)
        {
            audio.load();
            audio.currentTime = 0;
        }
    }

    enable()
    {
        this.enabled = true;
        this.playCurrentBgm();
    }

    disable()
    {
        this.fadeOutCurrentBgm(this.currentBgmIndex);
        this.enabled = false;
    }

    switchBgmVolume()
    {
        var index = this.bgmVolumeIndex;
        index += 1;
        if (index > SoundManager.bgmVolumeIndexMax)
        {
            index = 0;
        }
        this.setBgmVolumeIndex(index);
    }

    switchSeVolume()
    {
        var index = this.seVolumeIndex;
        index += 1;
        if (index > SoundManager.seVolumeIndexMax)
        {
            index = 0;
        }
        this.setSeVolumeIndex(index);
    }

    setBgmVolume(volume)
    {
        this.bgmVolume = volume;
        for (var element of this.soundElements)
        {
            if (element.type != SoundElement.soundType.bgm)
            {
                continue;
            }
            element.volume = volume;
        }
    }

    setSeVolume(volume)
    {
        this.seVolume = volume;
        for (var element of this.soundElements)
        {
            if (element.type != SoundElement.soundType.se)
            {
                continue;
            }
            element.volume = volume;
        }
    }

    setBgmVolumeIndex(index)
    {
        this.bgmVolumeIndex = index;
        var volume = (1 / SoundManager.bgmVolumeIndexMax) * index;
        this.setBgmVolume(volume);
    }

    setSeVolumeIndex(index)
    {
        this.seVolumeIndex = index;
        var volume = (1 / SoundManager.seVolumeIndexMax) * index;
        this.setSeVolume(volume);
    }

    getIndex(id)
    {
        return this.soundIDs.indexOf(id);
    }

    playBgm(id)
    {
        var index = this.getIndex(id);
        if (index == -1)
        {
            return;
        }
        if (this.currentBgmIndex == index)
        {
            return;
        }
        if (this.currentBgmIndex != -1)
        {
            this.pauseBgm();
        }
        this.currentBgmIndex = index;
        this.currentBgmId = id;
        this.playCurrentBgm();
    }

    pauseBgm()
    {
        this.pauseCurrentBgm();
        this.currentBgmIndex = -1;
        this.currentBgmId = null;
    }

    playSe(id)
    {
        if (this.enabled == false)
        {
            return;
        }

        var index = this.getIndex(id);
        if (index == -1)
        {
            return;
        }

        this.soundElements[index].element.onended = (event) =>
        {
            event.target.pause();
            event.target.currentTime = 0;
        };
        if (this.soundElements[index].currentTime != 0)
        {
            this.soundElements[index].currentTime = 0;
        }
        this.soundElements[index].play();
    }

    pauseSe(ingameOnly = true)
    {
        var target = "app";
        if (ingameOnly)
        {
            target = "ingame";
        }

        for (var element of this.soundElements)
        {
            var pause = Element.isClass(element.element, target);
            if (pause)
            {
                element.pause();
            }
        }
    }

    playCurrentBgm()
    {
        if (this.currentBgmIndex == -1)
        {
            return;
        }
        this.fadeInCurrentBgm(this.currentBgmIndex);
    }

    pauseCurrentBgm()
    {
        if (this.currentBgmIndex == -1)
        {
            return;
        }
        this.fadeOutCurrentBgm(this.currentBgmIndex);
        this.currentBgmIndex = -1;
    }

    fadeInCurrentBgm(bgmIndex)
    {
        var index = bgmIndex;
        var volume = 0;
        var enabled = this.enabled;

        if (enabled && index != -1)
        {
            this.soundElements[index].currentTime = 0;
            this.soundElements[index].volume = 0;
            this.soundElements[index].play();
        }

        if (Platform.isMobile)
        {
            this.soundElements[index].volume = this.bgmVolume;
        }
        else
        {
            var oldEvent = this.soundFadeIDs[index];
            if (oldEvent != -1)
            {
                var oldEvent = this.soundFadeIDs[index];
                clearInterval(oldEvent);
            }

            let id = setInterval(() =>
            {
                volume += (this.bgmVolume * globalSystem.time.deltaTime);

                if (volume >= this.bgmVolume)
                {
                    volume = this.bgmVolume;
                    clearInterval(id);
                    this.soundFadeIDs[index] = -1;
                }

                if (enabled && index != -1)
                {
                    this.soundElements[index].volume = volume;
                }
            }, 33);
            this.soundFadeIDs[index] = id;
        }
    }

    fadeOutCurrentBgm(bgmIndex)
    {
        var index = bgmIndex;
        var volume = this.bgmVolume;
        var enabled = this.enabled;

        if (Platform.isMobile)
        {
            this.soundElements[index].pause();
        }
        else
        {
            var oldEvent = this.soundFadeIDs[index];
            if (oldEvent != -1)
            {
                var oldEvent = this.soundFadeIDs[index];
                clearInterval(oldEvent);
            }

            let id = setInterval(() =>
            {
                volume -= (this.bgmVolume * globalSystem.time.deltaTime);

                if (volume <= 0)
                {
                    if (enabled && index != -1)
                    {
                        this.soundElements[index].pause();
                    }
                    clearInterval(id);
                    this.soundFadeIDs[index] = -1;
                    volume = 0;
                    index = -1;
                }

                if (enabled && index != -1)
                {
                    this.soundElements[index].volume = volume;
                }
            }, 33);
            this.soundFadeIDs[index] = id;
        }
    }

    register(data, element)
    {
        var element = this.createSoundElement(data, element);
        this.soundElements.push(element);
        this.soundIDs.push(element.id);
        this.soundFadeIDs.push(-1);
    }

    createSoundElement(data, element)
    {
        var sound = new SoundElement(data);
        sound.createElement(element);
        return sound;
    }

    isRegistered(audio)
    {
        return this.soundElements.indexOf(audio) >= 0;
    }

    getElements()
    {
        return this.soundElements;
    }
}

new SoundManager();
