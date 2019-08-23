export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement;
};

export const render = (container, element, place = `beforeend`) => {
  container.append(element);
};

export const unrender = (element) => {
  if(element) {
    element.remove();
  }
};
