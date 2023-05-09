/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Host, h } from '@stencil/core';
import { setWebComponentParts } from '../../../utils/generic.helpers';
export class MbContainer {
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, null,
      h("slot", null)));
  }
  static get is() { return "mb-container"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-container.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-container.css"]
  }; }
  static get elementRef() { return "hostEl"; }
}
