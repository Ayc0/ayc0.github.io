import { GITHUB_RUN_ID } from "astro:env/client";

import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";

// Define this in its own file so that:
// - astro can load it as a ECMAScript module (ESM), and thus use `defer` OOTB,
// - RUM & Logs can be bundled together (as they share the same dependencies)

const MODE = import.meta.env.MODE;
const VERSION = `${new Date().toISOString().split("T")[0]}--${GITHUB_RUN_ID}`;
const DATADOG_CLIENT_TOKEN = "pub65a306a096de7824a32d9879df04de68";
const DATADOG_RUM_APPLICATION_ID = "d5dc836c-8af7-48c6-85d4-ada010f382f5";

datadogRum.init({
  applicationId: DATADOG_RUM_APPLICATION_ID,
  clientToken: DATADOG_CLIENT_TOKEN,
  site: "datadoghq.eu",
  service: "ayc0.dev",
  env: MODE,
  version: VERSION,
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackResources: true,
  trackUserInteractions: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "allow",

  trackViewsManually: true,
});

// There is a "bug" in RUM where RUM replaces all URLs that _look like_ a variable with a `?`. Which means that we can't use numbers in URLs. But we do for a few blog posts. So no need for that
datadogRum.startView(document.location.pathname);

datadogLogs.init({
  clientToken: DATADOG_CLIENT_TOKEN,
  site: "datadoghq.eu",
  version: VERSION,
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
});
