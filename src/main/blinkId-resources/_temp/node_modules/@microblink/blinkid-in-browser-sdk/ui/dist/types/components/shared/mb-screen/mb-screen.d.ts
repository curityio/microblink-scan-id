/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare class MbScreen {
  /**
   * Set to 'true' if screen should be visible.
   */
  visible: boolean;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  componentDidLoad(): void;
  render(): any;
}
