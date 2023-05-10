/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { FeedbackMessage } from '../../../utils/data-structures';
export declare class MbFeedback {
  paragraphClassName: string;
  paragraphValue: string;
  /**
   * Set to 'true' if component should be visible.
   */
  visible: boolean;
  /**
   * Call when FeedbackMessage which should be displayed.
   */
  show(feedback: FeedbackMessage): Promise<void>;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  componentDidLoad(): void;
  render(): any;
}
