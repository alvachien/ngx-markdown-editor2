
// ABCjs
export async function abcRender(element: (HTMLElement | Document) = document) {
  const abcElements = element.querySelectorAll('.language-abc');
  if (abcElements.length > 0) {
    const { default: abcjs } = await import(/* webpackChunkName: 'abcjs' */ 'abcjs/src/api/abc_tunebook_svg');
    abcElements.forEach((e: HTMLDivElement) => {
      const divElement = document.createElement('div');
      e.parentNode.parentNode.replaceChild(divElement, e.parentNode);
      abcjs(divElement, e.textContent.trim(), {});
      divElement.style.overflowX = 'auto';
    });
  }
}

export async function chartRender(element: (HTMLElement | Document) = document) {
  const echartsElements = element.querySelectorAll('.language-echarts');
  if (echartsElements.length > 0) {
    const { default: echarts } = await import(/* webpackChunkName: 'echarts' */ 'echarts');
    echartsElements.forEach((e: HTMLDivElement) => {
      try {
        if (e.getAttribute('data-processed') === 'true') {
          return;
        }
        const option = JSON.parse(e.innerHTML.trim());
        echarts.init(e).setOption(option);
        e.setAttribute('data-processed', 'true');
      } catch (error) {
        e.className = 'hljs';
        e.innerHTML = `echarts render error: <br>${error}`;
      }
    });
  }
}
