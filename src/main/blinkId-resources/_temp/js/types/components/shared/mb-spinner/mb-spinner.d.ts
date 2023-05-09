/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare class MbSpinner {
  /**
   * Value of `src` attribute for <img> element.
   */
  icon: string;
  /**
   * Spinner size, can be 'default' or 'large'.
   */
  size: string;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  componentDidLoad(): void;
  render(): any;
}
