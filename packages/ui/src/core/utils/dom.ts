export function createElementAndAppendToBody (elementId: string) {
  const element = document.createElement('div');

  element.setAttribute('id', elementId);
  document.body.appendChild(element);

  return element;
}
