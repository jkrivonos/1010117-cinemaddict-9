export const createElement = (template) => {
  // console.log(`template`, template);
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element) => {
  container.append(element);
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
