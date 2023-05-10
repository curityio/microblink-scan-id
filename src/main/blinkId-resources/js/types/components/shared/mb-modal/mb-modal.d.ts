/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { EventEmitter } from '../../../stencil-public-runtime';
export declare class MbModal {
  /**
   * Show modal content
   */
  visible: boolean;
  /**
   * Show shadow drop
   */
  elevated: boolean;
  /**
   * Center component
   */
  centered: boolean;
  /**
   * Passed title content from parent component
   */
  modalTitle: string;
  /**
   * Passed body content from parent component
   */
  content: string;
  /**
   * Center content inside modal
   */
  contentCentered: boolean;
  /**
   * Whether to show back arrow or not
   */
  showBackButton: boolean;
  /**
   * Whether to hide the footer or not
   */
  hideFooter: boolean;
  /**
   * Emitted when user clicks on 'X' button.
   */
  close: EventEmitter<void>;
  /**
   * Emitted when user clicks on 'Back Arrow' button.
   */
  back: EventEmitter<void>;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  componentDidLoad(): void;
  render(): any;
}
