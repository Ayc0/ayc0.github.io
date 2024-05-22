import React from "react";

export function DisplayHideButton({
  label,
  children,
  style,
}: {
  label: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [isDisplayed, setIsDisplayed] = React.useState(false);

  return (
    <>
      <button
        style={{ marginBottom: isDisplayed ? "0.5em" : undefined, ...style }}
        onClick={() => setIsDisplayed((d) => !d)}
      >
        {isDisplayed ? "Hide" : "Display"} {label}
      </button>
      {isDisplayed && children}
    </>
  );
}
