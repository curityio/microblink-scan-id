/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { EventEmitter } from '../../../stencil-public-runtime';
import { CameraEntry } from '../../../utils/data-structures';
export declare class MbCameraSelection {
  activeCamera: CameraEntry;
  cameraList: Array<CameraEntry>;
  isListVisible: boolean;
  clearIsCameraActive: boolean;
  /**
   * Emitted when camera stream becomes active.
   */
  setIsCameraActive: EventEmitter<boolean>;
  /**
   * Emitted when user selects a different camera device.
   */
  changeCameraDevice: EventEmitter<CameraEntry>;
  /**
   * Change active camera.
   */
  setActiveCamera(cameraId: string): Promise<void>;
  /**
   * Populate list of camera devices.
   */
  populateCameraDevices(): Promise<void>;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  private handleListOpen;
  private handleCameraSelection;
  private setListVisibility;
  componentDidLoad(): void;
  render(): any;
}
