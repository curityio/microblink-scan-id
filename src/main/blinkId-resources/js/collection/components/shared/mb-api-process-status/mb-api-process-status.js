/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Event, Host, h, Prop } from '@stencil/core';
import { setWebComponentParts, classNames } from '../../../utils/generic.helpers';
export class MbApiProcessStatus {
  constructor() {
    /**
     * Element visibility, default is 'false'.
     */
    this.visible = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: classNames({ visible: this.visible }) },
      this.state === 'LOADING' &&
        h("div", { class: "reticle-container" },
          h("div", { class: "reticle is-classification" },
            h("div", { class: "reticle__cursor" },
              h("div", { class: "reticle__el" }),
              h("div", { class: "reticle__el" }),
              h("div", { class: "reticle__el" }),
              h("div", { class: "reticle__el" }))),
          h("p", { class: "message" }, this.translationService.i('process-api-message').toString())),
      this.state === 'SUCCESS' &&
        h("div", { class: "reticle-container" },
          h("div", { class: "reticle is-done-all" },
            h("div", { class: "reticle__cursor" },
              h("div", { class: "reticle__el" }),
              h("div", { class: "reticle__el" }),
              h("div", { class: "reticle__el" }),
              h("div", { class: "reticle__el" })),
            h("img", { class: "reticle__done", src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjk3MiAzMy40NkMyMC43MDk1IDMzLjQ2MDUgMjAuNDQ5NCAzMy40MDkyIDIwLjIwNjggMzMuMzA5QzE5Ljk2NDEgMzMuMjA4OCAxOS43NDM2IDMzLjA2MTYgMTkuNTU4IDMyLjg3NkwxMS4wNzQgMjQuMzlDMTAuODgyOSAyNC4yMDU2IDEwLjczMDMgMjMuOTg1MSAxMC42MjU0IDIzLjc0MTFDMTAuNTIwNCAyMy40OTcyIDEwLjQ2NSAyMy4yMzQ4IDEwLjQ2MjUgMjIuOTY5MkMxMC40NiAyMi43MDM3IDEwLjUxMDQgMjIuNDQwMyAxMC42MTA4IDIyLjE5NDRDMTAuNzExMiAyMS45NDg2IDEwLjg1OTYgMjEuNzI1MiAxMS4wNDcyIDIxLjUzNzNDMTEuMjM0OSAyMS4zNDkzIDExLjQ1ODEgMjEuMjAwNyAxMS43MDM4IDIxLjA5OTlDMTEuOTQ5NSAyMC45OTkyIDEyLjIxMjggMjAuOTQ4NCAxMi40Nzg0IDIwLjk1MDVDMTIuNzQzOSAyMC45NTI2IDEzLjAwNjQgMjEuMDA3NiAxMy4yNTA1IDIxLjExMjNDMTMuNDk0NiAyMS4yMTY5IDEzLjcxNTQgMjEuMzY5MSAxMy45IDIxLjU2TDIwLjk3IDI4LjYzTDMzLjcgMTUuOTA0QzM0LjA3NSAxNS41Mjg3IDM0LjU4MzggMTUuMzE3OCAzNS4xMTQzIDE1LjMxNzZDMzUuNjQ0OCAxNS4zMTc0IDM2LjE1MzcgMTUuNTI4IDM2LjUyOSAxNS45MDNDMzYuOTA0MyAxNi4yNzggMzcuMTE1MiAxNi43ODY4IDM3LjExNTQgMTcuMzE3M0MzNy4xMTU2IDE3Ljg0NzggMzYuOTA1IDE4LjM1NjcgMzYuNTMgMTguNzMyTDIyLjM4NiAzMi44NzZDMjIuMjAwNCAzMy4wNjE2IDIxLjk3OTkgMzMuMjA4OCAyMS43MzcyIDMzLjMwOUMyMS40OTQ2IDMzLjQwOTIgMjEuMjM0NSAzMy40NjA1IDIwLjk3MiAzMy40NloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=" }))),
      this.state === 'ERROR' &&
        h("mb-modal", { visible: true, modalTitle: this.translationService.i('feedback-scan-unsuccessful-title').toString(), content: this.translationService.i('feedback-scan-unsuccessful').toString(), onClose: () => this.closeFromStart.emit() },
          h("div", { slot: "actionButtons" },
            h("button", { class: "primary modal-action-button", onClick: () => this.closeTryAgain.emit() }, this.translationService.i('process-api-retry').toString())))));
  }
  static get is() { return "mb-api-process-status"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-api-process-status.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-api-process-status.css"]
  }; }
  static get properties() { return {
    "visible": {
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
        "text": "Element visibility, default is 'false'."
      },
      "attribute": "visible",
      "reflect": false,
      "defaultValue": "false"
    },
    "state": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'ERROR' | 'LOADING' | 'NONE' | 'SUCCESS'",
        "resolved": "\"ERROR\" | \"LOADING\" | \"NONE\" | \"SUCCESS\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "State value of API processing received from parent element ('loading' or 'success')."
      },
      "attribute": "state",
      "reflect": false
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
        "text": "Instance of TranslationService passed from parent component."
      }
    }
  }; }
  static get events() { return [{
      "method": "closeTryAgain",
      "name": "closeTryAgain",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when user clicks on 'Retry' button."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "closeFromStart",
      "name": "closeFromStart",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when user clicks on 'x' button."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get elementRef() { return "hostEl"; }
}
