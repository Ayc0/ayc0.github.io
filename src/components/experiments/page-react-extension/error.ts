export function getErrorStackFromInfo(errorInfo: {
  componentStack?: string | undefined | null;
}) {
  if (!errorInfo.componentStack) {
    return;
  }

  return errorInfo.componentStack
    .trim()
    .split("\n")
    .map((line) => line.trim().replace(/^at (.*?) \(.*?\)$/, "$1"))
    .reverse()
    .join(" > ");
}
