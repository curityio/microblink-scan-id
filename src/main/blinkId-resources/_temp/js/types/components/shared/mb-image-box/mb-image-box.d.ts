/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { EventEmitter } from '../../../stencil-public-runtime';
export declare class MbImageBox {
  private scanFromImageInput;
  private ctaLabel;
  private addIcon;
  private removeIcon;
  private hasImage;
  /**
   * Text which represents name of the image.
   */
  boxTitle: string;
  /**
   * Text which should be displayed inside 'Add image' anchor element when file
   * is not selected.
   */
  anchorText: string;
  /**
   * Event which is triggered when selected image file is changed.
   */
  imageChange: EventEmitter<FileList>;
  /**
   * Host element as variable for manipulation
   */
  hostEl: HTMLElement;
  componentDidLoad(): void;
  componentDidRender(): void;
  /**
   * Clear input image.
   */
  clear(): Promise<void>;
  private onFromImageClicked;
  private onImageChange;
  private onClearImage;
  render(): any;
}
