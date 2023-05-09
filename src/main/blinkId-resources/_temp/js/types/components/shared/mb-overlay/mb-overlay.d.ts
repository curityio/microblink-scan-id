/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare class MbOverlay {
  /**
   * Set to 'false' if overlay should not cover whole screen.
   */
  fullscreen: boolean;
  /**
   * Set to 'true' if overlay should be visible.
   */
  visible: boolean;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  componentDidLoad(): void;
  getHostClassNames(): string;
  render(): any;
}
