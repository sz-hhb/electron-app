const information = document.getElementById("info")

information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

const func = async () => {
  const res = await window.versions.ping()
  console.log(res)
}

func()

const btn = document.getElementById("btn")
const filePathElement = document.getElementById("filePath")

btn.addEventListener("click", async () => {
  const filePath = await window.versions.openFile()
  filePathElement.innerText = filePath
})

const counter = document.getElementById("counter")

window.versions.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + value
  counter.innerText = newValue.toString()
  window.versions.countValue(newValue)
})

document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById("theme-source").innerText = isDarkMode
      ? "Dark"
      : "Light"
  })

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.darkMode.system()
    document.getElementById("theme-source").innerText = "System"
  })
