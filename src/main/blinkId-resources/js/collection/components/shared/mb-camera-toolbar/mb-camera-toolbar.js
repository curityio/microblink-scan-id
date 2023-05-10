/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Event, Host, h, Method, Prop, State, Listen } from '@stencil/core';
import * as DeviceHelpers from '../../../utils/device.helpers';
import { setWebComponentParts, classNames } from '../../../utils/generic.helpers';
export class MbCameraToolbar {
  constructor() {
    this.showCloseButton = false;
    this.isDesktop = DeviceHelpers.isDesktop();
    /**
     * Set to `true` if close button should be displayed.
     */
    this.showClose = false;
    this.clearIsCameraActive = false;
    /**
     * Whether to show 'Camera flip' button.
     */
    this.enableCameraFlip = false;
    /**
     * Whether the camera is flipped, this property will be flip the relevant icon.
     */
    this.cameraFlipped = false;
    this.handleResize = () => {
      this.isDesktop = DeviceHelpers.isDesktop();
    };
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  connectedCallback() {
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  }
  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize, false);
  }
  /**
   * Change active camera.
   */
  async setActiveCamera(cameraId) {
    this.cameraSelection.setActiveCamera(cameraId);
    this.showCloseButton = this.showClose;
  }
  /**
   * Populate list of camera devices.
   */
  async populateCameraDevices() {
    await this.cameraSelection.populateCameraDevices();
  }
  handleClose(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.closeEvent.emit();
    this.showCloseButton = false;
  }
  handleFlip(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.flipEvent.emit();
  }
  handleChangeCameraDevice(camera) {
    this.changeCameraDevice.emit(camera);
  }
  handleSetIsCameraActive(ev) {
    if (ev.detail) {
      this.showCloseButton = this.showClose;
    }
    else {
      this.showCloseButton = ev.detail;
    }
  }
  render() {
    let flipButton = '';
    if (this.enableCameraFlip) {
      flipButton = (h("button", { class: this.cameraFlipped ? 'toolbar-button flip-button flipped' : 'toolbar-button flip-button', onClick: (ev) => this.handleFlip(ev) },
        h("svg", { width: "28", height: "28", viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
          h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16 5C16.5523 5 17 5.44772 17 6V24C17 24.5523 16.5523 25 16 25C15.4477 25 15 24.5523 15 24V6C15 5.44772 15.4477 5 16 5Z", fill: "white" }),
          h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19.7702 9.02676C20.2216 8.9202 20.687 9.13798 20.8944 9.55279L25.8944 19.5528C26.0494 19.8628 26.0329 20.2309 25.8507 20.5257C25.6684 20.8206 25.3466 21 25 21H20C19.4477 21 19 20.5523 19 20V10C19 9.53623 19.3189 9.13331 19.7702 9.02676ZM21 14.2361V19H23.382L21 14.2361Z", fill: "white" }),
          h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.2298 9.02676C12.6811 9.13331 13 9.53623 13 10V20C13 20.5523 12.5523 21 12 21H7C6.65342 21 6.33156 20.8206 6.14935 20.5257C5.96714 20.2309 5.95058 19.8628 6.10557 19.5528L11.1056 9.55279C11.313 9.13798 11.7784 8.9202 12.2298 9.02676ZM8.61803 19H11V14.2361L8.61803 19Z", fill: "white" }),
          h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19.7702 9.02676C20.2216 8.9202 20.687 9.13798 20.8944 9.55279L25.8944 19.5528C26.0494 19.8628 26.0329 20.2309 25.8507 20.5257C25.6684 20.8206 25.3466 21 25 21H20C19.4477 21 19 20.5523 19 20V10C19 9.53623 19.3189 9.13331 19.7702 9.02676Z", fill: "white" }))));
    }
    let closeButton = '';
    if (this.showCloseButton) {
      closeButton = (h("button", { class: "toolbar-button close-button", onClick: (ev) => this.handleClose(ev) },
        h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
          h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z", fill: "white" }),
          h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z", fill: "white" }))));
    }
    return (h(Host, null,
      h("header", null,
        flipButton,
        h("div", { class: "camera-selection-wrapper" },
          h("mb-camera-selection", { "clear-is-camera-active": !this.showCloseButton || this.clearIsCameraActive, onChangeCameraDevice: (ev) => this.handleChangeCameraDevice(ev.detail), class: classNames({ visible: this.isDesktop }), ref: el => this.cameraSelection = el })),
        closeButton)));
  }
  static get is() { return "mb-camera-toolbar"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-camera-toolbar.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-camera-toolbar.css"]
  }; }
  static get properties() { return {
    "showClose": {
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
        "text": "Set to `true` if close button should be displayed."
      },
      "attribute": "show-close",
      "reflect": false,
      "defaultValue": "false"
    },
    "clearIsCameraActive": {
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
        "text": ""
      },
      "attribute": "clear-is-camera-active",
      "reflect": false,
      "defaultValue": "false"
    },
    "enableCameraFlip": {
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
        "text": "Whether to show 'Camera flip' button."
      },
      "attribute": "enable-camera-flip",
      "reflect": false,
      "defaultValue": "false"
    },
    "cameraFlipped": {
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
        "text": "Whether the camera is flipped, this property will be flip the relevant icon."
      },
      "attribute": "camera-flipped",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "showCloseButton": {},
    "isDesktop": {}
  }; }
  static get events() { return [{
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
    }, {
      "method": "closeEvent",
      "name": "closeEvent",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event which is triggered when close button is clicked."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "flipEvent",
      "name": "flipEvent",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Event which is triggered when flip camera button is clicked."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "changeCameraDevice",
      "name": "changeCameraDevice",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when user selects a different camera device."
      },
      "complexType": {
        "original": "CameraEntry",
        "resolved": "CameraEntry",
        "references": {
          "CameraEntry": {
            "location": "import",
            "path": "../../../utils/data-structures"
          }
        }
      }
    }]; }
  static get methods() { return {
    "setActiveCamera": {
      "complexType": {
        "signature": "(cameraId: string) => Promise<void>",
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
        "text": "Change active camera.",
        "tags": []
      }
    },
    "populateCameraDevices": {
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
        "text": "Populate list of camera devices.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "hostEl"; }
  static get listeners() { return [{
      "name": "setIsCameraActive",
      "method": "handleSetIsCameraActive",
      "target": undefined,
      "capture": true,
      "passive": false
    }]; }
}
