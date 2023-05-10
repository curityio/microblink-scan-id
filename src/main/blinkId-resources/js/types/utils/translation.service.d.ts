/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare const defaultTranslations: {
  [key: string]: string | Array<string>;
};
export declare class TranslationService {
  translations: {
    [key: string]: string | Array<string>;
  };
  constructor(alternativeTranslations?: {
    [key: string]: string | Array<string>;
  });
  i(key: string): string | Array<string>;
  private isExpectedValue;
}
