function onLoad()
{
    globalSystem.setup();
    window.requestAnimationFrame(main);
}

function main()
{
    globalSystem.update();
    window.requestAnimationFrame(main);
}