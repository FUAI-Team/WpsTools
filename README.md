# WPS 加载项开发文档

## 使用WPSJS编程WPS加载项的方法
官方教程：
https://qn.cache.wpscdn.cn/encs/doc/office_v11/index.htm
https://developer.kdocs.cn/addon/guide/develop.html
https://open.wps.cn/previous/docs/client/wpsLoad

## 个人经验

1. 在该项目中，创建任务窗格的重要关键点为 `ribbon.js` 中的 `let tskpane = window.Application.CreateTaskPane('http://172.16.167.83:3000/')` 这句话，其直接创建一个任务窗格并打开链接，无需在Vue组件中另行创建"TaskPane"。

2. **⚠️ 重要**：由于院内网为局域网，不支持直接从外部访问，因此，**`TaskPane.vue` 中（或者其他组件中）不能出现引用不合法的地址**（比如局域网地址、内网地址等），否则WPS加载项无法正常加载，也无法打开相应功能。所有组件中引用的地址必须是公网可访问的合法地址。

## 生成与部署

1. 使用 `wpsjs publish` 生成可直接发布的文件，分别为 `wps-addon-build` 文件夹和 `wps-addon-publish` 文件夹，其中：
   - `wps-addon-publish` 中的网页主要作用是引导用户下载WPS加载项，也就是 `wps-addon-build` 文件夹中加载项的实际存放地址。
   - 这两个文件夹功能不同，不一定在同一个服务器存放和挂载。

2. **⚠️ 重要**：将 `wps-addon-publish` 中的网页挂载到一个服务器上，并使用浏览器可访问地址。**该地址必须为使用HTTPS协议的地址，否则可能会无效**。用户访问后，浏览器会触发用户本地的WPS软件，用户可根据页面选项自主卸载或安装WPS加载项。

3. `wps-addon-build` 文件夹是加载项的实际存放地址，当用户打开 `wps-addon-publish` 中的网页时，用户本地的WPS软件可以获取到 `wps-addon-build` 的具体地址，并加载其中的 `ribbon.xml` 和 `manifest.xml`，获取加载项具体信息，由此，加载项就算加载完毕，并可正常使用。

4. WPS启动时，加载项可自动访问 `wps-addon-publish` 中的网页，并检查加载项的更新情况，并自动更新。


## wpsjs 使用方法

1. **新建项目**：`wpsjs create 项目名`

2. **测试项目**: `wpsjs debug`

2. **发布项目**：`wpsjs publish`
   - 输入服务器地址（即加载项实际存放地址，此输入兼容https和http协议）：`http://106.14.57.9/jsplugindir/`
   - 选择"在线模式"
   - 选择"否"（暂不清楚功能）

3. **部署**：打包并上传生成的 `wps-addon-publish` 和 `wps-addon-build` 文件夹于相关服务器并挂载，WPS加载项就算更新完成！

---

## 总结

再次强调两个关键点：

- ✅ **HTTPS协议**：`wps-addon-publish` 网页挂载地址必须使用HTTPS协议
- ✅ **合法地址**：组件中不能出现引用不合法的地址（如局域网地址）
- **服务器地址**：http://106.14.57.9/jsplugindir/