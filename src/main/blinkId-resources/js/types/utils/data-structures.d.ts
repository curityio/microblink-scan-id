/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { EventEmitter } from '../stencil-public-runtime';
import * as BlinkIDSDK from '@microblink/blinkid-in-browser-sdk';
export { ProductIntegrationInfo, SDKError } from '@microblink/blinkid-in-browser-sdk';
export interface MicroblinkUI {
  allowHelloMessage: boolean;
  engineLocation: string;
  workerLocation: string;
  licenseKey: string;
  wasmType: string;
  rawRecognizers: string;
  recognizers: Array<string>;
  recognizerOptions: {
    [key: string]: any;
  };
  recognitionTimeout?: number;
  recognitionPauseTimeout?: number;
  includeSuccessFrame?: boolean;
  thoroughScanFromImage: boolean;
  enableDrag: boolean;
  hideFeedback: boolean;
  hideLoadingAndErrorUi: boolean;
  scanFromCamera: boolean;
  scanFromImage: boolean;
  translations: {
    [key: string]: string;
  };
  rawTranslations: string;
  galleryOverlayType: 'FULLSCREEN' | 'INLINE';
  galleryDropType: 'FULLSCREEN' | 'INLINE';
  showActionLabels: boolean;
  showModalWindows: boolean;
  showScanningLine?: boolean;
  showCameraFeedbackBarcodeMessage?: boolean;
  iconCameraDefault: string;
  iconCameraActive: string;
  iconGalleryDefault: string;
  iconGalleryActive: string;
  iconInvalidFormat: string;
  iconSpinnerScreenLoading: string;
  iconSpinnerFromGalleryExperience: string;
  iconGalleryScanningCompleted: string;
  fatalError: EventEmitter<BlinkIDSDK.SDKError>;
  ready: EventEmitter<EventReady>;
  scanError: EventEmitter<EventScanError>;
  scanSuccess: EventEmitter<EventScanSuccess>;
  cameraScanStarted: EventEmitter<null>;
  imageScanStarted: EventEmitter<null>;
  setUiState: (state: 'ERROR' | 'LOADING' | 'NONE' | 'SUCCESS') => Promise<any>;
  setUiMessage: (state: 'FEEDBACK_ERROR' | 'FEEDBACK_INFO' | 'FEEDBACK_OK', message: string) => Promise<any>;
  getProductIntegrationInfo: () => Promise<BlinkIDSDK.ProductIntegrationInfo>;
}
export interface SdkSettings {
  allowHelloMessage: boolean;
  engineLocation: string;
  workerLocation: string;
  wasmType?: BlinkIDSDK.WasmType;
}
/**
 * Events
 */
export declare class EventReady {
  sdk: BlinkIDSDK.WasmSDK;
  constructor(sdk: BlinkIDSDK.WasmSDK);
}
export declare class EventScanError {
  code: Code;
  fatal: boolean;
  message: string;
  recognizerName: string;
  details?: any;
  constructor(code: Code, fatal: boolean, message: string, recognizerName: string, details?: any);
}
export declare class EventScanSuccess {
  recognizer: BlinkIDSDK.RecognizerResult;
  recognizerName: string;
  successFrame?: BlinkIDSDK.SuccessFrameGrabberRecognizerResult;
  constructor(recognizer: BlinkIDSDK.RecognizerResult, recognizerName: string, successFrame?: BlinkIDSDK.SuccessFrameGrabberRecognizerResult);
}
export interface RecognitionResults {
  recognizer: BlinkIDSDK.RecognizerResult;
  successFrame?: BlinkIDSDK.SuccessFrameGrabberRecognizerResult;
}
/**
 * Error codes
 */
export declare enum Code {
  EmptyResult = "EMPTY_RESULT",
  InvalidRecognizerOptions = "INVALID_RECOGNIZER_OPTIONS",
  NoImageFileFound = "NO_IMAGE_FILE_FOUND",
  NoFirstImageFileFound = "NO_FIRST_IMAGE_FILE_FOUND",
  NoSecondImageFileFound = "NO_SECOND_IMAGE_FILE_FOUND",
  GenericScanError = "GENERIC_SCAN_ERROR",
  CameraNotAllowed = "CAMERA_NOT_ALLOWED",
  CameraInUse = "CAMERA_IN_USE",
  CameraGenericError = "CAMERA_GENERIC_ERROR"
}
/**
 * Scan structures
 */
export declare const AvailableRecognizers: {
  [key: string]: string;
};
export interface VideoRecognitionConfiguration {
  recognizers: Array<string>;
  recognizerOptions?: any;
  recognitionTimeout?: number;
  successFrame: boolean;
  cameraFeed: HTMLVideoElement;
  cameraId: string | null;
}
export interface ImageRecognitionConfiguration {
  recognizers: Array<string>;
  recognizerOptions?: any;
  thoroughScan?: boolean;
  file: File;
}
export interface CombinedImageRecognitionConfiguration {
  recognizers: Array<string>;
  recognizerOptions?: any;
  thoroughScan?: boolean;
  firstFile: File;
  secondFile: File;
}
export declare enum ImageRecognitionType {
  Single = "Single",
  Combined = "Combined"
}
export declare enum CombinedImageType {
  First = "First",
  Second = "Second"
}
export interface RecognizerInstance {
  name: string;
  recognizer: BlinkIDSDK.Recognizer & {
    objectHandle: number;
  };
  successFrame?: BlinkIDSDK.SuccessFrameGrabberRecognizer<BlinkIDSDK.Recognizer> & {
    objectHandle?: number;
  };
}
export declare enum RecognitionStatus {
  NoImageFileFound = "NoImageFileFound",
  NoFirstImageFileFound = "NoFirstImageFileFound",
  NoSecondImageFileFound = "NoSecondImageFileFound",
  Preparing = "Preparing",
  Ready = "Ready",
  Processing = "Processing",
  DetectionFailed = "DetectionFailed",
  EmptyResultState = "EmptyResultState",
  OnFirstSideResult = "OnFirstSideResult",
  ScanSuccessful = "ScanSuccessful",
  DocumentClassified = "DocumentClassified",
  DetectionStatusChange = "DetectionStatusChange",
  NoSupportForMediaDevices = "NoSupportForMediaDevices",
  CameraNotFound = "CameraNotFound",
  CameraNotAllowed = "CameraNotAllowed",
  UnableToAccessCamera = "UnableToAccessCamera",
  CameraInUse = "CameraInUse",
  CameraGenericError = "CameraGenericError",
  UnknownError = "UnknownError",
  BarcodeScanningStarted = "BarcodeScanningStarted",
  DetectionStatusFail = "Fail",
  DetectionStatusSuccess = "Success",
  DetectionStatusCameraTooHigh = "CameraTooHigh",
  DetectionStatusFallbackSuccess = "FallbackSuccess",
  DetectionStatusPartial = "Partial",
  DetectionStatusCameraAtAngle = "CameraAtAngle",
  DetectionStatusCameraTooNear = "CameraTooNear",
  DetectionStatusDocumentTooCloseToEdge = "DocumentTooCloseToEdge"
}
export interface RecognitionEvent {
  status: RecognitionStatus;
  data?: any;
}
export interface RecognitionResults {
  recognizer: BlinkIDSDK.RecognizerResult;
  recognizerName: string;
  successFrame?: BlinkIDSDK.SuccessFrameGrabberRecognizerResult;
  imageCapture?: boolean;
  resultSignedJSON?: BlinkIDSDK.SignedPayload;
}
export declare enum CameraExperience {
  Barcode = "BARCODE",
  CardCombined = "CARD_COMBINED",
  CardSingleSide = "CARD_SINGLE_SIDE",
  PaymentCard = "PAYMENT_CARD"
}
export declare enum CameraExperienceState {
  BarcodeScanning = "BarcodeScanning",
  AdjustAngle = "AdjustAngle",
  Classification = "Classification",
  Default = "Default",
  Detection = "Detection",
  Done = "Done",
  DoneAll = "DoneAll",
  Flip = "Flip",
  MoveCloser = "MoveCloser",
  MoveFarther = "MoveFarther"
}
export interface CameraExperienceTimeoutDurations {
  barcodeScanning: number;
  adjustAngle: number;
  default: number;
  done: number;
  doneAll: number;
  flip: number;
  moveCloser: number;
  moveFarther: number;
}
export declare const CameraExperienceStateDuration: Map<CameraExperienceState, number>;
/**
 * User feedback structures
 */
export declare enum FeedbackCode {
  CameraDisabled = "CAMERA_DISABLED",
  CameraGenericError = "CAMERA_GENERIC_ERROR",
  CameraInUse = "CAMERA_IN_USE",
  CameraNotAllowed = "CAMERA_NOT_ALLOWED",
  GenericScanError = "GENERIC_SCAN_ERROR",
  ScanStarted = "SCAN_STARTED",
  ScanUnsuccessful = "SCAN_UNSUCCESSFUL",
  ScanSuccessful = "SCAN_SUCCESSFUL"
}
export interface FeedbackMessage {
  code?: FeedbackCode;
  state: 'FEEDBACK_ERROR' | 'FEEDBACK_INFO' | 'FEEDBACK_OK';
  message: string;
}
/**
 * Camera selection
 */
export interface CameraEntry {
  prettyName: string;
  details: BlinkIDSDK.SelectedCamera | null;
}
