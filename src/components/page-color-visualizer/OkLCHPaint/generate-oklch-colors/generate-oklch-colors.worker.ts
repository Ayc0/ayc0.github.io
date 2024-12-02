import { createOnMessage } from "@components/page-color-visualizer/worker-utils";

import { generateColors } from "./generate-oklch-colors";

onmessage = createOnMessage(generateColors);
