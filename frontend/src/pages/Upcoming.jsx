import React, { useMemo } from "react";
import styled from "@emotion/styled";
import Clickable from "../components/Clickable";
import { theme } from "../settings";

/** Container with fade-in */
const Wrapper = styled.article`
  padding: ${theme.padding}px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.4s ease-in;
`;

/** Styled paragraph */
const Paragraph = styled.p`
  font-size: 1rem;
  color: ${theme.color.content};
  margin-bottom: ${theme.padding}px;
`;

/** Styled warning */
const Warning = styled.p`
  font-weight: bold;
  color: red;
  margin-bottom: ${theme.padding}px;
`;

/** Scrollable table container */
const TableWrapper = styled.div`
  overflow-x: auto;
`;

/** Styled table */
const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  color: ${theme.color.content};
  font-size: 0.9rem;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  th {
    font-weight: bold;
  }

  td:first-of-type {
    color: red;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Upcoming = ({ entered, launches = [], abortLaunch }) => {
  const rows = useMemo(() => {
    return launches
      .filter((launch) => launch.upcoming)
      .map((launch) => (
        <tr key={String(launch.flightNumber)}>
          <td>
            <Clickable onClick={() => abortLaunch(launch.flightNumber)}>
              ✖
            </Clickable>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.target}</td>
        </tr>
      ));
  }, [launches, abortLaunch]);

  if (!entered) return null;

  return (
    <Wrapper id="upcoming" show={entered}>
      <Paragraph>
        Upcoming missions including both SpaceX launches and newly scheduled
        Zero to Mastery rockets.
      </Paragraph>
      <Warning>Warning! Clicking on the ✖ aborts the mission.</Warning>
      <TableWrapper>
        <StyledTable>
          <thead>
            <tr>
              <th></th>
              <th>No.</th>
              <th>Date</th>
              <th>Mission</th>
              <th>Rocket</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </StyledTable>
      </TableWrapper>
    </Wrapper>
  );
};

export default Upcoming;
