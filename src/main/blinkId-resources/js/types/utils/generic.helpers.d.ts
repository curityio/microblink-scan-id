/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare function stringToArray(inputString: string): Array<string>;
export declare function stringToObject(inputString: string): {
  [key: string]: any;
};
export declare function hasSupportedImageFiles(files: FileList): boolean;
export declare function extractFilenameFromPath(path: string): string;
export declare function getImageFile(fileList: FileList): File | null;
/**
 * Inspired by https://github.com/JedWatson/classnames.
 * @param classes Class names and their conditions.
 * @returns Joined string of class names.
 */
export declare function classNames(classes: Record<string, boolean>): string;
/**
 * @param root shadowroot to apply the query from
 * @returns array of part selectors
 */
export declare function getWebComponentParts(root: ShadowRoot): string[];
export declare function getWebComponentExportedParts(root: ShadowRoot): string[];
export declare function setWebComponentParts(hostEl: Element): void;
export declare function uuidv4(): string;
