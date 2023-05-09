/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/* eslint-disable max-len */
/**
 * Structures of Error Codes, Error Messages, and CustomError compatible objects for the Error Generator utility.
 * Error Code convention: SECTION_OBJECT_(ACTION)_PROBLEM
 */
export var ErrorCodes;
(function (ErrorCodes) {
  ErrorCodes["BrowserNotSupported"] = "BROWSER_NOT_SUPPORTED";
  ErrorCodes["LicenseError"] = "LICENSE_ERROR";
  ErrorCodes["SdkLoadFailed"] = "SDK_LOAD_FAILED";
  ErrorCodes["InternetNotAvailable"] = "INTERNET_NOT_AVAILABLE";
  ErrorCodes["InvalidRecognizers"] = "INVALID_RECOGNIZERS";
})(ErrorCodes || (ErrorCodes = {}));
export var ErrorMessages;
(function (ErrorMessages) {
  ErrorMessages["BrowserNotSupported"] = "Browser is not supported!";
  ErrorMessages["LicenseError"] = "Something is wrong with the license.";
  ErrorMessages["SdkLoadFailed"] = "Failed to load SDK!";
})(ErrorMessages || (ErrorMessages = {}));
export const componentErrors = {
  browserNotSupported: {
    code: ErrorCodes.BrowserNotSupported,
    message: ErrorMessages.BrowserNotSupported,
  },
  licenseError: {
    code: ErrorCodes.LicenseError,
    message: ErrorMessages.LicenseError,
  },
  sdkLoadFailed: {
    code: ErrorCodes.SdkLoadFailed,
    message: ErrorMessages.SdkLoadFailed,
  }
};
