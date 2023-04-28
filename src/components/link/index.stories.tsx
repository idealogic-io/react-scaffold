import React from "react";
import { Link } from "components";
import { CopyIcon } from "components/svg";

export default {
  title: "Components/Links",
};

export const Links: React.FC = () => {
  return (
    <>
      <Link href="/">Default</Link>

      <Link href="/" color="accent500">
        Custom color
      </Link>

      <Link external href="/">
        External
      </Link>

      <Link href="/">
        With icon
        <CopyIcon />
      </Link>
    </>
  );
};
