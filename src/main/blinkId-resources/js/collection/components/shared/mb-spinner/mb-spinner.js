/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Host, h, Prop } from '@stencil/core';
import { setWebComponentParts } from '../../../utils/generic.helpers';
export class MbSpinner {
  constructor() {
    /**
     * Value of `src` attribute for <img> element.
     */
    this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2IiBoZWlnaHQ9IjEwNiIgdmlld0JveD0iMCAwIDEwNiAxMDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUzIiBjeT0iNTMiIHI9IjUwIiBzdHJva2U9IiNEQ0VBRkYiIHN0cm9rZS13aWR0aD0iNiIvPgo8cGF0aCBkPSJNMyA1M0MzIDI1LjM4NTggMjUuMzg1OCAzIDUzIDMiIHN0cm9rZT0iIzAwNjJGMiIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==';
    /**
     * Spinner size, can be 'default' or 'large'.
     */
    this.size = 'default';
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, { class: this.size },
      h("img", { src: this.icon })));
  }
  static get is() { return "mb-spinner"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-spinner.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-spinner.css"]
  }; }
  static get properties() { return {
    "icon": {
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
        "text": "Value of `src` attribute for <img> element."
      },
      "attribute": "icon",
      "reflect": false,
      "defaultValue": "'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2IiBoZWlnaHQ9IjEwNiIgdmlld0JveD0iMCAwIDEwNiAxMDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUzIiBjeT0iNTMiIHI9IjUwIiBzdHJva2U9IiNEQ0VBRkYiIHN0cm9rZS13aWR0aD0iNiIvPgo8cGF0aCBkPSJNMyA1M0MzIDI1LjM4NTggMjUuMzg1OCAzIDUzIDMiIHN0cm9rZT0iIzAwNjJGMiIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=='"
    },
    "size": {
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
        "text": "Spinner size, can be 'default' or 'large'."
      },
      "attribute": "size",
      "reflect": false,
      "defaultValue": "'default'"
    }
  }; }
  static get elementRef() { return "hostEl"; }
}
