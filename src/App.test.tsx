import { render } from "@testing-library/react";
import ProvidersWithContext from "./Providers";

import Navigation from "navigation";

test("renders App", () => {
  render(
    <ProvidersWithContext>
      <Navigation />
    </ProvidersWithContext>,
  );
});
