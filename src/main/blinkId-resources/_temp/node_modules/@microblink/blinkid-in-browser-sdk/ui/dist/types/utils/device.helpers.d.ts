/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
export declare function hasVideoDevices(): Promise<boolean>;
export declare function isWasmSupported(): Promise<boolean>;
export declare function checkMandatoryCapabilites(): Promise<boolean>;
/**
 * Determine whether this is a desktop device based on the screen resolution.
 */
export declare function isDesktop(): boolean;
