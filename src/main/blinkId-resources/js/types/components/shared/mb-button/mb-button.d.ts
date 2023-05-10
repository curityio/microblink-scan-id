/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare class MbButton {
  /** Function to call on click */
  clickHandler: (ev: UIEvent) => void;
  /**
   * Set to 'true' if button should be disabled, and if click events should not be triggered.
   */
  disabled: boolean;
  /**
   * Set to 'true' if button should be visible.
   */
  visible: boolean;
  /**
   * Set to 'true' if button should enter 'selected' state.
   */
  selected: boolean;
  /**
   * Passed image from parent component.
   */
  imageSrcDefault: string;
  /**
   * Passed image from parent component.
   */
  imageSrcActive: string;
  /**
   * Passed description text for image element from parent component.
   */
  imageAlt: string;
  /**
   * Set to string which should be displayed below the icon.
   *
   * If omitted, nothing will show.
   */
  label: string;
  buttonTitle: string;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  connectedCallback(): void;
  render(): any;
}
