/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Event, Host, h, Method, Prop, State, Listen } from '@stencil/core';
import { CameraExperienceState, Code, CombinedImageType, FeedbackCode, ImageRecognitionType, RecognitionStatus, SDKError } from '../../../utils/data-structures';
import * as ErrorTypes from '../../../utils/error-structures';
import * as BlinkIDSDK from '../../../../../es/blinkid-sdk';
import * as DeviceHelpers from '../../../utils/device.helpers';
import * as GenericHelpers from '../../../utils/generic.helpers';
import * as Utils from './mb-component.utils';
export class MbComponent {
  constructor() {
    this.screens = {
      action: null,
      error: null,
      loading: null,
      processing: null
    };
    this.overlays = {
      camera: null,
      draganddrop: null,
      processing: null,
      modal: null,
      deviceselection: null,
      deviceselectionmobile: null
    };
    this.scanReset = false;
    this.detectionSuccessLock = false;
    this.isBackSide = false;
    this.cameraChangeInProgress = false;
    this.blocked = false;
    this.combinedGalleryOpened = false;
    this.galleryImageFirstFile = null;
    this.galleryImageSecondFile = null;
    this.isCameraActive = false;
    this.galleryExperienceModalErrorWindowVisible = false;
    this.clearIsCameraActive = false;
    this.apiProcessStatusVisible = false;
    this.apiProcessStatusState = 'NONE';
    /**
     * See description in public component.
     */
    this.allowHelloMessage = true;
    /**
     * See description in public component.
     */
    this.engineLocation = '';
    /**
     * See description in public component.
     */
    this.workerLocation = '';
    /**
     * See description in public component.
     */
    this.cameraExperienceStateDurations = null;
    /**
     * See description in public component.
     */
    this.includeSuccessFrame = false;
    /**
     * See description in public component.
     */
    this.enableDrag = true;
    /**
     * See description in public component.
     */
    this.hideLoadingAndErrorUi = false;
    /**
     * See description in public component.
     */
    this.rtl = false;
    /**
     * See description in public component.
     */
    this.scanFromCamera = true;
    /**
     * See description in public component.
     */
    this.scanFromImage = true;
    /**
     * See description in public component.
     */
    this.thoroughScanFromImage = false;
    /**
     * See description in public component.
     */
    this.galleryOverlayType = 'INLINE';
    /**
     * See description in public component.
     */
    this.galleryDropType = 'INLINE';
    /**
     * See description in public component.
     */
    this.showActionLabels = false;
    /**
     * See description in public component.
     */
    this.showModalWindows = false;
    /**
     * See description in public component.
     */
    this.showCameraFeedbackBarcodeMessage = false;
    /**
     * See description in public component.
     */
    this.showScanningLine = false;
    /**
     * See description in public component.
     */
    this.iconCameraDefault = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.32151 2.98816C6.63407 2.6756 7.05799 2.5 7.50002 2.5H12.5C12.942 2.5 13.366 2.6756 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667C14.1667 4.38768 14.2545 4.59964 14.4108 4.75592C14.567 4.9122 14.779 5 15 5H15.8334C16.4964 5 17.1323 5.26339 17.6011 5.73223C18.07 6.20107 18.3334 6.83696 18.3334 7.5V15C18.3334 15.663 18.07 16.2989 17.6011 16.7678C17.1323 17.2366 16.4964 17.5 15.8334 17.5H4.16669C3.50365 17.5 2.86776 17.2366 2.39892 16.7678C1.93008 16.2989 1.66669 15.663 1.66669 15V7.5C1.66669 6.83696 1.93008 6.20107 2.39892 5.73223C2.86776 5.26339 3.50365 5 4.16669 5H5.00002C5.22103 5 5.433 4.9122 5.58928 4.75592C5.74556 4.59964 5.83335 4.38768 5.83335 4.16667C5.83335 3.72464 6.00895 3.30072 6.32151 2.98816ZM4.16669 6.66667C3.94567 6.66667 3.73371 6.75446 3.57743 6.91074C3.42115 7.06702 3.33335 7.27899 3.33335 7.5V15C3.33335 15.221 3.42115 15.433 3.57743 15.5893C3.73371 15.7455 3.94567 15.8333 4.16669 15.8333H15.8334C16.0544 15.8333 16.2663 15.7455 16.4226 15.5893C16.5789 15.433 16.6667 15.221 16.6667 15V7.5C16.6667 7.27899 16.5789 7.06702 16.4226 6.91074C16.2663 6.75446 16.0544 6.66667 15.8334 6.66667H15C14.337 6.66667 13.7011 6.40327 13.2323 5.93443C12.7634 5.46559 12.5 4.82971 12.5 4.16667L7.50002 4.16667C7.50002 4.82971 7.23663 5.46559 6.76779 5.93443C6.29895 6.40327 5.66306 6.66667 5.00002 6.66667H4.16669Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.16667C9.07955 9.16667 8.33335 9.91286 8.33335 10.8333C8.33335 11.7538 9.07955 12.5 10 12.5C10.9205 12.5 11.6667 11.7538 11.6667 10.8333C11.6667 9.91286 10.9205 9.16667 10 9.16667ZM6.66669 10.8333C6.66669 8.99238 8.15907 7.5 10 7.5C11.841 7.5 13.3334 8.99238 13.3334 10.8333C13.3334 12.6743 11.841 14.1667 10 14.1667C8.15907 14.1667 6.66669 12.6743 6.66669 10.8333Z" fill="black"/></svg>';
    /**
    * See description in public component.
    */
    this.iconCameraActive = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.32151 2.98816C6.63407 2.6756 7.05799 2.5 7.50002 2.5H12.5C12.942 2.5 13.366 2.6756 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667C14.1667 4.38768 14.2545 4.59964 14.4108 4.75592C14.567 4.9122 14.779 5 15 5H15.8334C16.4964 5 17.1323 5.26339 17.6011 5.73223C18.07 6.20107 18.3334 6.83696 18.3334 7.5V15C18.3334 15.663 18.07 16.2989 17.6011 16.7678C17.1323 17.2366 16.4964 17.5 15.8334 17.5H4.16669C3.50365 17.5 2.86776 17.2366 2.39892 16.7678C1.93008 16.2989 1.66669 15.663 1.66669 15V7.5C1.66669 6.83696 1.93008 6.20107 2.39892 5.73223C2.86776 5.26339 3.50365 5 4.16669 5H5.00002C5.22103 5 5.433 4.9122 5.58928 4.75592C5.74556 4.59964 5.83335 4.38768 5.83335 4.16667C5.83335 3.72464 6.00895 3.30072 6.32151 2.98816ZM4.16669 6.66667C3.94567 6.66667 3.73371 6.75446 3.57743 6.91074C3.42115 7.06702 3.33335 7.27899 3.33335 7.5V15C3.33335 15.221 3.42115 15.433 3.57743 15.5893C3.73371 15.7455 3.94567 15.8333 4.16669 15.8333H15.8334C16.0544 15.8333 16.2663 15.7455 16.4226 15.5893C16.5789 15.433 16.6667 15.221 16.6667 15V7.5C16.6667 7.27899 16.5789 7.06702 16.4226 6.91074C16.2663 6.75446 16.0544 6.66667 15.8334 6.66667H15C14.337 6.66667 13.7011 6.40327 13.2323 5.93443C12.7634 5.46559 12.5 4.82971 12.5 4.16667L7.50002 4.16667C7.50002 4.82971 7.23663 5.46559 6.76779 5.93443C6.29895 6.40327 5.66306 6.66667 5.00002 6.66667H4.16669Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.16667C9.07955 9.16667 8.33335 9.91286 8.33335 10.8333C8.33335 11.7538 9.07955 12.5 10 12.5C10.9205 12.5 11.6667 11.7538 11.6667 10.8333C11.6667 9.91286 10.9205 9.16667 10 9.16667ZM6.66669 10.8333C6.66669 8.99238 8.15907 7.5 10 7.5C11.841 7.5 13.3334 8.99238 13.3334 10.8333C13.3334 12.6743 11.841 14.1667 10 14.1667C8.15907 14.1667 6.66669 12.6743 6.66669 10.8333Z" fill="%2348B2E8"/></svg>';
    /**
    * See description in public component.
    */
    this.iconGalleryDefault = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6667 6.66666C11.6667 6.20642 12.0398 5.83333 12.5 5.83333H12.5084C12.9686 5.83333 13.3417 6.20642 13.3417 6.66666C13.3417 7.1269 12.9686 7.5 12.5084 7.5H12.5C12.0398 7.5 11.6667 7.1269 11.6667 6.66666Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.83333 4.16667C4.91286 4.16667 4.16667 4.91286 4.16667 5.83333V14.1667C4.16667 15.0871 4.91286 15.8333 5.83333 15.8333H14.1667C15.0871 15.8333 15.8333 15.0871 15.8333 14.1667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1667 4.16667H5.83333ZM2.5 5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H14.1667C16.0076 2.5 17.5 3.99238 17.5 5.83333V14.1667C17.5 16.0076 16.0076 17.5 14.1667 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1667V5.83333Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.24972 9.76212L3.92259 13.0892C3.59715 13.4147 3.06951 13.4147 2.74408 13.0892C2.41864 12.7638 2.41864 12.2362 2.74408 11.9107L6.07741 8.57741L6.08885 8.56618C6.59083 8.08315 7.22016 7.7751 7.91667 7.7751C8.61317 7.7751 9.2425 8.08315 9.74448 8.56618L9.75592 8.57741L13.9226 12.7441C14.248 13.0695 14.248 13.5971 13.9226 13.9226C13.5972 14.248 13.0695 14.248 12.7441 13.9226L8.58361 9.76212C8.32758 9.51773 8.09662 9.44177 7.91667 9.44177C7.73672 9.44177 7.50575 9.51773 7.24972 9.76212Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.083 11.4288L12.2559 12.2559C11.9305 12.5814 11.4028 12.5814 11.0774 12.2559C10.752 11.9305 10.752 11.4028 11.0774 11.0774L11.9107 10.2441L11.9222 10.2329C12.4241 9.74982 13.0535 9.44177 13.75 9.44177C14.4465 9.44177 15.0758 9.74982 15.5778 10.2329L15.5892 10.2441L17.2559 11.9107C17.5813 12.2362 17.5813 12.7638 17.2559 13.0893C16.9305 13.4147 16.4028 13.4147 16.0774 13.0893L14.4169 11.4288C14.1609 11.1844 13.9299 11.1084 13.75 11.1084C13.57 11.1084 13.3391 11.1844 13.083 11.4288Z" fill="black"/></svg>';
    /**
     * See description in public component.
     */
    this.iconDragAndDropGalleryDefault = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNCA4QzE0IDcuNDQ3NzIgMTQuNDQ3NyA3IDE1IDdIMTUuMDFDMTUuNTYyMyA3IDE2LjAxIDcuNDQ3NzIgMTYuMDEgOEMxNi4wMSA4LjU1MjI4IDE1LjU2MjMgOSAxNS4wMSA5SDE1QzE0LjQ0NzcgOSAxNCA4LjU1MjI4IDE0IDhaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNyA1QzUuODk1NDMgNSA1IDUuODk1NDMgNSA3VjE3QzUgMTguMTA0NiA1Ljg5NTQzIDE5IDcgMTlIMTdDMTguMTA0NiAxOSAxOSAxOC4xMDQ2IDE5IDE3VjdDMTkgNS44OTU0MyAxOC4xMDQ2IDUgMTcgNUg3Wk0zIDdDMyA0Ljc5MDg2IDQuNzkwODYgMyA3IDNIMTdDMTkuMjA5MSAzIDIxIDQuNzkwODYgMjEgN1YxN0MyMSAxOS4yMDkxIDE5LjIwOTEgMjEgMTcgMjFIN0M0Ljc5MDg2IDIxIDMgMTkuMjA5MSAzIDE3VjdaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOC42OTk2NiAxMS43MTQ1TDQuNzA3MTEgMTUuNzA3MUM0LjMxNjU4IDE2LjA5NzYgMy42ODM0MiAxNi4wOTc2IDMuMjkyODkgMTUuNzA3MUMyLjkwMjM3IDE1LjMxNjUgMi45MDIzNyAxNC42ODM0IDMuMjkyODkgMTQuMjkyOEw3LjI5Mjg5IDEwLjI5MjhMNy4zMDY2MiAxMC4yNzk0QzcuOTA5IDkuNjk5NzQgOC42NjQxOSA5LjMzMDA4IDkuNSA5LjMzMDA4QzEwLjMzNTggOS4zMzAwOCAxMS4wOTEgOS42OTk3NCAxMS42OTM0IDEwLjI3OTRMMTEuNzA3MSAxMC4yOTI4TDE2LjcwNzEgMTUuMjkyOEMxNy4wOTc2IDE1LjY4MzQgMTcuMDk3NiAxNi4zMTY1IDE2LjcwNzEgMTYuNzA3MUMxNi4zMTY2IDE3LjA5NzYgMTUuNjgzNCAxNy4wOTc2IDE1LjI5MjkgMTYuNzA3MUwxMC4zMDAzIDExLjcxNDVDOS45OTMxIDExLjQyMTIgOS43MTU5NCAxMS4zMzAxIDkuNSAxMS4zMzAxQzkuMjg0MDYgMTEuMzMwMSA5LjAwNjkgMTEuNDIxMiA4LjY5OTY2IDExLjcxNDVaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuNjk5NyAxMy43MTQ1TDE0LjcwNzEgMTQuNzA3MUMxNC4zMTY2IDE1LjA5NzYgMTMuNjgzNCAxNS4wOTc2IDEzLjI5MjkgMTQuNzA3MUMxMi45MDI0IDE0LjMxNjUgMTIuOTAyNCAxMy42ODM0IDEzLjI5MjkgMTMuMjkyOEwxNC4yOTI5IDEyLjI5MjhMMTQuMzA2NiAxMi4yNzk0QzE0LjkwOSAxMS42OTk3IDE1LjY2NDIgMTEuMzMwMSAxNi41IDExLjMzMDFDMTcuMzM1OCAxMS4zMzAxIDE4LjA5MSAxMS42OTk3IDE4LjY5MzQgMTIuMjc5NEwxOC43MDcxIDEyLjI5MjhMMjAuNzA3MSAxNC4yOTI4QzIxLjA5NzYgMTQuNjgzNCAyMS4wOTc2IDE1LjMxNjUgMjAuNzA3MSAxNS43MDcxQzIwLjMxNjYgMTYuMDk3NiAxOS42ODM0IDE2LjA5NzYgMTkuMjkyOSAxNS43MDcxTDE3LjMwMDMgMTMuNzE0NUMxNi45OTMxIDEzLjQyMTIgMTYuNzE1OSAxMy4zMzAxIDE2LjUgMTMuMzMwMUMxNi4yODQxIDEzLjMzMDEgMTYuMDA2OSAxMy40MjEyIDE1LjY5OTcgMTMuNzE0NVoiIGZpbGw9IiMwMDYyRjIiLz4KPC9zdmc+Cg==';
    /**
     * See description in public component.
     */
    this.iconDragAndDropWarningDefault = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiA4QzEyLjU1MjMgOCAxMyA4LjQ0NzcyIDEzIDlWMTFDMTMgMTEuNTUyMyAxMi41NTIzIDEyIDEyIDEyQzExLjQ0NzcgMTIgMTEgMTEuNTUyMyAxMSAxMVY5QzExIDguNDQ3NzIgMTEuNDQ3NyA4IDEyIDhaTTEyIDE0QzEyLjU1MjMgMTQgMTMgMTQuNDQ3NyAxMyAxNVYxNS4wMUMxMyAxNS41NjIzIDEyLjU1MjMgMTYuMDEgMTIgMTYuMDFDMTEuNDQ3NyAxNi4wMSAxMSAxNS41NjIzIDExIDE1LjAxVjE1QzExIDE0LjQ0NzcgMTEuNDQ3NyAxNCAxMiAxNFoiIGZpbGw9IiNFMTFENDgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC40NzY0IDIuMzgzOTdDMTAuOTM4MSAyLjExMTgxIDExLjQ2NDIgMS45NjgyNiAxMi4wMDAxIDEuOTY4MjZDMTIuNTM1OSAxLjk2ODI2IDEzLjA2MjEgMi4xMTE4MSAxMy41MjM3IDIuMzgzOTdDMTMuOTgzMSAyLjY1NDg1IDE0LjM2MiAzLjA0MzMgMTQuNjIxNCAzLjUwOTI1TDIxLjYxODMgMTUuNzUzOUMyMS42NDA0IDE1Ljc5MjUgMjEuNjU5OCAxNS44MzI1IDIxLjY3NjUgMTUuODczN0MyMS44NTY2IDE2LjMxNzEgMjEuOTI4IDE2Ljc5NzEgMjEuODg0OCAxNy4yNzM3QzIxLjg0MTYgMTcuNzUwMiAyMS42ODUgMTguMjA5NiAyMS40MjgxIDE4LjYxMzNDMjEuMTcxMSAxOS4wMTcgMjAuODIxNCAxOS4zNTM0IDIwLjQwOCAxOS41OTQ0QzE5Ljk5NDUgMTkuODM1NCAxOS41Mjk0IDE5Ljk3NDEgMTkuMDUxNSAxOS45OTg3QzE5LjAzNDQgMTkuOTk5NiAxOS4wMTcyIDIwIDE5LjAwMDEgMjBINS4wNzAwNUM1LjA1ODU3IDIwIDUuMDQ3MTQgMTkuOTk5OCA1LjAzNTc1IDE5Ljk5OTRDNS4wMDY5NiAyMC4wMDA0IDQuOTc3ODggMjAuMDAwMiA0Ljk0ODU3IDE5Ljk5ODdDNC40NzA2NiAxOS45NzQxIDQuMDA1NTggMTkuODM1NCAzLjU5MjE2IDE5LjU5NDRDMy4xNzg3MyAxOS4zNTM0IDIuODI4OTYgMTkuMDE3IDIuNTcyMDQgMTguNjEzM0MyLjMxNTEzIDE4LjIwOTYgMi4xNTg1MiAxNy43NTAyIDIuMTE1MjkgMTcuMjczN0MyLjA3MjA3IDE2Ljc5NzEgMi4xNDM0OCAxNi4zMTcxIDIuMzIzNTcgMTUuODczN0MyLjM0MDMgMTUuODMyNSAyLjM1OTc1IDE1Ljc5MjUgMi4zODE4MSAxNS43NTM5TDkuMzc4NzQgMy41MDkyNUM5LjYzODA4IDMuMDQzMyAxMC4wMTcgMi42NTQ4NSAxMC40NzY0IDIuMzgzOTdaTTUuMDM3NjcgMTguMDAwNUM1LjA0ODQyIDE4LjAwMDIgNS4wNTkyMiAxOCA1LjA3MDA1IDE4SDE4Ljk2OTlDMTkuMTIxNyAxNy45ODg5IDE5LjI2OTEgMTcuOTQzMyAxOS40MDA3IDE3Ljg2NjZDMTkuNTM4NSAxNy43ODYzIDE5LjY1NTEgMTcuNjc0MSAxOS43NDA3IDE3LjUzOTVDMTkuODI2NCAxNy40MDUgMTkuODc4NiAxNy4yNTE5IDE5Ljg5MyAxNy4wOTNDMTkuOTA1NyAxNi45NTI1IDE5Ljg4ODYgMTYuODExMiAxOS44NDMgMTYuNjc4MkwxMi44NzUgNC40ODQxOEMxMi43ODg1IDQuMzI3ODggMTIuNjYxOCA0LjE5NzU1IDEyLjUwNzkgNC4xMDY4M0MxMi4zNTQxIDQuMDE2MTEgMTIuMTc4NyAzLjk2ODI2IDEyLjAwMDEgMy45NjgyNkMxMS44MjE0IDMuOTY4MjYgMTEuNjQ2MSA0LjAxNjExIDExLjQ5MjIgNC4xMDY4M0MxMS4zMzgzIDQuMTk3NTUgMTEuMjExNSA0LjMyNzg0IDExLjEyNTEgNC40ODQxNEwxMS4xMTg0IDQuNDk2Mkw0LjE1NzE0IDE2LjY3ODJDNC4xMTE1MSAxNi44MTEyIDQuMDk0MzggMTYuOTUyNSA0LjEwNzEyIDE3LjA5M0M0LjEyMTUyIDE3LjI1MTkgNC4xNzM3MyAxNy40MDUgNC4yNTkzNyAxNy41Mzk1QzQuMzQ1MDEgMTcuNjc0MSA0LjQ2MTYgMTcuNzg2MyA0LjU5OTQgMTcuODY2NkM0LjczMzIxIDE3Ljk0NDYgNC44ODMyNCAxNy45OTA0IDUuMDM3NjcgMTguMDAwNVoiIGZpbGw9IiNFMTFENDgiLz4KPC9zdmc+Cg==';
    /**
     * See description in public component.
     */
    this.iconGalleryActive = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6667 6.66667C11.6667 6.20643 12.0398 5.83334 12.5 5.83334H12.5084C12.9686 5.83334 13.3417 6.20643 13.3417 6.66667C13.3417 7.12691 12.9686 7.5 12.5084 7.5H12.5C12.0398 7.5 11.6667 7.12691 11.6667 6.66667Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.83333 4.16667C4.91286 4.16667 4.16667 4.91286 4.16667 5.83333V14.1667C4.16667 15.0871 4.91286 15.8333 5.83333 15.8333H14.1667C15.0871 15.8333 15.8333 15.0871 15.8333 14.1667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1667 4.16667H5.83333ZM2.5 5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H14.1667C16.0076 2.5 17.5 3.99238 17.5 5.83333V14.1667C17.5 16.0076 16.0076 17.5 14.1667 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1667V5.83333Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.24972 9.76213L3.92259 13.0893C3.59715 13.4147 3.06951 13.4147 2.74408 13.0893C2.41864 12.7638 2.41864 12.2362 2.74408 11.9107L6.07741 8.57741L6.08885 8.56619C6.59083 8.08316 7.22016 7.77511 7.91667 7.77511C8.61317 7.77511 9.2425 8.08316 9.74448 8.56619L9.75592 8.57741L13.9226 12.7441C14.248 13.0695 14.248 13.5972 13.9226 13.9226C13.5972 14.248 13.0695 14.248 12.7441 13.9226L8.58361 9.76213C8.32758 9.51774 8.09662 9.44177 7.91667 9.44177C7.73672 9.44177 7.50575 9.51774 7.24972 9.76213Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.083 11.4288L12.2559 12.2559C11.9305 12.5814 11.4028 12.5814 11.0774 12.2559C10.752 11.9305 10.752 11.4028 11.0774 11.0774L11.9107 10.2441L11.9222 10.2329C12.4241 9.74982 13.0535 9.44177 13.75 9.44177C14.4465 9.44177 15.0758 9.74982 15.5778 10.2329L15.5892 10.2441L17.2559 11.9107C17.5813 12.2362 17.5813 12.7638 17.2559 13.0893C16.9305 13.4147 16.4028 13.4147 16.0774 13.0893L14.4169 11.4288C14.1609 11.1844 13.9299 11.1084 13.75 11.1084C13.57 11.1084 13.3391 11.1844 13.083 11.4288Z" fill="%2348B2E8"/></svg>';
    /**
     * See description in public component.
     */
    this.iconInvalidFormat = 'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 9.29289C9.68342 8.90237 10.3166 8.90237 10.7071 9.29289L12 10.5858L13.2929 9.29289C13.6834 8.90237 14.3166 8.90237 14.7071 9.29289C15.0976 9.68342 15.0976 10.3166 14.7071 10.7071L13.4142 12L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L12 13.4142L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L10.5858 12L9.29289 10.7071C8.90237 10.3166 8.90237 9.68342 9.29289 9.29289Z" fill="black"/></svg>';
    /**
     * Camera device ID passed from root component.
     */
    this.cameraId = null;
  }
  componentDidLoad() {
    // Set `exportparts` attribute on root `mb-component` element to enable ::part() CSS customization
    GenericHelpers.setWebComponentParts(this.hostEl);
    const parts = GenericHelpers.getWebComponentParts(this.hostEl.shadowRoot);
    const exportedParts = GenericHelpers.getWebComponentExportedParts(this.hostEl.shadowRoot);
    this.hostEl.setAttribute('exportparts', parts.concat(exportedParts).join(', '));
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.sdkService) === null || _a === void 0 ? void 0 : _a.stopRecognition();
  }
  handleKeyUp(ev) {
    if (ev.key === 'Escape' || ev.code === 'Escape') {
      if (this.overlays.camera.visible && this.isCameraActive) {
        this.abortScan();
        this.handleSetIsCameraActive(false);
        this.clearIsCameraActive = true;
      }
    }
  }
  handleSetIsCameraActive(isCameraActive) {
    this.isCameraActive = isCameraActive;
    this.clearIsCameraActive = false;
  }
  /**
   * Starts camera scan using camera overlay with usage instructions.
   */
  async startCameraScan() {
    this.startScanFromCamera();
  }
  /**
   * Starts image scan, emits results from provided file.
   *
   * @param file File to scan
   */
  async startImageScan(file) {
    this.startScanFromImage(file);
  }
  /**
   * Starts combined image scan, emits results from provided files.
   *
   * @param firstFile File to scan as first image
   * @param secondFile File to scan as second image
   */
  async startCombinedImageScan(firstFile, secondFile) {
    this.startScanFromImageCombined(firstFile, secondFile);
  }
  /**
   * Method is exposed outside which allow us to control UI state from parent component.
   *
   * In case of state `ERROR` and if `showModalWindows` is set to `true`, modal window
   * with error message will be displayed.
   */
  async setUiState(state) {
    window.setTimeout(() => {
      if (this.overlays.camera.visible) {
        if (state === 'ERROR' && !this.showModalWindows) {
          this.apiProcessStatusState = 'NONE';
          this.apiProcessStatusVisible = false;
          this.stopRecognition();
          return;
        }
        this.apiProcessStatusState = state;
        this.apiProcessStatusVisible = true;
        if (state !== 'ERROR') {
          this.cameraExperience.classList.add('is-muted');
        }
        else {
          this.cameraExperience.classList.add('is-error');
        }
        this.cameraExperience.apiState = state;
      }
      else if (this.overlays.processing.visible) {
        if (state === 'ERROR') {
          if (this.showModalWindows) {
            this.galleryExperienceModalErrorWindowVisible = true;
          }
          else {
            this.galleryExperienceModalErrorWindowVisible = false;
            this.stopRecognition();
          }
        }
      }
      if (state === 'SUCCESS') {
        window.setTimeout(() => this.stopRecognition(), 400);
      }
      if (state === 'ERROR') {
        this.hideScanFromImageUi(false);
        this.clearInputImages();
      }
    }, 400);
  }
  async closeApiProcessStatus(restart = false) {
    window.setTimeout(() => {
      this.apiProcessStatusVisible = false;
      this.apiProcessStatusState = 'NONE';
      this.cameraExperience.classList.remove('is-muted');
      this.cameraExperience.classList.remove('is-error');
    }, 600);
    if (restart) {
      await this.checkInputProperties()
        .then(() => this.sdkService.resumeRecognition())
        .then(() => {
        window.setTimeout(() => this.cameraExperience.apiState = '', 400);
        this.isBackSide = false;
        this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide, true);
      });
    }
  }
  async init() {
    if (!this.hideLoadingAndErrorUi) {
      this.showScreen('loading');
      this.showOverlay('');
    }
    if (this.blocked) {
      return;
    }
    const internetIsAvailable = navigator.onLine;
    if (!internetIsAvailable) {
      this.setFatalError(new SDKError({
        code: ErrorTypes.ErrorCodes.InternetNotAvailable,
        message: this.translationService.i('check-internet-connection').toString()
      }));
      return;
    }
    const hasMandatoryProperties = await this.checkInputProperties();
    if (!hasMandatoryProperties) {
      return;
    }
    const hasMandatoryCapabilities = await DeviceHelpers.checkMandatoryCapabilites();
    if (!hasMandatoryCapabilities) {
      this.setFatalError(new SDKError(ErrorTypes.componentErrors.browserNotSupported));
      return;
    }
    this.blocked = true;
    this.block.emit(true);
    const initEvent = await this.sdkService.initialize(this.licenseKey, {
      allowHelloMessage: this.allowHelloMessage,
      engineLocation: this.engineLocation,
      workerLocation: this.workerLocation,
      wasmType: Utils.getSDKWasmType(this.wasmType)
    });
    this.cameraExperience.showOverlay = this.sdkService.showOverlay;
    if (initEvent instanceof SDKError) {
      this.setFatalError(initEvent);
      return;
    }
    if (this.showActionLabels) {
      this.scanFromCameraButton.label = this.translationService.i('action-message-camera').toString();
      this.scanFromImageButton.label = this.translationService.i('action-message-image').toString();
    }
    if (this.scanFromCamera) {
      this.scanFromCameraButton.visible = true;
      const hasVideoDevices = await DeviceHelpers.hasVideoDevices();
      this.scanFromCameraButton.disabled = !hasVideoDevices;
      if (!hasVideoDevices) {
        this.feedback.emit({
          code: FeedbackCode.CameraDisabled,
          state: 'FEEDBACK_INFO',
          message: this.translationService.i('camera-disabled').toString()
        });
        if (this.showActionLabels) {
          this.scanFromCameraButton.label = this.translationService.i('action-message-camera-disabled').toString();
        }
      }
    }
    if (this.scanFromImage) {
      this.scanFromImageButton.visible = true;
      const imageScanIsAvailable = this.sdkService.isScanFromImageAvailable(this.recognizers, this.recognizerOptions);
      this.scanFromImageButton.disabled = !imageScanIsAvailable;
      if (imageScanIsAvailable) {
        this.imageRecognitionType = this.sdkService.getScanFromImageType(this.recognizers, this.recognizerOptions);
        if (this.imageRecognitionType === ImageRecognitionType.Single) {
          this.screens.processing.setAttribute('data-type', 'single');
        }
        if (this.imageRecognitionType === ImageRecognitionType.Combined) {
          this.screens.processing.setAttribute('data-type', 'combined');
        }
      }
      else {
        if (this.showActionLabels) {
          this.scanFromImageButton.label = this.translationService.i('action-message-image-not-supported').toString();
        }
      }
    }
    this.ready.emit(initEvent);
    this.blocked = false;
    this.block.emit(false);
    this.showScreen('action');
    if (this.enableDrag) {
      this.setDragAndDrop();
    }
  }
  async flipCameraAction() {
    await this.sdkService.flipCamera();
    const cameraFlipped = await this.sdkService.isCameraFlipped();
    this.cameraExperience.setCameraFlipState(cameraFlipped);
  }
  async changeCameraDevice(camera) {
    if (this.cameraChangeInProgress) {
      return;
    }
    this.cameraChangeInProgress = true;
    await this.sdkService.changeCameraDevice(camera.details);
    this.cameraChangeInProgress = false;
  }
  async checkInputProperties() {
    if (!this.licenseKey) {
      this.setFatalError(new SDKError(BlinkIDSDK.sdkErrors.licenseKeyMissing));
      return false;
    }
    // Recognizers
    const conclusion = this.sdkService.checkRecognizers(this.recognizers);
    if (!conclusion.status) {
      const fatalError = new SDKError({
        code: ErrorTypes.ErrorCodes.InvalidRecognizers,
        message: conclusion.message
      });
      this.setFatalError(fatalError);
      return false;
    }
    this.cameraExperience.type = this.sdkService.getDesiredCameraExperience(this.recognizers, this.recognizerOptions);
    return true;
  }
  async openDeviceModal() {
    this.startScanFromCamera();
  }
  async startScanFromCamera() {
    const configuration = {
      recognizers: this.recognizers,
      successFrame: this.includeSuccessFrame,
      cameraFeed: this.videoElement,
      cameraId: this.cameraId
    };
    if (this.recognizerOptions && Object.keys(this.recognizerOptions).length > 0) {
      configuration.recognizerOptions = this.recognizerOptions;
    }
    if (this.recognitionTimeout && typeof this.recognitionTimeout === 'number') {
      configuration.recognitionTimeout = this.recognitionTimeout;
    }
    this.isBackSide = false;
    const eventHandler = (recognitionEvent) => {
      var _a;
      switch (recognitionEvent.status) {
        case RecognitionStatus.Preparing:
          this.feedback.emit({
            code: FeedbackCode.ScanStarted,
            state: 'FEEDBACK_OK',
            message: ''
          });
          this.showOverlay('camera');
          this.cameraExperience.setState(CameraExperienceState.Default);
          break;
        case RecognitionStatus.Ready:
          this.cameraExperience.setActiveCamera(this.sdkService.videoRecognizer.deviceId);
          break;
        case RecognitionStatus.Processing:
          // Just keep working
          break;
        case RecognitionStatus.EmptyResultState:
          if (!recognitionEvent.data.initiatedByUser) {
            this.scanError.emit({
              code: Code.EmptyResult,
              fatal: false,
              message: 'Could not extract information from video feed!',
              recognizerName: recognitionEvent.data.recognizerName
            });
            this.feedback.emit({
              code: FeedbackCode.ScanUnsuccessful,
              state: 'FEEDBACK_ERROR',
              message: this.translationService.i('feedback-scan-unsuccessful').toString()
            });
          }
          this.showOverlay('');
          break;
        case RecognitionStatus.UnknownError:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          break;
        case RecognitionStatus.DetectionFailed:
          this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          this.detectionSuccessLock = false;
          break;
        case RecognitionStatus.DetectionStatusChange:
          // Use this event if information about card location is required
          break;
        case RecognitionStatus.DetectionStatusFail:
          this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          break;
        case RecognitionStatus.DetectionStatusSuccess:
          this.detectionSuccessLock = true;
          window.setTimeout(() => {
            if (this.detectionSuccessLock) {
              this.cameraExperience.setState(CameraExperienceState.Detection);
              this.scanReset = false;
            }
          }, 100);
          break;
        case RecognitionStatus.DetectionStatusCameraTooHigh:
          this.cameraExperience.setState(CameraExperienceState.MoveCloser)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.DetectionStatusCameraAtAngle:
          this.cameraExperience.setState(CameraExperienceState.AdjustAngle)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.DetectionStatusCameraTooNear:
        case RecognitionStatus.DetectionStatusDocumentTooCloseToEdge:
        case RecognitionStatus.DetectionStatusPartial:
          this.cameraExperience.setState(CameraExperienceState.MoveFarther)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.BarcodeScanningStarted:
          this.cameraExperience.setState(CameraExperienceState.BarcodeScanning, this.isBackSide, true)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.DocumentClassified:
          this.cameraExperience.setState(CameraExperienceState.Classification);
          break;
        case RecognitionStatus.OnFirstSideResult:
          this.sdkService.videoRecognizer.pauseRecognition();
          window.setTimeout(async () => {
            await this.sdkService.videoRecognizer.resumeRecognition(false);
          }, this.recognitionPauseTimeout);
          this.cameraExperience.setState(CameraExperienceState.Done, false, true)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Flip, this.isBackSide, true)
              .then(() => {
              if (!this.scanReset) {
                this.isBackSide = true;
                this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
              }
            });
          });
          break;
        case RecognitionStatus.ScanSuccessful:
          /* Which recognizer is it? ImageCapture or some other?
           *
           * ImageCapture has the 'imageCapture' flag set to true, we do not want to close camera overlay after image
           * acquisition process is finished. Cause maybe backend service will failed and we can press retry to resume
           * with the same video recognizer and try again
           */
          if (!recognitionEvent.data.imageCapture) {
            this.cameraExperience.setState(CameraExperienceState.DoneAll, false, true)
              .then(() => {
              var _a;
              this.cameraExperience.resetState();
              this.cameraExperience.classList.add('hide');
              this.scanSuccess.emit((_a = recognitionEvent.data) === null || _a === void 0 ? void 0 : _a.result);
              this.feedback.emit({
                code: FeedbackCode.ScanSuccessful,
                state: 'FEEDBACK_OK',
                message: ''
              });
              this.showOverlay('');
            });
          }
          else {
            const resultIsValid = recognitionEvent.data.result.recognizer.processingStatus === 0 && recognitionEvent.data.result.recognizer.state === 2;
            if (resultIsValid) {
              this.scanSuccess.emit((_a = recognitionEvent.data) === null || _a === void 0 ? void 0 : _a.result);
              this.feedback.emit({
                code: FeedbackCode.ScanSuccessful,
                state: 'FEEDBACK_OK',
                message: ''
              });
            }
            else if (!recognitionEvent.data.initiatedByUser) {
              this.scanError.emit({
                code: Code.EmptyResult,
                fatal: true,
                message: 'Could not extract information from video feed!',
                recognizerName: recognitionEvent.data.recognizerName
              });
            }
          }
          break;
        case RecognitionStatus.CameraNotAllowed:
          this.scanError.emit({
            code: Code.CameraNotAllowed,
            fatal: true,
            message: 'Cannot access camera!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.CameraNotAllowed,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('camera-not-allowed').toString()
          });
          window.setTimeout(() => {
            this.scanFromCameraButton.disabled = true;
            if (this.showActionLabels) {
              this.scanFromCameraButton.label = this.translationService.i('action-message-camera-not-allowed').toString();
            }
          }, 10);
          this.showOverlay('');
          break;
        case RecognitionStatus.CameraInUse:
          this.scanError.emit({
            code: Code.CameraInUse,
            fatal: true,
            message: 'Camera already in use!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.CameraInUse,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('camera-in-use').toString()
          });
          window.setTimeout(() => {
            this.scanFromCameraButton.disabled = true;
            if (this.showActionLabels) {
              this.scanFromCameraButton.label = this.translationService.i('action-message-camera-in-use').toString();
            }
          }, 10);
          this.showOverlay('');
          break;
        case RecognitionStatus.NoSupportForMediaDevices:
        case RecognitionStatus.CameraNotFound:
        case RecognitionStatus.UnableToAccessCamera:
          this.scanError.emit({
            code: Code.CameraGenericError,
            fatal: true,
            message: `There was a problem while accessing camera ${recognitionEvent.status}`,
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.CameraGenericError,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('camera-generic-error').toString()
          });
          window.setTimeout(() => {
            this.scanFromCameraButton.disabled = true;
            if (this.showActionLabels) {
              this.scanFromCameraButton.label = this.translationService.i('action-message-camera-disabled').toString();
            }
          }, 10);
          this.showOverlay('');
          break;
        default:
        // console.warn('Unhandled video recognition status:', recognitionEvent.status);
      }
    };
    try {
      this.cameraExperience.classList.remove('hide');
      this.cameraScanStarted.emit();
      void this.cameraExperience.populateCameraDevices();
      await this.sdkService.scanFromCamera(configuration, eventHandler);
      const cameraFlipped = this.sdkService.isCameraFlipped();
      this.cameraExperience.setCameraFlipState(cameraFlipped);
    }
    catch (error) {
      this.handleScanError(error);
      this.showOverlay('');
    }
  }
  async startScanFromImage(file) {
    const configuration = {
      recognizers: this.recognizers,
      file: file || this.scanFromImageInput.files[0]
    };
    if (this.recognizerOptions && Object.keys(this.recognizerOptions).length > 0) {
      configuration.recognizerOptions = this.recognizerOptions;
    }
    const eventHandler = (recognitionEvent) => {
      switch (recognitionEvent.status) {
        case RecognitionStatus.Preparing:
          this.feedback.emit({
            code: FeedbackCode.ScanStarted,
            state: 'FEEDBACK_OK',
            message: ''
          });
          this.showScanFromImageUi();
          break;
        case RecognitionStatus.Processing:
          // Just keep working
          break;
        case RecognitionStatus.NoImageFileFound:
          this.scanError.emit({
            code: Code.NoImageFileFound,
            fatal: true,
            message: 'No image file was provided to SDK service!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.DetectionFailed:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.EmptyResultState:
          this.scanError.emit({
            code: Code.EmptyResult,
            fatal: false,
            message: 'Could not extract information from image!',
            recognizerName: recognitionEvent.data.recognizerName
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.UnknownError:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.ScanSuccessful:
          this.scanSuccess.emit(recognitionEvent.data);
          this.feedback.emit({
            code: FeedbackCode.ScanSuccessful,
            state: 'FEEDBACK_OK',
            message: ''
          });
          this.clearInputImages();
          if (!recognitionEvent.data.imageCapture) {
            this.hideScanFromImageUi(true);
          }
          break;
        default:
        //console.warn('Unhandled image recognition status:', recognitionEvent.status);
      }
    };
    try {
      this.imageScanStarted.emit();
      if (this.thoroughScanFromImage) {
        configuration.thoroughScan = true;
      }
      await this.sdkService.scanFromImage(configuration, eventHandler);
    }
    catch (error) {
      this.handleScanError(error);
      this.hideScanFromImageUi(false);
    }
  }
  async startScanFromImageCombined(firstFile, secondFile) {
    const configuration = {
      recognizers: this.recognizers,
      firstFile: firstFile || this.galleryImageFirstFile,
      secondFile: secondFile || this.galleryImageSecondFile
    };
    if (this.recognizerOptions) {
      configuration.recognizerOptions = this.recognizerOptions;
    }
    const eventHandler = (recognitionEvent) => {
      switch (recognitionEvent.status) {
        case RecognitionStatus.Preparing:
          this.showScanFromImageUi();
          this.feedback.emit({
            code: FeedbackCode.ScanStarted,
            state: 'FEEDBACK_OK',
            message: ''
          });
          break;
        case RecognitionStatus.Ready:
          this.cameraExperience.setActiveCamera(this.sdkService.videoRecognizer.deviceId);
          break;
        case RecognitionStatus.Processing:
          // Just keep working
          break;
        case RecognitionStatus.NoFirstImageFileFound:
          this.scanError.emit({
            code: Code.NoFirstImageFileFound,
            fatal: true,
            message: 'First image file is missing!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.NoSecondImageFileFound:
          this.scanError.emit({
            code: Code.NoSecondImageFileFound,
            fatal: true,
            message: 'Second image file is missing!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.DetectionFailed:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.EmptyResultState:
          this.scanError.emit({
            code: Code.EmptyResult,
            fatal: false,
            message: 'Could not extract information from image!',
            recognizerName: recognitionEvent.data.recognizerName
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.UnknownError:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.ScanSuccessful:
          this.scanSuccess.emit(recognitionEvent.data);
          this.feedback.emit({
            code: FeedbackCode.ScanSuccessful,
            state: 'FEEDBACK_OK',
            message: ''
          });
          this.clearInputImages();
          if (!recognitionEvent.data.imageCapture) {
            this.hideScanFromImageUi(true);
          }
          break;
        default:
        //console.warn('Unhandled image recognition status:', recognitionEvent.status);
      }
    };
    try {
      this.imageScanStarted.emit();
      if (this.thoroughScanFromImage) {
        configuration.thoroughScan = true;
      }
      await this.sdkService.scanFromImageCombined(configuration, eventHandler);
    }
    catch (error) {
      this.handleScanError(error);
      this.hideScanFromImageUi(false);
    }
  }
  handleScanError(error) {
    const isAvailable = navigator.onLine;
    if (!isAvailable) {
      const fatalError = new SDKError({
        code: ErrorTypes.ErrorCodes.InternetNotAvailable,
        message: this.translationService.i('check-internet-connection').toString()
      });
      this.setFatalError(fatalError);
      this.showLicenseInfoModal(this.translationService.i('check-internet-connection').toString());
      return;
    }
    if ((error === null || error === void 0 ? void 0 : error.code) === BlinkIDSDK.ErrorCodes.LICENSE_UNLOCK_ERROR) {
      this.setFatalError(new SDKError(ErrorTypes.componentErrors.licenseError, error));
      this.showLicenseInfoModal(error);
    }
    else {
      this.scanError.emit({
        code: Code.GenericScanError,
        fatal: true,
        message: 'There was a problem during scan action.',
        recognizerName: '',
        details: error
      });
      this.feedback.emit({
        code: FeedbackCode.GenericScanError,
        state: 'FEEDBACK_ERROR',
        message: this.translationService.i('feedback-error-generic').toString()
      });
      this.showOverlay('');
    }
  }
  showLicenseInfoModal(error) {
    if (typeof error === 'string') {
      this.licenseExperienceModal.content = error;
    }
    else {
      if (error.type === 'NETWORK_ERROR') {
        this.licenseExperienceModal.content = this.translationService.i('network-error').toString();
      }
      else {
        this.licenseExperienceModal.content = this.translationService.i('scanning-not-available').toString();
      }
    }
    this.showOverlay('modal');
  }
  showScreen(screenName) {
    for (const screenKey in this.screens) {
      if (this.screens[screenKey]) {
        this.screens[screenKey].visible = screenName === screenKey;
      }
    }
  }
  showOverlay(overlayName) {
    if (overlayName === 'camera') {
      this.initialBodyOverflowValue = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = this.initialBodyOverflowValue;
    }
    for (const overlayKey in this.overlays) {
      if (this.overlays[overlayKey]) {
        this.overlays[overlayKey].visible = overlayName === overlayKey;
      }
    }
  }
  setDragAndDrop() {
    const dropTarget = this.galleryDropType === 'FULLSCREEN' ? window : this.hostEl;
    const lockTimeout = 3000;
    let lockDragAndDrop = false;
    if (this.galleryDropType === 'INLINE') {
      this.overlays.draganddrop.classList.add('inline');
    }
    const closeOverlay = () => {
      if (lockDragAndDrop) {
        window.setTimeout(() => {
          this.hostEl.style.borderStyle = 'solid';
          this.overlays.draganddrop.classList.add('hidden');
          this.showOverlay('');
          window.setTimeout(() => {
            this.overlays.draganddrop.classList.remove('hidden');
            this.showScreen('action');
            this.hostEl.style.borderStyle = 'solid';
          }, 500);
        }, lockTimeout);
      }
      else {
        this.showOverlay('');
        window.setTimeout(() => {
          this.showScreen('action');
          this.hostEl.style.borderStyle = 'solid';
        }, 500);
      }
    };
    dropTarget.addEventListener('dragenter', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      this.hostEl.style.borderStyle = 'none';
    });
    dropTarget.addEventListener('dragover', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      this.hostEl.style.borderStyle = 'none';
      this.overlays.draganddrop.classList.remove('error');
      this.overlays.draganddrop.querySelector('img').src = this.iconDragAndDropGalleryDefault;
      this.overlays.draganddrop.querySelector('p').innerText = this.translationService.i('drop-info').toString();
      this.showOverlay('draganddrop');
    });
    this.dragAndDropZone.addEventListener('dragleave', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      closeOverlay();
    });
    this.dragAndDropZone.addEventListener('drop', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      if (GenericHelpers.hasSupportedImageFiles(ev.dataTransfer.files)) {
        this.startScanFromImage(ev.dataTransfer.files[0]);
      }
      else {
        this.overlays.draganddrop.classList.add('error');
        this.overlays.draganddrop.querySelector('p').innerText = this.translationService.i('drop-error').toString();
        this.overlays.draganddrop.querySelector('img').src = this.iconDragAndDropWarningDefault;
        lockDragAndDrop = true;
        window.setTimeout(() => {
          lockDragAndDrop = false;
        }, lockTimeout);
      }
      closeOverlay();
    });
  }
  setFatalError(error) {
    var _a, _b;
    this.fatalError.emit(error);
    if (this.hideLoadingAndErrorUi) {
      return;
    }
    if (error.details) {
      switch ((_a = error.details) === null || _a === void 0 ? void 0 : _a.code) {
        case BlinkIDSDK.ErrorCodes.LICENSE_UNLOCK_ERROR:
          const licenseErrorType = (_b = error.details) === null || _b === void 0 ? void 0 : _b.type;
          switch (licenseErrorType) {
            case BlinkIDSDK.LicenseErrorType.NetworkError:
              this.errorMessage.innerText = this.translationService.i('network-error').toString();
              break;
            default:
              this.errorMessage.innerText = this.translationService.i('scanning-not-available').toString();
          }
          break;
        default:
        // Do nothing
      }
    }
    else {
      this.errorMessage.innerText = error.message;
    }
    this.showScreen('error');
    this.showOverlay('');
  }
  abortScan() {
    this.scanAborted.emit();
    this.stopRecognition();
  }
  stopRecognition() {
    this.cameraExperience.classList.add('hide');
    this.sdkService.stopRecognition();
    this.scanReset = true;
    window.setTimeout(() => {
      this.cameraExperience.setState(CameraExperienceState.Default, false, true);
      this.cameraExperience.apiState = '';
    }, 500);
    this.showOverlay('');
    this.closeApiProcessStatus();
  }
  closeGalleryExperienceModal() {
    this.galleryExperienceModalErrorWindowVisible = false;
    this.stopRecognition();
  }
  onFromImageClicked() {
    if (this.imageRecognitionType === ImageRecognitionType.Single) {
      this.scanFromImageInput.click();
    }
    if (this.imageRecognitionType === ImageRecognitionType.Combined) {
      if (this.combinedGalleryOpened) {
        this.closeCombinedGalleryUpload();
      }
      else {
        this.openCombinedGalleryUpload();
      }
    }
  }
  clearInputImages() {
    if (this.imageRecognitionType === ImageRecognitionType.Single) {
      this.scanFromImageInput.value = '';
    }
    if (this.imageRecognitionType === ImageRecognitionType.Combined) {
      this.imageBoxFirst.clear();
      this.imageBoxSecond.clear();
    }
  }
  openCombinedGalleryUpload() {
    const dialog = this.screens.action.querySelector('.combined-image-upload');
    dialog.classList.add('visible');
    this.scanFromImageButton.selected = true;
    this.combinedGalleryOpened = true;
  }
  closeCombinedGalleryUpload() {
    const dialog = this.screens.action.querySelector('.combined-image-upload');
    dialog.classList.remove('visible');
    this.scanFromImageButton.selected = false;
    this.combinedGalleryOpened = false;
  }
  async onCombinedImageChange(ev, imageType) {
    if (imageType === CombinedImageType.First) {
      this.galleryImageFirstFile = GenericHelpers.getImageFile(ev);
    }
    if (imageType === CombinedImageType.Second) {
      this.galleryImageSecondFile = GenericHelpers.getImageFile(ev);
    }
    // Enable scan button only if both images have values
    this.combinedScanFromImageButton.disabled = this.galleryImageFirstFile === null || this.galleryImageSecondFile === null;
  }
  showScanFromImageUi() {
    if (this.galleryOverlayType === 'INLINE') {
      const inProgress = this.screens.processing.querySelector('p.in-progress');
      const done = this.screens.processing.querySelector('p.done');
      inProgress.classList.add('visible');
      done.classList.remove('visible');
      this.showScreen('processing');
    }
    if (this.galleryOverlayType === 'FULLSCREEN') {
      this.showOverlay('processing');
    }
  }
  hideScanFromImageUi(success) {
    if (this.galleryOverlayType === 'INLINE') {
      let timeout = 0;
      const inProgress = this.screens.processing.querySelector('p.in-progress');
      const done = this.screens.processing.querySelector('p.done');
      inProgress.classList.remove('visible');
      if (success) {
        done.classList.add('visible');
        timeout = 1000;
      }
      window.setTimeout(() => this.showScreen('action'), timeout);
    }
    if (this.galleryOverlayType === 'FULLSCREEN') {
      this.showOverlay('');
    }
  }
  render() {
    return (h(Host, null,
      h("mb-screen", { id: "mb-screen-loading", visible: !this.hideLoadingAndErrorUi, ref: el => this.screens.loading = el },
        h("mb-spinner", { icon: this.iconSpinnerScreenLoading })),
      h("mb-screen", { id: "mb-screen-error", visible: false, ref: el => this.screens.error = el },
        h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
          h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z", fill: "#6B7280" }),
          h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7Z", fill: "#6B7280" }),
          h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11 16C11 15.4477 11.4477 15 12 15H12.01C12.5623 15 13.01 15.4477 13.01 16C13.01 16.5523 12.5623 17 12.01 17H12C11.4477 17 11 16.5523 11 16Z", fill: "#6B7280" })),
        h("p", { ref: el => this.errorMessage = el })),
      h("mb-screen", { id: "mb-screen-action", visible: false, ref: el => this.screens.action = el },
        h("div", { class: "actions" },
          h("p", { class: "action-label" }, this.translationService.i('action-message').toString()),
          h("div", { class: "action-buttons" },
            h("mb-button", { ref: el => this.scanFromCameraButton = el, visible: true, disabled: false, clickHandler: () => this.openDeviceModal(), imageSrcDefault: this.iconCameraDefault, imageSrcActive: this.iconCameraActive, buttonTitle: this.translationService.i('action-alt-camera') }),
            h("input", { tabindex: "-1", id: "scan-from-image-input", ref: el => this.scanFromImageInput = el, type: "file", accept: "image/*", onChange: () => this.scanFromImageInput.value && this.startScanFromImage() }),
            h("mb-button", { ref: el => this.scanFromImageButton = el, disabled: false, visible: false, selected: false, clickHandler: () => this.onFromImageClicked(), imageSrcDefault: this.iconGalleryDefault, imageSrcActive: this.iconGalleryActive, buttonTitle: this.translationService.i('action-alt-gallery') }))),
        h("div", { class: "combined-image-upload" },
          h("mb-image-box", { ref: el => this.imageBoxFirst = el, "box-title": this.translationService.i('process-image-box-first').toString(), "anchor-text": this.translationService.i('process-image-box-add').toString(), onImageChange: (ev) => this.onCombinedImageChange(ev.detail, CombinedImageType.First) }),
          h("mb-image-box", { ref: el => this.imageBoxSecond = el, "box-title": this.translationService.i('process-image-box-second').toString(), "anchor-text": this.translationService.i('process-image-box-add').toString(), onImageChange: (ev) => this.onCombinedImageChange(ev.detail, CombinedImageType.Second) }),
          h("mb-button-classic", { ref: el => this.combinedScanFromImageButton = el, disabled: true, clickHandler: () => this.startScanFromImageCombined() }, this.translationService.i('process-image-upload-cta').toString()))),
      h("mb-screen", { id: "mb-screen-processing", visible: false, ref: el => this.screens.processing = el },
        h("p", { class: "in-progress" },
          h("mb-spinner", { icon: this.iconSpinnerScreenLoading }),
          h("span", null, this.translationService.i('process-image-message-inline').toString())),
        h("p", { class: "done" },
          h("mb-completed", { icon: this.iconGalleryScanningCompleted }),
          h("span", null, this.translationService.i('process-image-message-inline-done').toString()))),
      h("mb-overlay", { id: "mb-overlay-drag-and-drop", visible: false, ref: el => this.overlays.draganddrop = el },
        h("img", { class: "drag-and-drop-icon", src: this.iconDragAndDropGalleryDefault }),
        h("p", { class: "drag-and-drop-message" }, "Whoops, we don't support that image format. Please upload a JPEG or PNG file."),
        h("div", { id: "drag-and-drop-zone", ref: el => this.dragAndDropZone = el })),
      h("mb-overlay", { id: "mb-overlay-gallery-experience", ref: el => this.overlays.processing = el },
        h("mb-spinner", { icon: this.iconSpinnerFromGalleryExperience, size: "large" }),
        h("p", null, this.translationService.i('process-image-message').toString()),
        h("mb-modal", { visible: this.galleryExperienceModalErrorWindowVisible, modalTitle: this.translationService.i('feedback-scan-unsuccessful-title').toString(), content: this.translationService.i('feedback-scan-unsuccessful').toString(), onClose: () => this.closeGalleryExperienceModal() },
          h("div", { slot: "actionButtons" },
            h("button", { class: "primary modal-action-button", onClick: () => this.closeGalleryExperienceModal() }, this.translationService.i('modal-window-close').toString())))),
      h("mb-overlay", { id: "mb-overlay-camera-experience", visible: false, ref: el => this.overlays.camera = el },
        h("div", { class: "holder" },
          h("video", { part: "mb-camera-video", ref: el => this.videoElement = el, playsinline: true }),
          h("mb-camera-experience", { ref: el => this.cameraExperience = el, cameraExperienceStateDurations: this.cameraExperienceStateDurations, translationService: this.translationService, showScanningLine: this.showScanningLine, showCameraFeedbackBarcodeMessage: this.showCameraFeedbackBarcodeMessage, "clear-is-camera-active": this.clearIsCameraActive, onClose: () => this.abortScan(), onFlipCameraAction: () => this.flipCameraAction(), onSetIsCameraActive: (ev) => this.handleSetIsCameraActive(ev.detail), onChangeCameraDevice: (ev) => this.changeCameraDevice(ev.detail), class: "overlay-camera-element" }),
          h("mb-api-process-status", { visible: this.apiProcessStatusVisible, state: this.apiProcessStatusState, translationService: this.translationService, onCloseTryAgain: () => this.closeApiProcessStatus(true), onCloseFromStart: () => this.stopRecognition() }))),
      h("mb-overlay", { id: "mb-overlay-modal", visible: false, ref: el => this.overlays.modal = el },
        h("mb-modal", { ref: el => this.licenseExperienceModal = el, modalTitle: "Error" },
          h("div", { slot: "actionButtons" },
            h("button", { class: "primary modal-action-button", onClick: () => this.showOverlay('') }, this.translationService.i('modal-window-close').toString()))))));
  }
  static get is() { return "mb-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-component.css"]
  }; }
  static get properties() { return {
    "allowHelloMessage": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "allow-hello-message",
      "reflect": false,
      "defaultValue": "true"
    },
    "engineLocation": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "engine-location",
      "reflect": false,
      "defaultValue": "''"
    },
    "workerLocation": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "worker-location",
      "reflect": false,
      "defaultValue": "''"
    },
    "licenseKey": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "license-key",
      "reflect": false
    },
    "wasmType": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string | null",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "wasm-type",
      "reflect": false
    },
    "recognizers": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "Array<string>",
        "resolved": "string[]",
        "references": {
          "Array": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      }
    },
    "recognizerOptions": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "{ [key: string]: any }",
        "resolved": "{ [key: string]: any; }",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      }
    },
    "recognitionTimeout": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "recognition-timeout",
      "reflect": false
    },
    "recognitionPauseTimeout": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "recognition-pause-timeout",
      "reflect": false
    },
    "cameraExperienceStateDurations": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "CameraExperienceTimeoutDurations",
        "resolved": "CameraExperienceTimeoutDurations",
        "references": {
          "CameraExperienceTimeoutDurations": {
            "location": "import",
            "path": "../../../utils/data-structures"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "defaultValue": "null"
    },
    "includeSuccessFrame": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "include-success-frame",
      "reflect": false,
      "defaultValue": "false"
    },
    "enableDrag": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "enable-drag",
      "reflect": false,
      "defaultValue": "true"
    },
    "hideLoadingAndErrorUi": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "hide-loading-and-error-ui",
      "reflect": false,
      "defaultValue": "false"
    },
    "rtl": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "rtl",
      "reflect": false,
      "defaultValue": "false"
    },
    "scanFromCamera": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "scan-from-camera",
      "reflect": false,
      "defaultValue": "true"
    },
    "scanFromImage": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "scan-from-image",
      "reflect": false,
      "defaultValue": "true"
    },
    "thoroughScanFromImage": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "thorough-scan-from-image",
      "reflect": false,
      "defaultValue": "false"
    },
    "galleryOverlayType": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'FULLSCREEN' | 'INLINE'",
        "resolved": "\"FULLSCREEN\" | \"INLINE\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "gallery-overlay-type",
      "reflect": false,
      "defaultValue": "'INLINE'"
    },
    "galleryDropType": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'FULLSCREEN' | 'INLINE'",
        "resolved": "\"FULLSCREEN\" | \"INLINE\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "gallery-drop-type",
      "reflect": false,
      "defaultValue": "'INLINE'"
    },
    "showActionLabels": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "show-action-labels",
      "reflect": false,
      "defaultValue": "false"
    },
    "showModalWindows": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "show-modal-windows",
      "reflect": false,
      "defaultValue": "false"
    },
    "showCameraFeedbackBarcodeMessage": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "show-camera-feedback-barcode-message",
      "reflect": false,
      "defaultValue": "false"
    },
    "showScanningLine": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "show-scanning-line",
      "reflect": false,
      "defaultValue": "false"
    },
    "iconCameraDefault": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-camera-default",
      "reflect": false,
      "defaultValue": "'data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.32151 2.98816C6.63407 2.6756 7.05799 2.5 7.50002 2.5H12.5C12.942 2.5 13.366 2.6756 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667C14.1667 4.38768 14.2545 4.59964 14.4108 4.75592C14.567 4.9122 14.779 5 15 5H15.8334C16.4964 5 17.1323 5.26339 17.6011 5.73223C18.07 6.20107 18.3334 6.83696 18.3334 7.5V15C18.3334 15.663 18.07 16.2989 17.6011 16.7678C17.1323 17.2366 16.4964 17.5 15.8334 17.5H4.16669C3.50365 17.5 2.86776 17.2366 2.39892 16.7678C1.93008 16.2989 1.66669 15.663 1.66669 15V7.5C1.66669 6.83696 1.93008 6.20107 2.39892 5.73223C2.86776 5.26339 3.50365 5 4.16669 5H5.00002C5.22103 5 5.433 4.9122 5.58928 4.75592C5.74556 4.59964 5.83335 4.38768 5.83335 4.16667C5.83335 3.72464 6.00895 3.30072 6.32151 2.98816ZM4.16669 6.66667C3.94567 6.66667 3.73371 6.75446 3.57743 6.91074C3.42115 7.06702 3.33335 7.27899 3.33335 7.5V15C3.33335 15.221 3.42115 15.433 3.57743 15.5893C3.73371 15.7455 3.94567 15.8333 4.16669 15.8333H15.8334C16.0544 15.8333 16.2663 15.7455 16.4226 15.5893C16.5789 15.433 16.6667 15.221 16.6667 15V7.5C16.6667 7.27899 16.5789 7.06702 16.4226 6.91074C16.2663 6.75446 16.0544 6.66667 15.8334 6.66667H15C14.337 6.66667 13.7011 6.40327 13.2323 5.93443C12.7634 5.46559 12.5 4.82971 12.5 4.16667L7.50002 4.16667C7.50002 4.82971 7.23663 5.46559 6.76779 5.93443C6.29895 6.40327 5.66306 6.66667 5.00002 6.66667H4.16669Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 9.16667C9.07955 9.16667 8.33335 9.91286 8.33335 10.8333C8.33335 11.7538 9.07955 12.5 10 12.5C10.9205 12.5 11.6667 11.7538 11.6667 10.8333C11.6667 9.91286 10.9205 9.16667 10 9.16667ZM6.66669 10.8333C6.66669 8.99238 8.15907 7.5 10 7.5C11.841 7.5 13.3334 8.99238 13.3334 10.8333C13.3334 12.6743 11.841 14.1667 10 14.1667C8.15907 14.1667 6.66669 12.6743 6.66669 10.8333Z\" fill=\"black\"/></svg>'"
    },
    "iconCameraActive": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-camera-active",
      "reflect": false,
      "defaultValue": "'data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.32151 2.98816C6.63407 2.6756 7.05799 2.5 7.50002 2.5H12.5C12.942 2.5 13.366 2.6756 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667C14.1667 4.38768 14.2545 4.59964 14.4108 4.75592C14.567 4.9122 14.779 5 15 5H15.8334C16.4964 5 17.1323 5.26339 17.6011 5.73223C18.07 6.20107 18.3334 6.83696 18.3334 7.5V15C18.3334 15.663 18.07 16.2989 17.6011 16.7678C17.1323 17.2366 16.4964 17.5 15.8334 17.5H4.16669C3.50365 17.5 2.86776 17.2366 2.39892 16.7678C1.93008 16.2989 1.66669 15.663 1.66669 15V7.5C1.66669 6.83696 1.93008 6.20107 2.39892 5.73223C2.86776 5.26339 3.50365 5 4.16669 5H5.00002C5.22103 5 5.433 4.9122 5.58928 4.75592C5.74556 4.59964 5.83335 4.38768 5.83335 4.16667C5.83335 3.72464 6.00895 3.30072 6.32151 2.98816ZM4.16669 6.66667C3.94567 6.66667 3.73371 6.75446 3.57743 6.91074C3.42115 7.06702 3.33335 7.27899 3.33335 7.5V15C3.33335 15.221 3.42115 15.433 3.57743 15.5893C3.73371 15.7455 3.94567 15.8333 4.16669 15.8333H15.8334C16.0544 15.8333 16.2663 15.7455 16.4226 15.5893C16.5789 15.433 16.6667 15.221 16.6667 15V7.5C16.6667 7.27899 16.5789 7.06702 16.4226 6.91074C16.2663 6.75446 16.0544 6.66667 15.8334 6.66667H15C14.337 6.66667 13.7011 6.40327 13.2323 5.93443C12.7634 5.46559 12.5 4.82971 12.5 4.16667L7.50002 4.16667C7.50002 4.82971 7.23663 5.46559 6.76779 5.93443C6.29895 6.40327 5.66306 6.66667 5.00002 6.66667H4.16669Z\" fill=\"%2348B2E8\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 9.16667C9.07955 9.16667 8.33335 9.91286 8.33335 10.8333C8.33335 11.7538 9.07955 12.5 10 12.5C10.9205 12.5 11.6667 11.7538 11.6667 10.8333C11.6667 9.91286 10.9205 9.16667 10 9.16667ZM6.66669 10.8333C6.66669 8.99238 8.15907 7.5 10 7.5C11.841 7.5 13.3334 8.99238 13.3334 10.8333C13.3334 12.6743 11.841 14.1667 10 14.1667C8.15907 14.1667 6.66669 12.6743 6.66669 10.8333Z\" fill=\"%2348B2E8\"/></svg>'"
    },
    "iconGalleryDefault": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-gallery-default",
      "reflect": false,
      "defaultValue": "'data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.6667 6.66666C11.6667 6.20642 12.0398 5.83333 12.5 5.83333H12.5084C12.9686 5.83333 13.3417 6.20642 13.3417 6.66666C13.3417 7.1269 12.9686 7.5 12.5084 7.5H12.5C12.0398 7.5 11.6667 7.1269 11.6667 6.66666Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.83333 4.16667C4.91286 4.16667 4.16667 4.91286 4.16667 5.83333V14.1667C4.16667 15.0871 4.91286 15.8333 5.83333 15.8333H14.1667C15.0871 15.8333 15.8333 15.0871 15.8333 14.1667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1667 4.16667H5.83333ZM2.5 5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H14.1667C16.0076 2.5 17.5 3.99238 17.5 5.83333V14.1667C17.5 16.0076 16.0076 17.5 14.1667 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1667V5.83333Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.24972 9.76212L3.92259 13.0892C3.59715 13.4147 3.06951 13.4147 2.74408 13.0892C2.41864 12.7638 2.41864 12.2362 2.74408 11.9107L6.07741 8.57741L6.08885 8.56618C6.59083 8.08315 7.22016 7.7751 7.91667 7.7751C8.61317 7.7751 9.2425 8.08315 9.74448 8.56618L9.75592 8.57741L13.9226 12.7441C14.248 13.0695 14.248 13.5971 13.9226 13.9226C13.5972 14.248 13.0695 14.248 12.7441 13.9226L8.58361 9.76212C8.32758 9.51773 8.09662 9.44177 7.91667 9.44177C7.73672 9.44177 7.50575 9.51773 7.24972 9.76212Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.083 11.4288L12.2559 12.2559C11.9305 12.5814 11.4028 12.5814 11.0774 12.2559C10.752 11.9305 10.752 11.4028 11.0774 11.0774L11.9107 10.2441L11.9222 10.2329C12.4241 9.74982 13.0535 9.44177 13.75 9.44177C14.4465 9.44177 15.0758 9.74982 15.5778 10.2329L15.5892 10.2441L17.2559 11.9107C17.5813 12.2362 17.5813 12.7638 17.2559 13.0893C16.9305 13.4147 16.4028 13.4147 16.0774 13.0893L14.4169 11.4288C14.1609 11.1844 13.9299 11.1084 13.75 11.1084C13.57 11.1084 13.3391 11.1844 13.083 11.4288Z\" fill=\"black\"/></svg>'"
    },
    "iconDragAndDropGalleryDefault": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-drag-and-drop-gallery-default",
      "reflect": false,
      "defaultValue": "'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNCA4QzE0IDcuNDQ3NzIgMTQuNDQ3NyA3IDE1IDdIMTUuMDFDMTUuNTYyMyA3IDE2LjAxIDcuNDQ3NzIgMTYuMDEgOEMxNi4wMSA4LjU1MjI4IDE1LjU2MjMgOSAxNS4wMSA5SDE1QzE0LjQ0NzcgOSAxNCA4LjU1MjI4IDE0IDhaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNyA1QzUuODk1NDMgNSA1IDUuODk1NDMgNSA3VjE3QzUgMTguMTA0NiA1Ljg5NTQzIDE5IDcgMTlIMTdDMTguMTA0NiAxOSAxOSAxOC4xMDQ2IDE5IDE3VjdDMTkgNS44OTU0MyAxOC4xMDQ2IDUgMTcgNUg3Wk0zIDdDMyA0Ljc5MDg2IDQuNzkwODYgMyA3IDNIMTdDMTkuMjA5MSAzIDIxIDQuNzkwODYgMjEgN1YxN0MyMSAxOS4yMDkxIDE5LjIwOTEgMjEgMTcgMjFIN0M0Ljc5MDg2IDIxIDMgMTkuMjA5MSAzIDE3VjdaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOC42OTk2NiAxMS43MTQ1TDQuNzA3MTEgMTUuNzA3MUM0LjMxNjU4IDE2LjA5NzYgMy42ODM0MiAxNi4wOTc2IDMuMjkyODkgMTUuNzA3MUMyLjkwMjM3IDE1LjMxNjUgMi45MDIzNyAxNC42ODM0IDMuMjkyODkgMTQuMjkyOEw3LjI5Mjg5IDEwLjI5MjhMNy4zMDY2MiAxMC4yNzk0QzcuOTA5IDkuNjk5NzQgOC42NjQxOSA5LjMzMDA4IDkuNSA5LjMzMDA4QzEwLjMzNTggOS4zMzAwOCAxMS4wOTEgOS42OTk3NCAxMS42OTM0IDEwLjI3OTRMMTEuNzA3MSAxMC4yOTI4TDE2LjcwNzEgMTUuMjkyOEMxNy4wOTc2IDE1LjY4MzQgMTcuMDk3NiAxNi4zMTY1IDE2LjcwNzEgMTYuNzA3MUMxNi4zMTY2IDE3LjA5NzYgMTUuNjgzNCAxNy4wOTc2IDE1LjI5MjkgMTYuNzA3MUwxMC4zMDAzIDExLjcxNDVDOS45OTMxIDExLjQyMTIgOS43MTU5NCAxMS4zMzAxIDkuNSAxMS4zMzAxQzkuMjg0MDYgMTEuMzMwMSA5LjAwNjkgMTEuNDIxMiA4LjY5OTY2IDExLjcxNDVaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuNjk5NyAxMy43MTQ1TDE0LjcwNzEgMTQuNzA3MUMxNC4zMTY2IDE1LjA5NzYgMTMuNjgzNCAxNS4wOTc2IDEzLjI5MjkgMTQuNzA3MUMxMi45MDI0IDE0LjMxNjUgMTIuOTAyNCAxMy42ODM0IDEzLjI5MjkgMTMuMjkyOEwxNC4yOTI5IDEyLjI5MjhMMTQuMzA2NiAxMi4yNzk0QzE0LjkwOSAxMS42OTk3IDE1LjY2NDIgMTEuMzMwMSAxNi41IDExLjMzMDFDMTcuMzM1OCAxMS4zMzAxIDE4LjA5MSAxMS42OTk3IDE4LjY5MzQgMTIuMjc5NEwxOC43MDcxIDEyLjI5MjhMMjAuNzA3MSAxNC4yOTI4QzIxLjA5NzYgMTQuNjgzNCAyMS4wOTc2IDE1LjMxNjUgMjAuNzA3MSAxNS43MDcxQzIwLjMxNjYgMTYuMDk3NiAxOS42ODM0IDE2LjA5NzYgMTkuMjkyOSAxNS43MDcxTDE3LjMwMDMgMTMuNzE0NUMxNi45OTMxIDEzLjQyMTIgMTYuNzE1OSAxMy4zMzAxIDE2LjUgMTMuMzMwMUMxNi4yODQxIDEzLjMzMDEgMTYuMDA2OSAxMy40MjEyIDE1LjY5OTcgMTMuNzE0NVoiIGZpbGw9IiMwMDYyRjIiLz4KPC9zdmc+Cg=='"
    },
    "iconDragAndDropWarningDefault": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-drag-and-drop-warning-default",
      "reflect": false,
      "defaultValue": "'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiA4QzEyLjU1MjMgOCAxMyA4LjQ0NzcyIDEzIDlWMTFDMTMgMTEuNTUyMyAxMi41NTIzIDEyIDEyIDEyQzExLjQ0NzcgMTIgMTEgMTEuNTUyMyAxMSAxMVY5QzExIDguNDQ3NzIgMTEuNDQ3NyA4IDEyIDhaTTEyIDE0QzEyLjU1MjMgMTQgMTMgMTQuNDQ3NyAxMyAxNVYxNS4wMUMxMyAxNS41NjIzIDEyLjU1MjMgMTYuMDEgMTIgMTYuMDFDMTEuNDQ3NyAxNi4wMSAxMSAxNS41NjIzIDExIDE1LjAxVjE1QzExIDE0LjQ0NzcgMTEuNDQ3NyAxNCAxMiAxNFoiIGZpbGw9IiNFMTFENDgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC40NzY0IDIuMzgzOTdDMTAuOTM4MSAyLjExMTgxIDExLjQ2NDIgMS45NjgyNiAxMi4wMDAxIDEuOTY4MjZDMTIuNTM1OSAxLjk2ODI2IDEzLjA2MjEgMi4xMTE4MSAxMy41MjM3IDIuMzgzOTdDMTMuOTgzMSAyLjY1NDg1IDE0LjM2MiAzLjA0MzMgMTQuNjIxNCAzLjUwOTI1TDIxLjYxODMgMTUuNzUzOUMyMS42NDA0IDE1Ljc5MjUgMjEuNjU5OCAxNS44MzI1IDIxLjY3NjUgMTUuODczN0MyMS44NTY2IDE2LjMxNzEgMjEuOTI4IDE2Ljc5NzEgMjEuODg0OCAxNy4yNzM3QzIxLjg0MTYgMTcuNzUwMiAyMS42ODUgMTguMjA5NiAyMS40MjgxIDE4LjYxMzNDMjEuMTcxMSAxOS4wMTcgMjAuODIxNCAxOS4zNTM0IDIwLjQwOCAxOS41OTQ0QzE5Ljk5NDUgMTkuODM1NCAxOS41Mjk0IDE5Ljk3NDEgMTkuMDUxNSAxOS45OTg3QzE5LjAzNDQgMTkuOTk5NiAxOS4wMTcyIDIwIDE5LjAwMDEgMjBINS4wNzAwNUM1LjA1ODU3IDIwIDUuMDQ3MTQgMTkuOTk5OCA1LjAzNTc1IDE5Ljk5OTRDNS4wMDY5NiAyMC4wMDA0IDQuOTc3ODggMjAuMDAwMiA0Ljk0ODU3IDE5Ljk5ODdDNC40NzA2NiAxOS45NzQxIDQuMDA1NTggMTkuODM1NCAzLjU5MjE2IDE5LjU5NDRDMy4xNzg3MyAxOS4zNTM0IDIuODI4OTYgMTkuMDE3IDIuNTcyMDQgMTguNjEzM0MyLjMxNTEzIDE4LjIwOTYgMi4xNTg1MiAxNy43NTAyIDIuMTE1MjkgMTcuMjczN0MyLjA3MjA3IDE2Ljc5NzEgMi4xNDM0OCAxNi4zMTcxIDIuMzIzNTcgMTUuODczN0MyLjM0MDMgMTUuODMyNSAyLjM1OTc1IDE1Ljc5MjUgMi4zODE4MSAxNS43NTM5TDkuMzc4NzQgMy41MDkyNUM5LjYzODA4IDMuMDQzMyAxMC4wMTcgMi42NTQ4NSAxMC40NzY0IDIuMzgzOTdaTTUuMDM3NjcgMTguMDAwNUM1LjA0ODQyIDE4LjAwMDIgNS4wNTkyMiAxOCA1LjA3MDA1IDE4SDE4Ljk2OTlDMTkuMTIxNyAxNy45ODg5IDE5LjI2OTEgMTcuOTQzMyAxOS40MDA3IDE3Ljg2NjZDMTkuNTM4NSAxNy43ODYzIDE5LjY1NTEgMTcuNjc0MSAxOS43NDA3IDE3LjUzOTVDMTkuODI2NCAxNy40MDUgMTkuODc4NiAxNy4yNTE5IDE5Ljg5MyAxNy4wOTNDMTkuOTA1NyAxNi45NTI1IDE5Ljg4ODYgMTYuODExMiAxOS44NDMgMTYuNjc4MkwxMi44NzUgNC40ODQxOEMxMi43ODg1IDQuMzI3ODggMTIuNjYxOCA0LjE5NzU1IDEyLjUwNzkgNC4xMDY4M0MxMi4zNTQxIDQuMDE2MTEgMTIuMTc4NyAzLjk2ODI2IDEyLjAwMDEgMy45NjgyNkMxMS44MjE0IDMuOTY4MjYgMTEuNjQ2MSA0LjAxNjExIDExLjQ5MjIgNC4xMDY4M0MxMS4zMzgzIDQuMTk3NTUgMTEuMjExNSA0LjMyNzg0IDExLjEyNTEgNC40ODQxNEwxMS4xMTg0IDQuNDk2Mkw0LjE1NzE0IDE2LjY3ODJDNC4xMTE1MSAxNi44MTEyIDQuMDk0MzggMTYuOTUyNSA0LjEwNzEyIDE3LjA5M0M0LjEyMTUyIDE3LjI1MTkgNC4xNzM3MyAxNy40MDUgNC4yNTkzNyAxNy41Mzk1QzQuMzQ1MDEgMTcuNjc0MSA0LjQ2MTYgMTcuNzg2MyA0LjU5OTQgMTcuODY2NkM0LjczMzIxIDE3Ljk0NDYgNC44ODMyNCAxNy45OTA0IDUuMDM3NjcgMTguMDAwNVoiIGZpbGw9IiNFMTFENDgiLz4KPC9zdmc+Cg=='"
    },
    "iconGalleryActive": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-gallery-active",
      "reflect": false,
      "defaultValue": "'data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.6667 6.66667C11.6667 6.20643 12.0398 5.83334 12.5 5.83334H12.5084C12.9686 5.83334 13.3417 6.20643 13.3417 6.66667C13.3417 7.12691 12.9686 7.5 12.5084 7.5H12.5C12.0398 7.5 11.6667 7.12691 11.6667 6.66667Z\" fill=\"%2348B2E8\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.83333 4.16667C4.91286 4.16667 4.16667 4.91286 4.16667 5.83333V14.1667C4.16667 15.0871 4.91286 15.8333 5.83333 15.8333H14.1667C15.0871 15.8333 15.8333 15.0871 15.8333 14.1667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1667 4.16667H5.83333ZM2.5 5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H14.1667C16.0076 2.5 17.5 3.99238 17.5 5.83333V14.1667C17.5 16.0076 16.0076 17.5 14.1667 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1667V5.83333Z\" fill=\"%2348B2E8\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M7.24972 9.76213L3.92259 13.0893C3.59715 13.4147 3.06951 13.4147 2.74408 13.0893C2.41864 12.7638 2.41864 12.2362 2.74408 11.9107L6.07741 8.57741L6.08885 8.56619C6.59083 8.08316 7.22016 7.77511 7.91667 7.77511C8.61317 7.77511 9.2425 8.08316 9.74448 8.56619L9.75592 8.57741L13.9226 12.7441C14.248 13.0695 14.248 13.5972 13.9226 13.9226C13.5972 14.248 13.0695 14.248 12.7441 13.9226L8.58361 9.76213C8.32758 9.51774 8.09662 9.44177 7.91667 9.44177C7.73672 9.44177 7.50575 9.51774 7.24972 9.76213Z\" fill=\"%2348B2E8\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.083 11.4288L12.2559 12.2559C11.9305 12.5814 11.4028 12.5814 11.0774 12.2559C10.752 11.9305 10.752 11.4028 11.0774 11.0774L11.9107 10.2441L11.9222 10.2329C12.4241 9.74982 13.0535 9.44177 13.75 9.44177C14.4465 9.44177 15.0758 9.74982 15.5778 10.2329L15.5892 10.2441L17.2559 11.9107C17.5813 12.2362 17.5813 12.7638 17.2559 13.0893C16.9305 13.4147 16.4028 13.4147 16.0774 13.0893L14.4169 11.4288C14.1609 11.1844 13.9299 11.1084 13.75 11.1084C13.57 11.1084 13.3391 11.1844 13.083 11.4288Z\" fill=\"%2348B2E8\"/></svg>'"
    },
    "iconInvalidFormat": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-invalid-format",
      "reflect": false,
      "defaultValue": "'data:image/svg+xml;utf8,<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z\" fill=\"black\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.29289 9.29289C9.68342 8.90237 10.3166 8.90237 10.7071 9.29289L12 10.5858L13.2929 9.29289C13.6834 8.90237 14.3166 8.90237 14.7071 9.29289C15.0976 9.68342 15.0976 10.3166 14.7071 10.7071L13.4142 12L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L12 13.4142L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L10.5858 12L9.29289 10.7071C8.90237 10.3166 8.90237 9.68342 9.29289 9.29289Z\" fill=\"black\"/></svg>'"
    },
    "iconSpinnerScreenLoading": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-spinner-screen-loading",
      "reflect": false
    },
    "iconSpinnerFromGalleryExperience": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-spinner-from-gallery-experience",
      "reflect": false
    },
    "iconGalleryScanningCompleted": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "See description in public component."
      },
      "attribute": "icon-gallery-scanning-completed",
      "reflect": false
    },
    "sdkService": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "SdkService",
        "resolved": "SdkService",
        "references": {
          "SdkService": {
            "location": "import",
            "path": "../../../utils/sdk.service"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Instance of SdkService passed from root component."
      }
    },
    "translationService": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "TranslationService",
        "resolved": "TranslationService",
        "references": {
          "TranslationService": {
            "location": "import",
            "path": "../../../utils/translation.service"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Instance of TranslationService passed from root component."
      }
    },
    "cameraId": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string | null",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Camera device ID passed from root component."
      },
      "attribute": "camera-id",
      "reflect": false,
      "defaultValue": "null"
    }
  }; }
  static get states() { return {
    "galleryExperienceModalErrorWindowVisible": {},
    "clearIsCameraActive": {},
    "apiProcessStatusVisible": {},
    "apiProcessStatusState": {}
  }; }
  static get events() { return [{
      "method": "block",
      "name": "block",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event containing boolean which used to check whether component is blocked."
      },
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      }
    }, {
      "method": "fatalError",
      "name": "fatalError",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "See event 'fatalError' in public component."
      },
      "complexType": {
        "original": "SDKError",
        "resolved": "SDKError",
        "references": {
          "SDKError": {
            "location": "import",
            "path": "../../../utils/data-structures"
          }
        }
      }
    }, {
      "method": "ready",
      "name": "ready",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "See event 'ready' in public component."
      },
      "complexType": {
        "original": "EventReady",
        "resolved": "EventReady",
        "references": {
          "EventReady": {
            "location": "import",
            "path": "../../../utils/data-structures"
          }
        }
      }
    }, {
      "method": "scanError",
      "name": "scanError",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "See event 'scanError' in public component."
      },
      "complexType": {
        "original": "EventScanError",
        "resolved": "EventScanError",
        "references": {
          "EventScanError": {
            "location": "import",
            "path": "../../../utils/data-structures"
          }
        }
      }
    }, {
      "method": "scanSuccess",
      "name": "scanSuccess",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "See event 'scanSuccess' in public component."
      },
      "complexType": {
        "original": "EventScanSuccess",
        "resolved": "EventScanSuccess",
        "references": {
          "EventScanSuccess": {
            "location": "import",
            "path": "../../../utils/data-structures"
          }
        }
      }
    }, {
      "method": "feedback",
      "name": "feedback",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event containing FeedbackMessage which can be passed to MbFeedback component."
      },
      "complexType": {
        "original": "FeedbackMessage",
        "resolved": "FeedbackMessage",
        "references": {
          "FeedbackMessage": {
            "location": "import",
            "path": "../../../utils/data-structures"
          }
        }
      }
    }, {
      "method": "cameraScanStarted",
      "name": "cameraScanStarted",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "See event 'cameraScanStarted' in public component."
      },
      "complexType": {
        "original": "null",
        "resolved": "null",
        "references": {}
      }
    }, {
      "method": "imageScanStarted",
      "name": "imageScanStarted",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "See event 'imageScanStarted' in public component."
      },
      "complexType": {
        "original": "null",
        "resolved": "null",
        "references": {}
      }
    }, {
      "method": "scanAborted",
      "name": "scanAborted",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "See event 'scanAborted' in public component."
      },
      "complexType": {
        "original": "null",
        "resolved": "null",
        "references": {}
      }
    }, {
      "method": "setIsCameraActive",
      "name": "setIsCameraActive",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when camera stream becomes active."
      },
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      }
    }]; }
  static get methods() { return {
    "startCameraScan": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Starts camera scan using camera overlay with usage instructions.",
        "tags": []
      }
    },
    "startImageScan": {
      "complexType": {
        "signature": "(file: File) => Promise<void>",
        "parameters": [{
            "tags": [{
                "name": "param",
                "text": "file File to scan"
              }],
            "text": "File to scan"
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "File": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Starts image scan, emits results from provided file.",
        "tags": [{
            "name": "param",
            "text": "file File to scan"
          }]
      }
    },
    "startCombinedImageScan": {
      "complexType": {
        "signature": "(firstFile: File, secondFile: File) => Promise<void>",
        "parameters": [{
            "tags": [{
                "name": "param",
                "text": "firstFile File to scan as first image"
              }],
            "text": "File to scan as first image"
          }, {
            "tags": [{
                "name": "param",
                "text": "secondFile File to scan as second image"
              }],
            "text": "File to scan as second image"
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "File": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Starts combined image scan, emits results from provided files.",
        "tags": [{
            "name": "param",
            "text": "firstFile File to scan as first image"
          }, {
            "name": "param",
            "text": "secondFile File to scan as second image"
          }]
      }
    },
    "setUiState": {
      "complexType": {
        "signature": "(state: 'ERROR' | 'LOADING' | 'NONE' | 'SUCCESS') => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Method is exposed outside which allow us to control UI state from parent component.\n\nIn case of state `ERROR` and if `showModalWindows` is set to `true`, modal window\nwith error message will be displayed.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "hostEl"; }
  static get listeners() { return [{
      "name": "keyup",
      "method": "handleKeyUp",
      "target": "window",
      "capture": false,
      "passive": false
    }]; }
}
