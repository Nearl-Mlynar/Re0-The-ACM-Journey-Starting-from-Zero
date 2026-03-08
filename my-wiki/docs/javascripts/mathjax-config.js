// docs/javascripts/mathjax-config.js
MathJax = {
    tex: {
        // 配置行内/块级公式的分隔符
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        // 允许转义符（比如 \$ 显示纯美元符号）
        processEscapes: true,
        // 处理 LaTeX 环境（如 align*）
        processEnvironments: true,
        // 加载 noerrors 包，公式出错时显示原文本而非空白
        packages: { '[+]': ['noerrors'] }
    },
    options: {
        // 跳过这些 HTML 标签内的内容，不解析公式
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        // 带有该 class 的元素跳过解析
        ignoreHtmlClass: 'tex2jax_ignore',
        // 带有该 class 的元素强制解析公式
        processHtmlClass: 'tex2jax_process'
    }
};