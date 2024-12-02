import { createOnMessage } from "@components/page-color-visualizer/worker-utils";

import { generateColors } from "./generate-lch-colors";

onmessage = createOnMessage(generateColors);
