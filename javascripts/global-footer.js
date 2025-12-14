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
  viewCountDiv.innerHTML = `
        🌐 全站总浏览量：<span id="site-count">加载中...</span> 次 | 
        👁️ 本文浏览量：<span id="page-count">加载中...</span> 次
    `;
  document.body.appendChild(viewCountDiv);

  // 关键：直接在脚本里动态创建 script 标签，引入 LeanCloud SDK（重命名为 LC）
  const script = document.createElement('script');
  // 国内稳定 CDN 地址（优先选这个）
  script.src = 'https://cdn.bootcdn.net/ajax/libs/leancloud-storage/4.12.0/av-lc.min.js';
  // 备选地址（如果上面的不行，换这个）
  // script.src = 'https://unpkg.com/leancloud-storage@4.12.0/dist/av-lc.min.js';

  // SDK 加载成功后执行计数逻辑
  script.onload = function () {
    if (!window.LC) {
      document.getElementById('site-count').innerText = 'SDK加载失败';
      document.getElementById('page-count').innerText = 'SDK加载失败';
      return;
    }

    // LeanCloud 配置（你的信息不变）
    const APP_ID = "t49GUs7ZLkrOnnbbJLBkC8ou-gzGzoHsz";
    const APP_KEY = "UjHcyJ1SqD0Jx0jygwNPBbBP";
    const SERVER_URL = "https://t49gus7z.lc-cn-n1-shared.com";

    // 初始化
    LC.init({
      appId: APP_ID,
      appKey: APP_KEY,
      serverURL: SERVER_URL
    });

    // 权限配置（允许匿名读写）
    const acl = new LC.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(true);

    // 计数逻辑
    const PageView = LC.Object.extend('PageView');
    const pagePath = window.location.pathname;
    const query = new LC.Query(PageView);
    query.equalTo('path', pagePath);

    query.first().then(function (record) {
      if (record) {
        record.increment('count', 1);
        record.setACL(acl);
        return record.save();
      } else {
        const newRecord = new PageView();
        newRecord.set('path', pagePath);
        newRecord.set('count', 1);
        newRecord.setACL(acl);
        return newRecord.save();
      }
    }).then(function (updatedRecord) {
      document.getElementById('page-count').innerText = updatedRecord.get('count');
      const totalQuery = new LC.Query(PageView);
      return totalQuery.sum('count');
    }).then(function (total) {
      document.getElementById('site-count').innerText = total || 0;
    }).catch(function (err) {
      console.error('计数失败：', err.code, err.message);
      document.getElementById('site-count').innerText = '加载失败';
      document.getElementById('page-count').innerText = '加载失败';
    });
  };

  // SDK 加载失败时的降级处理
  script.onerror = function () {
    document.getElementById('site-count').innerText = 'SDK加载失败';
    document.getElementById('page-count').innerText = 'SDK加载失败';
    console.error('LeanCloud SDK 加载失败，请检查网络或更换 SDK 地址');
  };

  // 把 script 标签添加到页面，触发 SDK 加载
  document.head.appendChild(script);
};