import * as React from "react";

export function Rerender() {
  return (
    <>
      <DisplayHideButton label="re-render in useEffect">
        <RerenderInUseEffect />
      </DisplayHideButton>
    </>
  );
}

function DisplayHideButton({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  const [isDisplayed, setIsDisplayed] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsDisplayed((d) => !d)}>
        {isDisplayed ? "Hide" : "Display"} {label}
      </button>
      {isDisplayed && children}
    </>
  );
}

function RerenderInUseEffect() {
  const [, forceUpdate] = React.useState({});

  console.log("render");

  React.useEffect(() => {
    console.log("mount that has a re-render");
    forceUpdate({});
  }, []);

  React.useEffect(() => {
    console.log("effect with no side effects");
  });

  return "✅";
}
