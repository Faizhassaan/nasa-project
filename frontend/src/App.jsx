import { BrowserRouter as Router } from "react-router";
import { Global, css } from "@emotion/react";
import AppLayout from "./pages/AppLayout";
import { resources } from "./settings";

const App = () => {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #root {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: "Titillium Web", sans-serif;
            background: url(${resources.background.large}) no-repeat center
              center fixed;
            background-size: cover;
            color: #a1ecfb;
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <Router>
        <AppLayout />
      </Router>
    </>
  );
};

export default App;
