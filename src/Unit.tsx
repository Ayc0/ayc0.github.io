import React, { useState, useRef, startTransition } from "react";

export const Unit = ({
  unit,
  description
}: {
  unit: string;
  description: string;
}) => {
  const [size, setSize] = useState<null | number>(null);
  const nodeRef = useRef<HTMLDivElement>(undefined);

  React.useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      startTransition(() => {
        setSize(entry.contentRect.width);
      });
    });
    resizeObserver.observe(node);
    return () => {
      resizeObserver.unobserve(node);
    };
  }, []);

  if (!CSS.supports("width", `1${unit}`)) {
    return (
      <>
        <span style={{ gridRow: "span 2" }} />
        <span style={{ color: "var(--danger)", gridColumn: "span 2" }}>
          <code>“{unit}”</code> isn’t supported
        </span>
        <span className="description">{description}</span>
      </>
    );
  }

  return (
    <>
      <div
        ref={nodeRef}
        style={{
          justifySelf: "center",
          width: `1${unit}`,
          height: `1${unit}`,
          background: "var(--color)",
          gridRow: "span 2"
        }}
      />
      <code>{`1${unit}`}</code>
      <code>{size && `= ${size}px`}</code>
      <span className="description">{description}</span>
    </>
  );
};
