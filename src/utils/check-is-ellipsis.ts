export const checkIsEllipsis = (element: HTMLElement | null) => {
  if (element) {
    return element.offsetWidth < element.scrollWidth;
  }

  return false;
};
