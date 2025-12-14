// 页面加载完成后，在页面底部添加浏览量显示
window.onload = function () {
    // 创建浏览量容器
    const viewCountDiv = document.createElement('div');
    viewCountDiv.style.cssText = `
    margin: 20px auto;
    text-align: center;
    color: var(--md-default-fg-color--lighter);
    font-size: 0.9em;
    padding: 10px;
    border-top: 1px solid var(--md-default-fg-color--lightest);
  `;
    // 插入浏览量标签
    viewCountDiv.innerHTML = `
    🌐 全站总浏览量：<span id="busuanzi_value_site_pv"></span> 次 | 
    👁️ 本文浏览量：<span id="busuanzi_value_page_pv"></span> 次
  `;
    // 把容器添加到页面最底部
    document.body.appendChild(viewCountDiv);
};