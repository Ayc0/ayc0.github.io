import { createOnMessage } from "../../worker-utils";

import { generateColors } from "./generate-oklch-colors";

onmessage = createOnMessage(generateColors);
