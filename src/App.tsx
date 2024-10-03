import '@/global.css'
import '../node_modules/flag-icons/css/flag-icons.min.css';
import { I18nextProvider } from "react-i18next"
import { ThemeProvider } from "./components/common/theme-provider"
import i18n from "./i18n"
import { Layout } from "./components/layout"
import { AppRoutesProvider } from "./routes/app-routes-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="cashflow-ui-theme">
      <I18nextProvider i18n={i18n}>
        <Layout>
          <AppRoutesProvider />
        </Layout>
      </I18nextProvider>
    </ThemeProvider>
  )
}

export default App
