function selectAndCopyOnClick(event) {
  event.stopPropagation();
  event.preventDefault();
  const textNode = event.target;
  const range = document.createRange();
  range.selectNode(textNode);
  window.getSelection().addRange(range);

  document.execCommand('copy');

  window.getSelection().removeAllRanges();
}

export { selectAndCopyOnClick };
