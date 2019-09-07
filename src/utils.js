export const createElement = (template) => {
  const newElement = document.createElement(`span`);
  newElement.innerHTML = template;
  return newElement.childNodes[1] ? newElement : newElement.firstChild;
};

export const render = (container, element) => {
  container.append(element);
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
