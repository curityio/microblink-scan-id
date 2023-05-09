/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { EventEmitter } from '../../../stencil-public-runtime';
import { CameraExperienceTimeoutDurations, EventReady, EventScanError, EventScanSuccess, FeedbackMessage, SDKError } from '../../../utils/data-structures';
import { SdkService } from '../../../utils/sdk.service';
import { TranslationService } from '../../../utils/translation.service';
export declare class MbComponent {
  private screens;
  private overlays;
  private cameraExperience;
  private dragAndDropZone;
  private errorMessage;
  private scanFromCameraButton;
  private scanFromImageButton;
  private scanFromImageInput;
  private videoElement;
  private licenseExperienceModal;
  private scanReset;
  private detectionSuccessLock;
  private isBackSide;
  private initialBodyOverflowValue;
  private cameraChangeInProgress;
  private blocked;
  private combinedGalleryOpened;
  private imageRecognitionType;
  private imageBoxFirst;
  private imageBoxSecond;
  private galleryImageFirstFile;
  private galleryImageSecondFile;
  private combinedScanFromImageButton;
  private isCameraActive;
  galleryExperienceModalErrorWindowVisible: boolean;
  clearIsCameraActive: boolean;
  apiProcessStatusVisible: boolean;
  apiProcessStatusState: 'ERROR' | 'LOADING' | 'NONE' | 'SUCCESS';
  /**
   * Host element as variable for manipulation (CSS in this case)
   */
  hostEl: HTMLElement;
  /**
   * See description in public component.
   */
  allowHelloMessage: boolean;
  /**
   * See description in public component.
   */
  engineLocation: string;
  /**
   * See description in public component.
   */
  workerLocation: string;
  /**
   * See description in public component.
   */
  licenseKey: string;
  /**
   * See description in public component.
   */
  wasmType: string | null;
  /**
   * See description in public component.
   */
  recognizers: Array<string>;
  /**
   * See description in public component.
   */
  recognizerOptions: {
    [key: string]: any;
  };
  /**
   * See description in public component.
   */
  recognitionTimeout: number;
  /**
   * See description in public component.
   */
  recognitionPauseTimeout: number;
  /**
   * See description in public component.
   */
  cameraExperienceStateDurations: CameraExperienceTimeoutDurations;
  /**
   * See description in public component.
   */
  includeSuccessFrame: boolean;
  /**
   * See description in public component.
   */
  enableDrag: boolean;
  /**
   * See description in public component.
   */
  hideLoadingAndErrorUi: boolean;
  /**
   * See description in public component.
   */
  rtl: boolean;
  /**
   * See description in public component.
   */
  scanFromCamera: boolean;
  /**
   * See description in public component.
   */
  scanFromImage: boolean;
  /**
   * See description in public component.
   */
  thoroughScanFromImage: boolean;
  /**
   * See description in public component.
   */
  galleryOverlayType: 'FULLSCREEN' | 'INLINE';
  /**
   * See description in public component.
   */
  galleryDropType: 'FULLSCREEN' | 'INLINE';
  /**
   * See description in public component.
   */
  showActionLabels: boolean;
  /**
   * See description in public component.
   */
  showModalWindows: boolean;
  /**
   * See description in public component.
   */
  showCameraFeedbackBarcodeMessage: boolean;
  /**
   * See description in public component.
   */
  showScanningLine: boolean;
  /**
   * See description in public component.
   */
  iconCameraDefault: string;
  /**
  * See description in public component.
  */
  iconCameraActive: string;
  /**
  * See description in public component.
  */
  iconGalleryDefault: string;
  /**
   * See description in public component.
   */
  iconDragAndDropGalleryDefault: string;
  /**
   * See description in public component.
   */
  iconDragAndDropWarningDefault: string;
  /**
   * See description in public component.
   */
  iconGalleryActive: string;
  /**
   * See description in public component.
   */
  iconInvalidFormat: string;
  /**
   * See description in public component.
   */
  iconSpinnerScreenLoading: string;
  /**
   * See description in public component.
   */
  iconSpinnerFromGalleryExperience: string;
  /**
   * See description in public component.
   */
  iconGalleryScanningCompleted: string;
  /**
    * Instance of SdkService passed from root component.
    */
  sdkService: SdkService;
  /**
   * Instance of TranslationService passed from root component.
   */
  translationService: TranslationService;
  /**
   * Camera device ID passed from root component.
   */
  cameraId: string | null;
  /**
   * Event containing boolean which used to check whether component is blocked.
   */
  block: EventEmitter<boolean>;
  /**
   * See event 'fatalError' in public component.
   */
  fatalError: EventEmitter<SDKError>;
  /**
   * See event 'ready' in public component.
   */
  ready: EventEmitter<EventReady>;
  /**
   * See event 'scanError' in public component.
   */
  scanError: EventEmitter<EventScanError>;
  /**
   * See event 'scanSuccess' in public component.
   */
  scanSuccess: EventEmitter<EventScanSuccess>;
  /**
   * Event containing FeedbackMessage which can be passed to MbFeedback component.
   */
  feedback: EventEmitter<FeedbackMessage>;
  /**
   * See event 'cameraScanStarted' in public component.
   */
  cameraScanStarted: EventEmitter<null>;
  /**
   * See event 'imageScanStarted' in public component.
   */
  imageScanStarted: EventEmitter<null>;
  /**
   * See event 'scanAborted' in public component.
   */
  scanAborted: EventEmitter<null>;
  /**
   * Emitted when camera stream becomes active.
   */
  setIsCameraActive: EventEmitter<boolean>;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  disconnectedCallback(): void;
  handleKeyUp(ev: KeyboardEvent): void;
  private handleSetIsCameraActive;
  /**
   * Starts camera scan using camera overlay with usage instructions.
   */
  startCameraScan(): Promise<void>;
  /**
   * Starts image scan, emits results from provided file.
   *
   * @param file File to scan
   */
  startImageScan(file: File): Promise<void>;
  /**
   * Starts combined image scan, emits results from provided files.
   *
   * @param firstFile File to scan as first image
   * @param secondFile File to scan as second image
   */
  startCombinedImageScan(firstFile: File, secondFile: File): Promise<void>;
  /**
   * Method is exposed outside which allow us to control UI state from parent component.
   *
   * In case of state `ERROR` and if `showModalWindows` is set to `true`, modal window
   * with error message will be displayed.
   */
  setUiState(state: 'ERROR' | 'LOADING' | 'NONE' | 'SUCCESS'): Promise<void>;
  closeApiProcessStatus(restart?: boolean): Promise<void>;
  private init;
  private flipCameraAction;
  private changeCameraDevice;
  private checkInputProperties;
  private openDeviceModal;
  private startScanFromCamera;
  private startScanFromImage;
  private startScanFromImageCombined;
  private handleScanError;
  private showLicenseInfoModal;
  private showScreen;
  private showOverlay;
  private setDragAndDrop;
  private setFatalError;
  private abortScan;
  private stopRecognition;
  private closeGalleryExperienceModal;
  private onFromImageClicked;
  private clearInputImages;
  private openCombinedGalleryUpload;
  private closeCombinedGalleryUpload;
  private onCombinedImageChange;
  private showScanFromImageUi;
  private hideScanFromImageUi;
  render(): any;
}
