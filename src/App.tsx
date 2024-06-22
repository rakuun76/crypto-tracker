import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import Router from "./Router";
import { darkTheme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
