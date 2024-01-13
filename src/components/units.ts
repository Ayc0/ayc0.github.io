interface Unit {
  link: string;
  units: Array<readonly [string, string]>;
}

const absoluteLengthUnits: Unit = {
  link: "https://www.w3.org/TR/css-values-4/#absolute-lengths",
  units: [
    ["cm", "centimeters, 1cm = 96px/2.54"],
    ["mm", "millimeters, 1mm = 1/10th of 1cm"],
    ["Q", "quarter-millimeters, 1Q = 1/40th of 1cm"],
    ["in", "inches, 1in = 2.54cm = 96px"],
    ["pc", "picas, 1pc = 1/6th of 1in"],
    ["pt", "points, 1pt = 1/72nd of 1in"],
    ["px", "pixels, 1px = 1/96th of 1in"]
  ]
};
const fontRelativeUnits: Unit = {
  link: "https://www.w3.org/TR/css-values-4/#font-relative-lengths",
  units: [
    ["em", "font size of the element"],
    ["rem", "font size of the root element"],
    ["ex", "x-height of the element’s font"],
    ["rex", "x-height of the root element"],
    [
      "cap",
      "cap height (the nominal height of capital letters) of the element’s font"
    ],
    [
      "rcap",
      "cap height (the nominal height of capital letters) of the root element"
    ],
    [
      "ch",
      "typical character advance of a narrow glyph in the element’s font, as represented by the “0”"
    ],
    [
      "rch",
      "typical character advance of a narrow glyph in the root element, as represented by the “0”"
    ],
    [
      "ic",
      "typical advance measure of CJK letters, and measured as the used advance measure of the “水” in the element’s font"
    ],
    [
      "ric",
      "typical advance measure of CJK letters, and measured as the used advance measure of the “水” in the root element’s font"
    ],
    ["lh", "line height of the element"],
    ["rlh", "line height of the root element"]
  ]
};

const viewportPercentageLengthPrefixes: [string, string][] = [
  ["v", "UA-default viewport"],
  ["sv", "small viewport"],
  ["lv", "large viewport"],
  ["dv", "dynamic viewport"]
];
const getViewportPercentageLengthSuffixes = (
  prefix: string,
  endDescription: string
): [string, string][] => [
  ["w", `width ${endDescription}`],
  ["h", `height ${endDescription}`],
  ["i", `size in the box’s inline axis ${endDescription}`],
  ["b", `size in the box’s block axis ${endDescription}`],
  ["min", `smaller value between ‘${prefix}w’ and ‘${prefix}h’`],
  ["max", `larger value between ‘${prefix}w’ and ‘${prefix}h’`]
];
const viewportPercentageLengthUnits: Unit = {
  link: "https://www.w3.org/TR/css-values-4/#viewport-relative-lengths",
  units: viewportPercentageLengthPrefixes.flatMap(
    ([prefix, prefixDescription]) =>
      getViewportPercentageLengthSuffixes(
        prefix,
        `of the ${prefixDescription}`
      ).map(
        ([suffix, suffixDecription]) =>
          [`${prefix}${suffix}`, `Equal to the ${suffixDecription}`] as const
      )
  )
};

const containerQueryLengthUnits: Unit = {
  link: "https://www.w3.org/TR/css-contain-3/#container-lengths",
  units: [
    ["cqw", "1% of a query container's width"],
    ["cqh", "1% of a query container's height"],
    ["cqi", "1% of a query container's inline size"],
    ["cqb", "1% of a query container's block size"],
    ["cqmin", "The smaller value of either cqi or cqb"],
    ["cqmax", "The larger value of either cqi or cqb"]
  ]
};

export const lengthUnits = {
  Absolute: absoluteLengthUnits,
  "Relative to font": fontRelativeUnits,
  "Percentage of viewport": viewportPercentageLengthUnits,
  "Container query": containerQueryLengthUnits
};

export type Category = keyof typeof lengthUnits;
