/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Host, h, Prop } from '@stencil/core';
import { setWebComponentParts } from '../../../utils/generic.helpers';
export class MbButtonClassic {
  constructor() {
    /**
     * Set to 'true' if button should be inverted style.
     */
    this.inverted = false;
    /**
     * Set to 'true' if button should be disabled, and if click events should not be triggered.
     */
    this.disabled = false;
    /**
     * Set to 'true' if default event should be prevented.
     */
    this.preventDefault = false;
  }
  connectedCallback() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, null,
      h("button", { disabled: this.disabled, onClick: this.clickHandler },
        h("slot", null))));
  }
  static get is() { return "mb-button-classic"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-button-classic.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-button-classic.css"]
  }; }
  static get properties() { return {
    "inverted": {
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
        "text": "Set to 'true' if button should be inverted style."
      },
      "attribute": "inverted",
      "reflect": false,
      "defaultValue": "false"
    },
    "disabled": {
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
        "text": "Set to 'true' if button should be disabled, and if click events should not be triggered."
      },
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "preventDefault": {
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
        "text": "Set to 'true' if default event should be prevented."
      },
      "attribute": "prevent-default",
      "reflect": false,
      "defaultValue": "false"
    },
    "clickHandler": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "(ev: UIEvent) => void",
        "resolved": "(ev: UIEvent) => void",
        "references": {
          "UIEvent": {
            "location": "global"
          }
        }
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Function to call on click"
      }
    }
  }; }
  static get elementRef() { return "hostEl"; }
}
