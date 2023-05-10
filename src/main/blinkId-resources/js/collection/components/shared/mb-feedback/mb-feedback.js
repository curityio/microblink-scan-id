/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Host, h, Method, Prop, State } from '@stencil/core';
import { setWebComponentParts, classNames } from '../../../utils/generic.helpers';
import * as Utils from './mb-feedback.utils';
export class MbFeedback {
  constructor() {
    /**
     * Set to 'true' if component should be visible.
     */
    this.visible = false;
  }
  /**
   * Call when FeedbackMessage which should be displayed.
   */
  async show(feedback) {
    this.paragraphValue = feedback.message;
    this.paragraphClassName = Utils.getFeedbackClassName(feedback.state);
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: classNames({ visible: this.visible }) },
      h("p", { class: this.paragraphClassName }, this.paragraphValue)));
  }
  static get is() { return "mb-feedback"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-feedback.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-feedback.css"]
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
        "text": "Set to 'true' if component should be visible."
      },
      "attribute": "visible",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get states() { return {
    "paragraphClassName": {},
    "paragraphValue": {}
  }; }
  static get methods() { return {
    "show": {
      "complexType": {
        "signature": "(feedback: FeedbackMessage) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "FeedbackMessage": {
            "location": "import",
            "path": "../../../utils/data-structures"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "Call when FeedbackMessage which should be displayed.",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "hostEl"; }
}
