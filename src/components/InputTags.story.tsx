import { storiesOf } from "@storybook/react";
import React from "react";
import { Box } from "./Box";
import { InputTags } from "./InputTags";

storiesOf("Components|InputChips", module).add("default", () => (
  <Box>
    <InputTags placeholder="Placeholder" tags={["Traefik", "Compression"]} />
  </Box>
));
