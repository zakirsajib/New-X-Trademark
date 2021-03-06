import "./src/fonts/fonts.css"
import "./src/styles/global.scss"
import 'lazysizes'


export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}