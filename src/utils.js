export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  // console.log(`newElement.firstChild`, newElement.firstChild);
  return newElement.firstChild;
};

export const render = (container, element, place = `beforeend`) => {
  container.append(element);
};

export const unrender = (element) => {
  if(element) {
    element.remove();
  }
};

// export default {createElement, render, unrender}
