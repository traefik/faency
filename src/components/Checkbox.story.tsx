import React from "react";
import { storiesOf } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { Box } from "./Box";
import { Text } from "./Text";

storiesOf("Components|Checkbox", module).add("default", () => (
  <>
    <Box mb={2}>
      <Checkbox />
    </Box>
    <Box mb={2}>
      <Checkbox defaultChecked />
    </Box>
    <Box mb={2}>
      <label>
        <Checkbox />
        <Text ml={1}>Test checkbox</Text>
      </label>
    </Box>
  </>
));
