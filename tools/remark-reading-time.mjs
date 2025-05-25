import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import { filter } from "unist-util-filter";

import assert from "node:assert/strict";

const WORDS_PER_MINUTE = 265;

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
    let nbOfImages = 0;
    const filteredTree = filter(tree, (node) => {
      if (node.type === "image") {
        nbOfImages++;
      }
      return (
        // Food for thoughts: treat `code` as images 🤔
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

    const readingTime = getReadingTime(textOnPage);

    // `readingTime` contains a few information:
    // - `text`: Human readable duration, like "3 min read",
    // - `words`: The total word count
    // - `minutes`: Total reading time duration in minutes
    // - `time`: Total reading time duration in milliseconds
    // As we want to manipulate this data manually, we'll just use `words`

    const words = readingTime.words;

    let time = Math.round((words / WORDS_PER_MINUTE) * 60_000); // round to avoid issues with floats

    const nbOfImagesBellow10 = Math.min(nbOfImages, 10);
    const timeAddedByImages = getSecondsAddedByImages(nbOfImages) * 1000; // to milliseconds
    time += timeAddedByImages;

    const minutes = time / 60_000;
    const displayedText = Math.ceil(minutes.toFixed(2));

    const finalReadingTime = {
      words,
      time,
      minutes,
      displayedText,
    };

    data.astro.frontmatter.readingTime = readingTime;
  };
}
