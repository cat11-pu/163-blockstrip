// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "文本长度 " + String(spec.text || "").length + "，点剥离看结果。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    const line = document.createElement("div");
    line.className = "row";
    line.textContent = "剥离后长度 " + view.length + "，去掉 " + view.removed + " 个字符";
    parts.stage.appendChild(line);
    const holes = document.createElement("div");
    holes.className = "row";
    holes.textContent = "被剥掉的区间数 " + view.spans.length;
    parts.stage.appendChild(holes);
    parts.legend.textContent = "区间 " + JSON.stringify(view.spans);
    parts.log.textContent = "剩余文本长度 " + view.length;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "剥离块注释";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加一个注释块";
  addButton.addEventListener("click", function () {
    spec.text = String(spec.text || "") + "/* extra */";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一段";
  dropButton.addEventListener("click", function () {
    spec.text = String(spec.text || "").slice(0, -10);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "a/*x*/b";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value }));
      parts.out.textContent = box.value + " 剥离后长度 " + view.length;
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看区间数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "区间 " + view.spans.length + " 个，去掉 " + view.removed + " 个字符";
  });
  parts.controls.appendChild(readButton);

  draw();
}
