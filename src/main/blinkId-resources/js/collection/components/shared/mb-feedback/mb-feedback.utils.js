/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function getFeedbackClassName(state) {
  switch (state) {
    case 'FEEDBACK_ERROR':
      return 'error';
    case 'FEEDBACK_INFO':
      return 'info';
    default:
      return '';
  }
}
export { getFeedbackClassName };
