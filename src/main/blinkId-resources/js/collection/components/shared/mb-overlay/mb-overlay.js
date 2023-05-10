/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Host, h, Prop } from '@stencil/core';
import { setWebComponentParts, classNames } from '../../../utils/generic.helpers';
export class MbOverlay {
  constructor() {
    /**
     * Set to 'false' if overlay should not cover whole screen.
     */
    this.fullscreen = true;
    /**
     * Set to 'true' if overlay should be visible.
     */
    this.visible = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  getHostClassNames() {
    const classNames = [];
    this.hostEl.classList.forEach((value) => {
      if (value !== 'visible' && value !== 'non-fullscreen') {
        classNames.push(value);
      }
    });
    return classNames.join(' ');
  }
  render() {
    return (h(Host, { class: `${classNames({ visible: this.visible, 'non-fullscreen': !this.fullscreen })} ${this.getHostClassNames()}` },
      h("slot", null)));
  }
  static get is() { return "mb-overlay"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-overlay.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-overlay.css"]
  }; }
  static get properties() { return {
    "fullscreen": {
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
        "text": "Set to 'false' if overlay should not cover whole screen."
      },
      "attribute": "fullscreen",
      "reflect": false,
      "defaultValue": "true"
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
        "text": "Set to 'true' if overlay should be visible."
      },
      "attribute": "visible",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "hostEl"; }
}
