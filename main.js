/*
 * app 模块，它控制应用程序的事件生命周期
 * BrowserWindow 模块，它创建和管理应用程序 窗口
 */
const { app, BrowserWindow } = require("electron")
// 在你文件顶部导入 Node.js 的 path 模块
const path = require("node:path")

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  win.loadFile("index.html")
}

// 只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  // 不是在macOS上运行程序
  if (process.platform !== "darwin") app.quit
})
