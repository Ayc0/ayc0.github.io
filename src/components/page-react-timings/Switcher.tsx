import React from "react";

export const isLegacyRoot = Boolean(sessionStorage.getItem("legacyRoot"));

export default function Switcher() {
  return (
    <>
      <button
        onClick={() => {
          if (isLegacyRoot) {
            sessionStorage.removeItem("legacyRoot");
          } else {
            sessionStorage.setItem("legacyRoot", "true");
          }
          window.location.reload();
        }}
      >
        Switch to {isLegacyRoot ? "concurrent" : "legacy"}
      </button>
    </>
  );
}
