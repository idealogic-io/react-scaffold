import React from "react";
import useMatchBreakpoints from "./use-match-breakpoints";

export default {
  title: "Hooks/UseMatchBreakpoint",
  argTypes: {},
};

export const UseMatchBreakpoint: React.FC = () => {
  const state = useMatchBreakpoints();

  return (
    <div style={{ padding: "32px" }}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
