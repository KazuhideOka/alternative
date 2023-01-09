class Platform
{
    static get userAgent()
    {
        return navigator.userAgent;
    }

    static get isMobile()
    {
        var agent = Platform.userAgent;
        var match = agent.match(/iPhone|Android.+Mobile/);
        var result = (match != null);
        return result;
    }

    static get isMaster()
    {
        var index = this.userAgent.indexOf("Electron");
        var result = index != -1;
        return result;
    }
}