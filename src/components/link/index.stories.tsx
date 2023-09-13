import React from "react";
import { Column, Link } from "components";

export default {
  title: "Components/Links",
};

export const Links: React.FC = () => {
  return (
    <Column>
      <Link href="/">Default</Link>

      <Link href="/" color="error200">
        Custom color
      </Link>

      <Link external href="/">
        External
      </Link>
    </Column>
  );
};
