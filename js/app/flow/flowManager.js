class FlowManager extends GlobalManager
{
    constructor()
    {
        super("flowManager");
        this.currentFlow = null;
        this.nextFlow = null;
        this.waitTimer = 0;
    }

    update()
    {
        // フェード中
        if (this.updateFade())
        {
            return;
        }

        // ロード中は待つ
        if (globalSystem.resource.isLoading)
        {
            return;
        }

        // フロー終了処理
        if (this.exit())
        {
            return;
        }

        // 次のフローに移る処理
        if (this.next())
        {
            return;
        }

        if (this.currentFlow != null)
        {
            this.currentFlow.update();
        }
    }

    setFlow(flow, waitTime = 1)
    {
        this.nextFlow = flow;
        this.waitTimer = waitTime;
    }

    exit()
    {
        if (this.nextFlow == null)
        {
            return false;
        }

        if (this.currentFlow == null)
        {
            return false;
        }

        if (this.nextFlow.fadeOut && globalSystem.uiManager.fade.blackOut == false)
        {
            globalSystem.uiManager.fade.out(this.nextFlow.fadeTime);
            return true;
        }

        this.currentFlow.exit();
        this.currentFlow = null;
        return true;
    }

    next()
    {
        if (this.nextFlow == null)
        {
            return false;
        }

        if (this.currentFlow != null)
        {
            return false;
        }

        if (globalSystem.uiManager.fade.blackOut == false)
        {
            return true;
        }

        if (this.waitTimer > 0)
        {
            this.waitTimer -= globalSystem.time.deltaTime;
            return true;
        }

        this.currentFlow = this.nextFlow;
        this.currentFlow.setup();
        this.nextFlow = null;
        if (this.currentFlow.fadeIn)
        {
            globalSystem.uiManager.fade.in(this.currentFlow.fadeTime);
        }
        return true;
    }

    updateFade()
    {
        if (globalSystem.uiManager.fade.blackOut && globalSystem.uiManager.fade.isFadeing)
        {
            return true;
        }

        return false;
    }
}

new FlowManager();
