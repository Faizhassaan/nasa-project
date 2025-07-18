// src/pages/AppLayout.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router";
import styled from "@emotion/styled";

import usePlanets from "../hooks/usePlanets";
import useLaunches from "../hooks/useLaunches";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Centered from "../components/Centered";

import Launch from "./Launch";
import History from "./History";
import Upcoming from "./Upcoming";
import { theme } from "../settings";

/** Styled container for the whole app */
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: auto;
`;

/** Area between header and footer */
const ContentWrapper = styled.div`
  flex: 1;
  padding-top: 20px;
  padding-bottom: 10px;
  transition: opacity 0.4s ease-in;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

const AppLayout = () => {
  const [frameVisible, setFrameVisible] = useState(true);

  // Play sound functions (hook-compatible)
  const onSuccessSound = () => new Audio("/sound/success.mp3").play();
  const onAbortSound = () => new Audio("/sound/abort.mp3").play();
  const onFailureSound = () => new Audio("/sound/warning.mp3").play();

  const { launches, isPendingLaunch, submitLaunch, abortLaunch } = useLaunches(
    onSuccessSound,
    onAbortSound,
    onFailureSound
  );
  const planets = usePlanets();

  const animateFrame = () => {
    setFrameVisible(false);
    setTimeout(() => setFrameVisible(true), 600);
  };

  return (
    <AppContainer>
      <Header onNav={animateFrame} />
      <Centered>
        <ContentWrapper show={frameVisible}>
          <Routes>
            <Route
              path="/"
              element={
                <Launch
                  entered={frameVisible}
                  planets={planets}
                  submitLaunch={submitLaunch}
                  isPendingLaunch={isPendingLaunch}
                />
              }
            />

            <Route
              path="/launch"
              element={
                <Launch
                  entered={frameVisible}
                  planets={planets}
                  submitLaunch={submitLaunch}
                  isPendingLaunch={isPendingLaunch}
                />
              }
            />

            <Route
              path="/upcoming"
              element={
                <Upcoming
                  entered={frameVisible}
                  launches={launches}
                  abortLaunch={abortLaunch}
                />
              }
            />
            <Route
              path="/history"
              element={<History entered={frameVisible} launches={launches} />}
            />
          </Routes>
        </ContentWrapper>
      </Centered>
      <Footer />
    </AppContainer>
  );
};

export default AppLayout;
