/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare class MbTooltip {
  show: boolean;
  message: string;
  arrowPosition?: 'arrow-left' | 'arrow-right' | 'arrow-up' | 'arrow-down' | 'arrow-none';
  showWarningIcon?: boolean;
  showInfoIcon?: boolean;
  textAlign?: 'text-center' | 'text-left' | 'text-right';
  containerWidth?: string;
  render(): any;
}
