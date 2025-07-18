// src/pages/History.jsx
import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { theme } from "../settings";

/** Root article, with optional fade‐in */
const Article = styled.article`
  padding: ${theme.padding}px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.4s ease-in;
`;

/** Intro paragraph */
const Intro = styled.p`
  margin: 0 0 ${theme.padding}px 0;
  font-size: 1rem;
  color: ${theme.color.content};
`;

/** Wrapper for table to scroll on overflow */
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
`;

const History = ({ launches = [], entered }) => {
  const rows = useMemo(
    () =>
      launches
        .filter((l) => !l.upcoming)
        .map((l) => (
          <tr key={l.flightNumber}>
            <td style={{ width: "2rem" }}>
              <span style={{ color: l.success ? "greenyellow" : "red" }}>
                █
              </span>
            </td>
            <td style={{ width: "3rem" }}>{l.flightNumber}</td>
            <td style={{ width: "9rem" }}>
              {new Date(l.launchDate).toDateString()}
            </td>
            <td>{l.mission}</td>
            <td style={{ width: "7rem" }}>{l.rocket}</td>
            <td>{(l.customers || []).join(", ")}</td>
          </tr>
        )),
    [launches]
  );

  return (
    <Article id="history" show={entered}>
      {/* If you want it to unmount entirely before `entered`, you can early-return null */}
      {!entered ? null : (
        <>
          <Intro>
            History of mission launches including SpaceX launches starting from
            the year 2006.
          </Intro>
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th></th>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Mission</th>
                  <th>Rocket</th>
                  <th>Customers</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </StyledTable>
          </TableWrapper>
        </>
      )}
    </Article>
  );
};

export default History;
