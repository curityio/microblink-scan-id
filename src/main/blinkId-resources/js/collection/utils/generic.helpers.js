/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export function stringToArray(inputString) {
  if (!inputString || !inputString.length) {
    return [];
  }
  return inputString.split(',').map(el => el.trim());
}
export function stringToObject(inputString) {
  if (!inputString || !inputString.length) {
    return {};
  }
  return JSON.parse(inputString);
}
export function hasSupportedImageFiles(files) {
  const imageRegex = RegExp(/^image\//);
  for (let i = 0; i < files.length; ++i) {
    if (imageRegex.exec(files[i].type)) {
      return true;
    }
  }
  return false;
}
export function extractFilenameFromPath(path) {
  return path.split('\\').pop();
}
export function getImageFile(fileList) {
  if (fileList === null) {
    return null;
  }
  let image = null;
  const imageRegex = RegExp(/^image\//);
  for (let i = 0; i < fileList.length; ++i) {
    if (imageRegex.exec(fileList[i].type)) {
      image = fileList[i];
    }
  }
  return image;
}
/**
 * Inspired by https://github.com/JedWatson/classnames.
 * @param classes Class names and their conditions.
 * @returns Joined string of class names.
 */
export function classNames(classes) {
  const result = [];
  const keys = Object.keys(classes);
  keys.forEach((key) => {
    if (classes[key]) {
      result.push(key);
    }
  });
  return result.join(' ');
}
/**
 * @param root shadowroot to apply the query from
 * @returns array of part selectors
 */
export function getWebComponentParts(root) {
  const nodesWithPart = root.querySelectorAll('[part]');
  const parts = new Set();
  nodesWithPart.forEach((el) => {
    const partsArray = el.getAttribute('part').split(' ');
    partsArray.forEach(partName => parts.add(partName));
  });
  return [...parts];
}
export function getWebComponentExportedParts(root) {
  const nodesWithPart = root.querySelectorAll('[exportparts]');
  const exportedParts = new Set();
  nodesWithPart.forEach((el) => {
    const exportedPartsArray = el.getAttribute('exportparts').split(' ');
    exportedPartsArray.forEach(partName => exportedParts.add(partName));
  });
  return [...exportedParts];
}
export function setWebComponentParts(hostEl) {
  const partParts = [
    hostEl.tagName.toLowerCase(),
    hostEl.getAttribute('id')
  ];
  hostEl.setAttribute('part', partParts.join(' ').trim());
}
export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
