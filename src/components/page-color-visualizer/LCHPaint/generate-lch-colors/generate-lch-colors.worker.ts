import { createOnMessage } from "../../worker-utils";

import { generateColors } from "./generate-lch-colors";

onmessage = createOnMessage(generateColors);
