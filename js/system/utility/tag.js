class Tag
{
    static replace(text, index = 0)
    {
        // 文字色
        text = text.replace(/<red>/g, `<span style='color:${Color.red};'>`);
        text = text.replace(/<\/red>/g, `</span>`);
        text = text.replace(/<green>/g, `<span style='color:${Color.darkGreen};'>`);
        text = text.replace(/<\/green>/g, `</span>`);
        text = text.replace(/<blue>/g, `<span style='color:${Color.marineBlue};'>`);
        text = text.replace(/<\/blue>/g, `</span>`);
        text = text.replace(/<yellow>/g, `<span style='color:${Color.yellow};'>`);
        text = text.replace(/<\/yellow>/g, `</span>`);
        text = text.replace(/<gray>/g, `<span style='color:${Color.gray};'>`);
        text = text.replace(/<\/gray>/g, `</span>`);

        // ボタン
        text = text.replace(/<button>/g, `<button class='app text borderless' onclick='globalSystem.uiManager.textLine[${index}].onClickButton(event, this);' oncontextmenu='return globalSystem.uiManager.textLine[${index}].onContextMenuButton(event, this);'>`);
        text = text.replace(/<\/button>/g, `</button>`);

        // 例外処理
        if (text == "")
        {
            text = "<br>";
        }
        return text;
    }
}
