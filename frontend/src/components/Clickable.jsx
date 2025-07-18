// src/components/Clickable.jsx
import React from "react";
import useSound from "use-sound";
import { sounds } from "../settings";

/**
 * A span that plays your configured click sound before firing onClick.
 *
 * All other props (className, style, etc.) are forwarded automatically.
 */
const Clickable = ({ onClick, children, ...rest }) => {
  // grab the click sound array and settings from your config
  const clickSrc = sounds.players.click.sound.src;
  const clickOpts = {
    volume: sounds.shared.volume,
    ...sounds.players.click.settings,
  };

  // use-sound returns a `play` function you can call
  const [playClick] = useSound(clickSrc, clickOpts);

  // wrap the user's onClick so we play first
  const handleClick = (e) => {
    playClick();
    if (onClick) onClick(e);
  };

  return (
    <span {...rest} onClick={handleClick} style={{ cursor: "pointer" }}>
      {children}
    </span>
  );
};

export default Clickable;
