/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Event, Host, h, Prop } from '@stencil/core';
import { getWebComponentParts, setWebComponentParts, classNames } from '../../../utils/generic.helpers';
export class MbModal {
  constructor() {
    /**
     * Show modal content
     */
    this.visible = false;
    /**
     * Show shadow drop
     */
    this.elevated = false;
    /**
     * Center component
     */
    this.centered = false;
    /**
     * Passed title content from parent component
     */
    this.modalTitle = "";
    /**
     * Passed body content from parent component
     */
    this.content = "";
    /**
     * Center content inside modal
     */
    this.contentCentered = true;
    /**
     * Whether to show back arrow or not
     */
    this.showBackButton = false;
    /**
     * Whether to hide the footer or not
     */
    this.hideFooter = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
    const parts = getWebComponentParts(this.hostEl.shadowRoot);
    this.hostEl.setAttribute('exportparts', parts.join(', '));
  }
  render() {
    return (h(Host, { class: classNames({ visible: this.visible, elevated: this.elevated, centered: this.centered }) },
      h("div", { class: "mb-modal" },
        h("div", { part: "mb-modal-inner", class: "inner" },
          h("div", { class: "close-wrapper" },
            h("div", { class: "close-icon", onClick: () => this.close.emit() },
              h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.5892 4.41058C15.9147 4.73602 15.9147 5.26366 15.5892 5.58909L5.58925 15.5891C5.26381 15.9145 4.73617 15.9145 4.41073 15.5891C4.0853 15.2637 4.0853 14.736 4.41073 14.4106L14.4107 4.41058C14.7362 4.08514 15.2638 4.08514 15.5892 4.41058Z", fill: "#9CA3AF" }),
                h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.41073 4.41058C4.73617 4.08514 5.26381 4.08514 5.58925 4.41058L15.5892 14.4106C15.9147 14.736 15.9147 15.2637 15.5892 15.5891C15.2638 15.9145 14.7362 15.9145 14.4107 15.5891L4.41073 5.58909C4.0853 5.26366 4.0853 4.73602 4.41073 4.41058Z", fill: "#9CA3AF" })))),
          this.showBackButton ? (h("div", { class: "back-wrapper" },
            h("div", { onClick: () => this.back.emit() },
              h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.75596 4.41058C10.0814 4.73602 10.0814 5.26366 9.75596 5.58909L6.17855 9.1665H15.8334C16.2936 9.1665 16.6667 9.5396 16.6667 9.99984C16.6667 10.4601 16.2936 10.8332 15.8334 10.8332H6.17855L9.75596 14.4106C10.0814 14.736 10.0814 15.2637 9.75596 15.5891C9.43053 15.9145 8.90289 15.9145 8.57745 15.5891L3.57745 10.5891C3.25201 10.2637 3.25201 9.73602 3.57745 9.41058L3.57799 9.41005L8.57745 4.41058C8.90289 4.08514 9.43053 4.08514 9.75596 4.41058Z", fill: "#9CA3AF" }))))) : null,
          h("div", { class: "title" }, this.modalTitle),
          h("div", { class: this.contentCentered ? 'centered' : '' }, this.content),
          h("slot", { name: "content" }),
          h("div", { class: "actions" },
            h("slot", { name: "actionButtons" }))),
        this.hideFooter ? null : (h("div", { class: "footer" },
          h("slot", { name: "footer" }))))));
  }
  static get is() { return "mb-modal"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-modal.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-modal.css"]
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
        "text": "Show modal content"
      },
      "attribute": "visible",
      "reflect": false,
      "defaultValue": "false"
    },
    "elevated": {
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
        "text": "Show shadow drop"
      },
      "attribute": "elevated",
      "reflect": false,
      "defaultValue": "false"
    },
    "centered": {
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
        "text": "Center component"
      },
      "attribute": "centered",
      "reflect": false,
      "defaultValue": "false"
    },
    "modalTitle": {
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
        "text": "Passed title content from parent component"
      },
      "attribute": "modal-title",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "content": {
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
        "text": "Passed body content from parent component"
      },
      "attribute": "content",
      "reflect": false,
      "defaultValue": "\"\""
    },
    "contentCentered": {
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
        "text": "Center content inside modal"
      },
      "attribute": "content-centered",
      "reflect": false,
      "defaultValue": "true"
    },
    "showBackButton": {
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
        "text": "Whether to show back arrow or not"
      },
      "attribute": "show-back-button",
      "reflect": false,
      "defaultValue": "false"
    },
    "hideFooter": {
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
        "text": "Whether to hide the footer or not"
      },
      "attribute": "hide-footer",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get events() { return [{
      "method": "close",
      "name": "close",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when user clicks on 'X' button."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }, {
      "method": "back",
      "name": "back",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": "Emitted when user clicks on 'Back Arrow' button."
      },
      "complexType": {
        "original": "void",
        "resolved": "void",
        "references": {}
      }
    }]; }
  static get elementRef() { return "hostEl"; }
}
