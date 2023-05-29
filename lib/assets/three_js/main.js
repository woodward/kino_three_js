
import "https://unpkg.com/three@0.152.2/build/three.module.js";
import "https://unpkg.com/three@0.152.2/examples/jsm/";

export function init(ctx, data) {
  ctx.root.innerHTML = `
  <div id='three_js' style='width: 896px; height: 400px;'></div>
`;
}