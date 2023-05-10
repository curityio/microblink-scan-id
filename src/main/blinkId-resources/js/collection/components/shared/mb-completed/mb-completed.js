/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { Component, Element, Host, h, Prop } from '@stencil/core';
import { setWebComponentParts } from '../../../utils/generic.helpers';
export class MbCompleted {
  constructor() {
    /**
     * Value of `src` attribute for <img> element.
     */
    this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS4yMDcxIDYuMjkyODlDMjEuNTk3NiA2LjY4MzQyIDIxLjU5NzYgNy4zMTY1OCAyMS4yMDcxIDcuNzA3MTFMMTEuMjA3MSAxNy43MDcxQzEwLjgxNjYgMTguMDk3NiAxMC4xODM0IDE4LjA5NzYgOS43OTI4OSAxNy43MDcxTDQuNzkyODkgMTIuNzA3MUM0LjQwMjM3IDEyLjMxNjYgNC40MDIzNyAxMS42ODM0IDQuNzkyODkgMTEuMjkyOUM1LjE4MzQyIDEwLjkwMjQgNS44MTY1OCAxMC45MDI0IDYuMjA3MTEgMTEuMjkyOUwxMC41IDE1LjU4NThMMTkuNzkyOSA2LjI5Mjg5QzIwLjE4MzQgNS45MDIzNyAyMC44MTY2IDUuOTAyMzcgMjEuMjA3MSA2LjI5Mjg5WiIgZmlsbD0iIzAwNjJGMiIvPgo8L3N2Zz4K';
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (h(Host, null,
      h("img", { src: this.icon })));
  }
  static get is() { return "mb-completed"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["mb-completed.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["mb-completed.css"]
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
      "defaultValue": "'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS4yMDcxIDYuMjkyODlDMjEuNTk3NiA2LjY4MzQyIDIxLjU5NzYgNy4zMTY1OCAyMS4yMDcxIDcuNzA3MTFMMTEuMjA3MSAxNy43MDcxQzEwLjgxNjYgMTguMDk3NiAxMC4xODM0IDE4LjA5NzYgOS43OTI4OSAxNy43MDcxTDQuNzkyODkgMTIuNzA3MUM0LjQwMjM3IDEyLjMxNjYgNC40MDIzNyAxMS42ODM0IDQuNzkyODkgMTEuMjkyOUM1LjE4MzQyIDEwLjkwMjQgNS44MTY1OCAxMC45MDI0IDYuMjA3MTEgMTEuMjkyOUwxMC41IDE1LjU4NThMMTkuNzkyOSA2LjI5Mjg5QzIwLjE4MzQgNS45MDIzNyAyMC44MTY2IDUuOTAyMzcgMjEuMjA3MSA2LjI5Mjg5WiIgZmlsbD0iIzAwNjJGMiIvPgo8L3N2Zz4K'"
    }
  }; }
  static get elementRef() { return "hostEl"; }
}
