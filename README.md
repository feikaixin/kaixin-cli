
### 文件结构说明
* app/page/XXX/XXX 如(app/page/index/newShop) 下面有index.js 主流程控制
* app/module/  业务相关的模块(以功能划分文件夹)
* app/component/  抽象程度高的组件
* app/service/  服务数据相关(ajax的url统一管理,转义字典等)  
* mock/ mock数据文件存放

开发时候需要配置app.json
---
###本地运行步骤
* `git clone`
* `npm install` 
* `npm run start` 启动本地项目，开始开发
* `npm run build` 前端资源打包

---
### 新建功能页面步骤
* 在app/page目录下新建文件夹,已经对应主js
* 增加app.json中的文件映射
* npm dev 同时启动项目和mock服务,即时修改刷新浏览器
---
### 数据mock
使用url匹配  
'*/api/*' : 转发后台
'*/mock/*' :转发到本地mock服务  

注意:文件命名需要为*.adoc.md 其中的接口会自动加入接口列表  
mock服务启动后,修改mock文件,会自动刷新接口列表  

本地需要安装vane的客户端  
`npm install -g vane`  
在项目根目录执行  
`npm run mock`
即可开启mock服务  

`npm run dev` 同时启动项目和mock服务,即时修改刷新浏览器  
`npm run start` 启动项目
`npm run build` 打包项目
