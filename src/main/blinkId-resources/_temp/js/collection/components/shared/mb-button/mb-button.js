/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Host, h, Prop, } from '@stencil/core';
import { setWebComponentParts, classNames } from '../../../utils/generic.helpers';
export class MbButton {
  constructor() {
    /**
     * Set to 'true' if button should be disabled, and if click events should not be triggered.
     */
    this.disabled = false;
    /**
     * Set to 'true' if button should be visible.
     */
    this.visible = false;
    /**
     * Set to 'true' if button should enter 'selected' state.
     */
    this.selected = false;
    /**
     * Passed description text for image element from parent component.
     */
    this.imageAlt = '';
    /**
     * Set to string which should be displayed below the icon.
     *
     * If omitted, nothing will show.
     */
    this.label = '';
  }
  connectedCallback() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: classNames({
        visible: this.visible,
        selected: this.selected,
      }) },
      h("button", { onClick: this.clickHandler, title: this.buttonTitle, disabled: this.disabled },
        h("img", { class: "icon-default", src: this.imageSrcDefault, alt: "" }),
        h("img", { class: "icon-active", src: this.imageSrcActive, alt: "" })),
      this.label !== "" && h("span", null, this.label)));
  }
  static get is() { return "mb-button"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-button.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-button.css"]
  }; }
  static get properties() { return {
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
        "text": "Set to 'true' if button should be visible."
      },
      "attribute": "visible",
      "reflect": false,
      "defaultValue": "false"
    },
    "selected": {
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
        "text": "Set to 'true' if button should enter 'selected' state."
      },
      "attribute": "selected",
      "reflect": false,
      "defaultValue": "false"
    },
    "imageSrcDefault": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Passed image from parent component."
      },
      "attribute": "image-src-default",
      "reflect": false
    },
    "imageSrcActive": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "Passed image from parent component."
      },
      "attribute": "image-src-active",
      "reflect": false
    },
    "imageAlt": {
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
        "text": "Passed description text for image element from parent component."
      },
      "attribute": "image-alt",
      "reflect": false,
      "defaultValue": "''"
    },
    "label": {
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
        "text": "Set to string which should be displayed below the icon.\n\nIf omitted, nothing will show."
      },
      "attribute": "label",
      "reflect": false,
      "defaultValue": "''"
    },
    "buttonTitle": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "button-title",
      "reflect": false
    }
  }; }
  static get elementRef() { return "hostEl"; }
}
