import { toString } from "mdast-util-to-string";
import { filter } from "unist-util-filter";

import assert from "node:assert/strict";

const WORDS_PER_MINUTE = 265;

const segmenter = new Intl.Segmenter("en-US", {
  granularity: "word",
});

// Food for thoughts: have 2 different metrics for images & code blocks.
// And use the image size as a baseline (bigger images will take more time than smaller ones),
// and same for code blocks: larger code blocks should take more time.
// But keep the idea of desensitization after a few
const getSecondsAddedByImages = (imageCount) => {
  const nbOfImagesBellow10 = Math.max(Math.min(imageCount, 10), 0);
  const secondsAddedByImagesBellow10 =
    12 * nbOfImagesBellow10 -
    (nbOfImagesBellow10 * (nbOfImagesBellow10 - 1)) / 2;

  const nbOfImagesAbove10 = Math.max(imageCount - 10, 0);
  const secondsAddedByImagesAbove10 = nbOfImagesAbove10 * 3;

  return secondsAddedByImagesBellow10 + secondsAddedByImagesAbove10;
};
let totalForTest = 0;
assert.equal(getSecondsAddedByImages(-1), (totalForTest += 0));
assert.equal(getSecondsAddedByImages(0), (totalForTest += 0));
assert.equal(getSecondsAddedByImages(1), (totalForTest += 12));
assert.equal(getSecondsAddedByImages(2), (totalForTest += 11));
assert.equal(getSecondsAddedByImages(3), (totalForTest += 10));
assert.equal(getSecondsAddedByImages(4), (totalForTest += 9));
assert.equal(getSecondsAddedByImages(5), (totalForTest += 8));
assert.equal(getSecondsAddedByImages(6), (totalForTest += 7));
assert.equal(getSecondsAddedByImages(7), (totalForTest += 6));
assert.equal(getSecondsAddedByImages(8), (totalForTest += 5));
assert.equal(getSecondsAddedByImages(9), (totalForTest += 4));
assert.equal(getSecondsAddedByImages(10), (totalForTest += 3));
assert.equal(getSecondsAddedByImages(11), (totalForTest += 3));
assert.equal(getSecondsAddedByImages(12), (totalForTest += 3));
assert.equal(getSecondsAddedByImages(13), (totalForTest += 3));
assert.equal(getSecondsAddedByImages(14), (totalForTest += 3));

export function remarkReadingTime() {
  return (tree, { data }) => {
    let imagesCount = 0;
    const filteredTree = filter(tree, (node) => {
      // Treat images & code as "meta content"
      if (node.type === "image" || node.type === "code") {
        imagesCount++;
      }
      return (
        node.type !== "code" && // Remove code blocks (easily read)
        node.type !== "mdxJsxFlowElement" && // Remove component rendered (like <Hello />)
        node.type !== "mdxjsEsm" // Remove imports
      );
    });

    const textOnPage = toString(filteredTree);

    // According to Medium.com, the default reading speed is 265WPM (500CPM for CJK, but not needed here)
    // And the 1st image takes 12s to read, then the 2nd 11s, ... and after 10th image, always 3s
    // Sources:
    // - https://help.medium.com/hc/en-us/articles/214991667-Read-time (for 265WPM)
    // - https://mediumcourse.com/how-is-medium-article-read-time-calculated/ (for the image timing)

    const wordsCount = [...segmenter.segment(textOnPage)].filter(
      ({ isWordLike }) => isWordLike,
    ).length;

    let totalMs = Math.round((wordsCount / WORDS_PER_MINUTE) * 60_000); // round to avoid issues with floats

    const nbOfImagesBellow10 = Math.min(imagesCount, 10);
    const timeAddedByImages = getSecondsAddedByImages(imagesCount) * 1000; // to milliseconds
    totalMs += timeAddedByImages;

    const minutes = totalMs / 60_000;
    const displayedText = Math.ceil(minutes.toFixed(2)) + " min read";

    const finalReadingTime = {
      words: wordsCount, // The total word count
      minutes, // Total reading time duration in minutes
      displayedText, // Human readable duration, like "3 min read"
    };

    data.astro.frontmatter.readingTime = finalReadingTime;
  };
}
