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

interface GetDocumentPagesOptions {
  scale?: number;
  url: string;
}

const BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI: string) {
  let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  let base64 = dataURI.substring(base64Index);
  let raw = window.atob(base64);
  let rawLength = raw.length;
  let array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async ({
  scale = 1,
  url
}: GetDocumentPagesOptions): Promise<Array<string>> => {
  /**
   * Use legacy build of pdf.js
   *
   * References:
   * - https://www.npmjs.com/package/react-pdf/v/5.7.2
   * - https://github.com/mozilla/pdf.js/issues/14327
   * - https://stackoverflow.com/questions/67402212/javascript-private-class-fields-or-methods-not-working-in-ios-chrome-or-safari
   * - https://stackoverflow.com/a/70598604
   */
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

  const pdfAsArray = convertDataURIToBinary(url);

  // First, we need to load the document using the getDocument utility
  const loadingTask = await pdfjs.getDocument(pdfAsArray);
  const pdf = await loadingTask.promise;

  const { numPages } = pdf;

  const canvasURLs = [];

  // Now for every page in the document, we're going to add a page to the array
  for (let i = 0; i < numPages; i++) {
    const page = await pdf.getPage(i + 1);

    const viewport = page.getViewport({ scale: scale });
    const { width, height } = viewport;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.className = 'page';
    await page.render({
      canvasContext: canvas.getContext('2d') as Object,
      viewport
    }).promise;

    canvasURLs.push(canvas.toDataURL());
  }

  return canvasURLs;
};
