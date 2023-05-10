/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { EventEmitter } from '../../../stencil-public-runtime';
import { TranslationService } from '../../../utils/translation.service';
export declare class MbApiProcessStatus {
  /**
   * Element visibility, default is 'false'.
   */
  visible: boolean;
  /**
   * State value of API processing received from parent element ('loading' or 'success').
   */
  state: 'ERROR' | 'LOADING' | 'NONE' | 'SUCCESS';
  /**
   * Instance of TranslationService passed from parent component.
   */
  translationService: TranslationService;
  /**
   * Emitted when user clicks on 'Retry' button.
   */
  closeTryAgain: EventEmitter<void>;
  /**
   * Emitted when user clicks on 'x' button.
   */
  closeFromStart: EventEmitter<void>;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  componentDidLoad(): void;
  render(): any;
}
