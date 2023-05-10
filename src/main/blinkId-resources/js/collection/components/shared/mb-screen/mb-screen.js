/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Host, h, Prop } from '@stencil/core';
import { setWebComponentParts, classNames } from '../../../utils/generic.helpers';
export class MbScreen {
  constructor() {
    /**
     * Set to 'true' if screen should be visible.
     */
    this.visible = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: classNames({ visible: this.visible }) },
      h("slot", null)));
  }
  static get is() { return "mb-screen"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-screen.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-screen.css"]
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
        "text": "Set to 'true' if screen should be visible."
      },
      "attribute": "visible",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get elementRef() { return "hostEl"; }
}
