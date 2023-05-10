/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Host, h, Prop } from '@stencil/core';
export class MbTooltip {
  render() {
    return (h(Host, null,
      h("p", { part: "tooltip", class: `mb-tooltip ${this.show ? "visible" : ""} ${this.arrowPosition ? this.arrowPosition : "arrow-none"} ${this.textAlign ? this.textAlign : "text-center"} ` }, this.message)));
  }
  static get is() { return "mb-tooltip"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-tooltip.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-tooltip.css"]
  }; }
  static get properties() { return {
    "show": {
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
      "attribute": "show",
      "reflect": false
    },
    "message": {
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
        "text": ""
      },
      "attribute": "message",
      "reflect": false
    },
    "arrowPosition": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'arrow-left' | 'arrow-right' | 'arrow-up' | 'arrow-down' | 'arrow-none'",
        "resolved": "\"arrow-down\" | \"arrow-left\" | \"arrow-none\" | \"arrow-right\" | \"arrow-up\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "arrow-position",
      "reflect": false
    },
    "showWarningIcon": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "show-warning-icon",
      "reflect": false
    },
    "showInfoIcon": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "show-info-icon",
      "reflect": false
    },
    "textAlign": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'text-center' | 'text-left' | 'text-right'",
        "resolved": "\"text-center\" | \"text-left\" | \"text-right\"",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "text-align",
      "reflect": false
    },
    "containerWidth": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "container-width",
      "reflect": false
    }
  }; }
}
