// src/pages/Launch.jsx
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import Clickable from "../components/Clickable";
import { theme } from "../settings";

/** Container—could add fade-in animation later */
const Container = styled.div`
  padding: ${theme.padding}px;
  color: ${theme.color.content};
`;

/** Simple styled paragraph */
const Text = styled.p`
  margin: 0 0 ${theme.padding}px 0;
  font-size: 1rem;
`;

/** The form layout */
const Form = styled.form`
  display: inline-grid;
  grid-template-columns: auto auto;
  grid-gap: 10px 20px;
  align-items: center;
  margin-top: ${theme.padding}px;
`;

/** Styled submit button */
const LaunchButton = styled.button`
  cursor: pointer;
  padding: ${theme.padding / 2}px ${theme.padding}px;
  font-size: 1rem;
  background: none;
  border: 2px solid ${theme.color.content};
  border-radius: 4px;
  color: ${theme.color.content};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/** Tiny CSS spinner */
const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: ${theme.color.content};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Launch = ({ planets = [], entered, isPendingLaunch, submitLaunch }) => {
  const selectorOptions = useMemo(
    () =>
      planets.map(({ kepler_name}) => (
        <option key={kepler_name} value={kepler_name}>
          {kepler_name}
        </option>
      )),
    [planets]
  );
  console.log("PLANETS IN FRONTEND: ", planets);

  const today = new Date().toISOString().split("T")[0];

  if (!entered) {
    return null; // nothing shown until `entered` is true
  }

  return (
    <Container id="launch">
      <Text>
        Schedule a mission launch for interstellar travel to one of the Kepler
        Exoplanets.
      </Text>
      <Text>
        Only confirmed planets matching the following criteria are available for
        the earliest scheduled missions:
      </Text>
      <ul>
        <li>Planetary radius &lt; 1.6 × Earth's radius</li>
        <li>
          Effective stellar flux &gt; 0.36 × and &lt; 1.11 × Earth's value
        </li>
      </ul>

      <Form onSubmit={submitLaunch}>
        <label htmlFor="launch-day">Launch Date</label>
        <input
          type="date"
          id="launch-day"
          name="launch-day"
          min={today}
          max="2040-12-31"
          defaultValue={today}
        />

        <label htmlFor="mission-name">Mission Name</label>
        <input type="text" id="mission-name" name="mission-name" />

        <label htmlFor="rocket-name">Rocket Type</label>
        <input
          type="text"
          id="rocket-name"
          name="rocket-name"
          defaultValue="Explorer IS1"
        />

        <label htmlFor="planets-selector">Destination Exoplanet</label>
        <select id="planets-selector" name="planets-selector">
          {selectorOptions}
        </select>

        <Clickable>
          <LaunchButton type="submit" disabled={isPendingLaunch}>
            Launch Mission ✔
          </LaunchButton>
        </Clickable>

        {isPendingLaunch && <LoadingSpinner />}
      </Form>
    </Container>
  );
};

export default Launch;
