import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate array of page number
 *
 * @param {Number} totalPages
 * @param {Number} page
 * @param {Number} rangeDisplayed
 * @returns Returns an array of rangeDisplayed (or less) page numbers, where a 0 in the returned array denotes a gap in the series.
 */
export const generateArrayOfPageNumber = (
  totalPages: number,
  page: number,
  rangeDisplayed: number
) => {
  if (rangeDisplayed < 5) throw 'rangeDisplayed must be at least 5';

  const range = (start: number, end: number) =>
    Array.from(Array(end - start + 1), (_, i) => i + start);
  let sideWidth = rangeDisplayed < 9 ? 1 : 2;
  let leftWidth = (rangeDisplayed - sideWidth * 2 - 3) >> 1;
  let rightWidth = (rangeDisplayed - sideWidth * 2 - 2) >> 1;

  if (totalPages <= rangeDisplayed) {
    return range(1, totalPages);
  }

  if (page <= rangeDisplayed - sideWidth - 1 - rightWidth) {
    return range(1, rangeDisplayed - sideWidth - 1).concat(
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }

  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    return range(1, sideWidth).concat(
      0,
      range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
    );
  }

  return range(1, sideWidth).concat(
    0,
    range(page - leftWidth, page + rightWidth),
    0,
    range(totalPages - sideWidth + 1, totalPages)
  );
};
