'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6027951.js');

/*! ****************************************************************************
Copyright (c) Microblink. All rights reserved.

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
***************************************************************************** */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
let nextMessageID = 0;
function getNextMessageID() {
    const msgId = nextMessageID;
    nextMessageID = nextMessageID + 1;
    return msgId;
}
class BaseRequestMessage {
    constructor(action) {
        this.action = action;
        this.messageID = getNextMessageID();
    }
}
class InitMessage extends BaseRequestMessage {
    constructor(wasmLoadSettings, userId) {
        super(InitMessage.action);
        this.wasmModuleName = wasmLoadSettings.wasmModuleName;
        this.licenseKey = wasmLoadSettings.licenseKey;
        this.userId = userId;
        this.registerLoadCallback = wasmLoadSettings.loadProgressCallback !== null;
        this.allowHelloMessage = wasmLoadSettings.allowHelloMessage;
        this.engineLocation = wasmLoadSettings.engineLocation;
        this.wasmType = wasmLoadSettings.wasmType;
        this.numberOfWorkers = wasmLoadSettings.numberOfWorkers;
    }
}
InitMessage.action = "init";
var ParameterType;
(function (ParameterType) {
    ParameterType[ParameterType["Any"] = 0] = "Any";
    ParameterType[ParameterType["Recognizer"] = 1] = "Recognizer";
    ParameterType[ParameterType["RecognizerSettings"] = 2] = "RecognizerSettings";
    ParameterType[ParameterType["Callback"] = 3] = "Callback";
})(ParameterType || (ParameterType = {}));
class CreateNewRecognizer extends BaseRequestMessage {
    constructor(className, params) {
        super(CreateNewRecognizer.action);
        this.className = className;
        this.params = params;
    }
}
CreateNewRecognizer.action = "createNewNativeObject";
class CreateRecognizerRunner extends BaseRequestMessage {
    constructor(recognizerHandles, allowMultipleResults, registeredMetadataCallbacks) {
        super(CreateRecognizerRunner.action);
        this.recognizerHandles = recognizerHandles;
        this.allowMultipleResults = allowMultipleResults;
        this.registeredMetadataCallbacks = registeredMetadataCallbacks;
    }
}
CreateRecognizerRunner.action = "createRecognizerRunner";
class ReconfigureRecognizerRunner extends BaseRequestMessage {
    constructor(recognizerHandles, allowMultipleResults) {
        super(ReconfigureRecognizerRunner.action);
        this.recognizerHandles = recognizerHandles;
        this.allowMultipleResults = allowMultipleResults;
    }
}
ReconfigureRecognizerRunner.action = "reconfigureRecognizerRunner";
class DeleteRecognizerRunner extends BaseRequestMessage {
    constructor() {
        super(DeleteRecognizerRunner.action);
    }
}
DeleteRecognizerRunner.action = "deleteRecognizerRunner";
class InvokeObjectMethod extends BaseRequestMessage {
    constructor(objectHandle, methodName, params) {
        super(InvokeObjectMethod.action);
        this.objectHandle = objectHandle;
        this.methodName = methodName;
        this.params = params;
    }
}
InvokeObjectMethod.action = "invokeObject";
class ProcessImage extends BaseRequestMessage {
    constructor(image) {
        super(ProcessImage.action);
        this.frame = image;
    }
    getTransferrables() {
        return [this.frame.imageData.data.buffer];
    }
}
ProcessImage.action = "processImage";
class ResetRecognizers extends BaseRequestMessage {
    constructor(hardReset) {
        super(ResetRecognizers.action);
        this.hardReset = hardReset;
    }
}
ResetRecognizers.action = "resetRecognizers";
class RegisteredMetadataCallbacks {
    constructor() {
        this.onDebugText = false;
        this.onDetectionFailed = false;
        this.onQuadDetection = false;
        this.onPointsDetection = false;
        this.onFirstSideResult = false;
        this.onGlare = false;
    }
}
class RegisterMetadataCallbacks extends BaseRequestMessage {
    constructor(registeredMetadataCallbacks) {
        super(RegisterMetadataCallbacks.action);
        this.registeredMetadataCallbacks = registeredMetadataCallbacks;
    }
}
RegisterMetadataCallbacks.action = "registerMetadataCallbacks";
class SetDetectionOnly extends BaseRequestMessage {
    constructor(detectionOnlyMode) {
        super(SetDetectionOnly.action);
        this.detectionOnlyMode = detectionOnlyMode;
    }
}
SetDetectionOnly.action = "setDetectionOnly";
class SetClearTimeoutCallback extends BaseRequestMessage {
    constructor(callbackNonEmpty) {
        super(SetClearTimeoutCallback.action);
        this.callbackNonEmpty = callbackNonEmpty;
    }
}
SetClearTimeoutCallback.action = "setClearTimeoutCallback";
class SetCameraPreviewMirrored extends BaseRequestMessage {
    constructor(cameraPreviewMirrored) {
        super(SetCameraPreviewMirrored.action);
        this.cameraPreviewMirrored = cameraPreviewMirrored;
    }
}
SetCameraPreviewMirrored.action = "setCameraPreviewMirrored";
class GetProductIntegrationInfo extends BaseRequestMessage {
    constructor(userId) {
        super(GetProductIntegrationInfo.action);
        this.userId = userId;
    }
}
GetProductIntegrationInfo.action = "getProductIntegrationInfo";
// ===================================== /
// Metadata callback messages
// ===================================== /
var MetadataCallback;
(function (MetadataCallback) {
    MetadataCallback[MetadataCallback["onDebugText"] = 0] = "onDebugText";
    MetadataCallback[MetadataCallback["onDetectionFailed"] = 1] = "onDetectionFailed";
    MetadataCallback[MetadataCallback["onQuadDetection"] = 2] = "onQuadDetection";
    MetadataCallback[MetadataCallback["onPointsDetection"] = 3] = "onPointsDetection";
    MetadataCallback[MetadataCallback["onFirstSideResult"] = 4] = "onFirstSideResult";
    MetadataCallback[MetadataCallback["clearTimeoutCallback"] = 5] = "clearTimeoutCallback";
    MetadataCallback[MetadataCallback["onGlare"] = 6] = "onGlare";
    MetadataCallback[MetadataCallback["recognizerCallback"] = 7] = "recognizerCallback";
})(MetadataCallback || (MetadataCallback = {}));
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Defines the type of the WASM that will be loaded.
 */
var WasmType;
(function (WasmType) {
    /**
     * The WASM that will be loaded will be most compatible with all browsers that
     * support the WASM, but will lack features that could be used to improve performance.
     */
    WasmType["Basic"] = "BASIC";
    /**
     * The WASM that will be loaded will be built with advanced WASM features, such as
     * bulk memory, SIMD, non-trapping floating point and sign extension. Such WASM can only
     * be executed in browsers that support those features. Attempting to run this
     * WASM in a non-compatible browser will crash your app.
     */
    WasmType["Advanced"] = "ADVANCED";
    /**
     * The WASM that will be loaded will be build with advanced WASM features, just
     * like above. Additionally, it will be also built with support for multi-threaded
     * processing. This feature requires a browser with support for both advanced WASM
     * features and `SharedArrayBuffer`
     */
    WasmType["AdvancedWithThreads"] = "ADVANCED_WITH_THREADS";
})(WasmType || (WasmType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const defaultWasmModuleName = "BlinkIDWasmSDK";

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function defaultEventHandler(resolve, reject) {
    return (msg) => {
        const resultMsg = msg;
        if (resultMsg.success) {
            resolve();
        }
        else {
            reject(resultMsg.error);
        }
    };
}
function defaultResultEventHandler(successResolver, reject) {
    return (msg) => {
        const resultMsg = msg;
        if (resultMsg.success) {
            successResolver(msg);
        }
        else {
            reject(resultMsg.error);
        }
    };
}
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
function wrapParameters(params) {
    // convert params
    const wrappedPrameters = [];
    for (let param of params) {
        let paramType = ParameterType.Any;
        if (param instanceof RemoteRecognizer) {
            paramType = ParameterType.Recognizer;
            param = param.getRemoteObjectHandle();
        }
        wrappedPrameters.push({
            parameter: param,
            type: paramType
        });
    }
    return wrappedPrameters;
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
class RemoteRecognizer {
    /* eslint-enable lines-between-class-members */
    constructor(wasmWorker, recognizerName, remoteObjHandle) {
        this.wasmSDKWorker = wasmWorker;
        this.objectHandle = remoteObjHandle;
        this.recognizerName = recognizerName;
        this.callbacks = new Map();
    }
    /* eslint-enable @typescript-eslint/ban-types */
    getRemoteObjectHandle() {
        return this.objectHandle;
    }
    currentSettings() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            const msg = new InvokeObjectMethod(this.objectHandle, "currentSettings", []);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    toSignedJSON() {
        {
            return new Promise((resolve, reject) => {
                if (this.objectHandle < 0) {
                    reject("Invalid object handle: " + this.objectHandle.toString());
                    return;
                }
                const msg = new InvokeObjectMethod(this.objectHandle, "toSignedJSON", []);
                const handler = defaultResultEventHandler((msg) => {
                    resolve(msg.result);
                }, reject);
                this.wasmSDKWorker.postMessage(msg, handler);
            });
        }
    }
    clearAllCallbacks() {
        this.callbacks.clear();
        this.wasmSDKWorker.unregisterRecognizerCallbacks(this.objectHandle);
    }
    /* eslint-disable @typescript-eslint/no-explicit-any,
                      @typescript-eslint/no-unsafe-assignment,
                      @typescript-eslint/no-unsafe-member-access,
                      @typescript-eslint/no-unsafe-return
    */
    // convert each function member into wrapped parameter, containing address where callback needs to be delivered
    removeFunctions(settings) {
        // clear any existing callbacks
        this.clearAllCallbacks();
        const keys = Object.keys(settings);
        let needsRegistering = false;
        for (const key of keys) {
            const data = settings[key];
            if (typeof data === "function") {
                this.callbacks.set(key, data);
                const wrappedFunction = {
                    parameter: {
                        recognizerHandle: this.objectHandle,
                        callbackName: key
                    },
                    type: ParameterType.Callback
                };
                settings[key] = wrappedFunction;
                needsRegistering = true;
            }
        }
        if (needsRegistering) {
            this.wasmSDKWorker.registerRecognizerCallbacks(this.objectHandle, this);
        }
        return settings;
    }
    /* eslint-enable @typescript-eslint/no-explicit-any,
                     @typescript-eslint/no-unsafe-assignment,
                     @typescript-eslint/no-unsafe-member-access,
                     @typescript-eslint/no-unsafe-return
    */
    updateSettings(newSettings) {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            /* eslint-disable @typescript-eslint/no-unsafe-assignment */
            const msg = new InvokeObjectMethod(this.objectHandle, "updateSettings", [
                {
                    parameter: this.removeFunctions(newSettings),
                    type: ParameterType.RecognizerSettings
                }
            ]);
            /* eslint-enable @typescript-eslint/no-unsafe-assignment */
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    invokeCallback(callbackName, args) {
        const callback = this.callbacks.get(callbackName);
        if (callback !== undefined) {
            callback(...args);
        }
        else {
            console.warn("Cannot find callback", callbackName);
        }
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */
    getResult() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            const msg = new InvokeObjectMethod(this.objectHandle, "getResult", []);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    delete() {
        return new Promise((resolve, reject) => {
            if (this.objectHandle < 0) {
                reject("Invalid object handle: " + this.objectHandle.toString());
                return;
            }
            this.clearAllCallbacks();
            const msg = new InvokeObjectMethod(this.objectHandle, "delete", []);
            const handler = defaultEventHandler(() => {
                this.objectHandle = -1;
                resolve();
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
function createRegisteredCallbacks(metadataCallbacks) {
    const msg = new RegisteredMetadataCallbacks();
    // https://stackoverflow.com/a/20093686/213057
    msg.onDebugText = !!metadataCallbacks.onDebugText;
    msg.onDetectionFailed = !!metadataCallbacks.onDetectionFailed;
    msg.onPointsDetection = !!metadataCallbacks.onPointsDetection;
    msg.onQuadDetection = !!metadataCallbacks.onQuadDetection;
    msg.onFirstSideResult = !!metadataCallbacks.onFirstSideResult;
    msg.onGlare = !!metadataCallbacks.onGlare;
    return msg;
}
class RemoteRecognizerRunner {
    constructor(wasmWorker) {
        this.deleted = false;
        this.wasmSDKWorker = wasmWorker;
    }
    processImage(image) {
        return new Promise((resolve, reject) => {
            if (this.deleted) {
                reject("Recognizer runner is deleted. It cannot be used anymore!");
                return;
            }
            const msg = new ProcessImage(image);
            const handler = defaultResultEventHandler((response) => {
                const state = response.recognitionState;
                resolve(state);
            }, reject);
            this.wasmSDKWorker.postTransferrableMessage(msg, handler);
        });
    }
    reconfigureRecognizers(recognizers, allowMultipleResults) {
        return new Promise((resolve, reject) => {
            if (this.deleted) {
                reject("Recognizer runner is deleted. It cannot be used anymore!");
                return;
            }
            const recognizerHandles = getRecognizerHandles(recognizers);
            const msg = new ReconfigureRecognizerRunner(recognizerHandles, allowMultipleResults);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setMetadataCallbacks(metadataCallbacks) {
        return new Promise((resolve, reject) => {
            const msg = new RegisterMetadataCallbacks(createRegisteredCallbacks(metadataCallbacks));
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessageAndRegisterCallbacks(msg, metadataCallbacks, handler);
        });
    }
    resetRecognizers(hardReset) {
        return new Promise((resolve, reject) => {
            const msg = new ResetRecognizers(hardReset);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setDetectionOnlyMode(detectionOnly) {
        return new Promise((resolve, reject) => {
            const msg = new SetDetectionOnly(detectionOnly);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setClearTimeoutCallback(clearTimeoutCallback) {
        return new Promise((resolve, reject) => {
            const msg = new SetClearTimeoutCallback(clearTimeoutCallback !== null);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.registerClearTimeoutCallback(clearTimeoutCallback);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    setCameraPreviewMirrored(mirrored) {
        return new Promise((resolve, reject) => {
            const msg = new SetCameraPreviewMirrored(mirrored);
            const handler = defaultEventHandler(resolve, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
    delete() {
        if (this.deleted) {
            return Promise.reject("Recognizer runner is already deleted.");
        }
        return new Promise((resolve, reject) => {
            const msg = new DeleteRecognizerRunner();
            const handler = defaultEventHandler(() => {
                this.deleted = true;
                resolve();
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
function getRecognizerHandles(remoteRecognizers) {
    const recognizerHandles = [];
    for (const remoteRecognizer of remoteRecognizers) {
        recognizerHandles.push(remoteRecognizer.getRemoteObjectHandle());
    }
    return recognizerHandles;
}
class WasmModuleWorkerProxy {
    constructor(wasmSDKWorker) {
        this.wasmSDKWorker = wasmSDKWorker;
    }
    createRecognizerRunner(recognizers, allowMultipleResults = false, metadataCallbacks = {}) {
        return new Promise((resolve, reject) => {
            const recognizerHandles = getRecognizerHandles(recognizers);
            const msg = new CreateRecognizerRunner(recognizerHandles, allowMultipleResults, createRegisteredCallbacks(metadataCallbacks));
            const handler = defaultEventHandler(() => {
                resolve(new RemoteRecognizerRunner(this.wasmSDKWorker));
            }, reject);
            this.wasmSDKWorker.postMessageAndRegisterCallbacks(msg, metadataCallbacks, handler);
        });
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    newRecognizer(className, ...constructorArgs) {
        return new Promise((resolve, reject) => {
            const msg = new CreateNewRecognizer(className, wrapParameters(constructorArgs));
            const handler = defaultResultEventHandler((msg) => {
                const remoteRecognizer = new RemoteRecognizer(this.wasmSDKWorker, className, msg.objectHandle);
                resolve(remoteRecognizer);
            }, reject);
            this.wasmSDKWorker.postMessage(msg, handler);
        });
    }
}
class WasmSDKWorker {
    /* eslint-enable lines-between-class-members */
    constructor(worker, loadProgressCallback, userId, rejectHandler) {
        this.eventHandlers = {};
        this.metadataCallbacks = {};
        this.clearTimeoutCallback = null;
        this.loadedWasmType = WasmType.Basic; // will be updated after WASM gets loaded
        this.mbWasmWorker = worker;
        this.mbWasmWorker.onmessage = (event) => { this.handleWorkerEvent(event); };
        this.mbWasmWorker.onerror = () => {
            rejectHandler("Problem during initialization of worker file!");
            return;
        };
        this.mbWasmModule = new WasmModuleWorkerProxy(this);
        this.loadCallback = loadProgressCallback;
        this.recognizersWithCallbacks = new Map();
        this.userId = userId;
        this.showOverlay = false;
    }
    postMessage(message, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.mbWasmWorker.postMessage(message);
    }
    postTransferrableMessage(message, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.mbWasmWorker.postMessage(message, message.getTransferrables());
    }
    postMessageAndRegisterCallbacks(message, metadataCallbacks, eventHandler) {
        this.eventHandlers[message.messageID] = eventHandler;
        this.metadataCallbacks = metadataCallbacks;
        this.mbWasmWorker.postMessage(message);
    }
    registerClearTimeoutCallback(callback) {
        this.clearTimeoutCallback = callback;
    }
    registerRecognizerCallbacks(remoteRecognizerHandle, recognizer) {
        this.recognizersWithCallbacks.set(remoteRecognizerHandle, recognizer);
    }
    unregisterRecognizerCallbacks(remoteRecognizerHandle) {
        this.recognizersWithCallbacks.delete(remoteRecognizerHandle);
    }
    /**
     * Clean up the active instance of the SDK.
     *
     * It's not possible to use the SDK after this method is called.
     */
    delete() {
        this.mbWasmWorker.terminate();
    }
    getProductIntegrationInfo() {
        return new Promise((resolve, reject) => {
            const msg = new GetProductIntegrationInfo(this.userId);
            const handler = defaultResultEventHandler((msg) => {
                resolve(msg.result);
            }, reject);
            this.postMessage(msg, handler);
        });
    }
    handleWorkerEvent(event) {
        if ("isCallbackMessage" in event.data) {
            const msg = event.data;
            switch (msg.callbackType) {
                case MetadataCallback.onDebugText:
                    if (typeof this.metadataCallbacks.onDebugText === "function") {
                        this.metadataCallbacks.onDebugText(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onDetectionFailed:
                    if (typeof this.metadataCallbacks.onDetectionFailed === "function") {
                        this.metadataCallbacks.onDetectionFailed();
                    }
                    break;
                case MetadataCallback.onPointsDetection:
                    if (typeof this.metadataCallbacks.onPointsDetection === "function") {
                        this.metadataCallbacks.onPointsDetection(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onQuadDetection:
                    if (typeof this.metadataCallbacks.onQuadDetection === "function") {
                        this.metadataCallbacks.onQuadDetection(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.onFirstSideResult:
                    if (typeof this.metadataCallbacks.onFirstSideResult === "function") {
                        this.metadataCallbacks.onFirstSideResult();
                    }
                    break;
                case MetadataCallback.clearTimeoutCallback:
                    if (this.clearTimeoutCallback && typeof this.clearTimeoutCallback.onClearTimeout === "function") {
                        this.clearTimeoutCallback.onClearTimeout();
                    }
                    break;
                case MetadataCallback.onGlare:
                    if (typeof this.metadataCallbacks.onGlare === "function") {
                        this.metadataCallbacks.onGlare(msg.callbackParameters[0]);
                    }
                    break;
                case MetadataCallback.recognizerCallback:
                    {
                        // first parameter is address, other parameters are callback parameters
                        const address = msg.callbackParameters.shift();
                        const recognizer = this.recognizersWithCallbacks.get(address.recognizerHandle);
                        if (recognizer !== undefined) {
                            recognizer.invokeCallback(address.callbackName, msg.callbackParameters);
                        }
                        else {
                            console.warn("Cannot find recognizer to deliver callback message. Maybe it's destroyed?", address);
                        }
                        break;
                    }
                default:
                    throw new Error(`Unknown callback type: ${MetadataCallback[msg.callbackType]}`);
            }
        }
        else if ("isLoadProgressMessage" in event.data) {
            const msg = event.data;
            if (typeof this.loadCallback === "function") {
                this.loadCallback(msg.progress);
            }
        }
        else {
            const msg = event.data;
            const eventHandler = this.eventHandlers[msg.messageID];
            delete this.eventHandlers[msg.messageID];
            eventHandler(msg);
        }
    }
    static createWasmWorker(worker, wasmLoadSettings, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const wasmWorker = new WasmSDKWorker(worker, wasmLoadSettings.loadProgressCallback, userId, reject);
                const initMessage = new InitMessage(wasmLoadSettings, userId);
                const initEventHandler = defaultResultEventHandler((msg) => {
                    const successMsg = msg;
                    wasmWorker.showOverlay = successMsg.showOverlay;
                    wasmWorker.loadedWasmType = successMsg.wasmType;
                    resolve(wasmWorker);
                }, 
                /* eslint-disable @typescript-eslint/no-explicit-any */
                (error) => {
                    if (wasmWorker && typeof wasmWorker.delete === "function") {
                        wasmWorker.delete();
                    }
                    reject(error);
                }
                /* eslint-enable @typescript-eslint/no-explicit-any */
                );
                wasmWorker.postMessage(initMessage, initEventHandler);
            });
        });
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/explicit-module-boundary-types */
class SDKError {
    constructor(error, details) {
        if (!error.code || !error.message) {
            throw new Error("Instance of SDKError is required to have code and message.");
        }
        this.message = error.message;
        this.code = error.code;
        this.details = details;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/* eslint-disable max-len */
/**
 * Structures of Error Codes, Error Messages, and CustomError compatible objects for the Error Generator utility.
 * Error Code convention: SECTION_OBJECT_(ACTION)_PROBLEM
 */
var ErrorCodes$1;
(function (ErrorCodes) {
    ErrorCodes["WORKER_WASM_LOAD_FAILURE"] = "WORKER_WASM_LOAD_FAILURE";
    ErrorCodes["WORKER_WASM_INIT_MISSING"] = "WORKER_WASM_INIT_MISSING";
    ErrorCodes["WORKER_FUNCTION_INVOKE_FAILURE"] = "WORKER_FUNCTION_INVOKE_FAILURE";
    ErrorCodes["WORKER_RECOGNIZER_CREATION_FAILURE"] = "WORKER_RECOGNIZER_CREATION_FAILURE";
    ErrorCodes["WORKER_RUNNER_EXISTS"] = "WORKER_RUNNER_EXISTS";
    ErrorCodes["WORKER_RUNNER_CREATION_FAILURE"] = "WORKER_RUNNER_CREATION_FAILURE";
    ErrorCodes["WORKER_RUNNER_MISSING"] = "WORKER_RUNNER_MISSING";
    ErrorCodes["WORKER_RUNNER_RECONFIGURE_FAILURE"] = "WORKER_RUNNER_RECONFIGURE_FAILURE";
    ErrorCodes["WORKER_RUNNER_DELETED"] = "WORKER_RUNNER_DELETED";
    ErrorCodes["WORKER_RUNNER_DELETE_FAILURE"] = "WORKER_RUNNER_DELETE_FAILURE";
    ErrorCodes["WORKER_OBJECT_INVOKE_FAILURE"] = "WORKER_OBJECT_INVOKE_FAILURE";
    ErrorCodes["WORKER_IMAGE_PROCESS_FAILURE"] = "WORKER_IMAGE_PROCESS_FAILURE";
    ErrorCodes["WORKER_HANDLE_UNDEFINED"] = "WORKER_HANDLE_UNDEFINED";
    ErrorCodes["WORKER_MESSAGE_ACTION_UNKNOWN"] = "WORKER_MESSAGE_ACTION_UNKNOWN";
    ErrorCodes["WORKER_LICENSE_UNLOCK_ERROR"] = "WORKER_LICENSE_UNLOCK_ERROR";
    ErrorCodes["WORKER_INTEGRATION_INFO_FAILURE"] = "WORKER_INTEGRATION_INFO_FAILURE";
    ErrorCodes["LOCAL_SDK_RUNNER_MISSING"] = "LOCAL_SDK_RUNNER_MISSING";
    ErrorCodes["LOCAL_SDK_RUNNER_EMPTY"] = "LOCAL_SDK_RUNNER_EMPTY";
    ErrorCodes["LICENSE_UNLOCK_ERROR"] = "LICENSE_UNLOCK_ERROR";
    ErrorCodes["FRAME_CAPTURE_SVG_UNSUPPORTED"] = "FRAME_CAPTURE_SVG_UNSUPPORTED";
    ErrorCodes["FRAME_CAPTURE_CANVAS_MISSING"] = "FRAME_CAPTURE_CANVAS_MISSING";
    ErrorCodes["SDK_WASM_SETTINGS_MISSING"] = "SDK_WASM_SETTINGS_MISSING";
    ErrorCodes["SDK_LICENSE_KEY_MISSING"] = "SDK_LICENSE_KEY_MISSING";
    ErrorCodes["SDK_WASM_MODULE_NAME_MISSING"] = "SDK_WASM_MODULE_NAME_MISSING";
    ErrorCodes["SDK_ENGINE_LOCATION_INVALID"] = "SDK_ENGINE_LOCATION_INVALID";
    ErrorCodes["SDK_WORKER_LOCATION_INVALID"] = "SDK_WORKER_LOCATION_INVALID";
    ErrorCodes["SDK_MISSING"] = "SDK_MISSING";
    ErrorCodes["SDK_RECOGNIZERS_MISSING"] = "SDK_RECOGNIZERS_MISSING";
    ErrorCodes["VIDEO_RECOGNIZER_ELEMENT_MISSING"] = "VIDEO_RECOGNIZER_ELEMENT_MISSING";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_MISSING"] = "VIDEO_RECOGNIZER_CAMERA_MISSING";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED"] = "VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE"] = "VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE";
    ErrorCodes["VIDEO_RECOGNIZER_CAMERA_IN_USE"] = "VIDEO_RECOGNIZER_CAMERA_IN_USE";
    ErrorCodes["VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED"] = "VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_RELEASED"] = "VIDEO_RECOGNIZER_FEED_RELEASED";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_NOT_PAUSED"] = "VIDEO_RECOGNIZER_FEED_NOT_PAUSED";
    ErrorCodes["VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED"] = "VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_PAUSED"] = "VIDEO_RECOGNIZER_FEED_PAUSED";
    ErrorCodes["VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE"] = "VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE";
    ErrorCodes["VIDEO_RECOGNIZER_FEED_MISSING"] = "VIDEO_RECOGNIZER_FEED_MISSING";
})(ErrorCodes$1 || (ErrorCodes$1 = {}));
var ErrorMessages$1;
(function (ErrorMessages) {
    ErrorMessages["WORKER_HANDLE_UNDEFINED"] = "Cannot find object with handle: undefined";
    ErrorMessages["WORKER_WASM_LOAD_FAILURE"] = "Failed to load WASM in web worker!";
    ErrorMessages["WORKER_WASM_INIT_MISSING"] = "WASM module is not initialized!";
    ErrorMessages["WORKER_FUNCTION_INVOKE_FAILURE"] = "Failed to invoke function!";
    ErrorMessages["WORKER_RECOGNIZER_CREATION_FAILURE"] = "Failed to create new recognizer!";
    ErrorMessages["WORKER_RUNNER_EXISTS"] = "Recognizer runner is already created! Multiple instances are not allowed!";
    ErrorMessages["WORKER_RUNNER_CREATION_FAILURE"] = "Failed to create new recognizer runner!";
    ErrorMessages["WORKER_RUNNER_MISSING"] = "Recognizer runner is not created! There is nothing to reconfigure!";
    ErrorMessages["WORKER_RUNNER_RECONFIGURE_FAILURE"] = "Failed to reconfigure recognizer runner!";
    ErrorMessages["WORKER_RUNNER_DELETED"] = "Recognizer runner is already deleted!";
    ErrorMessages["WORKER_RUNNER_DELETE_FAILURE"] = "Failed to delete recognizer runner!";
    ErrorMessages["WORKER_OBJECT_INVOKE_FAILURE"] = "Failed to invoke object!";
    ErrorMessages["WORKER_IMAGE_PROCESS_FAILURE"] = "Recognizer runner is not initialized! Cannot process image!";
    ErrorMessages["WORKER_INTEGRATION_INFO_FAILURE"] = "Failed to get product integration info!";
    ErrorMessages["LOCAL_SDK_RUNNER_MISSING"] = "Property nativeRecognizerRunner is not available!";
    ErrorMessages["LOCAL_SDK_RUNNER_EMPTY"] = "Native RecognizerRunner cannot be empty!";
    ErrorMessages["LICENSE_TOKEN_STATE_INCORRECT"] = "Internal error (Incorrect token state)";
    ErrorMessages["LICENSE_PAYLOAD_VERIFICATION_FAILED"] = "Failed to verify server permission's digital signature!";
    ErrorMessages["LICENSE_PAYLOAD_CORRUPTED"] = "Server permission payload is corrupted!";
    ErrorMessages["LICENSE_PERMISSION_EXPIRED"] = "Internal error (server permission expired)";
    ErrorMessages["LICENSE_REMOTE_LOCKED"] = "Provided license key has been remotely locked. Please contact support for more information!";
    ErrorMessages["FRAME_CAPTURE_SVG_UNSUPPORTED"] = "Recognition of SVG elements not supported!";
    ErrorMessages["FRAME_CAPTURE_CANVAS_MISSING"] = "Could not get canvas 2d context!";
    ErrorMessages["SDK_WASM_SETTINGS_MISSING"] = "Missing WASM load settings!";
    ErrorMessages["SDK_LICENSE_KEY_MISSING"] = "Missing license key!";
    ErrorMessages["SDK_WASM_MODULE_NAME_MISSING"] = "Missing WASM module name!";
    ErrorMessages["SDK_ENGINE_LOCATION_INVALID"] = "Setting property 'engineLocation' must be a string!";
    ErrorMessages["SDK_WORKER_LOCATION_INVALID"] = "Setting property 'workerLocation' must be a string!";
    ErrorMessages["SDK_MISSING"] = "SDK is not provided!";
    ErrorMessages["SDK_RECOGNIZERS_MISSING"] = "To create RecognizerRunner at least 1 recognizer is required.";
    ErrorMessages["VIDEO_RECOGNIZER_ELEMENT_MISSING"] = "Video element, i.e. camera feed is not provided!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_MISSING"] = "Camera not found!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED"] = "Camera not allowed!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE"] = "Camera not available!";
    ErrorMessages["VIDEO_RECOGNIZER_CAMERA_IN_USE"] = "Camera in use!";
    ErrorMessages["VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED"] = "Media devices not supported by browser.";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_RELEASED"] = "The associated video feed has been released!";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_NOT_PAUSED"] = "The associated video feed is not paused. Use resumeRecognition instead!";
    ErrorMessages["VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED"] = "The play() request was interrupted or prevented by browser security rules!";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_PAUSED"] = "Cannot resume recognition while video feed is paused! Use recognize or startRecognition";
    ErrorMessages["VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE"] = "Could not reset recognizers!";
    ErrorMessages["VIDEO_RECOGNIZER_FEED_MISSING"] = "Missing video feed!";
})(ErrorMessages$1 || (ErrorMessages$1 = {}));
const videoRecognizerErrors = {
    feedMissing: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_FEED_MISSING,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_FEED_MISSING,
    },
    recognizersResetFailure: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE,
    },
    feedPaused: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_FEED_PAUSED,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_FEED_PAUSED,
    },
    playRequestInterrupted: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED,
    },
    videoFeedNotPaused: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_FEED_NOT_PAUSED,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_FEED_NOT_PAUSED,
    },
    videoFeedReleased: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_FEED_RELEASED,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_FEED_RELEASED,
    },
    mediaDevicesUnsupported: {
        code: ErrorCodes$1.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED,
        message: ErrorMessages$1.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED,
    },
    cameraMissing: {
        code: ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_MISSING,
        message: ErrorMessages$1.VIDEO_RECOGNIZER_CAMERA_MISSING,
    },
    elementMissing: {
        message: ErrorMessages$1.VIDEO_RECOGNIZER_ELEMENT_MISSING,
        code: ErrorCodes$1.VIDEO_RECOGNIZER_ELEMENT_MISSING,
    },
};
const sdkErrors = {
    wasmSettingsMissing: {
        message: ErrorMessages$1.SDK_WASM_SETTINGS_MISSING,
        code: ErrorCodes$1.SDK_WASM_SETTINGS_MISSING,
    },
    licenseKeyMissing: {
        message: ErrorMessages$1.SDK_LICENSE_KEY_MISSING,
        code: ErrorCodes$1.SDK_LICENSE_KEY_MISSING,
    },
    wasmModuleNameMissing: {
        message: ErrorMessages$1.SDK_WASM_MODULE_NAME_MISSING,
        code: ErrorCodes$1.SDK_WASM_MODULE_NAME_MISSING,
    },
    engineLocationInvalid: {
        message: ErrorMessages$1.SDK_ENGINE_LOCATION_INVALID,
        code: ErrorCodes$1.SDK_ENGINE_LOCATION_INVALID,
    },
    workerLocationInvalid: {
        message: ErrorMessages$1.SDK_WORKER_LOCATION_INVALID,
        code: ErrorCodes$1.SDK_WORKER_LOCATION_INVALID,
    },
    missing: {
        message: ErrorMessages$1.SDK_MISSING,
        code: ErrorCodes$1.SDK_MISSING,
    },
    recognizersMissing: {
        message: ErrorMessages$1.SDK_RECOGNIZERS_MISSING,
        code: ErrorCodes$1.SDK_RECOGNIZERS_MISSING,
    },
};
const frameCaptureErrors = {
    svgUnsupported: {
        message: ErrorMessages$1.FRAME_CAPTURE_SVG_UNSUPPORTED,
        code: ErrorCodes$1.FRAME_CAPTURE_SVG_UNSUPPORTED,
    },
    canvasMissing: {
        message: ErrorMessages$1.FRAME_CAPTURE_CANVAS_MISSING,
        code: ErrorCodes$1.FRAME_CAPTURE_CANVAS_MISSING,
    },
};
const licenseErrors = {
    licenseTokenStateIncorrect: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_TOKEN_STATE_INCORRECT,
    },
    licensePayloadVerificationFailed: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_PAYLOAD_VERIFICATION_FAILED,
    },
    licensePayloadCorrupted: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_PAYLOAD_CORRUPTED,
    },
    licensePermissionExpired: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_PERMISSION_EXPIRED,
    },
    licenseRemoteLocked: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
        message: ErrorMessages$1.LICENSE_REMOTE_LOCKED,
    },
    licenseNetworkError: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
    },
    licenseInvalid: {
        code: ErrorCodes$1.LICENSE_UNLOCK_ERROR,
    },
};
const localSdkErrors = {
    runnerMissing: {
        message: ErrorMessages$1.LOCAL_SDK_RUNNER_MISSING,
        code: ErrorCodes$1.LOCAL_SDK_RUNNER_MISSING,
    },
    runnerEmpty: {
        message: ErrorMessages$1.LOCAL_SDK_RUNNER_EMPTY,
        code: ErrorCodes$1.LOCAL_SDK_RUNNER_EMPTY,
    },
};
const workerErrors = {
    imageProcessFailure: {
        message: ErrorMessages$1.WORKER_IMAGE_PROCESS_FAILURE,
        code: ErrorCodes$1.WORKER_IMAGE_PROCESS_FAILURE,
    },
    objectInvokeFailure: {
        message: ErrorMessages$1.WORKER_OBJECT_INVOKE_FAILURE,
        code: ErrorCodes$1.WORKER_OBJECT_INVOKE_FAILURE,
    },
    runnerDeleteFailure: {
        message: ErrorMessages$1.WORKER_RUNNER_DELETE_FAILURE,
        code: ErrorCodes$1.WORKER_RUNNER_DELETE_FAILURE,
    },
    runnerDeleted: {
        message: ErrorMessages$1.WORKER_RUNNER_DELETED,
        code: ErrorCodes$1.WORKER_RUNNER_DELETED,
    },
    runnerReconfigureFailure: {
        message: ErrorMessages$1.WORKER_RUNNER_RECONFIGURE_FAILURE,
        code: ErrorCodes$1.WORKER_RUNNER_RECONFIGURE_FAILURE,
    },
    runnerMissing: {
        message: ErrorMessages$1.WORKER_RUNNER_MISSING,
        code: ErrorCodes$1.WORKER_RUNNER_MISSING,
    },
    runnerCreationFailure: {
        message: ErrorMessages$1.WORKER_RUNNER_CREATION_FAILURE,
        code: ErrorCodes$1.WORKER_RUNNER_CREATION_FAILURE,
    },
    runnerExists: {
        message: ErrorMessages$1.WORKER_RUNNER_EXISTS,
        code: ErrorCodes$1.WORKER_RUNNER_EXISTS,
    },
    recognizerCreationFailure: {
        message: ErrorMessages$1.WORKER_RECOGNIZER_CREATION_FAILURE,
        code: ErrorCodes$1.WORKER_RECOGNIZER_CREATION_FAILURE,
    },
    functionInvokeFailure: {
        message: ErrorMessages$1.WORKER_FUNCTION_INVOKE_FAILURE,
        code: ErrorCodes$1.WORKER_FUNCTION_INVOKE_FAILURE,
    },
    wasmInitMissing: {
        message: ErrorMessages$1.WORKER_WASM_INIT_MISSING,
        code: ErrorCodes$1.WORKER_WASM_INIT_MISSING,
    },
    wasmLoadFailure: {
        message: ErrorMessages$1.WORKER_WASM_LOAD_FAILURE,
        code: ErrorCodes$1.WORKER_WASM_LOAD_FAILURE,
    },
    handleUndefined: {
        message: ErrorMessages$1.WORKER_HANDLE_UNDEFINED,
        code: ErrorCodes$1.WORKER_HANDLE_UNDEFINED,
    },
    integrationInfoFailure: {
        message: ErrorMessages$1.WORKER_INTEGRATION_INFO_FAILURE,
        code: ErrorCodes$1.WORKER_INTEGRATION_INFO_FAILURE
    }
};

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Preferred type of camera to be used when opening the camera feed.
 */
var PreferredCameraType;
(function (PreferredCameraType) {
    /** Prefer back facing camera */
    PreferredCameraType[PreferredCameraType["BackFacingCamera"] = 0] = "BackFacingCamera";
    /** Prefer front facing camera */
    PreferredCameraType[PreferredCameraType["FrontFacingCamera"] = 1] = "FrontFacingCamera";
})(PreferredCameraType || (PreferredCameraType = {}));
// inspired by https://unpkg.com/browse/scandit-sdk@4.6.1/src/lib/cameraAccess.ts
const backCameraKeywords = [
    "rear",
    "back",
    "rück",
    "arrière",
    "trasera",
    "trás",
    "traseira",
    "posteriore",
    "后面",
    "後面",
    "背面",
    "后置",
    "後置",
    "背置",
    "задней",
    "الخلفية",
    "후",
    "arka",
    "achterzijde",
    "หลัง",
    "baksidan",
    "bagside",
    "sau",
    "bak",
    "tylny",
    "takakamera",
    "belakang",
    "אחורית",
    "πίσω",
    "spate",
    "hátsó",
    "zadní",
    "darrere",
    "zadná",
    "задня",
    "stražnja",
    "belakang",
    "बैक"
];
function isBackCameraLabel(label) {
    const lowercaseLabel = label.toLowerCase();
    return backCameraKeywords.some(keyword => lowercaseLabel.includes(keyword));
}
class SelectedCamera {
    constructor(mdi, facing) {
        this.deviceId = mdi.deviceId;
        this.facing = facing;
        this.groupId = mdi.groupId;
        this.label = mdi.label;
    }
}
function getCameraDevices$1() {
    return __awaiter(this, void 0, void 0, function* () {
        const frontCameras = [];
        const backCameras = [];
        {
            let devices = yield navigator.mediaDevices.enumerateDevices();
            // if permission is not given, label of video devices will be empty string
            if (devices.filter(device => device.kind === "videoinput").every(device => device.label === "")) {
                const stream = yield navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { ideal: "environment" }
                    },
                    audio: false
                });
                // enumerate devices again - now the label field should be non-empty, as we have a stream active
                // (even if we didn't get persistent permission for camera)
                devices = yield navigator.mediaDevices.enumerateDevices();
                // close the stream, as we don't need it anymore
                stream.getTracks().forEach(track => track.stop());
            }
            const cameras = devices.filter(device => device.kind === "videoinput");
            for (const camera of cameras) {
                if (isBackCameraLabel(camera.label)) {
                    backCameras.push(new SelectedCamera(camera, PreferredCameraType.BackFacingCamera));
                }
                else {
                    frontCameras.push(new SelectedCamera(camera, PreferredCameraType.FrontFacingCamera));
                }
            }
        }
        return {
            frontCameras,
            backCameras
        };
    });
}
function selectCamera(cameraId, preferredCameraType) {
    return __awaiter(this, void 0, void 0, function* () {
        const { frontCameras, backCameras } = yield getCameraDevices$1();
        if (frontCameras.length > 0 || backCameras.length > 0) {
            // decide from which array the camera will be selected
            let cameraPool = (backCameras.length > 0 ? backCameras : frontCameras);
            // if there is at least one back facing camera and user prefers back facing camera, use that as a selection pool
            if (preferredCameraType === PreferredCameraType.BackFacingCamera && backCameras.length > 0) {
                cameraPool = backCameras;
            }
            // if there is at least one front facing camera and is preferred by user, use that as a selection pool
            if (preferredCameraType === PreferredCameraType.FrontFacingCamera && frontCameras.length > 0) {
                cameraPool = frontCameras;
            }
            // otherwise use whichever pool is non-empty
            // sort camera pool by label
            cameraPool = cameraPool.sort((camera1, camera2) => camera1.label.localeCompare(camera2.label));
            // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
            // Otherwise pick the first camera
            {
                let selectedCameraIndex = 0;
                const cameraResolutions = cameraPool.map(camera => {
                    const regExp = RegExp(/\b([0-9]+)MP?\b/, "i");
                    const match = regExp.exec(camera.label);
                    if (match !== null) {
                        return parseInt(match[1], 10);
                    }
                    else {
                        return NaN;
                    }
                });
                if (!cameraResolutions.some(cameraResolution => isNaN(cameraResolution))) {
                    selectedCameraIndex = cameraResolutions.lastIndexOf(Math.max(...cameraResolutions));
                }
                if (cameraId) {
                    let cameraDevice = null;
                    cameraDevice = frontCameras.filter(device => device.deviceId === cameraId)[0];
                    if (!cameraDevice) {
                        cameraDevice = backCameras.filter(device => device.deviceId === cameraId)[0];
                    }
                    return cameraDevice || null;
                }
                return cameraPool[selectedCameraIndex];
            }
        }
        else {
            // no cameras available on the device
            return null;
        }
    });
}
/**
 * Bind camera device to video feed (HTMLVideoElement).
 *
 * This function will return `true` in case that video feed of camera device has been flipped,
 * and `false` otherwise.
 *
 * @param camera                Camera device which should be binded with the video element.
 * @param videoFeed             HTMLVideoElement to which camera device should be binded.
 * @param preferredCameraType   Enum representing whether to use front facing or back facing camera.
 */
function bindCameraToVideoFeed(camera, videoFeed, preferredCameraType = PreferredCameraType.BackFacingCamera) {
    return __awaiter(this, void 0, void 0, function* () {
        const constraints = {
            audio: false,
            video: {
                width: {
                    min: 640,
                    ideal: 1920,
                    max: 1920
                },
                height: {
                    min: 480,
                    ideal: 1080,
                    max: 1080
                }
            }
        };
        if (camera.deviceId === "") {
            const isPreferredBackFacing = preferredCameraType === PreferredCameraType.BackFacingCamera;
            constraints.video.facingMode =
                {
                    ideal: isPreferredBackFacing ? "environment" : "user"
                };
        }
        else {
            constraints.video.deviceId =
                {
                    exact: camera.deviceId
                };
        }
        const stream = yield navigator.mediaDevices.getUserMedia(constraints);
        videoFeed.controls = false;
        videoFeed.srcObject = stream;
        let cameraFlipped = false;
        if (camera.facing === PreferredCameraType.FrontFacingCamera) {
            videoFeed.style.transform = "scaleX(-1)";
            cameraFlipped = true;
        }
        return cameraFlipped;
    });
}
function clearVideoFeed(videoFeed) {
    if (videoFeed && videoFeed.srcObject !== null) {
        videoFeed.srcObject.getTracks().forEach(track => track.stop());
        videoFeed.srcObject = null;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// ============================================ /
// DATA STRUCTURES                              /
// ============================================ /
/**
 * Specifies the orientation of the contents of the image.
 * This is important for some recognizers, especially when
 * performing recognition on the mobile device.
 */
var ImageOrientation;
(function (ImageOrientation) {
    /**
     * Image contents are rotated 90 degrees left.
     * This usually happens on mobile devices when capturing image while
     * device is held in "portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["RotatedLeft90"] = 0] = "RotatedLeft90";
    /**
     * Image contents are not rotated in any manner.
     * This is the default for images captured using HTML canvas, as
     * used in FrameCapture class.
     * This orientation also usually happens on mobile devices when capturing
     * image while device is held in "landscape" orientation, while device
     * camera sensor is mounted horizontally (i.e. also in same orientation).
     */
    ImageOrientation[ImageOrientation["NoRotation"] = 1] = "NoRotation";
    /**
     * Image contents are rotated 90 degrees right.
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-portrait" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["RotatedRight90"] = 2] = "RotatedRight90";
    /**
     * Image contents are rotated 180 degrees, i.e. image contents are "upside down".
     * This usually happens on mobile devices when capturing image while
     * device is held in "reverse-landscape" orientation, while device camera sensor
     * is mounted horizontally (i.e. produced image is in "landscape" orienation).
     */
    ImageOrientation[ImageOrientation["Rotated180"] = 3] = "Rotated180";
})(ImageOrientation || (ImageOrientation = {}));
/**
 * Specifies the state of the recognition result.
 */
var RecognizerResultState;
(function (RecognizerResultState) {
    /** Nothing has been recognized. */
    RecognizerResultState[RecognizerResultState["Empty"] = 0] = "Empty";
    /** Something has been recognized, but some mandatory data is still missing. */
    RecognizerResultState[RecognizerResultState["Uncertain"] = 1] = "Uncertain";
    /** All required data has been recognized. */
    RecognizerResultState[RecognizerResultState["Valid"] = 2] = "Valid";
    /** Single stage of a multi-stage recognition is finished. */
    RecognizerResultState[RecognizerResultState["StageValid"] = 3] = "StageValid";
})(RecognizerResultState || (RecognizerResultState = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Checks if browser is supported by the SDK. The minimum requirements for the browser is
 * the support for WebAssembly. If your browser does not support executing WebAssembly,
 * this function will return `false`.
 */
function isBrowserSupported() {
    // based on https://stackoverflow.com/a/47880734
    try {
        if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
            const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            if (module instanceof WebAssembly.Module)
                return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
        }
    }
    catch (ignored) {
        return false;
    }
    return false;
}
/**
 * Check if current browser is in-app / embedded.
 * Detects Instagram, Facebook, LinkedIn, Twitter, WeChat, Whatsapp, and Tiktok.
 * @returns Boolean whether the browser is in-app or not
 */
function isInAppBrowser() {
    const inAppRegex = /(instagram|fbav|linkedinapp|twitter|micromessenger|whatsapp|tiktok)[/\s]?([\w.]*)/i;
    const userAgent = navigator.userAgent || navigator.vendor;
    return !!inAppRegex.exec(userAgent);
}
/**
 * Check if browser supports ES6, which is prerequisite for this SDK to execute.
 *
 * IMPORTANT: it's not possible to run this function from MicroblinkSDK if browser doesn't support
 * ES6 since this file won't be able to load.
 *
 * This function is here as a placeholder so it can be copied to standalone JS file or directly into 'index.html'.
 */
// export function isES6Supported(): boolean
// {
//     if ( typeof Symbol === "undefined" )
//     {
//         return false;
//     }
//     try
//     {
//         eval( "class Foo {}" );
//         eval( "var bar = (x) => x+1" );
//     }
//     catch ( e )
//     {
//         return false;
//     }
//     return true;
// }

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// ============================================ /
// Frame capture and camera management support. /
// ============================================ /
let canvas;
/**
 * Represents a captured frame from HTMLVideoElement.
 */
class CapturedFrame {
    constructor(imageData, orientation, videoFrame) {
        this.imageData = imageData;
        this.orientation = orientation;
        this.videoFrame = videoFrame;
    }
}
/**
 * Captures a frame from any CanvasImageSource, such as HTMLVideoElement or HTMLImageElement.
 * @param imageSource image source from which frame should be captured
 * @returns instance of CapturedFrame
 */
function captureFrame(imageSource) {
    let imageWidth;
    let imageHeight;
    let videoFrame = false;
    if (imageSource instanceof HTMLVideoElement) {
        imageWidth = imageSource.videoWidth;
        imageHeight = imageSource.videoHeight;
        videoFrame = true;
    }
    else if (imageSource instanceof HTMLImageElement) {
        imageWidth = imageSource.naturalWidth;
        imageHeight = imageSource.naturalHeight;
    }
    else if (imageSource instanceof SVGImageElement) {
        throw new SDKError(frameCaptureErrors.svgUnsupported);
    }
    else {
        imageWidth = imageSource.width;
        imageHeight = imageSource.height;
    }
    canvas = canvas || document.createElement("canvas");
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new SDKError(frameCaptureErrors.canvasMissing);
    }
    ctx.drawImage(imageSource, 0, 0, canvas.width, canvas.height);
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return new CapturedFrame(pixelData, 
    // TODO: https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
    // or https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
    ImageOrientation.NoRotation, videoFrame);
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
var LicenseTokenState;
(function (LicenseTokenState) {
    LicenseTokenState[LicenseTokenState["Invalid"] = 0] = "Invalid";
    LicenseTokenState[LicenseTokenState["RequiresServerPermission"] = 1] = "RequiresServerPermission";
    LicenseTokenState[LicenseTokenState["Valid"] = 2] = "Valid";
})(LicenseTokenState || (LicenseTokenState = {}));
var LicenseErrorType;
(function (LicenseErrorType) {
    LicenseErrorType["LicenseTokenStateInvalid"] = "LICENSE_TOKEN_STATE_INVALID";
    LicenseErrorType["NetworkError"] = "NETWORK_ERROR";
    LicenseErrorType["RemoteLock"] = "REMOTE_LOCK";
    LicenseErrorType["PermissionExpired"] = "PERMISSION_EXPIRED";
    LicenseErrorType["PayloadCorrupted"] = "PAYLOAD_CORRUPTED";
    LicenseErrorType["PayloadSignatureVerificationFailed"] = "PAYLOAD_SIGNATURE_VERIFICATION_FAILED";
    LicenseErrorType["IncorrectTokenState"] = "INCORRECT_TOKEN_STATE";
})(LicenseErrorType || (LicenseErrorType = {}));
const baltazar = "https://baltazar.microblink.com/api/v1/status/check";
function toBaltazarRequest(unlockResult) {
    return {
        licenseId: unlockResult.licenseId,
        licensee: unlockResult.licensee,
        packageName: unlockResult.packageName,
        platform: "Browser",
        sdkName: unlockResult.sdkName,
        sdkVersion: unlockResult.sdkVersion
    };
}
function shouldShowOverlay(isTrial, allowRemoveDemoOverlay, allowRemoveProductionOverlay) {
    if (isTrial && allowRemoveDemoOverlay) {
        return false;
    }
    if (!isTrial && allowRemoveProductionOverlay) {
        return false;
    }
    return true;
}
var ServerPermissionSubmitResultStatus;
(function (ServerPermissionSubmitResultStatus) {
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["Ok"] = 0] = "Ok";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["NetworkError"] = 1] = "NetworkError";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["RemoteLock"] = 2] = "RemoteLock";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["PermissionExpired"] = 3] = "PermissionExpired";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["PayloadCorrupted"] = 4] = "PayloadCorrupted";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["PayloadSignatureVerificationFailed"] = 5] = "PayloadSignatureVerificationFailed";
    ServerPermissionSubmitResultStatus[ServerPermissionSubmitResultStatus["IncorrectTokenState"] = 6] = "IncorrectTokenState";
})(ServerPermissionSubmitResultStatus || (ServerPermissionSubmitResultStatus = {}));
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/explicit-module-boundary-types,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-call
*/
function obtainNewServerPermission(unlockResult, wasmModule) {
    return __awaiter(this, void 0, void 0, function* () {
        // request permission from Baltazar service
        try {
            const response = yield fetch(baltazar, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-cache",
                body: JSON.stringify(toBaltazarRequest(unlockResult))
            });
            if (response.ok) {
                const serverPermission = (yield response.text()).toString();
                const result = wasmModule.submitServerPermission(serverPermission);
                return result;
            }
            else {
                return {
                    status: ServerPermissionSubmitResultStatus.NetworkError,
                    lease: 0,
                    networkErrorDescription: `Server responded with status ${response.status}`
                };
            }
        }
        catch (error) {
            return {
                status: ServerPermissionSubmitResultStatus.NetworkError,
                lease: 0,
                networkErrorDescription: `Unexpected error: ${JSON.stringify(error)}`
            };
        }
    });
}
function unlockWasmSDK(licenseKey, allowHelloMessage, userId, wasmModule) {
    return __awaiter(this, void 0, void 0, function* () {
        const unlockResult = wasmModule.initializeWithLicenseKey(licenseKey, userId, allowHelloMessage);
        switch (unlockResult.unlockResult) {
            case LicenseTokenState.Invalid:
                return {
                    error: new SDKError(Object.assign(Object.assign({}, licenseErrors.licenseInvalid), { message: unlockResult.licenseError }), {
                        type: LicenseErrorType.LicenseTokenStateInvalid,
                    }),
                };
            case LicenseTokenState.Valid:
                return {
                    error: null,
                    showOverlay: shouldShowOverlay(unlockResult.isTrial, unlockResult.allowRemoveDemoOverlay, unlockResult.allowRemoveProductionOverlay)
                };
            case LicenseTokenState.RequiresServerPermission:
                {
                    const serverPermission = yield obtainNewServerPermission(unlockResult, wasmModule);
                    switch (serverPermission.status) {
                        case ServerPermissionSubmitResultStatus.Ok:
                            return {
                                error: null,
                                lease: serverPermission.lease
                            };
                        case ServerPermissionSubmitResultStatus.NetworkError:
                            {
                                let additionalInfo = "";
                                if (serverPermission.networkErrorDescription) {
                                    additionalInfo = " " + serverPermission.networkErrorDescription;
                                }
                                return {
                                    error: new SDKError(Object.assign(Object.assign({}, licenseErrors.licenseNetworkError), { message: "There has been a network error while obtaining the server permission!"
                                            + additionalInfo }), {
                                        type: LicenseErrorType.NetworkError,
                                    })
                                };
                            }
                        case ServerPermissionSubmitResultStatus.RemoteLock:
                            return {
                                error: new SDKError(licenseErrors.licenseRemoteLocked, {
                                    type: LicenseErrorType.RemoteLock,
                                }),
                                lease: serverPermission.lease
                            };
                        case ServerPermissionSubmitResultStatus.PermissionExpired:
                            return {
                                error: new SDKError(licenseErrors.licensePermissionExpired, {
                                    type: LicenseErrorType.PermissionExpired
                                }),
                                lease: serverPermission.lease
                            };
                        case ServerPermissionSubmitResultStatus.PayloadCorrupted:
                            return {
                                error: new SDKError(licenseErrors.licensePayloadCorrupted, {
                                    type: LicenseErrorType.PayloadCorrupted
                                }),
                                lease: serverPermission.lease
                            };
                        case ServerPermissionSubmitResultStatus.PayloadSignatureVerificationFailed:
                            return {
                                error: new SDKError(licenseErrors.licensePayloadVerificationFailed, {
                                    type: LicenseErrorType.PayloadSignatureVerificationFailed
                                }),
                                lease: serverPermission.lease
                            };
                        case ServerPermissionSubmitResultStatus.IncorrectTokenState:
                            return {
                                error: new SDKError(licenseErrors.licenseTokenStateIncorrect, {
                                    type: LicenseErrorType.IncorrectTokenState
                                }),
                                lease: serverPermission.lease
                            };
                    }
                }
        }
    });
}
/* eslint-enable @typescript-eslint/no-explicit-any,
                 @typescript-eslint/explicit-module-boundary-types,
                 @typescript-eslint/no-unsafe-member-access,
                 @typescript-eslint/no-unsafe-call
*/

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Detection status of the specific detected object.
 */
var DetectionStatus;
(function (DetectionStatus) {
    /** Detection failed, form not detected */
    DetectionStatus[DetectionStatus["Fail"] = 0] = "Fail";
    /** Object was successfully detected */
    DetectionStatus[DetectionStatus["Success"] = 1] = "Success";
    /** Object detected, but the camera is too far above it */
    DetectionStatus[DetectionStatus["CameraTooHigh"] = 2] = "CameraTooHigh";
    /** Fallback detection of an object was successful */
    DetectionStatus[DetectionStatus["FallbackSuccess"] = 3] = "FallbackSuccess";
    /** Object is detected, but parts of it are not in image */
    DetectionStatus[DetectionStatus["Partial"] = 4] = "Partial";
    /** Object detected, but camera is at too big angle */
    DetectionStatus[DetectionStatus["CameraAtAngle"] = 5] = "CameraAtAngle";
    /** Object detected, but the camera is too near to it */
    DetectionStatus[DetectionStatus["CameraTooNear"] = 6] = "CameraTooNear";
    /** Document detected, but document is too close to the edge of the frame */
    DetectionStatus[DetectionStatus["DocumentTooCloseToEdge"] = 7] = "DocumentTooCloseToEdge";
})(DetectionStatus || (DetectionStatus = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Explanation why VideoRecognizer has failed to open the camera feed.
 */
var NotSupportedReason;
(function (NotSupportedReason) {
    /** navigator.mediaDevices.getUserMedia is not supported by current browser for current context. */
    NotSupportedReason["MediaDevicesNotSupported"] = "MediaDevicesNotSupported";
    /** Camera with requested features is not available on current device. */
    NotSupportedReason["CameraNotFound"] = "CameraNotFound";
    /** Camera access was not granted by the user. */
    NotSupportedReason["CameraNotAllowed"] = "CameraNotAllowed";
    /** Unable to start playing because camera is already in use. */
    NotSupportedReason["CameraInUse"] = "CameraInUse";
    /** Camera is currently not available due to a OS or hardware error. */
    NotSupportedReason["CameraNotAvailable"] = "CameraNotAvailable";
    /** There is no provided video element to which the camera feed should be redirected. */
    NotSupportedReason["VideoElementNotProvided"] = "VideoElementNotProvided";
})(NotSupportedReason || (NotSupportedReason = {}));
/**
 * Indicates mode of recognition in VideoRecognizer.
 */
var VideoRecognitionMode;
(function (VideoRecognitionMode) {
    /** Normal recognition */
    VideoRecognitionMode[VideoRecognitionMode["Recognition"] = 0] = "Recognition";
    /** Indefinite scan. Useful for profiling the performance of scan (using onDebugText metadata callback) */
    VideoRecognitionMode[VideoRecognitionMode["RecognitionTest"] = 1] = "RecognitionTest";
    /** Only detection. Useful for profiling the performance of detection (using onDebugText metadata callback) */
    VideoRecognitionMode[VideoRecognitionMode["DetectionTest"] = 2] = "DetectionTest";
})(VideoRecognitionMode || (VideoRecognitionMode = {}));
/**
 * A wrapper around RecognizerRunner that can use it to perform recognition of video feeds - either from live camera or
 * from predefined video file.
 */
class VideoRecognizer {
    /**
     * **Use only if provided factory functions are not well-suited for your use case.**
     *
     * Creates a new VideoRecognizer with provided HTMLVideoElement.
     *
     * Keep in mind that HTMLVideoElement **must have** a video feed which is ready to use.
     *
     * - If you want to take advantage of provided camera management, use `createVideoRecognizerFromCameraStream`
     * - In case that static video file should be processed, use `createVideoRecognizerFromVideoPath`
     *
     * @param videoFeed HTMLVideoElement with video feed which is going to be processed
     * @param recognizerRunner RecognizerRunner that should be used for video stream recognition
     * @param cameraFlipped Whether the camera is flipped, e.g. if front-facing camera is used
     * @param allowManualVideoPlayout Whether to allow manual video playout. Default value is `false`
     */
    constructor(videoFeed, recognizerRunner, cameraFlipped = false, allowManualVideoPlayout = false, deviceId = null) {
        this.deviceId = null;
        /** *********************************************************************************************
         * PRIVATE AREA
         */
        this.videoFeed = null;
        this.cancelled = false;
        this.timedOut = false;
        this.recognitionPaused = false;
        this.recognitionTimeoutMs = 20000;
        this.timeoutID = 0;
        this.videoRecognitionMode = VideoRecognitionMode.Recognition;
        this.onScanningDone = null;
        this.allowManualVideoPlayout = false;
        this.cameraFlipped = false;
        this.shouldReleaseVideoFeed = false;
        this.videoFeed = videoFeed;
        this.recognizerRunner = recognizerRunner;
        this.cameraFlipped = cameraFlipped;
        this.allowManualVideoPlayout = allowManualVideoPlayout;
        this.deviceId = deviceId;
    }
    /**
     * Creates a new VideoRecognizer by opening a camera stream and attaching it to given HTMLVideoElement. If camera
     * cannot be accessed, the returned promise will be rejected.
     *
     * @param cameraFeed HTMLVideoELement to which camera stream should be attached
     * @param recognizerRunner RecognizerRunner that should be used for video stream recognition
     * @param cameraId User can provide specific camera ID to be selected and used
     * @param preferredCameraType Whether back facing or front facing camera is preferred. Obeyed only if there is
     *        a choice (i.e. if device has only front-facing camera, the opened camera will be a front-facing camera,
     *        regardless of preference)
     */
    static createVideoRecognizerFromCameraStream(cameraFeed, recognizerRunner, cameraId = null, preferredCameraType = PreferredCameraType.BackFacingCamera) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: refactor this function into async/await syntax, instead of reject use throw
            /* eslint-disable */
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                // Check for tag name intentionally left out, so it's possible to use VideoRecognizer with custom elements.
                if (!cameraFeed || !(cameraFeed instanceof Element)) {
                    reject(new SDKError(videoRecognizerErrors.elementMissing, {
                        reason: NotSupportedReason.VideoElementNotProvided,
                    }));
                    return;
                }
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia !== undefined) {
                    try {
                        const selectedCamera = yield selectCamera(cameraId, preferredCameraType);
                        if (selectedCamera === null) {
                            reject(new SDKError(videoRecognizerErrors.cameraMissing, {
                                reason: NotSupportedReason.CameraNotFound,
                            }));
                            return;
                        }
                        const cameraFlipped = yield bindCameraToVideoFeed(selectedCamera, cameraFeed, preferredCameraType);
                        // TODO: await maybe not needed here
                        yield recognizerRunner.setCameraPreviewMirrored(cameraFlipped);
                        resolve(new VideoRecognizer(cameraFeed, recognizerRunner, cameraFlipped, false, selectedCamera.deviceId));
                    }
                    catch (error) {
                        let errorReason = NotSupportedReason.CameraInUse;
                        let errorCode = ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_IN_USE;
                        switch (error.name) {
                            case "NotFoundError":
                            case "OverconstrainedError":
                                errorReason = NotSupportedReason.CameraNotFound;
                                errorCode = ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_MISSING;
                                break;
                            case "NotAllowedError":
                            case "SecurityError":
                                errorReason = NotSupportedReason.CameraNotAllowed;
                                errorCode = ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED;
                                break;
                            case "AbortError":
                            case "NotReadableError":
                                errorReason = NotSupportedReason.CameraNotAvailable;
                                errorCode = ErrorCodes$1.VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE;
                                break;
                            case "TypeError": // this should never happen. If it does, rethrow it
                                throw error;
                        }
                        reject(new SDKError({
                            message: error.message,
                            code: errorCode,
                        }, {
                            reason: errorReason,
                        }));
                    }
                }
                else {
                    reject(new SDKError(videoRecognizerErrors.mediaDevicesUnsupported, {
                        reason: NotSupportedReason.MediaDevicesNotSupported
                    }));
                }
            }));
            /* eslint-enable */
        });
    }
    /**
     * Creates a new VideoRecognizer by attaching the given URL to video to given HTMLVideoElement and using it to
     * display video frames while processing them.
     *
     * @param videoPath URL of the video file that should be recognized.
     * @param videoFeed HTMLVideoElement to which video file will be attached
     * @param recognizerRunner RecognizerRunner that should be used for video stream recognition.
     */
    static createVideoRecognizerFromVideoPath(videoPath, videoFeed, recognizerRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                videoFeed.src = videoPath;
                videoFeed.currentTime = 0;
                videoFeed.onended = () => {
                    videoRecognizer.cancelRecognition();
                };
                const videoRecognizer = new VideoRecognizer(videoFeed, recognizerRunner);
                resolve(videoRecognizer);
            });
        });
    }
    flipCamera() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.videoFeed) {
                if (!this.cameraFlipped) {
                    this.videoFeed.style.transform = "scaleX(-1)";
                    this.cameraFlipped = true;
                }
                else {
                    this.videoFeed.style.transform = "scaleX(1)";
                    this.cameraFlipped = false;
                }
                yield this.recognizerRunner.setCameraPreviewMirrored(this.cameraFlipped);
            }
        });
    }
    isCameraFlipped() {
        return this.cameraFlipped;
    }
    /**
     * Sets the video recognition mode to be used.
     *
     * @param videoRecognitionMode the video recognition mode to be used.
     */
    setVideoRecognitionMode(videoRecognitionMode) {
        return __awaiter(this, void 0, void 0, function* () {
            this.videoRecognitionMode = videoRecognitionMode;
            const isDetectionMode = this.videoRecognitionMode === VideoRecognitionMode.DetectionTest;
            yield this.recognizerRunner.setDetectionOnlyMode(isDetectionMode);
        });
    }
    /**
     * Starts the recognition of the video stream associated with this VideoRecognizer. The stream will be unpaused and
     * recognition loop will start. After recognition completes, a onScanningDone callback will be invoked with state of
     * the recognition.
     *
     * NOTE: As soon as the execution of the callback completes, the recognition loop will continue and recognition
     *       state will be retained. To clear the recognition state, use resetRecognizers (within your callback). To
     *       pause the recognition loop, use pauseRecognition (within your callback) - to resume it later use
     *       resumeRecognition. To completely stop the recognition and video feed, while keeping the ability to use this
     *       VideoRecognizer later, use pauseVideoFeed. To completely stop the recognition and video feed and release
     *       all the resources involved with video stream, use releaseVideoFeed.
     *
     * @param onScanningDone Callback that will be invoked when recognition completes.
     * @param recognitionTimeoutMs Amount of time before returned promise will be resolved regardless of whether
     *        recognition was successful or not.
     */
    startRecognition(onScanningDone, recognitionTimeoutMs = 20000) {
        return new Promise((resolve, reject) => {
            if (this.videoFeed === null) {
                reject(new SDKError(videoRecognizerErrors.videoFeedReleased));
                return;
            }
            if (!this.videoFeed.paused) {
                reject(new SDKError(videoRecognizerErrors.videoFeedNotPaused));
                return;
            }
            this.cancelled = false;
            this.recognitionPaused = false;
            this.clearTimeout();
            this.recognitionTimeoutMs = recognitionTimeoutMs;
            this.onScanningDone = onScanningDone;
            void this.recognizerRunner.setClearTimeoutCallback({ onClearTimeout: () => this.clearTimeout() });
            this.videoFeed.play().then(() => this.playPauseEvent().then(() => resolve()).catch((error) => reject(error)), 
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (nativeError) => {
                if (!this.allowManualVideoPlayout) {
                    reject(new SDKError(videoRecognizerErrors.playRequestInterrupted, nativeError));
                    return;
                }
                if (!this.videoFeed) {
                    return;
                }
                this.videoFeed.controls = true;
                this.videoFeed.addEventListener("play", () => void this.playPauseEvent().then().catch((error) => reject(error)));
                this.videoFeed.addEventListener("pause", () => void this.playPauseEvent().then().catch((error) => reject(error)));
            }
            /* eslint-enable @typescript-eslint/no-explicit-any */
            );
        });
    }
    /**
     * Performs the recognition of the video stream associated with this VideoRecognizer. The stream will be
     * unpaused, recognition will be performed and promise will be resolved with recognition status. After
     * the resolution of returned promise, the video stream will be paused, but not released. To release the
     * stream, use function releaseVideoFeed.
     *
     * This is a simple version of startRecognition that should be used for most cases, like when you only need
     * to perform one scan per video session.
     *
     * @param recognitionTimeoutMs Amount of time before returned promise will be resolved regardless of whether
     *        recognition was successful or not.
     */
    recognize(recognitionTimeoutMs = 20000) {
        return new Promise((resolve, reject) => {
            try {
                void this.startRecognition((recognitionState) => {
                    this.pauseVideoFeed();
                    resolve(recognitionState);
                }, recognitionTimeoutMs).then(
                // Do nothing, callback is used for resolving
                ).catch((error) => reject(error));
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /**
     * Cancels current ongoing recognition. Note that after cancelling the recognition, the callback given to
     * startRecognition will be immediately called. This also means that the promise returned from method
     * recognize will be resolved immediately.
     */
    cancelRecognition() {
        this.cancelled = true;
    }
    /**
     * Pauses the video feed. You can resume the feed by calling recognize or startRecognition.
     * Note that this pauses both the camera feed and recognition. If you just want to pause
     * recognition, while keeping the camera feed active, call method pauseRecognition.
     */
    pauseVideoFeed() {
        this.pauseRecognition();
        if (this.videoFeed) {
            this.videoFeed.pause();
        }
    }
    /**
     * Pauses the recognition. This means that video frames that arrive from given video source
     * will not be recognized. To resume recognition, call resumeRecognition(boolean).
     * Unlike cancelRecognition, the callback given to startRecognition will not be invoked after pausing
     * the recognition (unless there is already processing in-flight that may call the callback just before
     * pausing the actual recognition loop).
     */
    pauseRecognition() {
        this.recognitionPaused = true;
    }
    /**
     * Convenience method for invoking resetRecognizers on associated RecognizerRunner.
     * @param hardReset Same as in RecognizerRunner.resetRecognizers.
     */
    resetRecognizers(hardReset) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.recognizerRunner.resetRecognizers(hardReset);
        });
    }
    /**
     * Convenience method for accessing RecognizerRunner associated with this VideoRecognizer.
     * Sometimes it's useful to reconfigure RecognizerRunner while handling onScanningDone callback
     * and this method makes that much more convenient.
     */
    getRecognizerRunner() {
        return this.recognizerRunner;
    }
    /**
     * Resumes the recognition. The video feed must not be paused. If it is, an error will be thrown.
     * If video feed is paused, you should use recognize or startRecognition methods.
     * @param resetRecognizers Indicates whether resetRecognizers should be invoked while resuming the recognition
     */
    resumeRecognition(resetRecognizers) {
        return new Promise((resolve, reject) => {
            this.cancelled = false;
            this.timedOut = false;
            this.recognitionPaused = false;
            if (this.videoFeed && this.videoFeed.paused) {
                reject(new SDKError(videoRecognizerErrors.feedPaused));
                return;
            }
            setTimeout(() => {
                if (resetRecognizers) {
                    this.resetRecognizers(true).then(() => {
                        this.recognitionLoop().then(() => resolve()).catch((error) => reject(error));
                    }).catch(() => {
                        reject(new SDKError(videoRecognizerErrors.recognizersResetFailure));
                    });
                }
                else {
                    void this.recognitionLoop().then(() => resolve()).catch((error) => reject(error));
                }
            }, 1);
        });
    }
    /**
     * Stops all media stream tracks associated with current HTMLVideoElement and removes any references to it.
     * Note that after calling this method you can no longer use this VideoRecognizer for recognition.
     * This method should be called after you no longer plan on performing video recognition to let browser know
     * that it can release resources related to any media streams used.
     */
    releaseVideoFeed() {
        var _a, _b;
        if (!this.videoFeed || ((_a = this.videoFeed) === null || _a === void 0 ? void 0 : _a.readyState) < ((_b = this.videoFeed) === null || _b === void 0 ? void 0 : _b.HAVE_CURRENT_DATA)) {
            this.shouldReleaseVideoFeed = true;
            return;
        }
        if (!this.videoFeed.paused) {
            this.cancelRecognition();
        }
        clearVideoFeed(this.videoFeed);
        this.videoFeed = null;
        this.shouldReleaseVideoFeed = false;
    }
    /**
     * Change currently used camera device for recognition. To get list of available camera devices
     * use "getCameraDevices" method.
     *
     * Keep in mind that this method will reset recognizers.
     *
     * @param camera Desired camera device which should be used for recognition.
     */
    changeCameraDevice(camera) {
        return new Promise((resolve, reject) => {
            if (this.videoFeed === null) {
                reject(new SDKError(videoRecognizerErrors.feedMissing));
                return;
            }
            this.pauseRecognition();
            clearVideoFeed(this.videoFeed);
            bindCameraToVideoFeed(camera, this.videoFeed).then(() => {
                if (this.videoFeed === null) {
                    reject(new SDKError(videoRecognizerErrors.feedMissing));
                    return;
                }
                this.videoFeed.play().then(() => {
                    // Recognition errors should be handled by `startRecognition` or `recognize` method
                    void this.resumeRecognition(true);
                    resolve();
                }, 
                /* eslint-disable @typescript-eslint/no-explicit-any */
                (nativeError) => {
                    if (!this.allowManualVideoPlayout) {
                        reject(new SDKError(videoRecognizerErrors.playRequestInterrupted, nativeError));
                        return;
                    }
                    if (!this.videoFeed) {
                        reject(new SDKError(videoRecognizerErrors.feedMissing));
                        return;
                    }
                    this.videoFeed.controls = true;
                }
                /* eslint-enable @typescript-eslint/no-explicit-any */
                );
            }).catch((error) => reject(error));
        });
    }
    playPauseEvent() {
        return new Promise((resolve, reject) => {
            if (this.videoFeed && this.videoFeed.paused) {
                this.cancelRecognition();
                resolve();
                return;
            }
            else {
                this.resumeRecognition(true).then(() => resolve()).catch((error) => reject(error));
            }
        });
    }
    recognitionLoop() {
        return new Promise((resolve, reject) => {
            if (!this.videoFeed) {
                reject(new SDKError(videoRecognizerErrors.feedMissing));
                return;
            }
            if (this.shouldReleaseVideoFeed && this.videoFeed.readyState > this.videoFeed.HAVE_CURRENT_DATA) {
                this.releaseVideoFeed();
                resolve();
                return;
            }
            const cameraFrame = captureFrame(this.videoFeed);
            this.recognizerRunner.processImage(cameraFrame).then((processResult) => {
                const completeFn = () => {
                    if (!this.recognitionPaused) {
                        // ensure browser events are processed and then recognize another frame
                        setTimeout(() => {
                            this.recognitionLoop().then(() => resolve()).catch((error) => reject(error));
                        }, 1);
                    }
                    else {
                        resolve();
                    }
                };
                if (processResult === RecognizerResultState.Valid || this.cancelled || this.timedOut) {
                    if (this.videoRecognitionMode === VideoRecognitionMode.Recognition || this.cancelled) {
                        // valid results, clear the timeout and invoke the callback
                        this.clearTimeout();
                        if (this.onScanningDone) {
                            void this.onScanningDone(processResult);
                        }
                        // after returning from callback, resume scanning if not paused
                    }
                    else {
                        // in test mode - reset the recognizers and continue the loop indefinitely
                        this.recognizerRunner.resetRecognizers(true).then(() => {
                            // clear any time outs
                            this.clearTimeout();
                            completeFn();
                        }).catch((error) => reject(error));
                        return;
                    }
                }
                else if (processResult === RecognizerResultState.Uncertain) {
                    if (this.timeoutID === 0) {
                        // first non-empty result - start timeout
                        this.timeoutID = window.setTimeout(() => { this.timedOut = true; }, this.recognitionTimeoutMs);
                    }
                    completeFn();
                    return;
                }
                else if (processResult === RecognizerResultState.StageValid) {
                    // stage recognition is finished, clear timeout and resume recognition
                    this.clearTimeout();
                    completeFn();
                    return;
                }
                completeFn();
            }).catch((error) => reject(error));
        });
    }
    clearTimeout() {
        if (this.timeoutID > 0) {
            window.clearTimeout(this.timeoutID);
            this.timeoutID = 0;
        }
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Settings object for function loadWasmModule.
 */
class WasmSDKLoadSettings {
    /**
     * @param licenseKey License key for unlocking the WebAssembly module.
     */
    constructor(licenseKey) {
        /**
         * Write a hello message to the browser console when license check is successfully performed.
         *
         * Hello message will contain the name and version of the SDK, which are required information for all support
         * tickets.
         *
         * The default value is true.
         */
        this.allowHelloMessage = true;
        /**
         * Absolute location of WASM and related JS/data files. Useful when resource files should be loaded over CDN, or
         * when web frameworks/libraries are used which store resources in specific locations, e.g. inside "assets" folder.
         *
         * Important: if the engine is hosted on another origin, CORS must be enabled between two hosts. That is, server
         * where engine is hosted must have 'Access-Control-Allow-Origin' header for the location of the web app.
         *
         * Important: SDK and WASM resources must be from the same version of a package.
         *
         * Default value is empty string, i.e. "". In case of empty string, value of "window.location.origin" property is
         * going to be used.
         */
        this.engineLocation = "";
        /**
         * The absolute location of the Web Worker script file that loads the WebAssembly module.
         *
         * Important: the worker script must be served via HTTPS and must be of the same origin as the initiator.
         * See https://github.com/w3c/ServiceWorker/issues/940 (same applies for Web Workers).
         *
         * Important: SDK, worker script and WebAssembly resources must be from the same version of the package.
         *
         * The default value is an empty string, i.e. "", and in that case, the worker script is loaded from the default
         * location in resources folder.
         */
        this.workerLocation = "";
        /**
         * Type of the WASM that will be loaded. By default, if not set, the SDK will automatically determine the best WASM
         * to load.
         */
        this.wasmType = null;
        /**
         * Defines the number of workers that will be used for multi-threaded processing of the images. If not set, the
         * number of worker used will match the number of detected CPU cores on a device.
         *
         * If the browser does not support multi-threaded processing or it was deliberately disabled using the `wasmType`
         * property, then this property will be ignored.
         */
        this.numberOfWorkers = null;
        /**
         * Optional callback function that will report the SDK loading progress.
         *
         * This can be useful for displaying progress bar to users with slow connections.
         *
         * The default value is null.
         */
        this.loadProgressCallback = null;
        /**
         * Name of the file containing the WebAssembly module.
         *
         * Change this only if you have renamed the original WASM and its support JS file for your purposes.
         */
        this.wasmModuleName = defaultWasmModuleName;
        if (!licenseKey) {
            throw new SDKError(sdkErrors.licenseKeyMissing);
        }
        this.licenseKey = licenseKey;
    }
}

const bulkMemory = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])),
  saturatedFloatToInt = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11])),
  signExtensions = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11])),
  simd = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])),
  threads = () => (async e => {
    try {
      return "undefined" != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e);
    } catch (e) {
      return !1;
    }
  })(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function detectWasmType() {
    return __awaiter(this, void 0, void 0, function* () {
        // determine if all features required for advanced WASM are available
        // currently, advanced wasm requires bulk memory, non-trapping floating point
        // and sign extension (this may change in the future).
        const haveBulkMemory = yield bulkMemory();
        const haveNonTrappingFloatingPoint = yield saturatedFloatToInt();
        const haveSignExtension = yield signExtensions();
        const haveSIMD = yield simd();
        const haveThreads = yield threads();
        if (haveBulkMemory && haveNonTrappingFloatingPoint && haveSignExtension && haveSIMD) {
            if (haveThreads) {
                return WasmType.AdvancedWithThreads;
            }
            else {
                return WasmType.Advanced;
            }
        }
        else {
            return WasmType.Basic;
        }
    });
}
function wasmFolder(wasmType) {
    switch (wasmType) {
        case WasmType.AdvancedWithThreads: return "advanced-threads";
        case WasmType.Advanced: return "advanced";
        case WasmType.Basic: return "basic";
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
// taken from https://stackoverflow.com/a/2117523/213057
/* eslint-disable */
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
/* eslint-enable */
function getUserID() {
    try {
        let userId = localStorage.getItem("mb-user-id");
        if (userId === null) {
            userId = uuidv4();
            localStorage.setItem("mb-user-id", userId);
        }
        return userId;
    }
    catch (error) {
        // local storage is disabled, generate new user ID every time
        return uuidv4();
    }
}
/**
 * Asynchronously loads and compiles the WebAssembly module.
 * @param loadSettings Object defining the settings for loading the WebAssembly module.
 * @returns Promise that resolves if WebAssembly module was successfully loaded and rejects if not.
 */
/* eslint-disable @typescript-eslint/no-explicit-any,
                  @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-unsafe-call */
function loadWasmModule(loadSettings) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (!loadSettings || typeof loadSettings !== "object") {
                reject(new SDKError(sdkErrors.wasmSettingsMissing));
                return;
            }
            if (typeof loadSettings.licenseKey !== "string") {
                reject(new SDKError(sdkErrors.licenseKeyMissing));
                return;
            }
            if (!loadSettings.wasmModuleName) {
                reject(new SDKError(sdkErrors.wasmModuleNameMissing));
                return;
            }
            if (typeof loadSettings.engineLocation !== "string") {
                reject(new SDKError(sdkErrors.engineLocationInvalid));
                return;
            }
            if (typeof loadSettings.workerLocation !== "string") {
                reject(new SDKError(sdkErrors.workerLocationInvalid));
                return;
            }
            // obtain user ID from local storage
            const userId = getUserID();
            try {
                const workerPath = `/resources/${loadSettings.wasmModuleName}.worker.min.js`;
                const defaultWorkerLocation = window.location.origin + workerPath;
                const workerLocation = loadSettings.workerLocation || defaultWorkerLocation;
                if (loadSettings.allowHelloMessage) {
                    console.log("Worker location is:", workerLocation);
                }
                const worker = new Worker(workerLocation);
                WasmSDKWorker.createWasmWorker(worker, loadSettings, userId).then(wasmSDK => {
                    resolve(wasmSDK);
                }, reject);
            }
            catch (initError) {
                reject(initError);
            }
        });
    });
}
/* eslint-enable @typescript-eslint/no-explicit-any,
                 @typescript-eslint/no-unsafe-assignment,
                 @typescript-eslint/no-unsafe-member-access,
                 @typescript-eslint/no-unsafe-call */
/**
 * Function for creating a new RecognizerRunner.
 * Note that it is currently not possible to have multiple instances of RecognizerRunner per instance of WasmSDK.
 * Attempt to create new instance of RecognizerRunner prior deleting the previous one will fail.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 * @param recognizers Array of recognizers that will be used by RecognizerRunner.
 * @param allowMultipleResults Whether or not it is allowed to return multiple results from single recognition session.
 *        See README.md for more information.
 * @param metadataCallbacks
 */
function createRecognizerRunner(wasmSDK, recognizers, allowMultipleResults = false, metadataCallbacks = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof wasmSDK !== "object") {
            throw new SDKError(sdkErrors.missing);
        }
        if (typeof recognizers !== "object" || recognizers.length < 1) {
            throw new SDKError(sdkErrors.recognizersMissing);
        }
        return wasmSDK.mbWasmModule.createRecognizerRunner(recognizers, allowMultipleResults, metadataCallbacks);
    });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Creates a new instance of `SuccessFrameGrabberRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the
 *        WebAssembly module.
 * @param slaveRecognizer Instance of Recognizer that will be wrapped.
 */
function createSuccessFrameGrabberRecognizer(wasmSDK, slaveRecognizer) {
    return __awaiter(this, void 0, void 0, function* () {
        // taken from https://stackoverflow.com/a/53615996
        const sfgr = yield wasmSDK.mbWasmModule.newRecognizer("SuccessFrameGrabberRecognizer", slaveRecognizer);
        const mutableSFGR = sfgr;
        mutableSFGR.wrappedRecognizer = slaveRecognizer;
        return sfgr;
    });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Possible formats of barcodes that can be detected. This enum will be returned
 * as part of BarcodeRecognizerResult interface.
 */
var BarcodeFormat;
(function (BarcodeFormat) {
    /** Indicates that no barcode has been detected. */
    BarcodeFormat[BarcodeFormat["NONE"] = 0] = "NONE";
    /** Indicates that QR code has been detected. */
    BarcodeFormat[BarcodeFormat["QR_CODE"] = 1] = "QR_CODE";
    /** Indicates that Data Matrix 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["DATA_MATRIX"] = 2] = "DATA_MATRIX";
    /** Indicates that UPC E 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["UPC_E"] = 3] = "UPC_E";
    /** Indicates that UPC A 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["UPC_A"] = 4] = "UPC_A";
    /** Indicates that EAN 8 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["EAN_8"] = 5] = "EAN_8";
    /** Indicates that EAN 13 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["EAN_13"] = 6] = "EAN_13";
    /** Indicates that Code 128 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["CODE_128"] = 7] = "CODE_128";
    /** Indicates that Code 39 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["CODE_39"] = 8] = "CODE_39";
    /** Indicates that ITF 1D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["ITF"] = 9] = "ITF";
    /** Indicates that Aztec 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["AZTEC_BARCODE"] = 10] = "AZTEC_BARCODE";
    /** Indicates that PDF417 2D barcode has been detected. */
    BarcodeFormat[BarcodeFormat["PDF417_BARCODE"] = 11] = "PDF417_BARCODE";
})(BarcodeFormat || (BarcodeFormat = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * AnonymizationMode is used to define level of anonymization
 * performed on recognizer result.
 */
var AnonymizationMode;
(function (AnonymizationMode) {
    /**
     * Anonymization will not be performed.
     */
    AnonymizationMode[AnonymizationMode["None"] = 0] = "None";
    /**
     * FullDocumentImage is anonymized with black boxes
     * covering sensitive data.
     */
    AnonymizationMode[AnonymizationMode["ImageOnly"] = 1] = "ImageOnly";
    /**
     * Result fields containing sensitive data are removed from result.
     */
    AnonymizationMode[AnonymizationMode["ResultFieldsOnly"] = 2] = "ResultFieldsOnly";
    /**
     * This mode is combination of ImageOnly and ResultFieldsOnly modes.
     */
    AnonymizationMode[AnonymizationMode["FullResult"] = 3] = "FullResult";
})(AnonymizationMode || (AnonymizationMode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 *
 * RecognitionModeFilter is used to enable/disable recognition of specific document groups.
 * Setting is taken into account only if the right for that document is purchased.
 */
class RecognitionModeFilter {
    constructor() {
        /** Enable scanning of MRZ IDs. Setting is taken into account only if the mrz_id right is purchased. */
        this.enableMrzId = true;
        /** Enable scanning of Passport MRZ. Setting is taken into account only if the passport right is purchased. */
        this.enableMrzPassport = true;
        /** Enable scanning of visa MRZ. Setting is taken into account only if the visa right is purchased. */
        this.enableMrzVisa = true;
        /** Enable scanning of Photo ID. Setting is taken into account only if the photo_id right is purchased. */
        this.enablePhotoId = true;
        /**
         * Enable scanning of barcode IDs. Setting is taken into account only if the barcode right to
         * scan that barcode is purchased.
         */
        this.enableBarcodeId = true;
        /**
         * Enable full document recognition. Setting is taken into account only if the document right to
         * scan that document is purchased.
         */
        this.enableFullDocumentRecognition = true;
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Extension factors relative to corresponding dimension of the full image. For example,
 * {@code upFactor} and {@code downFactor} define extensions relative to image height, e.g.
 * when {@code upFactor} is 0.5, upper image boundary will be extended for half of image's full
 * height.
 *
 *                      ._______________________________________.
 *                      |                   ↑                   |
 *                      |                upFactor               |
 *   .________.         |              .________.               |
 *   |        |   -->   |  ⃖ leftFactor |        | rightFactor  ⃗ |
 *   |________|         |              |________|               |
 *                      |                   ↓                   |
 *                      |               downFactor              |
 *                      |_______________________________________|
 *
 */
class ExtensionFactors {
    /**
     * Constructor which accepts image extension factors which must be in range [-1.0f, 1.0f].
     * @param upFactor image extension factor relative to full image height in UP direction
     * @param downFactor image extension factor relative to full image height in DOWN direction
     * @param leftFactor image extension factor relative to full image width in LEFT direction
     * @param rightFactor image extension factor relative to full image width in RIGHT direction
     */
    constructor(upFactor = 0.0, downFactor = 0.0, leftFactor = 0.0, rightFactor = 0.0) {
        /**
         * Currently used image extension factor relative to full image height in UP direction.
         */
        this.upFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in DOWN direction.
         */
        this.downFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in LEFT direction.
         */
        this.leftFactor = 0.0;
        /**
         * Currently used image extension factor relative to full image height in RIGHT direction.
         */
        this.rightFactor = 0.0;
        this.checkExtensionFactor(upFactor);
        this.checkExtensionFactor(downFactor);
        this.checkExtensionFactor(leftFactor);
        this.checkExtensionFactor(rightFactor);
        this.upFactor = upFactor;
        this.downFactor = downFactor;
        this.leftFactor = leftFactor;
        this.rightFactor = rightFactor;
    }
    checkExtensionFactor(factor) {
        if (factor > 1.0 || factor < -1.0) {
            throw new Error("Extension factor must be in range [-1.0, 1.0]");
        }
    }
}
function validateDpi(dpi) {
    if (dpi < 100 || dpi > 400) {
        throw new Error("DPI must be from interval [100, 400]");
    }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
* Enum defining additional fields present in the barcode.
* Currently this is only used for AAMVACompliant documents.
*/
var BarcodeElementKey;
(function (BarcodeElementKey) {
    // ==============================================================/
    // ============== 1. DETERMINING BARCODE VERSION ================/
    // ==============================================================/
    /**
     Mandatory on all driver's licenses. All barcodes which are using 3-track magnetic
     stripe encoding used in the interest of smoothing a transition from legacy documents
     shall be designated as "Magnetic". All barcodes which are using compact encoding
     compliant with ISO/IEC 18013-2 shall be designated as "Compact". All barcodes (majority)
     compliant with Mandatory PDF417 Bar Code of the American Association of Motor Vehicle
     Administrators (AAMVA) Card Design Standard from AAMVA DL/ID-2000 standard to DL/ID-2013
     shall be designated as "AAMVA".
     */
    BarcodeElementKey[BarcodeElementKey["DocumentType"] = 0] = "DocumentType";
    /**
     Mandatory on all driver's licenses.

     AAMVA Version Number: This is a decimal value between 0 and 99 that
     specifies the version level of the PDF417 bar code format. Version "0" and "00"
     is reserved for bar codes printed to the specification of the American Association
     of Motor Vehicle Administrators (AAMVA) prior to the adoption of the AAMVA DL/ID-2000
     standard.

     - All barcodes compliant with AAMVA DL/ID-2000 standard shall be designated Version "01."
     - All barcodes compliant with AAMVA Card Design Specification version 1.0, dated 09-2003
       shall be designated Version "02."
     - All barcodes compliant with AAMVA Card Design Specification version 2.0, dated 03-2005
       shall be designated Version "03."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2009
       shall be designated Version "04."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2010
       shall be designated Version "05."
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 07-2011
       shall be designated Version "06".
     - All barcodes compliant with AAMVA Card Design Standard version 1.0, dated 06-2012
       shall be designated Version "07".
     - All barcodes compliant with this current AAMVA standard shall be designated "08".

     Should a need arise requiring major revision to the format, this field provides the
     means to accommodate additional revision.

     If the document type is not "AAMVA", this field defines the version number of the
     given document type's standard.
     */
    BarcodeElementKey[BarcodeElementKey["StandardVersionNumber"] = 1] = "StandardVersionNumber";
    // ==============================================================/
    // ==========          2. PERSONAL DATA KEYS          ===========/
    // ==============================================================/
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Family name of the cardholder. (Family name is sometimes also called "last name" or "surname.")
     Collect full name for record, print as many characters as possible on portrait side of DL/ID.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFamilyName"] = 2] = "CustomerFamilyName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     First name of the cardholder.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFirstName"] = 3] = "CustomerFirstName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Full name of the individual holding the Driver's License or ID.

     The Name field contains up to four portions, separated with the "," delimiter:
     Last Name (required)
     , (required)
     First Name (required)
     , (required if other name portions follow, otherwise optional)
     Middle Name(s) (optional)
     , (required if other name portions follow, otherwise optional)
     Suffix (optional)
     , (optional)

     If the individual has more than one middle name they are separated with space.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerFullName"] = 4] = "CustomerFullName";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     Date on which the cardholder was born. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DateOfBirth"] = 5] = "DateOfBirth";
    /**
     Mandatory on all AAMVA, Magnetic barcodes.
     Optional on Compact barcodes.

     Gender of the cardholder. 1 = male, 2 = female.
     */
    BarcodeElementKey[BarcodeElementKey["Sex"] = 6] = "Sex";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 barcodes.
     Optional on AAMVA 01, Magnetic and Compact barcodes.

     Color of cardholder's eyes. (ANSI D-20 codes)

     Code   Description
     BLK    Black
     BLU    Blue
     BRO    Brown
     GRY    Gray
     GRN    Green
     HAZ    Hazel
     MAR    Maroon
     PNK    Pink
     DIC    Dichromatic
     UNK    Unknown
     */
    BarcodeElementKey[BarcodeElementKey["EyeColor"] = 7] = "EyeColor";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     Street portion of the cardholder address.
     The place where the registered driver of a vehicle (individual or corporation)
     may be contacted such as a house number, street address, etc.
     */
    BarcodeElementKey[BarcodeElementKey["AddressStreet"] = 8] = "AddressStreet";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     City portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressCity"] = 9] = "AddressCity";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use kFullAddress.

     State portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressJurisdictionCode"] = 10] = "AddressJurisdictionCode";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     On compact barcodes, use FullAddress.

     Postal code portion of the cardholder address in the U.S. and Canada. If the
     trailing portion of the postal code in the U.S. is not known, zeros can be used
     to fill the trailing set of numbers up to nine (9) digits.
     */
    BarcodeElementKey[BarcodeElementKey["AddressPostalCode"] = 11] = "AddressPostalCode";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.
     Optional on Compact barcodes.

     Full address of the individual holding the Driver's License or ID.

     The full address field contains up to four portions, separated with the "," delimiter:
     Street Address (required)
     , (required if other address portions follow, otherwise optional)
     City (optional)
     , (required if other address portions follow, otherwise optional)
     Jurisdiction Code (optional)
     , (required if other address portions follow, otherwise optional)
     ZIP - Postal Code (optional)

     */
    BarcodeElementKey[BarcodeElementKey["FullAddress"] = 12] = "FullAddress";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder, either in Inches or in Centimeters.

     Inches (in): number of inches followed by " in"
     example: 6'1'' = "73 in"

     Centimeters (cm): number of centimeters followed by " cm"
     example: 181 centimeters = "181 cm"
     */
    BarcodeElementKey[BarcodeElementKey["Height"] = 13] = "Height";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder in Inches.
     Example: 5'9'' = "69".
     */
    BarcodeElementKey[BarcodeElementKey["HeightIn"] = 14] = "HeightIn";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 Compact barcodes.
     Optional on AAMVA 01 and Magnetic barcodes.

     Height of cardholder in Centimeters.
     Example: 180 Centimeters = "180".
     */
    BarcodeElementKey[BarcodeElementKey["HeightCm"] = 15] = "HeightCm";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on AAMVA 01, 02, 03, Magnetic and Compcat barcodes.

     Middle name(s) of the cardholder. In the case of multiple middle names they
     shall be separated by space " ".
     */
    BarcodeElementKey[BarcodeElementKey["CustomerMiddleName"] = 16] = "CustomerMiddleName";
    /**
     Optional on all AAMVA, Magnetic and Compact barcodes.

     Bald, black, blonde, brown, gray, red/auburn, sandy, white, unknown. If the issuing
     jurisdiction wishes to abbreviate colors, the three-character codes provided in ANSI D20 must be
     used.

     Code   Description
     BAL    Bald
     BLK    Black
     BLN    Blond
     BRO    Brown
     GRY    Grey
     RED    Red/Auburn
     SDY    Sandy
     WHI    White
     UNK    Unknown
     */
    BarcodeElementKey[BarcodeElementKey["HairColor"] = 17] = "HairColor";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Name Suffix (If jurisdiction participates in systems requiring name suffix (PDPS, CDLIS, etc.),
     the suffix must be collected and displayed on the DL/ID and in the MRT).
     - JR (Junior)
     - SR (Senior)
     - 1ST or I (First)
     - 2ND or II (Second)
     - 3RD or III (Third)
     - 4TH or IV (Fourth)
     - 5TH or V (Fifth)
     - 6TH or VI (Sixth)
     - 7TH or VII (Seventh)
     - 8TH or VIII (Eighth)
     - 9TH or IX (Ninth)
     */
    BarcodeElementKey[BarcodeElementKey["NameSuffix"] = 18] = "NameSuffix";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other name by which the cardholder is known. ALTERNATIVE NAME(S) of the individual
     holding the Driver License or ID.

     The Name field contains up to four portions, separated with the "," delimiter:
     AKA Last Name (required)
     , (required)
     AKA First Name (required)
     , (required if other name portions follow, otherwise optional)
     AKA Middle Name(s) (optional)
     , (required if other name portions follow, otherwise optional)
     AKA Suffix (optional)
     , (optional)

     If the individual has more than one AKA middle name they are separated with space.
     */
    BarcodeElementKey[BarcodeElementKey["AKAFullName"] = 19] = "AKAFullName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other family name by which the cardholder is known.
     */
    BarcodeElementKey[BarcodeElementKey["AKAFamilyName"] = 20] = "AKAFamilyName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other given name by which the cardholder is known
     */
    BarcodeElementKey[BarcodeElementKey["AKAGivenName"] = 21] = "AKAGivenName";
    /**
     Optional on all AAMVA and Compact barcodes.

     Other suffix by which the cardholder is known.

     The Suffix Code Portion, if submitted, can contain only the Suffix Codes shown in the following
     table (e.g., Andrew Johnson, III = JOHNSON@ANDREW@@3RD):

     Suffix     Meaning or Synonym
     JR         Junior
     SR         Senior or Esquire 1ST First
     2ND        Second
     3RD        Third
     4TH        Fourth
     5TH        Fifth
     6TH        Sixth
     7TH        Seventh
     8TH        Eighth
     9TH        Ninth
     */
    BarcodeElementKey[BarcodeElementKey["AKASuffixName"] = 22] = "AKASuffixName";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Indicates the approximate weight range of the cardholder:
     0 = up to 31 kg (up to 70 lbs)
     1 = 32 – 45 kg (71 – 100 lbs)
     2 = 46 - 59 kg (101 – 130 lbs)
     3 = 60 - 70 kg (131 – 160 lbs)
     4 = 71 - 86 kg (161 – 190 lbs)
     5 = 87 - 100 kg (191 – 220 lbs)
     6 = 101 - 113 kg (221 – 250 lbs)
     7 = 114 - 127 kg (251 – 280 lbs)
     8 = 128 – 145 kg (281 – 320 lbs)
     9 = 146+ kg (321+ lbs)
     */
    BarcodeElementKey[BarcodeElementKey["WeightRange"] = 23] = "WeightRange";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Cardholder weight in pounds Example: 185 lb = "185"
     */
    BarcodeElementKey[BarcodeElementKey["WeightPounds"] = 24] = "WeightPounds";
    /**
     Mandatory on AAMVA 02 barcodes.
     Optional on AAMVA 01, 03, 04, 05, 06, 07, 08, Magnetic and Compact barcodes.

     Cardholder weight in kilograms Example: 84 kg = "084"
     */
    BarcodeElementKey[BarcodeElementKey["WeightKilograms"] = 25] = "WeightKilograms";
    /**
     Mandatory on all AAMVA and Compact barcodes.

     The number assigned or calculated by the issuing authority.
     */
    BarcodeElementKey[BarcodeElementKey["CustomerIdNumber"] = 26] = "CustomerIdNumber";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on Compact barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["FamilyNameTruncation"] = 27] = "FamilyNameTruncation";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.
     Optional on Compact barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["FirstNameTruncation"] = 28] = "FirstNameTruncation";
    /**
     Mandatory on AAMVA 04, 05, 06, 07, 08 barcodes.

     A code that indicates whether a field has been truncated (T), has not been
     truncated (N), or – unknown whether truncated (U).
     */
    BarcodeElementKey[BarcodeElementKey["MiddleNameTruncation"] = 29] = "MiddleNameTruncation";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Country and municipality and/or state/province.
     */
    BarcodeElementKey[BarcodeElementKey["PlaceOfBirth"] = 30] = "PlaceOfBirth";
    /**
     Optional on all AAMVA barcodes.

     On Compact barcodes, use kFullAddress.

     Second line of street portion of the cardholder address.
     */
    BarcodeElementKey[BarcodeElementKey["AddressStreet2"] = 31] = "AddressStreet2";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Codes for race or ethnicity of the cardholder, as defined in ANSI D20.

     Race:
     Code   Description
     AI     Alaskan or American Indian (Having Origins in Any of The Original Peoples of
            North America, and Maintaining Cultural Identification Through Tribal
            Affiliation of Community Recognition)
     AP     Asian or Pacific Islander (Having Origins in Any of the Original Peoples of
            the Far East, Southeast Asia, or Pacific Islands. This Includes China, India,
            Japan, Korea, the Philippines Islands, and Samoa)
     BK     Black (Having Origins in Any of the Black Racial Groups of Africa)
     W      White (Having Origins in Any of The Original Peoples of Europe, North Africa,
            or the Middle East)

     Ethnicity:
     Code   Description
     H      Hispanic Origin (A Person of Mexican, Puerto Rican, Cuban, Central or South
            American or Other Spanish Culture or Origin, Regardless of Race)
     O      Not of Hispanic Origin (Any Person Other Than Hispanic)
     U      Unknown

     */
    BarcodeElementKey[BarcodeElementKey["RaceEthnicity"] = 32] = "RaceEthnicity";
    /**
     Optional on AAMVA 01 barcodes.

     PREFIX to Driver Name. Freeform as defined by issuing jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["NamePrefix"] = 33] = "NamePrefix";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Country in which DL/ID is issued. U.S. = USA, Canada = CAN.
     */
    BarcodeElementKey[BarcodeElementKey["CountryIdentification"] = 34] = "CountryIdentification";
    /**
     Optional on AAMVA version 01.

     Driver Residence Street Address 1.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceStreetAddress"] = 35] = "ResidenceStreetAddress";
    /**
     Optional on AAMVA version 01.

     Driver Residence Street Address 2.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceStreetAddress2"] = 36] = "ResidenceStreetAddress2";
    /**
     Optional on AAMVA version 01.

     Driver Residence City
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceCity"] = 37] = "ResidenceCity";
    /**
     Optional on AAMVA version 01.

     Driver Residence Jurisdiction Code.
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceJurisdictionCode"] = 38] = "ResidenceJurisdictionCode";
    /**
     Optional on AAMVA 01 barcodes.

     Driver Residence Postal Code.
     */
    BarcodeElementKey[BarcodeElementKey["ResidencePostalCode"] = 39] = "ResidencePostalCode";
    /**
     Optional on AAMVA 01 barcodes.

     Full residence address of the individual holding the Driver's License or ID.

     The full address field contains up to four portions, separated with the "," delimiter:
     Residence Street Address (required)
     , (required if other address portions follow, otherwise optional)
     Residence City (optional)
     , (required if other address portions follow, otherwise optional)
     Residence Jurisdiction Code (optional)
     , (required if other address portions follow, otherwise optional)
     Residence ZIP - Residence Postal Code (optional)
     */
    BarcodeElementKey[BarcodeElementKey["ResidenceFullAddress"] = 40] = "ResidenceFullAddress";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 18 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under18"] = 41] = "Under18";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 19 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under19"] = 42] = "Under19";
    /**
     Optional on AAMVA 05, 06, 07, 08 barcodes.

     Date on which the cardholder turns 21 years old. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["Under21"] = 43] = "Under21";
    /**
     Optional on AAMVA version 01.

     The number assigned to the individual by the Social Security Administration.
     */
    BarcodeElementKey[BarcodeElementKey["SocialSecurityNumber"] = 44] = "SocialSecurityNumber";
    /**
     Optional on AAMVA version 01.

     Driver "AKA" Social Security Number. FORMAT SAME AS DRIVER SOC SEC NUM. ALTERNATIVE NUMBERS(S) used as SS NUM.
     */
    BarcodeElementKey[BarcodeElementKey["AKASocialSecurityNumber"] = 45] = "AKASocialSecurityNumber";
    /**
     Optional on AAMVA 01 barcodes.

     ALTERNATIVE MIDDLE NAME(s) or INITIALS of the individual holding the Driver License or ID.
     Hyphenated names acceptable, spaces between names acceptable, but no other
     use of special symbols.
     */
    BarcodeElementKey[BarcodeElementKey["AKAMiddleName"] = 46] = "AKAMiddleName";
    /**
     Optional on AAMVA 01 barcodes.

     ALTERNATIVE PREFIX to Driver Name. Freeform as defined by issuing jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["AKAPrefixName"] = 47] = "AKAPrefixName";
    /**
     Optional on AAMVA 01, 06, 07, 08 barcodes.

     Field that indicates that the cardholder is an organ donor = "1".
     */
    BarcodeElementKey[BarcodeElementKey["OrganDonor"] = 48] = "OrganDonor";
    /**
     Optional on AAMVA 07, 08 barcodes.

     Field that indicates that the cardholder is a veteran = "1"
     */
    BarcodeElementKey[BarcodeElementKey["Veteran"] = 49] = "Veteran";
    /**
     Optional on AAMVA 01. (MMDDCCYY format)

     ALTERNATIVE DATES(S) given as date of birth.
     */
    BarcodeElementKey[BarcodeElementKey["AKADateOfBirth"] = 50] = "AKADateOfBirth";
    // ==============================================================/
    // ==========          3. LICENSE DATA KEYS          ============/
    // ==============================================================/
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     This number uniquely identifies the issuing jurisdiction and can
     be obtained by contacting the ISO Issuing Authority (AAMVA)
     */
    BarcodeElementKey[BarcodeElementKey["IssuerIdentificationNumber"] = 51] = "IssuerIdentificationNumber";
    /**
     Mandatory on all AAMVA, Magnetic and Compact barcodes.

     If the document is non expiring then "Non expiring" is written in this field.

     Date on which the driving and identification privileges granted by the document are
     no longer valid. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentExpirationDate"] = 52] = "DocumentExpirationDate";
    /**
     Mandatory on all AAMVA and Compact barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction Version Number: This is a decimal value between 0 and 99 that
     specifies the jurisdiction version level of the PDF417 barcode format.
     Notwithstanding iterations of this standard, jurisdictions implement incremental
     changes to their barcodes, including new jurisdiction-specific data, compression
     algorithms for digitized images, digital signatures, or new truncation
     conventions used for names and addresses. Each change to the barcode format
     within each AAMVA version (above) must be noted, beginning with Jurisdiction
     Version 00.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVersionNumber"] = 53] = "JurisdictionVersionNumber";
    /**
     Mandatory on all AAMVA and Magnetic barcodes.

     Jurisdiction-specific vehicle class / group code, designating the type
     of vehicle the cardholder has privilege to drive.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVehicleClass"] = 54] = "JurisdictionVehicleClass";
    /**
     Mandatory on all AAMVA barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction-specific codes that represent restrictions to driving
     privileges (such as airbrakes, automatic transmission, daylight only, etc.).
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionRestrictionCodes"] = 55] = "JurisdictionRestrictionCodes";
    /**
     Mandatory on all AAMVA barcodes.
     Optional on Magnetic barcodes.

     Jurisdiction-specific codes that represent additional privileges
     granted to the cardholder beyond the vehicle class (such as transportation of
     passengers, hazardous materials, operation of motorcycles, etc.).
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionEndorsementCodes"] = 56] = "JurisdictionEndorsementCodes";
    /**
     Mandatory on all AAMVA and Compact barcodes.

     Date on which the document was issued. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentIssueDate"] = 57] = "DocumentIssueDate";
    /**
     Mandatory on AAMVA versions 02 and 03.

     Federally established codes for vehicle categories, endorsements, and restrictions
     that are generally applicable to commercial motor vehicles. If the vehicle is not a
     commercial vehicle, "NONE" is to be entered.
     */
    BarcodeElementKey[BarcodeElementKey["FederalCommercialVehicleCodes"] = 58] = "FederalCommercialVehicleCodes";
    /**
     Optional on all AAMVA barcodes.
     Mandatory on Compact barcodes.

     Jurisdictions may define a subfile to contain jurisdiction-specific information.
     These subfiles are designated with the first character of “Z” and the second
     character is the first letter of the jurisdiction's name. For example, "ZC" would
     be the designator for a California or Colorado jurisdiction-defined subfile, "ZQ"
     would be the designator for a Quebec jurisdiction-defined subfile. In the case of
     a jurisdiction-defined subfile that has a first letter that could be more than
     one jurisdiction (e.g. California, Colorado, Connecticut) then other data, like
     the IIN or address, must be examined to determine the jurisdiction.
     */
    BarcodeElementKey[BarcodeElementKey["IssuingJurisdiction"] = 59] = "IssuingJurisdiction";
    /**
     Optional on all AAMVA barcodes.
     Mandatory on Compact barcodes.

     Standard vehicle classification code(s) for cardholder. This data element is a
     placeholder for future efforts to standardize vehicle classifications.
     */
    BarcodeElementKey[BarcodeElementKey["StandardVehicleClassification"] = 60] = "StandardVehicleClassification";
    /**
      Optional on all AAMVA and Magnetic barcodes.

      Name of issuing jurisdiction, for example: Alabama, Alaska ...
      */
    BarcodeElementKey[BarcodeElementKey["IssuingJurisdictionName"] = 61] = "IssuingJurisdictionName";
    /**
     Optional on all AAMVA barcodes.

     Standard endorsement code(s) for cardholder. See codes in D20. This data element is a
     placeholder for future efforts to standardize endorsement codes.

     Code   Description
     H      Hazardous Material - This endorsement is required for the operation of any vehicle
            transporting hazardous materials requiring placarding, as defined by U.S.
            Department of Transportation regulations.
     L      Motorcycles – Including Mopeds/Motorized Bicycles.
     N      Tank - This endorsement is required for the operation of any vehicle transporting,
            as its primary cargo, any liquid or gaseous material within a tank attached to the vehicle.
     O      Other Jurisdiction Specific Endorsement(s) - This code indicates one or more
            additional jurisdiction assigned endorsements.
     P      Passenger - This endorsement is required for the operation of any vehicle used for
            transportation of sixteen or more occupants, including the driver.
     S      School Bus - This endorsement is required for the operation of a school bus. School bus means a
            CMV used to transport pre-primary, primary, or secondary school students from home to school,
            from school to home, or to and from school sponsored events. School bus does not include a
            bus used as common carrier (49 CRF 383.5).
     T      Doubles/Triples - This endorsement is required for the operation of any vehicle that would be
            referred to as a double or triple.
     X      Combined Tank/HAZ-MAT - This endorsement may be issued to any driver who qualifies for
            both the N and H endorsements.
     */
    BarcodeElementKey[BarcodeElementKey["StandardEndorsementCode"] = 62] = "StandardEndorsementCode";
    /**
     Optional on all AAMVA barcodes.

     Standard restriction code(s) for cardholder. See codes in D20. This data element is a placeholder
     for future efforts to standardize restriction codes.

     Code   Description
     B      Corrective Lenses
     C      Mechanical Devices (Special Brakes, Hand Controls, or Other Adaptive Devices)
     D      Prosthetic Aid
     E      Automatic Transmission
     F      Outside Mirror
     G      Limit to Daylight Only
     H      Limit to Employment
     I      Limited Other
     J      Other
     K      CDL Intrastate Only
     L      Vehicles without air brakes
     M      Except Class A bus
     N      Except Class A and Class B bus
     O      Except Tractor-Trailer
     V      Medical Variance Documentation Required
     W      Farm Waiver
     */
    BarcodeElementKey[BarcodeElementKey["StandardRestrictionCode"] = 63] = "StandardRestrictionCode";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text that explains the jurisdiction-specific code(s) for classifications
     of vehicles cardholder is authorized to drive.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionVehicleClassificationDescription"] = 64] = "JurisdictionVehicleClassificationDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text that explains the jurisdiction-specific code(s) that indicates additional
     driving privileges granted to the cardholder beyond the vehicle class.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionEndorsmentCodeDescription"] = 65] = "JurisdictionEndorsmentCodeDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     Text describing the jurisdiction-specific restriction code(s) that curtail driving privileges.
     */
    BarcodeElementKey[BarcodeElementKey["JurisdictionRestrictionCodeDescription"] = 66] = "JurisdictionRestrictionCodeDescription";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 barcodes.

     A string of letters and/or numbers that is affixed to the raw materials (card stock,
     laminate, etc.) used in producing driver's licenses and ID cards. (DHS recommended field)
     */
    BarcodeElementKey[BarcodeElementKey["InventoryControlNumber"] = 67] = "InventoryControlNumber";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates date of the most recent version change or
     modification to the visible format of the DL/ID. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["CardRevisionDate"] = 68] = "CardRevisionDate";
    /**
     Mandatory on AAMVA 02, 03, 04, 05, 06, 07, 08 and Magnetic barcodes.
     Optional and Compact barcodes.

     Number must uniquely identify a particular document issued to that customer
     from others that may have been issued in the past. This number may serve multiple
     purposes of document discrimination, audit information number, and/or inventory control.
     */
    BarcodeElementKey[BarcodeElementKey["DocumentDiscriminator"] = 69] = "DocumentDiscriminator";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates that the cardholder has temporary lawful status = "1".
     */
    BarcodeElementKey[BarcodeElementKey["LimitedDurationDocument"] = 70] = "LimitedDurationDocument";
    /**
     Optional on AAMVA 02, 03, 04, 05, 06, 07, 08 and Compact barcodes.

     A string of letters and/or numbers that identifies when, where, and by whom a driver's
     license/ID card was made. If audit information is not used on the card or the MRT, it
     must be included in the driver record.
     */
    BarcodeElementKey[BarcodeElementKey["AuditInformation"] = 71] = "AuditInformation";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     DHS required field that indicates compliance: "M" = materially compliant,
     "F" = fully compliant, and, "N" = non-compliant.
     */
    BarcodeElementKey[BarcodeElementKey["ComplianceType"] = 72] = "ComplianceType";
    /**
     Optional on AAMVA version 01 barcodes.

     Issue Timestamp. A string used by some jurisdictions to validate the document against their data base.
     */
    BarcodeElementKey[BarcodeElementKey["IssueTimestamp"] = 73] = "IssueTimestamp";
    /**
     Optional on AAMVA version 01 barcodes.

     Driver Permit Expiration Date. MMDDCCYY format. Date permit expires.
     */
    BarcodeElementKey[BarcodeElementKey["PermitExpirationDate"] = 74] = "PermitExpirationDate";
    /**
     Optional on AAMVA version 01 barcodes..

     Type of permit.
     */
    BarcodeElementKey[BarcodeElementKey["PermitIdentifier"] = 75] = "PermitIdentifier";
    /**
     Optional on AAMVA version 01 barcodes..

     Driver Permit Issue Date. MMDDCCYY format. Date permit was issued.
     */
    BarcodeElementKey[BarcodeElementKey["PermitIssueDate"] = 76] = "PermitIssueDate";
    /**
     Optional on AAMVA version 01.

     Number of duplicate cards issued for a license or ID if any.
     */
    BarcodeElementKey[BarcodeElementKey["NumberOfDuplicates"] = 77] = "NumberOfDuplicates";
    /**
     Optional on AAMVA 04, 05, 06, 07, 08 and Compact barcodes.

     Date on which the hazardous material endorsement granted by the document is
     no longer valid. (MMDDCCYY format)
     */
    BarcodeElementKey[BarcodeElementKey["HAZMATExpirationDate"] = 78] = "HAZMATExpirationDate";
    /**
     Optional on AAMVA version 01.

     Medical Indicator/Codes.
     STATE SPECIFIC. Freeform, Standard "TBD"
     */
    BarcodeElementKey[BarcodeElementKey["MedicalIndicator"] = 79] = "MedicalIndicator";
    /**
     Optional on AAMVA version 01.

     Non-Resident Indicator. "Y". Used by some jurisdictions to indicate holder of the document is a non-resident.
     */
    BarcodeElementKey[BarcodeElementKey["NonResident"] = 80] = "NonResident";
    /**
     Optional on AAMVA version 01.

     A number or alphanumeric string used by some jurisdictions to identify a "customer" across multiple data bases.
     */
    BarcodeElementKey[BarcodeElementKey["UniqueCustomerId"] = 81] = "UniqueCustomerId";
    /**
     Optional on compact barcodes.

     Document discriminator.
     */
    BarcodeElementKey[BarcodeElementKey["DataDiscriminator"] = 82] = "DataDiscriminator";
    /**
     Optional on Magnetic barcodes.

     Month on which the driving and identification privileges granted by the document are
     no longer valid. (MMYY format)
     */
    BarcodeElementKey[BarcodeElementKey["DocumentExpirationMonth"] = 83] = "DocumentExpirationMonth";
    /**
     Optional on Magnetic barcodes.

     Field that indicates that the driving and identification privileges granted by the
     document are nonexpiring = "1".
     */
    BarcodeElementKey[BarcodeElementKey["DocumentNonexpiring"] = 84] = "DocumentNonexpiring";
    /**
      Optional on Magnetic barcodes.

      Security version beeing used.
    */
    BarcodeElementKey[BarcodeElementKey["SecurityVersion"] = 85] = "SecurityVersion";
    /**
      Number of keys in enum.
    */
    BarcodeElementKey[BarcodeElementKey["Count"] = 86] = "Count";
})(BarcodeElementKey || (BarcodeElementKey = {}));

var Country;
(function (Country) {
    Country[Country["NONE"] = 0] = "NONE";
    Country[Country["ALBANIA"] = 1] = "ALBANIA";
    Country[Country["ALGERIA"] = 2] = "ALGERIA";
    Country[Country["ARGENTINA"] = 3] = "ARGENTINA";
    Country[Country["AUSTRALIA"] = 4] = "AUSTRALIA";
    Country[Country["AUSTRIA"] = 5] = "AUSTRIA";
    Country[Country["AZERBAIJAN"] = 6] = "AZERBAIJAN";
    Country[Country["BAHRAIN"] = 7] = "BAHRAIN";
    Country[Country["BANGLADESH"] = 8] = "BANGLADESH";
    Country[Country["BELGIUM"] = 9] = "BELGIUM";
    Country[Country["BOSNIA_AND_HERZEGOVINA"] = 10] = "BOSNIA_AND_HERZEGOVINA";
    Country[Country["BRUNEI"] = 11] = "BRUNEI";
    Country[Country["BULGARIA"] = 12] = "BULGARIA";
    Country[Country["CAMBODIA"] = 13] = "CAMBODIA";
    Country[Country["CANADA"] = 14] = "CANADA";
    Country[Country["CHILE"] = 15] = "CHILE";
    Country[Country["COLOMBIA"] = 16] = "COLOMBIA";
    Country[Country["COSTA_RICA"] = 17] = "COSTA_RICA";
    Country[Country["CROATIA"] = 18] = "CROATIA";
    Country[Country["CYPRUS"] = 19] = "CYPRUS";
    Country[Country["CZECHIA"] = 20] = "CZECHIA";
    Country[Country["DENMARK"] = 21] = "DENMARK";
    Country[Country["DOMINICAN_REPUBLIC"] = 22] = "DOMINICAN_REPUBLIC";
    Country[Country["EGYPT"] = 23] = "EGYPT";
    Country[Country["ESTONIA"] = 24] = "ESTONIA";
    Country[Country["FINLAND"] = 25] = "FINLAND";
    Country[Country["FRANCE"] = 26] = "FRANCE";
    Country[Country["GEORGIA"] = 27] = "GEORGIA";
    Country[Country["GERMANY"] = 28] = "GERMANY";
    Country[Country["GHANA"] = 29] = "GHANA";
    Country[Country["GREECE"] = 30] = "GREECE";
    Country[Country["GUATEMALA"] = 31] = "GUATEMALA";
    Country[Country["HONG_KONG"] = 32] = "HONG_KONG";
    Country[Country["HUNGARY"] = 33] = "HUNGARY";
    Country[Country["INDIA"] = 34] = "INDIA";
    Country[Country["INDONESIA"] = 35] = "INDONESIA";
    Country[Country["IRELAND"] = 36] = "IRELAND";
    Country[Country["ISRAEL"] = 37] = "ISRAEL";
    Country[Country["ITALY"] = 38] = "ITALY";
    Country[Country["JORDAN"] = 39] = "JORDAN";
    Country[Country["KAZAKHSTAN"] = 40] = "KAZAKHSTAN";
    Country[Country["KENYA"] = 41] = "KENYA";
    Country[Country["KOSOVO"] = 42] = "KOSOVO";
    Country[Country["KUWAIT"] = 43] = "KUWAIT";
    Country[Country["LATVIA"] = 44] = "LATVIA";
    Country[Country["LITHUANIA"] = 45] = "LITHUANIA";
    Country[Country["MALAYSIA"] = 46] = "MALAYSIA";
    Country[Country["MALDIVES"] = 47] = "MALDIVES";
    Country[Country["MALTA"] = 48] = "MALTA";
    Country[Country["MAURITIUS"] = 49] = "MAURITIUS";
    Country[Country["MEXICO"] = 50] = "MEXICO";
    Country[Country["MOROCCO"] = 51] = "MOROCCO";
    Country[Country["NETHERLANDS"] = 52] = "NETHERLANDS";
    Country[Country["NEW_ZEALAND"] = 53] = "NEW_ZEALAND";
    Country[Country["NIGERIA"] = 54] = "NIGERIA";
    Country[Country["PAKISTAN"] = 55] = "PAKISTAN";
    Country[Country["PANAMA"] = 56] = "PANAMA";
    Country[Country["PARAGUAY"] = 57] = "PARAGUAY";
    Country[Country["PHILIPPINES"] = 58] = "PHILIPPINES";
    Country[Country["POLAND"] = 59] = "POLAND";
    Country[Country["PORTUGAL"] = 60] = "PORTUGAL";
    Country[Country["PUERTO_RICO"] = 61] = "PUERTO_RICO";
    Country[Country["QATAR"] = 62] = "QATAR";
    Country[Country["ROMANIA"] = 63] = "ROMANIA";
    Country[Country["RUSSIA"] = 64] = "RUSSIA";
    Country[Country["SAUDI_ARABIA"] = 65] = "SAUDI_ARABIA";
    Country[Country["SERBIA"] = 66] = "SERBIA";
    Country[Country["SINGAPORE"] = 67] = "SINGAPORE";
    Country[Country["SLOVAKIA"] = 68] = "SLOVAKIA";
    Country[Country["SLOVENIA"] = 69] = "SLOVENIA";
    Country[Country["SOUTH_AFRICA"] = 70] = "SOUTH_AFRICA";
    Country[Country["SPAIN"] = 71] = "SPAIN";
    Country[Country["SWEDEN"] = 72] = "SWEDEN";
    Country[Country["SWITZERLAND"] = 73] = "SWITZERLAND";
    Country[Country["TAIWAN"] = 74] = "TAIWAN";
    Country[Country["THAILAND"] = 75] = "THAILAND";
    Country[Country["TUNISIA"] = 76] = "TUNISIA";
    Country[Country["TURKEY"] = 77] = "TURKEY";
    Country[Country["UAE"] = 78] = "UAE";
    Country[Country["UGANDA"] = 79] = "UGANDA";
    Country[Country["UK"] = 80] = "UK";
    Country[Country["UKRAINE"] = 81] = "UKRAINE";
    Country[Country["USA"] = 82] = "USA";
    Country[Country["VIETNAM"] = 83] = "VIETNAM";
    Country[Country["BRAZIL"] = 84] = "BRAZIL";
    Country[Country["NORWAY"] = 85] = "NORWAY";
    Country[Country["OMAN"] = 86] = "OMAN";
    Country[Country["ECUADOR"] = 87] = "ECUADOR";
    Country[Country["EL_SALVADOR"] = 88] = "EL_SALVADOR";
    Country[Country["SRI_LANKA"] = 89] = "SRI_LANKA";
    Country[Country["PERU"] = 90] = "PERU";
    Country[Country["URUGUAY"] = 91] = "URUGUAY";
    Country[Country["BAHAMAS"] = 92] = "BAHAMAS";
    Country[Country["BERMUDA"] = 93] = "BERMUDA";
    Country[Country["BOLIVIA"] = 94] = "BOLIVIA";
    Country[Country["CHINA"] = 95] = "CHINA";
    Country[Country["EUROPEAN_UNION"] = 96] = "EUROPEAN_UNION";
    Country[Country["HAITI"] = 97] = "HAITI";
    Country[Country["HONDURAS"] = 98] = "HONDURAS";
    Country[Country["ICELAND"] = 99] = "ICELAND";
    Country[Country["JAPAN"] = 100] = "JAPAN";
    Country[Country["LUXEMBOURG"] = 101] = "LUXEMBOURG";
    Country[Country["MONTENEGRO"] = 102] = "MONTENEGRO";
    Country[Country["NICARAGUA"] = 103] = "NICARAGUA";
    Country[Country["SOUTH_KOREA"] = 104] = "SOUTH_KOREA";
    Country[Country["VENEZUELA"] = 105] = "VENEZUELA";
    Country[Country["AFGHANISTAN"] = 106] = "AFGHANISTAN";
    Country[Country["ALAND_ISLANDS"] = 107] = "ALAND_ISLANDS";
    Country[Country["AMERICAN_SAMOA"] = 108] = "AMERICAN_SAMOA";
    Country[Country["ANDORRA"] = 109] = "ANDORRA";
    Country[Country["ANGOLA"] = 110] = "ANGOLA";
    Country[Country["ANGUILLA"] = 111] = "ANGUILLA";
    Country[Country["ANTARCTICA"] = 112] = "ANTARCTICA";
    Country[Country["ANTIGUA_AND_BARBUDA"] = 113] = "ANTIGUA_AND_BARBUDA";
    Country[Country["ARMENIA"] = 114] = "ARMENIA";
    Country[Country["ARUBA"] = 115] = "ARUBA";
    Country[Country["BAILIWICK_OF_GUERNSEY"] = 116] = "BAILIWICK_OF_GUERNSEY";
    Country[Country["BAILIWICK_OF_JERSEY"] = 117] = "BAILIWICK_OF_JERSEY";
    Country[Country["BARBADOS"] = 118] = "BARBADOS";
    Country[Country["BELARUS"] = 119] = "BELARUS";
    Country[Country["BELIZE"] = 120] = "BELIZE";
    Country[Country["BENIN"] = 121] = "BENIN";
    Country[Country["BHUTAN"] = 122] = "BHUTAN";
    Country[Country["BONAIRE_SAINT_EUSTATIUS_AND_SABA"] = 123] = "BONAIRE_SAINT_EUSTATIUS_AND_SABA";
    Country[Country["BOTSWANA"] = 124] = "BOTSWANA";
    Country[Country["BOUVET_ISLAND"] = 125] = "BOUVET_ISLAND";
    Country[Country["BRITISH_INDIAN_OCEAN_TERRITORY"] = 126] = "BRITISH_INDIAN_OCEAN_TERRITORY";
    Country[Country["BURKINA_FASO"] = 127] = "BURKINA_FASO";
    Country[Country["BURUNDI"] = 128] = "BURUNDI";
    Country[Country["CAMEROON"] = 129] = "CAMEROON";
    Country[Country["CAPE_VERDE"] = 130] = "CAPE_VERDE";
    Country[Country["CARIBBEAN_NETHERLANDS"] = 131] = "CARIBBEAN_NETHERLANDS";
    Country[Country["CAYMAN_ISLANDS"] = 132] = "CAYMAN_ISLANDS";
    Country[Country["CENTRAL_AFRICAN_REPUBLIC"] = 133] = "CENTRAL_AFRICAN_REPUBLIC";
    Country[Country["CHAD"] = 134] = "CHAD";
    Country[Country["CHRISTMAS_ISLAND"] = 135] = "CHRISTMAS_ISLAND";
    Country[Country["COCOS_ISLANDS"] = 136] = "COCOS_ISLANDS";
    Country[Country["COMOROS"] = 137] = "COMOROS";
    Country[Country["CONGO"] = 138] = "CONGO";
    Country[Country["COOK_ISLANDS"] = 139] = "COOK_ISLANDS";
    Country[Country["CUBA"] = 140] = "CUBA";
    Country[Country["CURACAO"] = 141] = "CURACAO";
    Country[Country["DEMOCRATIC_REPUBLIC_OF_THE_CONGO"] = 142] = "DEMOCRATIC_REPUBLIC_OF_THE_CONGO";
    Country[Country["DJIBOUTI"] = 143] = "DJIBOUTI";
    Country[Country["DOMINICA"] = 144] = "DOMINICA";
    Country[Country["EAST_TIMOR"] = 145] = "EAST_TIMOR";
    Country[Country["EQUATORIAL_GUINEA"] = 146] = "EQUATORIAL_GUINEA";
    Country[Country["ERITREA"] = 147] = "ERITREA";
    Country[Country["ETHIOPIA"] = 148] = "ETHIOPIA";
    Country[Country["FALKLAND_ISLANDS"] = 149] = "FALKLAND_ISLANDS";
    Country[Country["FAROE_ISLANDS"] = 150] = "FAROE_ISLANDS";
    Country[Country["FEDERATED_STATES_OF_MICRONESIA"] = 151] = "FEDERATED_STATES_OF_MICRONESIA";
    Country[Country["FIJI"] = 152] = "FIJI";
    Country[Country["FRENCH_GUIANA"] = 153] = "FRENCH_GUIANA";
    Country[Country["FRENCH_POLYNESIA"] = 154] = "FRENCH_POLYNESIA";
    Country[Country["FRENCH_SOUTHERN_TERRITORIES"] = 155] = "FRENCH_SOUTHERN_TERRITORIES";
    Country[Country["GABON"] = 156] = "GABON";
    Country[Country["GAMBIA"] = 157] = "GAMBIA";
    Country[Country["GIBRALTAR"] = 158] = "GIBRALTAR";
    Country[Country["GREENLAND"] = 159] = "GREENLAND";
    Country[Country["GRENADA"] = 160] = "GRENADA";
    Country[Country["GUADELOUPE"] = 161] = "GUADELOUPE";
    Country[Country["GUAM"] = 162] = "GUAM";
    Country[Country["GUINEA"] = 163] = "GUINEA";
    Country[Country["GUINEA_BISSAU"] = 164] = "GUINEA_BISSAU";
    Country[Country["GUYANA"] = 165] = "GUYANA";
    Country[Country["HEARD_ISLAND_AND_MCDONALD_ISLANDS"] = 166] = "HEARD_ISLAND_AND_MCDONALD_ISLANDS";
    Country[Country["IRAN"] = 167] = "IRAN";
    Country[Country["IRAQ"] = 168] = "IRAQ";
    Country[Country["ISLE_OF_MAN"] = 169] = "ISLE_OF_MAN";
    Country[Country["IVORY_COAST"] = 170] = "IVORY_COAST";
    Country[Country["JAMAICA"] = 171] = "JAMAICA";
    Country[Country["KIRIBATI"] = 172] = "KIRIBATI";
    Country[Country["KYRGYZSTAN"] = 173] = "KYRGYZSTAN";
    Country[Country["LAOS"] = 174] = "LAOS";
    Country[Country["LEBANON"] = 175] = "LEBANON";
    Country[Country["LESOTHO"] = 176] = "LESOTHO";
    Country[Country["LIBERIA"] = 177] = "LIBERIA";
    Country[Country["LIBYA"] = 178] = "LIBYA";
    Country[Country["LIECHTENSTEIN"] = 179] = "LIECHTENSTEIN";
    Country[Country["MACAU"] = 180] = "MACAU";
    Country[Country["MADAGASCAR"] = 181] = "MADAGASCAR";
    Country[Country["MALAWI"] = 182] = "MALAWI";
    Country[Country["MALI"] = 183] = "MALI";
    Country[Country["MARSHALL_ISLANDS"] = 184] = "MARSHALL_ISLANDS";
    Country[Country["MARTINIQUE"] = 185] = "MARTINIQUE";
    Country[Country["MAURITANIA"] = 186] = "MAURITANIA";
    Country[Country["MAYOTTE"] = 187] = "MAYOTTE";
    Country[Country["MOLDOVA"] = 188] = "MOLDOVA";
    Country[Country["MONACO"] = 189] = "MONACO";
    Country[Country["MONGOLIA"] = 190] = "MONGOLIA";
    Country[Country["MONTSERRAT"] = 191] = "MONTSERRAT";
    Country[Country["MOZAMBIQUE"] = 192] = "MOZAMBIQUE";
    Country[Country["MYANMAR"] = 193] = "MYANMAR";
    Country[Country["NAMIBIA"] = 194] = "NAMIBIA";
    Country[Country["NAURU"] = 195] = "NAURU";
    Country[Country["NEPAL"] = 196] = "NEPAL";
    Country[Country["NEW_CALEDONIA"] = 197] = "NEW_CALEDONIA";
    Country[Country["NIGER"] = 198] = "NIGER";
    Country[Country["NIUE"] = 199] = "NIUE";
    Country[Country["NORFOLK_ISLAND"] = 200] = "NORFOLK_ISLAND";
    Country[Country["NORTHERN_CYPRUS"] = 201] = "NORTHERN_CYPRUS";
    Country[Country["NORTHERN_MARIANA_ISLANDS"] = 202] = "NORTHERN_MARIANA_ISLANDS";
    Country[Country["NORTH_KOREA"] = 203] = "NORTH_KOREA";
    Country[Country["NORTH_MACEDONIA"] = 204] = "NORTH_MACEDONIA";
    Country[Country["PALAU"] = 205] = "PALAU";
    Country[Country["PALESTINE"] = 206] = "PALESTINE";
    Country[Country["PAPUA_NEW_GUINEA"] = 207] = "PAPUA_NEW_GUINEA";
    Country[Country["PITCAIRN"] = 208] = "PITCAIRN";
    Country[Country["REUNION"] = 209] = "REUNION";
    Country[Country["RWANDA"] = 210] = "RWANDA";
    Country[Country["SAINT_BARTHELEMY"] = 211] = "SAINT_BARTHELEMY";
    Country[Country["SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA"] = 212] = "SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA";
    Country[Country["SAINT_KITTS_AND_NEVIS"] = 213] = "SAINT_KITTS_AND_NEVIS";
    Country[Country["SAINT_LUCIA"] = 214] = "SAINT_LUCIA";
    Country[Country["SAINT_MARTIN"] = 215] = "SAINT_MARTIN";
    Country[Country["SAINT_PIERRE_AND_MIQUELON"] = 216] = "SAINT_PIERRE_AND_MIQUELON";
    Country[Country["SAINT_VINCENT_AND_THE_GRENADINES"] = 217] = "SAINT_VINCENT_AND_THE_GRENADINES";
    Country[Country["SAMOA"] = 218] = "SAMOA";
    Country[Country["SAN_MARINO"] = 219] = "SAN_MARINO";
    Country[Country["SAO_TOME_AND_PRINCIPE"] = 220] = "SAO_TOME_AND_PRINCIPE";
    Country[Country["SENEGAL"] = 221] = "SENEGAL";
    Country[Country["SEYCHELLES"] = 222] = "SEYCHELLES";
    Country[Country["SIERRA_LEONE"] = 223] = "SIERRA_LEONE";
    Country[Country["SINT_MAARTEN"] = 224] = "SINT_MAARTEN";
    Country[Country["SOLOMON_ISLANDS"] = 225] = "SOLOMON_ISLANDS";
    Country[Country["SOMALIA"] = 226] = "SOMALIA";
    Country[Country["SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS"] = 227] = "SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS";
    Country[Country["SOUTH_SUDAN"] = 228] = "SOUTH_SUDAN";
    Country[Country["SUDAN"] = 229] = "SUDAN";
    Country[Country["SURINAME"] = 230] = "SURINAME";
    Country[Country["SVALBARD_AND_JAN_MAYEN"] = 231] = "SVALBARD_AND_JAN_MAYEN";
    Country[Country["ESWATINI"] = 232] = "ESWATINI";
    Country[Country["SYRIA"] = 233] = "SYRIA";
    Country[Country["TAJIKISTAN"] = 234] = "TAJIKISTAN";
    Country[Country["TANZANIA"] = 235] = "TANZANIA";
    Country[Country["TOGO"] = 236] = "TOGO";
    Country[Country["TOKELAU"] = 237] = "TOKELAU";
    Country[Country["TONGA"] = 238] = "TONGA";
    Country[Country["TRINIDAD_AND_TOBAGO"] = 239] = "TRINIDAD_AND_TOBAGO";
    Country[Country["TURKMENISTAN"] = 240] = "TURKMENISTAN";
    Country[Country["TURKS_AND_CAICOS_ISLANDS"] = 241] = "TURKS_AND_CAICOS_ISLANDS";
    Country[Country["TUVALU"] = 242] = "TUVALU";
    Country[Country["UNITED_STATES_MINOR_OUTLYING_ISLANDS"] = 243] = "UNITED_STATES_MINOR_OUTLYING_ISLANDS";
    Country[Country["UZBEKISTAN"] = 244] = "UZBEKISTAN";
    Country[Country["VANUATU"] = 245] = "VANUATU";
    Country[Country["VATICAN_CITY"] = 246] = "VATICAN_CITY";
    Country[Country["VIRGIN_ISLANDS_BRITISH"] = 247] = "VIRGIN_ISLANDS_BRITISH";
    Country[Country["VIRGIN_ISLANDS_US"] = 248] = "VIRGIN_ISLANDS_US";
    Country[Country["WALLIS_AND_FUTUNA"] = 249] = "WALLIS_AND_FUTUNA";
    Country[Country["WESTERN_SAHARA"] = 250] = "WESTERN_SAHARA";
    Country[Country["YEMEN"] = 251] = "YEMEN";
    Country[Country["YUGOSLAVIA"] = 252] = "YUGOSLAVIA";
    Country[Country["ZAMBIA"] = 253] = "ZAMBIA";
    Country[Country["ZIMBABWE"] = 254] = "ZIMBABWE";
    Country[Country["COUNT"] = 255] = "COUNT";
})(Country || (Country = {}));
var Region;
(function (Region) {
    Region[Region["NONE"] = 0] = "NONE";
    Region[Region["ALABAMA"] = 1] = "ALABAMA";
    Region[Region["ALASKA"] = 2] = "ALASKA";
    Region[Region["ALBERTA"] = 3] = "ALBERTA";
    Region[Region["ARIZONA"] = 4] = "ARIZONA";
    Region[Region["ARKANSAS"] = 5] = "ARKANSAS";
    Region[Region["AUSTRALIAN_CAPITAL_TERRITORY"] = 6] = "AUSTRALIAN_CAPITAL_TERRITORY";
    Region[Region["BRITISH_COLUMBIA"] = 7] = "BRITISH_COLUMBIA";
    Region[Region["CALIFORNIA"] = 8] = "CALIFORNIA";
    Region[Region["COLORADO"] = 9] = "COLORADO";
    Region[Region["CONNECTICUT"] = 10] = "CONNECTICUT";
    Region[Region["DELAWARE"] = 11] = "DELAWARE";
    Region[Region["DISTRICT_OF_COLUMBIA"] = 12] = "DISTRICT_OF_COLUMBIA";
    Region[Region["FLORIDA"] = 13] = "FLORIDA";
    Region[Region["GEORGIA"] = 14] = "GEORGIA";
    Region[Region["HAWAII"] = 15] = "HAWAII";
    Region[Region["IDAHO"] = 16] = "IDAHO";
    Region[Region["ILLINOIS"] = 17] = "ILLINOIS";
    Region[Region["INDIANA"] = 18] = "INDIANA";
    Region[Region["IOWA"] = 19] = "IOWA";
    Region[Region["KANSAS"] = 20] = "KANSAS";
    Region[Region["KENTUCKY"] = 21] = "KENTUCKY";
    Region[Region["LOUISIANA"] = 22] = "LOUISIANA";
    Region[Region["MAINE"] = 23] = "MAINE";
    Region[Region["MANITOBA"] = 24] = "MANITOBA";
    Region[Region["MARYLAND"] = 25] = "MARYLAND";
    Region[Region["MASSACHUSETTS"] = 26] = "MASSACHUSETTS";
    Region[Region["MICHIGAN"] = 27] = "MICHIGAN";
    Region[Region["MINNESOTA"] = 28] = "MINNESOTA";
    Region[Region["MISSISSIPPI"] = 29] = "MISSISSIPPI";
    Region[Region["MISSOURI"] = 30] = "MISSOURI";
    Region[Region["MONTANA"] = 31] = "MONTANA";
    Region[Region["NEBRASKA"] = 32] = "NEBRASKA";
    Region[Region["NEVADA"] = 33] = "NEVADA";
    Region[Region["NEW_BRUNSWICK"] = 34] = "NEW_BRUNSWICK";
    Region[Region["NEW_HAMPSHIRE"] = 35] = "NEW_HAMPSHIRE";
    Region[Region["NEW_JERSEY"] = 36] = "NEW_JERSEY";
    Region[Region["NEW_MEXICO"] = 37] = "NEW_MEXICO";
    Region[Region["NEW_SOUTH_WALES"] = 38] = "NEW_SOUTH_WALES";
    Region[Region["NEW_YORK"] = 39] = "NEW_YORK";
    Region[Region["NORTHERN_TERRITORY"] = 40] = "NORTHERN_TERRITORY";
    Region[Region["NORTH_CAROLINA"] = 41] = "NORTH_CAROLINA";
    Region[Region["NORTH_DAKOTA"] = 42] = "NORTH_DAKOTA";
    Region[Region["NOVA_SCOTIA"] = 43] = "NOVA_SCOTIA";
    Region[Region["OHIO"] = 44] = "OHIO";
    Region[Region["OKLAHOMA"] = 45] = "OKLAHOMA";
    Region[Region["ONTARIO"] = 46] = "ONTARIO";
    Region[Region["OREGON"] = 47] = "OREGON";
    Region[Region["PENNSYLVANIA"] = 48] = "PENNSYLVANIA";
    Region[Region["QUEBEC"] = 49] = "QUEBEC";
    Region[Region["QUEENSLAND"] = 50] = "QUEENSLAND";
    Region[Region["RHODE_ISLAND"] = 51] = "RHODE_ISLAND";
    Region[Region["SASKATCHEWAN"] = 52] = "SASKATCHEWAN";
    Region[Region["SOUTH_AUSTRALIA"] = 53] = "SOUTH_AUSTRALIA";
    Region[Region["SOUTH_CAROLINA"] = 54] = "SOUTH_CAROLINA";
    Region[Region["SOUTH_DAKOTA"] = 55] = "SOUTH_DAKOTA";
    Region[Region["TASMANIA"] = 56] = "TASMANIA";
    Region[Region["TENNESSEE"] = 57] = "TENNESSEE";
    Region[Region["TEXAS"] = 58] = "TEXAS";
    Region[Region["UTAH"] = 59] = "UTAH";
    Region[Region["VERMONT"] = 60] = "VERMONT";
    Region[Region["VICTORIA"] = 61] = "VICTORIA";
    Region[Region["VIRGINIA"] = 62] = "VIRGINIA";
    Region[Region["WASHINGTON"] = 63] = "WASHINGTON";
    Region[Region["WESTERN_AUSTRALIA"] = 64] = "WESTERN_AUSTRALIA";
    Region[Region["WEST_VIRGINIA"] = 65] = "WEST_VIRGINIA";
    Region[Region["WISCONSIN"] = 66] = "WISCONSIN";
    Region[Region["WYOMING"] = 67] = "WYOMING";
    Region[Region["YUKON"] = 68] = "YUKON";
    Region[Region["CIUDAD_DE_MEXICO"] = 69] = "CIUDAD_DE_MEXICO";
    Region[Region["JALISCO"] = 70] = "JALISCO";
    Region[Region["NEWFOUNDLAND_AND_LABRADOR"] = 71] = "NEWFOUNDLAND_AND_LABRADOR";
    Region[Region["NUEVO_LEON"] = 72] = "NUEVO_LEON";
    Region[Region["BAJA_CALIFORNIA"] = 73] = "BAJA_CALIFORNIA";
    Region[Region["CHIHUAHUA"] = 74] = "CHIHUAHUA";
    Region[Region["GUANAJUATO"] = 75] = "GUANAJUATO";
    Region[Region["GUERRERO"] = 76] = "GUERRERO";
    Region[Region["MEXICO"] = 77] = "MEXICO";
    Region[Region["MICHOACAN"] = 78] = "MICHOACAN";
    Region[Region["NEW_YORK_CITY"] = 79] = "NEW_YORK_CITY";
    Region[Region["TAMAULIPAS"] = 80] = "TAMAULIPAS";
    Region[Region["VERACRUZ"] = 81] = "VERACRUZ";
    Region[Region["CHIAPAS"] = 82] = "CHIAPAS";
    Region[Region["COAHUILA"] = 83] = "COAHUILA";
    Region[Region["DURANGO"] = 84] = "DURANGO";
    Region[Region["GUERRERO_COCULA"] = 85] = "GUERRERO_COCULA";
    Region[Region["GUERRERO_JUCHITAN"] = 86] = "GUERRERO_JUCHITAN";
    Region[Region["GUERRERO_TEPECOACUILCO"] = 87] = "GUERRERO_TEPECOACUILCO";
    Region[Region["GUERRERO_TLACOAPA"] = 88] = "GUERRERO_TLACOAPA";
    Region[Region["GUJARAT"] = 89] = "GUJARAT";
    Region[Region["HIDALGO"] = 90] = "HIDALGO";
    Region[Region["KARNATAKA"] = 91] = "KARNATAKA";
    Region[Region["KERALA"] = 92] = "KERALA";
    Region[Region["KHYBER_PAKHTUNKHWA"] = 93] = "KHYBER_PAKHTUNKHWA";
    Region[Region["MADHYA_PRADESH"] = 94] = "MADHYA_PRADESH";
    Region[Region["MAHARASHTRA"] = 95] = "MAHARASHTRA";
    Region[Region["MORELOS"] = 96] = "MORELOS";
    Region[Region["NAYARIT"] = 97] = "NAYARIT";
    Region[Region["OAXACA"] = 98] = "OAXACA";
    Region[Region["PUEBLA"] = 99] = "PUEBLA";
    Region[Region["PUNJAB"] = 100] = "PUNJAB";
    Region[Region["QUERETARO"] = 101] = "QUERETARO";
    Region[Region["SAN_LUIS_POTOSI"] = 102] = "SAN_LUIS_POTOSI";
    Region[Region["SINALOA"] = 103] = "SINALOA";
    Region[Region["SONORA"] = 104] = "SONORA";
    Region[Region["TABASCO"] = 105] = "TABASCO";
    Region[Region["TAMIL_NADU"] = 106] = "TAMIL_NADU";
    Region[Region["YUCATAN"] = 107] = "YUCATAN";
    Region[Region["ZACATECAS"] = 108] = "ZACATECAS";
    Region[Region["AGUASCALIENTES"] = 109] = "AGUASCALIENTES";
    Region[Region["BAJA_CALIFORNIA_SUR"] = 110] = "BAJA_CALIFORNIA_SUR";
    Region[Region["CAMPECHE"] = 111] = "CAMPECHE";
    Region[Region["COLIMA"] = 112] = "COLIMA";
    Region[Region["QUINTANA_ROO_BENITO_JUAREZ"] = 113] = "QUINTANA_ROO_BENITO_JUAREZ";
    Region[Region["UINTANA_ROO"] = 114] = "UINTANA_ROO";
    Region[Region["QUINTANA_ROO_SOLIDARIDAD"] = 115] = "QUINTANA_ROO_SOLIDARIDAD";
    Region[Region["TLAXCALA"] = 116] = "TLAXCALA";
    Region[Region["QUINTANA_ROO_COZUMEL"] = 117] = "QUINTANA_ROO_COZUMEL";
    Region[Region["SAO_PAOLO"] = 118] = "SAO_PAOLO";
    Region[Region["COUNT"] = 119] = "COUNT";
})(Region || (Region = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType[DocumentType["NONE"] = 0] = "NONE";
    DocumentType[DocumentType["CONSULAR_ID"] = 1] = "CONSULAR_ID";
    DocumentType[DocumentType["DL"] = 2] = "DL";
    DocumentType[DocumentType["DL_PUBLIC_SERVICES_CARD"] = 3] = "DL_PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["EMPLOYMENT_PASS"] = 4] = "EMPLOYMENT_PASS";
    DocumentType[DocumentType["FIN_CARD"] = 5] = "FIN_CARD";
    DocumentType[DocumentType["ID"] = 6] = "ID";
    DocumentType[DocumentType["MULTIPURPOSE_ID"] = 7] = "MULTIPURPOSE_ID";
    DocumentType[DocumentType["MyKad"] = 8] = "MyKad";
    DocumentType[DocumentType["MyKid"] = 9] = "MyKid";
    DocumentType[DocumentType["MyPR"] = 10] = "MyPR";
    DocumentType[DocumentType["MyTentera"] = 11] = "MyTentera";
    DocumentType[DocumentType["PAN_CARD"] = 12] = "PAN_CARD";
    DocumentType[DocumentType["PROFESSIONAL_ID"] = 13] = "PROFESSIONAL_ID";
    DocumentType[DocumentType["PUBLIC_SERVICES_CARD"] = 14] = "PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["RESIDENCE_PERMIT"] = 15] = "RESIDENCE_PERMIT";
    DocumentType[DocumentType["RESIDENT_ID"] = 16] = "RESIDENT_ID";
    DocumentType[DocumentType["TEMPORARY_RESIDENCE_PERMIT"] = 17] = "TEMPORARY_RESIDENCE_PERMIT";
    DocumentType[DocumentType["VOTER_ID"] = 18] = "VOTER_ID";
    DocumentType[DocumentType["WORK_PERMIT"] = 19] = "WORK_PERMIT";
    DocumentType[DocumentType["iKAD"] = 20] = "iKAD";
    DocumentType[DocumentType["MILITARY_ID"] = 21] = "MILITARY_ID";
    DocumentType[DocumentType["MyKAS"] = 22] = "MyKAS";
    DocumentType[DocumentType["SOCIAL_SECURITY_CARD"] = 23] = "SOCIAL_SECURITY_CARD";
    DocumentType[DocumentType["HEALTH_INSURANCE_CARD"] = 24] = "HEALTH_INSURANCE_CARD";
    DocumentType[DocumentType["PASSPORT"] = 25] = "PASSPORT";
    DocumentType[DocumentType["S_PASS"] = 26] = "S_PASS";
    DocumentType[DocumentType["ADDRESS_CARD"] = 27] = "ADDRESS_CARD";
    DocumentType[DocumentType["ALIEN_ID"] = 28] = "ALIEN_ID";
    DocumentType[DocumentType["ALIEN_PASSPORT"] = 29] = "ALIEN_PASSPORT";
    DocumentType[DocumentType["GREEN_CARD"] = 30] = "GREEN_CARD";
    DocumentType[DocumentType["MINORS_ID"] = 31] = "MINORS_ID";
    DocumentType[DocumentType["POSTAL_ID"] = 32] = "POSTAL_ID";
    DocumentType[DocumentType["PROFESSIONAL_DL"] = 33] = "PROFESSIONAL_DL";
    DocumentType[DocumentType["TAX_ID"] = 34] = "TAX_ID";
    DocumentType[DocumentType["WEAPON_PERMIT"] = 35] = "WEAPON_PERMIT";
    DocumentType[DocumentType["VISA"] = 36] = "VISA";
    DocumentType[DocumentType["BORDER_CROSSING_CARD"] = 37] = "BORDER_CROSSING_CARD";
    DocumentType[DocumentType["DRIVER_CARD"] = 38] = "DRIVER_CARD";
    DocumentType[DocumentType["GLOBAL_ENTRY_CARD"] = 39] = "GLOBAL_ENTRY_CARD";
    DocumentType[DocumentType["MyPolis"] = 40] = "MyPolis";
    DocumentType[DocumentType["NEXUS_CARD"] = 41] = "NEXUS_CARD";
    DocumentType[DocumentType["PASSPORT_CARD"] = 42] = "PASSPORT_CARD";
    DocumentType[DocumentType["PROOF_OF_AGE_CARD"] = 43] = "PROOF_OF_AGE_CARD";
    DocumentType[DocumentType["REFUGEE_ID"] = 44] = "REFUGEE_ID";
    DocumentType[DocumentType["TRIBAL_ID"] = 45] = "TRIBAL_ID";
    DocumentType[DocumentType["VETERAN_ID"] = 46] = "VETERAN_ID";
    DocumentType[DocumentType["CITIZENSHIP_CERTIFICATE"] = 47] = "CITIZENSHIP_CERTIFICATE";
    DocumentType[DocumentType["MY_NUMBER_CARD"] = 48] = "MY_NUMBER_CARD";
    DocumentType[DocumentType["CONSULAR_PASSPORT"] = 49] = "CONSULAR_PASSPORT";
    DocumentType[DocumentType["MINORS_PASSPORT"] = 50] = "MINORS_PASSPORT";
    DocumentType[DocumentType["MINORS_PUBLIC_SERVICES_CARD"] = 51] = "MINORS_PUBLIC_SERVICES_CARD";
    DocumentType[DocumentType["COUNT"] = 52] = "COUNT";
})(DocumentType || (DocumentType = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * DocumentImageColorStatus enum defines possible color statuses determined from scanned image.
 */
var DocumentImageColorStatus;
(function (DocumentImageColorStatus) {
    /** Determining image color status was not performed */
    DocumentImageColorStatus[DocumentImageColorStatus["NotAvailable"] = 0] = "NotAvailable";
    /** Black-and-white image scanned */
    DocumentImageColorStatus[DocumentImageColorStatus["BlackAndWhite"] = 1] = "BlackAndWhite";
    /** Color image scanned */
    DocumentImageColorStatus[DocumentImageColorStatus["Color"] = 2] = "Color";
})(DocumentImageColorStatus || (DocumentImageColorStatus = {}));
/**
 *  ImageAnalysisDetectionStatus enum defines possible states of specific image object detection.
 */
var ImageAnalysisDetectionStatus;
(function (ImageAnalysisDetectionStatus) {
    /** Detection was not performed */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["NotAvailable"] = 0] = "NotAvailable";
    /** Object not detected on input image */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["NotDetected"] = 1] = "NotDetected";
    /** Object detected on input image */
    ImageAnalysisDetectionStatus[ImageAnalysisDetectionStatus["Detected"] = 2] = "Detected";
})(ImageAnalysisDetectionStatus || (ImageAnalysisDetectionStatus = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/** Detailed information about the recognition process. */
var ProcessingStatus;
(function (ProcessingStatus) {
    /** Recognition was successful. */
    ProcessingStatus[ProcessingStatus["Success"] = 0] = "Success";
    /** Detection of the document failed. */
    ProcessingStatus[ProcessingStatus["DetectionFailed"] = 1] = "DetectionFailed";
    /** Preprocessing of the input image has failed. */
    ProcessingStatus[ProcessingStatus["ImagePreprocessingFailed"] = 2] = "ImagePreprocessingFailed";
    /** Recognizer has inconsistent results. */
    ProcessingStatus[ProcessingStatus["StabilityTestFailed"] = 3] = "StabilityTestFailed";
    /** Wrong side of the document has been scanned. */
    ProcessingStatus[ProcessingStatus["ScanningWrongSide"] = 4] = "ScanningWrongSide";
    /** Identification of the fields present on the document has failed. */
    ProcessingStatus[ProcessingStatus["FieldIdentificationFailed"] = 5] = "FieldIdentificationFailed";
    /** Mandatory field for the specific document is missing. */
    ProcessingStatus[ProcessingStatus["MandatoryFieldMissing"] = 6] = "MandatoryFieldMissing";
    /** Result contains invalid characters in some of the fields. */
    ProcessingStatus[ProcessingStatus["InvalidCharactersFound"] = 7] = "InvalidCharactersFound";
    /** Failed to return a requested image. */
    ProcessingStatus[ProcessingStatus["ImageReturnFailed"] = 8] = "ImageReturnFailed";
    /** Reading or parsing of the barcode has failed. */
    ProcessingStatus[ProcessingStatus["BarcodeRecognitionFailed"] = 9] = "BarcodeRecognitionFailed";
    /** Parsing of the MRZ has failed. */
    ProcessingStatus[ProcessingStatus["MrzParsingFailed"] = 10] = "MrzParsingFailed";
    /** Document class has been filtered out. */
    ProcessingStatus[ProcessingStatus["ClassFiltered"] = 11] = "ClassFiltered";
    /** Document currently not supported by the recognizer. */
    ProcessingStatus[ProcessingStatus["UnsupportedClass"] = 12] = "UnsupportedClass";
    /** License for the detected document is missing. */
    ProcessingStatus[ProcessingStatus["UnsupportedByLicense"] = 13] = "UnsupportedByLicense";
    /**
     * Front side recognition has completed successfully, and recognizer is waiting for the other
     * side to be scanned.
     */
    ProcessingStatus[ProcessingStatus["AwaitingOtherSide"] = 14] = "AwaitingOtherSide";
    /** Number of possible processing statuses. */
    ProcessingStatus[ProcessingStatus["Count"] = 15] = "Count";
})(ProcessingStatus || (ProcessingStatus = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * RecognitionMode enum defines possible recognition modes by BlinkID(Combined)Recognizer.
 */
var RecognitionMode;
(function (RecognitionMode) {
    /** No recognition performed. */
    RecognitionMode[RecognitionMode["None"] = 0] = "None";
    /** Recognition of mrz document (does not include visa and passport) */
    RecognitionMode[RecognitionMode["MrzId"] = 1] = "MrzId";
    /** Recognition of visa mrz. */
    RecognitionMode[RecognitionMode["MrzVisa"] = 2] = "MrzVisa";
    /** Recognition of passport mrz. */
    RecognitionMode[RecognitionMode["MrzPassport"] = 3] = "MrzPassport";
    /** Recognition of documents that have face photo on the front. */
    RecognitionMode[RecognitionMode["PhotoId"] = 4] = "PhotoId";
    /** Detailed document recognition. */
    RecognitionMode[RecognitionMode["FullRecognition"] = 5] = "FullRecognition";
    /** Recognition of barcode document. */
    RecognitionMode[RecognitionMode["BarcodeId"] = 6] = "BarcodeId";
    /** Number of possible values */
    RecognitionMode[RecognitionMode["Count"] = 7] = "Count";
})(RecognitionMode || (RecognitionMode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the BlinkIdRecognizer.
 */
class BlinkIdRecognizerSettings {
    constructor() {
        /**
         * Defines whether blured frames filtering is allowed.
         */
        this.allowBlurFilter = true;
        /**
         * Defines whether returning of unparsed MRZ (Machine Readable Zone) results is allowed.
         */
        this.allowUnparsedMrzResults = false;
        /**
         * Defines whether returning unverified MRZ (Machine Readable Zone) results is allowed.
         * Unverified MRZ is parsed, but check digits are incorrect.
         */
        this.allowUnverifiedMrzResults = true;
        /**
         * Enable or disable recognition of specific document groups supported by the current license.
         * By default all modes are enabled.
         */
        this.recognitionModeFilter = new RecognitionModeFilter();
        /**
         * Enable or disable the saving of camera frames from which data is extracted.
         */
        this.saveCameraFrames = false;
        /**
         * Configure the recognizer to only work on already cropped and dewarped images.
         * This only works for still images - video feeds will ignore this setting.
         */
        this.scanCroppedDocumentImage = false;
        /**
         * Whether result characters validatation is performed.
         * If a result member contains invalid character, the result state cannot be valid.
         */
        this.validateResultCharacters = true;
        /**
         * Whether sensitive data should be removed from images, result fields or both.
         * The setting only applies to certain documents.
         */
        this.anonymizationMode = AnonymizationMode.FullResult;
        /**
         * Called when barcode scanning step starts.
         */
        this.barcodeScanningStartedCallback = null;
        /**
         * Called when recognizer classifies a document.
         */
        this.classifierCallback = null;
        /**
         * If set to `null`, all supported documents will be recognized.
         * Otherwise, only classes from given array will be recognized and all other
         * documents will be treated as "not supported" (observable via classifierCallback).
         */
        this.allowedDocumentClasses = null;
        /**
         * Padding is a minimum distance from the edge of the frame and it is defined
         * as a percentage of the frame width. Recommended value is '0.02'.
         * By default, this is set to '0.0' which means that padding edge and image edge are the same.
         */
        this.paddingEdge = 0.0;
        // implementation of the FullDocumentImageOptions interface
        this.returnFullDocumentImage = false;
        this.returnEncodedFullDocumentImage = false;
        this._fullDocumentImageDpi = 250;
        this.fullDocumentImageExtensionFactors = new ExtensionFactors();
        // implementation of the FaceImageOptions interface
        this.returnFaceImage = false;
        this.returnEncodedFaceImage = false;
        this._faceImageDpi = 250;
        // implementation of the SignatureImageOptions interface
        this.returnSignatureImage = false;
        this.returnEncodedSignatureImage = false;
        this._signatureImageDpi = 250;
    }
    get fullDocumentImageDpi() { return this._fullDocumentImageDpi; }
    set fullDocumentImageDpi(value) {
        validateDpi(value);
        this._fullDocumentImageDpi = value;
    }
    get faceImageDpi() { return this._faceImageDpi; }
    set faceImageDpi(value) {
        validateDpi(value);
        this._faceImageDpi = value;
    }
    get signatureImageDpi() { return this._signatureImageDpi; }
    set signatureImageDpi(value) {
        validateDpi(value);
        this._signatureImageDpi = value;
    }
}
/**
 * This function is used to create a new instance of `BlinkIdRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
function createBlinkIdRecognizer(wasmSDK) {
    return __awaiter(this, void 0, void 0, function* () {
        return wasmSDK.mbWasmModule.newRecognizer("BlinkIdRecognizer");
    });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the BlinkIdCombinedRecognizer.
 */
class BlinkIdCombinedRecognizerSettings extends BlinkIdRecognizerSettings {
    constructor() {
        super(...arguments);
        /**
         * Proceed with scanning the back side even if the front side result is uncertain.
         * This only works for still images - video feeds will ignore this setting.
         */
        this.allowUncertainFrontSideScan = false;
        /**
         * Configure the number of characters per field that are allowed to be inconsistent in data match.
         */
        this.maxAllowedMismatchesPerField = 0;
        /**
         * Skip the scan of the back side for documents where back side scanning is not supported.
         */
        this.skipUnsupportedBack = false;
    }
}
/**
 * This function is used to create a new instance of `BlinkIdCombinedRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
function createBlinkIdCombinedRecognizer(wasmSDK) {
    return __awaiter(this, void 0, void 0, function* () {
        return wasmSDK.mbWasmModule.newRecognizer("BlinkIdCombinedRecognizer");
    });
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * A settings object that is used for configuring the IdBarcodeRecognizer.
 */
class IdBarcodeRecognizerSettings {
}
/**
 * This function is used to create a new instance of `IdBarcodeRecognizer`.
 * @param wasmSDK Instance of WasmSDK which will be used to communicate with the WebAssembly module.
 */
function createIdBarcodeRecognizer(wasmSDK) {
    return __awaiter(this, void 0, void 0, function* () {
        return wasmSDK.mbWasmModule.newRecognizer("IdBarcodeRecognizer");
    });
}
/**
 * Represents the type of scanned document
 */
var IdBarcodeDocumentType;
(function (IdBarcodeDocumentType) {
    /**
     * No document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["None"] = 0] = "None";
    /**
     * AAMVACompliant document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["AAMVACompliant"] = 1] = "AAMVACompliant";
    /**
     * ArgentinaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaID"] = 2] = "ArgentinaID";
    /**
     * ArgentinaAlienID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaAlienID"] = 3] = "ArgentinaAlienID";
    /**
     * ArgentinaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ArgentinaDL"] = 4] = "ArgentinaDL";
    /**
     * ColombiaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ColombiaID"] = 5] = "ColombiaID";
    /**
     * ColombiaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["ColombiaDL"] = 6] = "ColombiaDL";
    /**
     * NigeriaVoterID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["NigeriaVoterID"] = 7] = "NigeriaVoterID";
    /**
     * NigeriaDL document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["NigeriaDL"] = 8] = "NigeriaDL";
    /**
     * PanamaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["PanamaID"] = 9] = "PanamaID";
    /**
     * SouthAfricaID document was scanned
     */
    IdBarcodeDocumentType[IdBarcodeDocumentType["SouthAfricaID"] = 10] = "SouthAfricaID";
})(IdBarcodeDocumentType || (IdBarcodeDocumentType = {}));

const BlinkIDSDK = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get AnonymizationMode () { return AnonymizationMode; },
  get BarcodeElementKey () { return BarcodeElementKey; },
  get BarcodeFormat () { return BarcodeFormat; },
  BlinkIdCombinedRecognizerSettings: BlinkIdCombinedRecognizerSettings,
  BlinkIdRecognizerSettings: BlinkIdRecognizerSettings,
  CapturedFrame: CapturedFrame,
  get Country () { return Country; },
  get DetectionStatus () { return DetectionStatus; },
  get DocumentImageColorStatus () { return DocumentImageColorStatus; },
  get DocumentType () { return DocumentType; },
  get ErrorCodes () { return ErrorCodes$1; },
  get ErrorMessages () { return ErrorMessages$1; },
  ExtensionFactors: ExtensionFactors,
  get IdBarcodeDocumentType () { return IdBarcodeDocumentType; },
  IdBarcodeRecognizerSettings: IdBarcodeRecognizerSettings,
  get ImageAnalysisDetectionStatus () { return ImageAnalysisDetectionStatus; },
  get ImageOrientation () { return ImageOrientation; },
  get LicenseErrorType () { return LicenseErrorType; },
  get LicenseTokenState () { return LicenseTokenState; },
  get NotSupportedReason () { return NotSupportedReason; },
  get PreferredCameraType () { return PreferredCameraType; },
  get ProcessingStatus () { return ProcessingStatus; },
  get RecognitionMode () { return RecognitionMode; },
  RecognitionModeFilter: RecognitionModeFilter,
  get RecognizerResultState () { return RecognizerResultState; },
  get Region () { return Region; },
  SDKError: SDKError,
  SelectedCamera: SelectedCamera,
  get ServerPermissionSubmitResultStatus () { return ServerPermissionSubmitResultStatus; },
  get VideoRecognitionMode () { return VideoRecognitionMode; },
  VideoRecognizer: VideoRecognizer,
  WasmSDKLoadSettings: WasmSDKLoadSettings,
  get WasmType () { return WasmType; },
  bindCameraToVideoFeed: bindCameraToVideoFeed,
  captureFrame: captureFrame,
  clearVideoFeed: clearVideoFeed,
  createBlinkIdCombinedRecognizer: createBlinkIdCombinedRecognizer,
  createBlinkIdRecognizer: createBlinkIdRecognizer,
  createIdBarcodeRecognizer: createIdBarcodeRecognizer,
  createRecognizerRunner: createRecognizerRunner,
  createSuccessFrameGrabberRecognizer: createSuccessFrameGrabberRecognizer,
  detectWasmType: detectWasmType,
  frameCaptureErrors: frameCaptureErrors,
  getCameraDevices: getCameraDevices$1,
  isBrowserSupported: isBrowserSupported,
  isInAppBrowser: isInAppBrowser,
  licenseErrors: licenseErrors,
  loadWasmModule: loadWasmModule,
  localSdkErrors: localSdkErrors,
  obtainNewServerPermission: obtainNewServerPermission,
  sdkErrors: sdkErrors,
  selectCamera: selectCamera,
  unlockWasmSDK: unlockWasmSDK,
  validateDpi: validateDpi,
  videoRecognizerErrors: videoRecognizerErrors,
  wasmFolder: wasmFolder,
  workerErrors: workerErrors
});

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/**
 * Events
 */
class EventReady {
  constructor(sdk) {
    this.sdk = sdk;
  }
}
/**
 * Error codes
 */
var Code;
(function (Code) {
  Code["EmptyResult"] = "EMPTY_RESULT";
  Code["InvalidRecognizerOptions"] = "INVALID_RECOGNIZER_OPTIONS";
  Code["NoImageFileFound"] = "NO_IMAGE_FILE_FOUND";
  Code["NoFirstImageFileFound"] = "NO_FIRST_IMAGE_FILE_FOUND";
  Code["NoSecondImageFileFound"] = "NO_SECOND_IMAGE_FILE_FOUND";
  Code["GenericScanError"] = "GENERIC_SCAN_ERROR";
  Code["CameraNotAllowed"] = "CAMERA_NOT_ALLOWED";
  Code["CameraInUse"] = "CAMERA_IN_USE";
  Code["CameraGenericError"] = "CAMERA_GENERIC_ERROR";
})(Code || (Code = {}));
/**
 * Scan structures
 */
const AvailableRecognizers = {
  IdBarcodeRecognizer: 'createIdBarcodeRecognizer',
  BlinkIdRecognizer: 'createBlinkIdRecognizer',
  BlinkIdCombinedRecognizer: 'createBlinkIdCombinedRecognizer',
};
var ImageRecognitionType;
(function (ImageRecognitionType) {
  ImageRecognitionType["Single"] = "Single";
  ImageRecognitionType["Combined"] = "Combined";
})(ImageRecognitionType || (ImageRecognitionType = {}));
var CombinedImageType;
(function (CombinedImageType) {
  CombinedImageType["First"] = "First";
  CombinedImageType["Second"] = "Second";
})(CombinedImageType || (CombinedImageType = {}));
var RecognitionStatus;
(function (RecognitionStatus) {
  RecognitionStatus["NoImageFileFound"] = "NoImageFileFound";
  RecognitionStatus["NoFirstImageFileFound"] = "NoFirstImageFileFound";
  RecognitionStatus["NoSecondImageFileFound"] = "NoSecondImageFileFound";
  RecognitionStatus["Preparing"] = "Preparing";
  RecognitionStatus["Ready"] = "Ready";
  RecognitionStatus["Processing"] = "Processing";
  RecognitionStatus["DetectionFailed"] = "DetectionFailed";
  RecognitionStatus["EmptyResultState"] = "EmptyResultState";
  RecognitionStatus["OnFirstSideResult"] = "OnFirstSideResult";
  RecognitionStatus["ScanSuccessful"] = "ScanSuccessful";
  RecognitionStatus["DocumentClassified"] = "DocumentClassified";
  // Camera states
  RecognitionStatus["DetectionStatusChange"] = "DetectionStatusChange";
  RecognitionStatus["NoSupportForMediaDevices"] = "NoSupportForMediaDevices";
  RecognitionStatus["CameraNotFound"] = "CameraNotFound";
  RecognitionStatus["CameraNotAllowed"] = "CameraNotAllowed";
  RecognitionStatus["UnableToAccessCamera"] = "UnableToAccessCamera";
  RecognitionStatus["CameraInUse"] = "CameraInUse";
  RecognitionStatus["CameraGenericError"] = "CameraGenericError";
  // Errors
  RecognitionStatus["UnknownError"] = "UnknownError";
  RecognitionStatus["BarcodeScanningStarted"] = "BarcodeScanningStarted";
  // BlinkIDSDK.DetectionStatus
  RecognitionStatus["DetectionStatusFail"] = "Fail";
  RecognitionStatus["DetectionStatusSuccess"] = "Success";
  RecognitionStatus["DetectionStatusCameraTooHigh"] = "CameraTooHigh";
  RecognitionStatus["DetectionStatusFallbackSuccess"] = "FallbackSuccess";
  RecognitionStatus["DetectionStatusPartial"] = "Partial";
  RecognitionStatus["DetectionStatusCameraAtAngle"] = "CameraAtAngle";
  RecognitionStatus["DetectionStatusCameraTooNear"] = "CameraTooNear";
  RecognitionStatus["DetectionStatusDocumentTooCloseToEdge"] = "DocumentTooCloseToEdge";
})(RecognitionStatus || (RecognitionStatus = {}));
var CameraExperience;
(function (CameraExperience) {
  CameraExperience["Barcode"] = "BARCODE";
  CameraExperience["CardCombined"] = "CARD_COMBINED";
  CameraExperience["CardSingleSide"] = "CARD_SINGLE_SIDE";
  CameraExperience["PaymentCard"] = "PAYMENT_CARD";
})(CameraExperience || (CameraExperience = {}));
var CameraExperienceState;
(function (CameraExperienceState) {
  CameraExperienceState["BarcodeScanning"] = "BarcodeScanning";
  CameraExperienceState["AdjustAngle"] = "AdjustAngle";
  CameraExperienceState["Classification"] = "Classification";
  CameraExperienceState["Default"] = "Default";
  CameraExperienceState["Detection"] = "Detection";
  CameraExperienceState["Done"] = "Done";
  CameraExperienceState["DoneAll"] = "DoneAll";
  CameraExperienceState["Flip"] = "Flip";
  CameraExperienceState["MoveCloser"] = "MoveCloser";
  CameraExperienceState["MoveFarther"] = "MoveFarther";
})(CameraExperienceState || (CameraExperienceState = {}));
const CameraExperienceStateDuration = new Map([
  [CameraExperienceState.BarcodeScanning, 3500],
  [CameraExperienceState.AdjustAngle, 2500],
  [CameraExperienceState.Default, 500],
  [CameraExperienceState.Done, 300],
  [CameraExperienceState.DoneAll, 400],
  [CameraExperienceState.Flip, 3500],
  [CameraExperienceState.MoveCloser, 2500],
  [CameraExperienceState.MoveFarther, 2500]
]);
/**
 * User feedback structures
 */
var FeedbackCode;
(function (FeedbackCode) {
  FeedbackCode["CameraDisabled"] = "CAMERA_DISABLED";
  FeedbackCode["CameraGenericError"] = "CAMERA_GENERIC_ERROR";
  FeedbackCode["CameraInUse"] = "CAMERA_IN_USE";
  FeedbackCode["CameraNotAllowed"] = "CAMERA_NOT_ALLOWED";
  FeedbackCode["GenericScanError"] = "GENERIC_SCAN_ERROR";
  FeedbackCode["ScanStarted"] = "SCAN_STARTED";
  FeedbackCode["ScanUnsuccessful"] = "SCAN_UNSUCCESSFUL";
  FeedbackCode["ScanSuccessful"] = "SCAN_SUCCESSFUL";
})(FeedbackCode || (FeedbackCode = {}));

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
/* eslint-disable max-len */
/**
 * Structures of Error Codes, Error Messages, and CustomError compatible objects for the Error Generator utility.
 * Error Code convention: SECTION_OBJECT_(ACTION)_PROBLEM
 */
var ErrorCodes;
(function (ErrorCodes) {
  ErrorCodes["BrowserNotSupported"] = "BROWSER_NOT_SUPPORTED";
  ErrorCodes["LicenseError"] = "LICENSE_ERROR";
  ErrorCodes["SdkLoadFailed"] = "SDK_LOAD_FAILED";
  ErrorCodes["InternetNotAvailable"] = "INTERNET_NOT_AVAILABLE";
  ErrorCodes["InvalidRecognizers"] = "INVALID_RECOGNIZERS";
})(ErrorCodes || (ErrorCodes = {}));
var ErrorMessages;
(function (ErrorMessages) {
  ErrorMessages["BrowserNotSupported"] = "Browser is not supported!";
  ErrorMessages["LicenseError"] = "Something is wrong with the license.";
  ErrorMessages["SdkLoadFailed"] = "Failed to load SDK!";
})(ErrorMessages || (ErrorMessages = {}));
const componentErrors = {
  browserNotSupported: {
    code: ErrorCodes.BrowserNotSupported,
    message: ErrorMessages.BrowserNotSupported,
  },
  licenseError: {
    code: ErrorCodes.LicenseError,
    message: ErrorMessages.LicenseError,
  },
  sdkLoadFailed: {
    code: ErrorCodes.SdkLoadFailed,
    message: ErrorMessages.SdkLoadFailed,
  }
};

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const _IS_IMAGE_CAPTURE = false;
async function getCameraDevices() {
  const devices = await getCameraDevices$1();
  const allDevices = devices.frontCameras.concat(devices.backCameras);
  const finalEntries = allDevices.map((el) => {
    return {
      prettyName: el.label,
      details: el
    };
  });
  return finalEntries;
}
class SdkService {
  constructor() {
    this.cancelInitiatedFromOutside = false;
    this.showOverlay = false;
    this.eventEmitter$ = document.createElement('a');
  }
  delete() {
    var _a;
    (_a = this.sdk) === null || _a === void 0 ? void 0 : _a.delete();
  }
  initialize(licenseKey, sdkSettings) {
    const loadSettings = new WasmSDKLoadSettings(licenseKey);
    loadSettings.allowHelloMessage = sdkSettings.allowHelloMessage;
    loadSettings.engineLocation = sdkSettings.engineLocation;
    loadSettings.workerLocation = sdkSettings.workerLocation;
    if (sdkSettings.wasmType) {
      loadSettings.wasmType = sdkSettings.wasmType;
    }
    return new Promise((resolve) => {
      loadWasmModule(loadSettings)
        .then((sdk) => {
        this.sdk = sdk;
        this.showOverlay = sdk.showOverlay;
        resolve(new EventReady(this.sdk));
      })
        .catch(error => {
        resolve(new SDKError(componentErrors.sdkLoadFailed, error));
      });
    });
  }
  checkRecognizers(recognizers) {
    if (!recognizers || !recognizers.length) {
      return {
        status: false,
        message: 'There are no provided recognizers!'
      };
    }
    for (const recognizer of recognizers) {
      if (!this.isRecognizerAvailable(recognizer)) {
        return {
          status: false,
          message: `Recognizer "${recognizer}" doesn't exist!`
        };
      }
      if (recognizer === 'BlinkIdCombinedRecognizer' && recognizers.length > 1) {
        return {
          status: false,
          message: 'Recognizer "BlinkIdCombinedRecognizer" cannot be used in combination with other recognizers!'
        };
      }
    }
    return {
      status: true
    };
  }
  getDesiredCameraExperience(_recognizers = [], _recognizerOptions = {}) {
    if (_recognizers.indexOf('BlinkIdCombinedRecognizer') > -1) {
      return CameraExperience.CardCombined;
    }
    if (_recognizers.indexOf('BlinkIdRecognizer') > -1) {
      return CameraExperience.CardSingleSide;
    }
    return CameraExperience.Barcode;
  }
  async scanFromCamera(configuration, eventCallback) {
    var _a, _b;
    eventCallback({ status: RecognitionStatus.Preparing });
    this.cancelInitiatedFromOutside = false;
    // Prepare terminate mechanism before recognizer and runner instances are created
    this.eventEmitter$.addEventListener('terminate', async () => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      (_b = (_a = this.videoRecognizer) === null || _a === void 0 ? void 0 : _a.cancelRecognition) === null || _b === void 0 ? void 0 : _b.call(_a);
      window.setTimeout(() => { var _a, _b; return (_b = (_a = this.videoRecognizer) === null || _a === void 0 ? void 0 : _a.releaseVideoFeed) === null || _b === void 0 ? void 0 : _b.call(_a); }, 1);
      if (recognizerRunner) {
        try {
          await recognizerRunner.delete();
        }
        catch (error) {
          // Psst, this error should not happen.
        }
      }
      for (const recognizer of recognizers) {
        if (!recognizer) {
          continue;
        }
        if (((_c = recognizer.recognizer) === null || _c === void 0 ? void 0 : _c.objectHandle) > -1) {
          (_e = (_d = recognizer.recognizer).delete) === null || _e === void 0 ? void 0 : _e.call(_d);
        }
        if (((_f = recognizer.successFrame) === null || _f === void 0 ? void 0 : _f.objectHandle) > -1) {
          (_h = (_g = recognizer.successFrame).delete) === null || _h === void 0 ? void 0 : _h.call(_g);
        }
      }
    });
    // Prepare recognizers and runner
    const recognizers = await this.createRecognizers(configuration.recognizers, configuration.recognizerOptions, configuration.successFrame);
    const recognizerRunner = await this.createRecognizerRunner(recognizers, eventCallback);
    try {
      this.videoRecognizer = await VideoRecognizer.createVideoRecognizerFromCameraStream(configuration.cameraFeed, recognizerRunner, configuration.cameraId);
      eventCallback({ status: RecognitionStatus.Ready });
      await this.videoRecognizer.setVideoRecognitionMode(VideoRecognitionMode.Recognition);
      this.videoRecognizer.startRecognition(async (recognitionState) => {
        var _a;
        this.videoRecognizer.pauseRecognition();
        eventCallback({ status: RecognitionStatus.Processing });
        if (recognitionState !== RecognizerResultState.Empty) {
          for (const recognizer of recognizers) {
            const results = await recognizer.recognizer.getResult();
            this.recognizerName = recognizer.recognizer.recognizerName;
            if (!results || results.state === RecognizerResultState.Empty) {
              eventCallback({
                status: RecognitionStatus.EmptyResultState,
                data: {
                  initiatedByUser: this.cancelInitiatedFromOutside,
                  recognizerName: this.recognizerName
                }
              });
            }
            else {
              const recognitionResults = {
                recognizer: results,
                recognizerName: this.recognizerName
              };
              if (recognizer.successFrame) {
                const successFrameResults = await recognizer.successFrame.getResult();
                if (successFrameResults && successFrameResults.state !== RecognizerResultState.Empty) {
                  recognitionResults.successFrame = successFrameResults;
                }
              }
              recognitionResults.imageCapture = _IS_IMAGE_CAPTURE;
              if ((_a = configuration.recognizerOptions) === null || _a === void 0 ? void 0 : _a.returnSignedJSON) {
                recognitionResults.resultSignedJSON = await recognizer.recognizer.toSignedJSON();
              }
              const scanData = {
                result: recognitionResults,
                initiatedByUser: this.cancelInitiatedFromOutside,
                imageCapture: _IS_IMAGE_CAPTURE
              };
              eventCallback({
                status: RecognitionStatus.ScanSuccessful,
                data: scanData
              });
              break;
            }
          }
        }
        else {
          eventCallback({
            status: RecognitionStatus.EmptyResultState,
            data: {
              initiatedByUser: this.cancelInitiatedFromOutside,
              recognizerName: ''
            }
          });
        }
        window.setTimeout(() => void this.cancelRecognition(), 400);
      }, configuration.recognitionTimeout)
        .then(() => { })
        .catch((error) => { throw error; });
    }
    catch (error) {
      if (error && ((_a = error.details) === null || _a === void 0 ? void 0 : _a.reason)) {
        const reason = (_b = error.details) === null || _b === void 0 ? void 0 : _b.reason;
        switch (reason) {
          case NotSupportedReason.MediaDevicesNotSupported:
            eventCallback({ status: RecognitionStatus.NoSupportForMediaDevices });
            break;
          case NotSupportedReason.CameraNotFound:
            eventCallback({ status: RecognitionStatus.CameraNotFound });
            break;
          case NotSupportedReason.CameraNotAllowed:
            eventCallback({ status: RecognitionStatus.CameraNotAllowed });
            break;
          case NotSupportedReason.CameraInUse:
            eventCallback({ status: RecognitionStatus.CameraInUse });
            break;
          default:
            eventCallback({ status: RecognitionStatus.UnableToAccessCamera });
        }
        console.warn('VideoRecognizerError', error.name, '[' + reason + ']:', error.message);
      }
      else {
        eventCallback({ status: RecognitionStatus.UnknownError });
      }
      void this.cancelRecognition();
    }
  }
  async flipCamera() {
    await this.videoRecognizer.flipCamera();
  }
  isCameraFlipped() {
    if (!this.videoRecognizer) {
      return false;
    }
    return this.videoRecognizer.isCameraFlipped();
  }
  isScanFromImageAvailable(_recognizers = [], _recognizerOptions = {}) {
    if (_recognizers.indexOf('BlinkIdCombinedRecognizer') > -1) {
      return false;
    }
    return true;
  }
  getScanFromImageType(_recognizers = [], _recognizerOptions = {}) {
    if (_recognizers.indexOf('BlinkIdCombinedRecognizer') > -1) {
      return ImageRecognitionType.Combined;
    }
    return ImageRecognitionType.Single;
  }
  async scanFromImage(configuration, eventCallback) {
    var _a;
    eventCallback({ status: RecognitionStatus.Preparing });
    const recognizers = await this.createRecognizers(configuration.recognizers, configuration.recognizerOptions);
    const recognizerRunner = await this.createRecognizerRunner(recognizers, eventCallback);
    const handleTerminate = async () => {
      var _a, _b, _c;
      this.eventEmitter$.removeEventListener('terminate', handleTerminate);
      if (recognizerRunner) {
        try {
          await recognizerRunner.delete();
        }
        catch (error) {
          // Psst, this error should not happen.
        }
      }
      for (const recognizer of recognizers) {
        if (!recognizer) {
          continue;
        }
        if (((_a = recognizer.recognizer) === null || _a === void 0 ? void 0 : _a.objectHandle) > -1) {
          (_c = (_b = recognizer.recognizer).delete) === null || _c === void 0 ? void 0 : _c.call(_b);
        }
      }
      this.eventEmitter$.dispatchEvent(new Event('terminate:done'));
    };
    this.eventEmitter$.addEventListener('terminate', handleTerminate);
    // Get image file
    if (!configuration.file || !RegExp(/^image\//).exec(configuration.file.type)) {
      eventCallback({ status: RecognitionStatus.NoImageFileFound });
      window.setTimeout(() => void this.cancelRecognition(), 500);
      return;
    }
    const file = configuration.file;
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(file);
    await imageElement.decode();
    const imageFrame = captureFrame(imageElement);
    // Get results
    eventCallback({ status: RecognitionStatus.Processing });
    const processResult = await recognizerRunner.processImage(imageFrame);
    if (processResult !== RecognizerResultState.Empty) {
      for (const recognizer of recognizers) {
        const results = await recognizer.recognizer.getResult();
        if (!results || results.state === RecognizerResultState.Empty) {
          eventCallback({
            status: RecognitionStatus.EmptyResultState,
            data: {
              initiatedByUser: this.cancelInitiatedFromOutside,
              recognizerName: recognizer.name
            }
          });
        }
        else {
          const recognitionResults = {
            recognizer: results,
            imageCapture: _IS_IMAGE_CAPTURE,
            recognizerName: recognizer.name
          };
          if ((_a = configuration.recognizerOptions) === null || _a === void 0 ? void 0 : _a.returnSignedJSON) {
            recognitionResults.resultSignedJSON = await recognizer.recognizer.toSignedJSON();
          }
          eventCallback({
            status: RecognitionStatus.ScanSuccessful,
            data: recognitionResults
          });
          break;
        }
      }
    }
    else {
      // If necessary, scan the image once again with different settings
      if (configuration.thoroughScan &&
        configuration.recognizers.indexOf('BlinkIdRecognizer') > -1) {
        const c = configuration;
        c.thoroughScan = false;
        c.recognizerOptions = c.recognizerOptions || {};
        for (const r of c.recognizers) {
          c.recognizerOptions[r] = c.recognizerOptions[r] || {};
          c.recognizerOptions[r].scanCroppedDocumentImage = !!c.recognizerOptions[r].scanCroppedDocumentImage;
          c.recognizerOptions[r].scanCroppedDocumentImage = !c.recognizerOptions[r].scanCroppedDocumentImage;
        }
        const eventHandler = (recognitionEvent) => eventCallback(recognitionEvent);
        const handleTerminateDone = () => {
          this.eventEmitter$.removeEventListener('terminate:done', handleTerminateDone);
          this.scanFromImage(configuration, eventHandler);
        };
        this.eventEmitter$.addEventListener('terminate:done', handleTerminateDone);
        window.setTimeout(() => void this.cancelRecognition(), 500);
        return;
      }
      eventCallback({
        status: RecognitionStatus.EmptyResultState,
        data: {
          initiatedByUser: this.cancelInitiatedFromOutside,
          recognizerName: ''
        }
      });
    }
    window.setTimeout(() => void this.cancelRecognition(), 500);
  }
  async scanFromImageCombined(configuration, eventCallback) {
    var _a;
    eventCallback({ status: RecognitionStatus.Preparing });
    const recognizers = await this.createRecognizers(configuration.recognizers, configuration.recognizerOptions);
    const recognizerRunner = await this.createRecognizerRunner(recognizers, eventCallback);
    const handleTerminate = async () => {
      var _a, _b, _c;
      this.eventEmitter$.removeEventListener('terminate', handleTerminate);
      if (recognizerRunner) {
        try {
          await recognizerRunner.delete();
        }
        catch (error) {
          // Psst, this error should not happen.
        }
      }
      for (const recognizer of recognizers) {
        if (!recognizer) {
          continue;
        }
        if (((_a = recognizer.recognizer) === null || _a === void 0 ? void 0 : _a.objectHandle) > -1) {
          (_c = (_b = recognizer.recognizer).delete) === null || _c === void 0 ? void 0 : _c.call(_b);
        }
      }
      this.eventEmitter$.dispatchEvent(new Event('terminate:done'));
    };
    this.eventEmitter$.addEventListener('terminate', handleTerminate);
    if (!configuration.firstFile) {
      eventCallback({ status: RecognitionStatus.NoFirstImageFileFound });
      window.setTimeout(() => void this.cancelRecognition(), 500);
      return;
    }
    if (!configuration.secondFile) {
      eventCallback({ status: RecognitionStatus.NoSecondImageFileFound });
      window.setTimeout(() => void this.cancelRecognition(), 500);
      return;
    }
    // Get results
    eventCallback({ status: RecognitionStatus.Processing });
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(configuration.firstFile);
    await imageElement.decode();
    const firstFrame = captureFrame(imageElement);
    const firstProcessResult = await recognizerRunner.processImage(firstFrame);
    if (firstProcessResult !== RecognizerResultState.Empty) {
      const imageElement = new Image();
      imageElement.src = URL.createObjectURL(configuration.secondFile);
      await imageElement.decode();
      const secondFrame = captureFrame(imageElement);
      const secondProcessResult = await recognizerRunner.processImage(secondFrame);
      if (secondProcessResult !== RecognizerResultState.Empty) {
        for (const recognizer of recognizers) {
          const results = await recognizer.recognizer.getResult();
          if (!results || results.state === RecognizerResultState.Empty) {
            eventCallback({
              status: RecognitionStatus.EmptyResultState,
              data: {
                initiatedByUser: this.cancelInitiatedFromOutside,
                recognizerName: recognizer.name
              }
            });
          }
          else {
            const recognitionResults = {
              recognizer: results,
              imageCapture: _IS_IMAGE_CAPTURE,
              recognizerName: recognizer.name
            };
            if ((_a = configuration.recognizerOptions) === null || _a === void 0 ? void 0 : _a.returnSignedJSON) {
              recognitionResults.resultSignedJSON = await recognizer.recognizer.toSignedJSON();
            }
            eventCallback({
              status: RecognitionStatus.ScanSuccessful,
              data: recognitionResults
            });
            break;
          }
        }
      }
      else {
        eventCallback({
          status: RecognitionStatus.EmptyResultState,
          data: {
            initiatedByUser: this.cancelInitiatedFromOutside,
            recognizerName: ''
          }
        });
      }
    }
    else {
      // If necessary, scan the image once again with different settings
      if (configuration.thoroughScan &&
        configuration.recognizers.indexOf('BlinkIdCombinedRecognizer') > -1) {
        const c = configuration;
        c.thoroughScan = false;
        c.recognizerOptions = c.recognizerOptions || {};
        for (const r of c.recognizers) {
          c.recognizerOptions[r] = c.recognizerOptions[r] || {};
          c.recognizerOptions[r].scanCroppedDocumentImage = !!c.recognizerOptions[r].scanCroppedDocumentImage;
          c.recognizerOptions[r].scanCroppedDocumentImage = !c.recognizerOptions[r].scanCroppedDocumentImage;
        }
        const eventHandler = (recognitionEvent) => eventCallback(recognitionEvent);
        const handleTerminateDone = () => {
          this.eventEmitter$.removeEventListener('terminate:done', handleTerminateDone);
          this.scanFromImageCombined(configuration, eventHandler);
        };
        this.eventEmitter$.addEventListener('terminate:done', handleTerminateDone);
        window.setTimeout(() => void this.cancelRecognition(), 500);
        return;
      }
      eventCallback({
        status: RecognitionStatus.EmptyResultState,
        data: {
          initiatedByUser: this.cancelInitiatedFromOutside,
          recognizerName: ''
        }
      });
    }
    window.setTimeout(() => void this.cancelRecognition(), 500);
  }
  async stopRecognition() {
    void await this.cancelRecognition(true);
  }
  async resumeRecognition() {
    this.videoRecognizer.resumeRecognition(true);
  }
  changeCameraDevice(camera) {
    return new Promise((resolve) => {
      this.videoRecognizer.changeCameraDevice(camera)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }
  getProductIntegrationInfo() {
    return this.sdk.getProductIntegrationInfo();
  }
  //////////////////////////////////////////////////////////////////////////////
  //
  // PRIVATE METHODS
  isRecognizerAvailable(recognizer) {
    return !!AvailableRecognizers[recognizer];
  }
  async createRecognizers(recognizers, recognizerOptions, successFrame = false) {
    const pureRecognizers = [];
    for (const recognizer of recognizers) {
      const instance = await BlinkIDSDK[AvailableRecognizers[recognizer]](this.sdk);
      pureRecognizers.push(instance);
    }
    if (recognizerOptions && Object.keys(recognizerOptions).length > 0) {
      for (const recognizer of pureRecognizers) {
        const settings = await recognizer.currentSettings();
        let updated = false;
        if (!recognizerOptions[recognizer.recognizerName] ||
          Object.keys(recognizerOptions[recognizer.recognizerName]).length < 1) {
          continue;
        }
        for (const [key, value] of Object.entries(recognizerOptions[recognizer.recognizerName])) {
          if (key in settings) {
            settings[key] = value;
            updated = true;
          }
        }
        if (updated) {
          await recognizer.updateSettings(settings);
        }
      }
    }
    const recognizerInstances = [];
    for (let i = 0; i < pureRecognizers.length; ++i) {
      const recognizer = pureRecognizers[i];
      const instance = { name: recognizers[i], recognizer };
      if (successFrame) {
        const successFrameGrabber = await createSuccessFrameGrabberRecognizer(this.sdk, recognizer);
        instance.successFrame = successFrameGrabber;
      }
      recognizerInstances.push(instance);
    }
    return recognizerInstances;
  }
  async createRecognizerRunner(recognizers, eventCallback) {
    const metadataCallbacks = {
      onDetectionFailed: () => eventCallback({ status: RecognitionStatus.DetectionFailed }),
      onQuadDetection: (quad) => {
        eventCallback({ status: RecognitionStatus.DetectionStatusChange, data: quad });
        const detectionStatus = quad.detectionStatus;
        switch (detectionStatus) {
          case DetectionStatus.Fail:
            eventCallback({ status: RecognitionStatus.DetectionStatusSuccess });
            break;
          case DetectionStatus.Success:
            eventCallback({ status: RecognitionStatus.DetectionStatusSuccess });
            break;
          case DetectionStatus.CameraTooHigh:
            eventCallback({ status: RecognitionStatus.DetectionStatusCameraTooHigh });
            break;
          case DetectionStatus.FallbackSuccess:
            eventCallback({ status: RecognitionStatus.DetectionStatusFallbackSuccess });
            break;
          case DetectionStatus.Partial:
            eventCallback({ status: RecognitionStatus.DetectionStatusPartial });
            break;
          case DetectionStatus.CameraAtAngle:
            eventCallback({ status: RecognitionStatus.DetectionStatusCameraAtAngle });
            break;
          case DetectionStatus.CameraTooNear:
            eventCallback({ status: RecognitionStatus.DetectionStatusCameraTooNear });
            break;
          case DetectionStatus.DocumentTooCloseToEdge:
            eventCallback({ status: RecognitionStatus.DetectionStatusDocumentTooCloseToEdge });
            break;
          // Send nothing
        }
      }
    };
    const blinkIdGeneric = recognizers.find(el => el.recognizer.recognizerName === 'BlinkIdRecognizer');
    const blinkIdCombined = recognizers.find(el => el.recognizer.recognizerName === 'BlinkIdCombinedRecognizer');
    if (blinkIdGeneric || blinkIdCombined) {
      for (const el of recognizers) {
        if (el.recognizer.recognizerName === 'BlinkIdRecognizer' ||
          el.recognizer.recognizerName === 'BlinkIdCombinedRecognizer') {
          const settings = await el.recognizer.currentSettings();
          settings.barcodeScanningStartedCallback = () => eventCallback({ status: RecognitionStatus.BarcodeScanningStarted });
          settings.classifierCallback = (supported) => {
            eventCallback({ status: RecognitionStatus.DocumentClassified, data: supported });
          };
          await el.recognizer.updateSettings(settings);
        }
      }
    }
    if (blinkIdCombined) {
      metadataCallbacks.onFirstSideResult = () => eventCallback({ status: RecognitionStatus.OnFirstSideResult });
    }
    const recognizerRunner = await createRecognizerRunner(this.sdk, recognizers.map((el) => el.successFrame || el.recognizer), false, metadataCallbacks);
    return recognizerRunner;
  }
  async cancelRecognition(initiatedFromOutside = false) {
    this.cancelInitiatedFromOutside = initiatedFromOutside;
    this.eventEmitter$.dispatchEvent(new Event('terminate'));
  }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
const defaultTranslations = {
  'action-alt-camera': 'Device camera',
  'action-alt-gallery': 'From gallery',
  'action-message': 'Scan or choose from gallery',
  'action-message-camera': 'Device camera',
  'action-message-camera-disabled': 'Camera disabled',
  'action-message-camera-not-allowed': 'Camera not allowed',
  'action-message-camera-in-use': 'Camera in use',
  'action-message-image': 'From gallery',
  'action-message-image-not-supported': 'Not supported',
  'camera-disabled': 'Camera disabled',
  'camera-not-allowed': 'Cannot access camera.',
  'camera-in-use': 'Camera is already used by another application.',
  'camera-generic-error': 'Cannot access camera.',
  'camera-feedback-scan-front': ['Scan the front side', 'of a document'],
  'camera-feedback-scan-back': ['Scan the back side', 'of a document'],
  'camera-feedback-flip': 'Flip to the back side',
  'camera-feedback-barcode-message': 'Scan the barcode',
  'camera-feedback-move-farther': 'Move farther',
  'camera-feedback-move-closer': 'Move closer',
  'camera-feedback-adjust-angle': 'Adjust the angle',
  'camera-feedback-barcode': ['Bring barcode closer', 'and keep it centered'],
  'drop-info': 'Drop image here',
  'drop-error': 'Whoops, we don\'t support that image format. Please upload a JPEG or PNG file.',
  'initialization-error': 'Failed to load component. Try using another device or update your browser.',
  'process-image-box-first': 'Front side image',
  'process-image-box-second': 'Back side image',
  'process-image-box-add': 'Add image',
  'process-image-upload-cta': 'Upload',
  'process-image-message': 'Just a moment.',
  'process-image-message-inline': 'Processing',
  'process-image-message-inline-done': 'Processing done',
  'process-api-message': 'Just a moment',
  'process-api-retry': 'Retry',
  'feedback-scan-unsuccessful-title': 'Scan unsuccessful',
  'feedback-scan-unsuccessful': 'We weren\'t able to recognize your document. Please try again.',
  'feedback-error-generic': 'Whoops, that didn\'t work. Please give it another go.',
  'check-internet-connection': 'Check internet connection.',
  'network-error': 'Network error.',
  'scanning-not-available': 'Scanning not available.',
  'modal-window-close': 'Close',
};
class TranslationService {
  constructor(alternativeTranslations) {
    this.translations = defaultTranslations;
    for (const key in alternativeTranslations) {
      if (key in defaultTranslations) {
        if (this.isExpectedValue(alternativeTranslations[key])) {
          this.translations[key] = alternativeTranslations[key];
        }
      }
    }
  }
  i(key) {
    if (this.translations[key]) {
      if (Array.isArray(this.translations[key])) {
        return JSON.parse(JSON.stringify(this.translations[key]));
      }
      return this.translations[key];
    }
  }
  isExpectedValue(value) {
    if (Array.isArray(value)) {
      const notValidFound = value.filter(item => typeof item !== 'string');
      return notValidFound.length == 0;
    }
    return typeof value === 'string';
  }
}

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function stringToArray(inputString) {
  if (!inputString || !inputString.length) {
    return [];
  }
  return inputString.split(',').map(el => el.trim());
}
function stringToObject(inputString) {
  if (!inputString || !inputString.length) {
    return {};
  }
  return JSON.parse(inputString);
}
function hasSupportedImageFiles(files) {
  const imageRegex = RegExp(/^image\//);
  for (let i = 0; i < files.length; ++i) {
    if (imageRegex.exec(files[i].type)) {
      return true;
    }
  }
  return false;
}
function extractFilenameFromPath(path) {
  return path.split('\\').pop();
}
function getImageFile(fileList) {
  if (fileList === null) {
    return null;
  }
  let image = null;
  const imageRegex = RegExp(/^image\//);
  for (let i = 0; i < fileList.length; ++i) {
    if (imageRegex.exec(fileList[i].type)) {
      image = fileList[i];
    }
  }
  return image;
}
/**
 * Inspired by https://github.com/JedWatson/classnames.
 * @param classes Class names and their conditions.
 * @returns Joined string of class names.
 */
function classNames(classes) {
  const result = [];
  const keys = Object.keys(classes);
  keys.forEach((key) => {
    if (classes[key]) {
      result.push(key);
    }
  });
  return result.join(' ');
}
/**
 * @param root shadowroot to apply the query from
 * @returns array of part selectors
 */
function getWebComponentParts(root) {
  const nodesWithPart = root.querySelectorAll('[part]');
  const parts = new Set();
  nodesWithPart.forEach((el) => {
    const partsArray = el.getAttribute('part').split(' ');
    partsArray.forEach(partName => parts.add(partName));
  });
  return [...parts];
}
function getWebComponentExportedParts(root) {
  const nodesWithPart = root.querySelectorAll('[exportparts]');
  const exportedParts = new Set();
  nodesWithPart.forEach((el) => {
    const exportedPartsArray = el.getAttribute('exportparts').split(' ');
    exportedPartsArray.forEach(partName => exportedParts.add(partName));
  });
  return [...exportedParts];
}
function setWebComponentParts(hostEl) {
  const partParts = [
    hostEl.tagName.toLowerCase(),
    hostEl.getAttribute('id')
  ];
  hostEl.setAttribute('part', partParts.join(' ').trim());
}

const blinkidInBrowserCss = ":host{--mb-font-family:inherit;--mb-font-size:max(16px, 1rem);--mb-font-size-desktop:max(20px, 1rem);--mb-font-style:normal;--mb-font-weight:400;--mb-letter-spacing:normal;--mb-line-height:1.5em;--mb-component-background:#F9FAFB;--mb-component-width:100%;--mb-component-font-color:#000;--mb-component-font-color-secondary:#3C3C43B2;--mb-component-font-size:14px;--mb-component-text-transform:none;--mb-component-border-color:rgba(120, 120, 128, 0.2);--mb-component-border-radius:5px;--mb-component-border-style:solid;--mb-component-border-width:1px;--mb-component-box-shadow:none;--mb-component-button-size:36px;--mb-component-button-icon-size:20px;--mb-component-button-background:#FFF;--mb-component-button-hover-background:#F9FAFB;--mb-component-button-background-selected:rgba(72, 178, 232, 0.1);--mb-component-button-border-color:#D1D5DB;--mb-component-button-border-color-selected:rgba(120, 120, 128, 0.2);--mb-component-button-border-color-focus:#9CA3AF;--mb-component-button-border-color-hover:rgba(60, 60, 67, 0.29);--mb-component-button-border-color-disabled:rgba(116, 116, 128, 0.08);--mb-component-button-border-radius:50%;--mb-component-button-border-style:solid;--mb-component-button-border-width:1px;--mb-component-button-box-shadow:0px 1px 4px rgba(0, 0, 0, 0.1);--mb-component-button-box-shadow-disabled:none;--mb-component-button-classic-background:#0062F2;--mb-component-button-classic-hover-background:#3A89FD;--mb-component-button-classic-inverted-hover-background:#F9FAFB;--mb-component-button-classic-focused-border-color:#142641;--mb-component-button-classic-inverted-text-color:#374151;--mb-component-button-classic-inverted-border-color:#9CA3AF;--mb-component-button-classic-font-size:14px;--mb-component-button-classic-font-weight:700;--mb-component-button-classic-text-color:#FFF;--mb-component-button-classic-line-height:20px;--mb-component-button-classic-border-radius:100px;--mb-component-image-box-border-color:rgba(120, 120, 128, 0.2);--mb-component-image-box-border-radius:2px;--mb-component-image-box-border-width:1px;--mb-component-image-box-label-height:16px;--mb-component-image-box-label-color:rgba(60, 60, 67, 0.5);--mb-component-image-box-label-font-size:0.875em;--mb-component-image-box-label-font-weight:400;--mb-component-image-box-cta-height:20px;--mb-component-image-box-cta-label-height:20px;--mb-component-image-box-cta-color:#48B2E8;--mb-component-image-box-cta-font-size:0.875em;--mb-component-image-box-cta-font-weight:600;--mb-component-image-box-file-color:#000;--mb-component-image-box-file-font-weight:400;--mb-component-action-buttons-justify-content:flex-end;--mb-component-action-buttons-gap:8px;--mb-component-action-label:block;--mb-component-action-label-font-size:14px;--mb-blur-filter:27px;--mb-blur-scanning-line:4px;--mb-toolbar-color:#FFF;--mb-toolbar-border-color:#FFF;--mb-toolbar-border-radius:4px;--mb-toolbar-list-border-radius:4px;--mb-toolbar-list-item-border-radius:2px;--mb-toolbar-list-item-active-text-color:#0062F2;--mb-toolbar-list-item-active-background-color:#E7F0FF;--mb-toolbar-selection-width:298px;--mb-toolbar-list-background:#FFF;--mb-toolbar-list-shadow:0px 2px 8px rgba(0, 0, 0, 0.05), 0px 2px 24px rgba(0, 0, 0, 0.1);--mb-toolbar-camera-name-font-weight:500;--mb-reticle-size:6em;--mb-feedback-font-color-error:#F43F5E;--mb-feedback-font-color-info:#6B7280;--mb-feedback-font-size:12px;--mb-feedback-font-style:normal;--mb-feedback-font-weight:400;--mb-feedback-letter-spacing:normal;--mb-feedback-line-height:16px;--mb-feedback-text-transform:none;--mb-overlay-draganddrop-background:#DCEAFF;--mb-overlay-draganddrop-background-error:#FFEAEE;--mb-overlay-draganddrop-border-color:#3A89FD;--mb-overlay-draganddrop-text-color:#0062F2;--mb-overlay-draganddrop-text-error-color:#E11D48;--mb-overlay-draganddrop-border-color-error:#FF2D55;--mb-overlay-draganddrop-border-style:dashed;--mb-overlay-gallery-experience-background:rgba(0, 0, 0, 0.6);--mb-overlay-gallery-experience-font-color:#FFF;--mb-overlay-gallery-experience-font-size:1em;--mb-overlay-gallery-experience-font-weight:500;--mb-overlay-gallery-experience-line-height:1.5em;--mb-overlay-deviceselection-background:rgba(17, 24, 39, 0.15);--mb-modal-title-font-size:1em;--mb-modal-title-line-height:2em;--mb-modal-content-font-size:0.875em;--mb-modal-content-line-height:1.4em;--mb-modal-border-radius:8px;--mb-modal-background:#FFFFFF}:host{display:block;width:100%}";

let BlinkidInBrowser = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.fatalError = index.createEvent(this, "fatalError", 7);
    this.ready = index.createEvent(this, "ready", 7);
    this.scanError = index.createEvent(this, "scanError", 7);
    this.scanSuccess = index.createEvent(this, "scanSuccess", 7);
    this.feedback = index.createEvent(this, "feedback", 7);
    this.cameraScanStarted = index.createEvent(this, "cameraScanStarted", 7);
    this.imageScanStarted = index.createEvent(this, "imageScanStarted", 7);
    this.scanAborted = index.createEvent(this, "scanAborted", 7);
    this.blocked = false;
    /**
     * Write a hello message to the browser console when license check is successfully performed.
     *
     * Hello message will contain the name and version of the SDK, which are required information for all support
     * tickets.
     *
     * Default value is true.
     */
    this.allowHelloMessage = true;
    /**
     * Absolute location of WASM and related JS/data files. Useful when resource files should be loaded over CDN, or
     * when web frameworks/libraries are used which store resources in specific locations, e.g. inside "assets" folder.
     *
     * Important: if engine is hosted on another origin, CORS must be enabled between two hosts. That is, server where
     * engine is hosted must have 'Access-Control-Allow-Origin' header for the location of the web app.
     *
     * Important: SDK and WASM resources must be from the same version of package.
     *
     * Default value is empty string, i.e. "". In case of empty string, value of "window.location.origin" property is
     * going to be used.
     */
    this.engineLocation = '';
    /**
     * The absolute location of the Web Worker script file that loads the WebAssembly module.
     *
     * Important: the worker script must be served via HTTPS and must be of the same origin as the initiator.
     * See https://github.com/w3c/ServiceWorker/issues/940 (same applies for Web Workers).
     *
     * Important: SDK, worker script and WebAssembly resources must be from the same version of the package.
     *
     * The default value is an empty string, i.e. "", and in that case, the worker script is loaded from the default location in resources folder.
     */
    this.workerLocation = '';
    /**
     * Defines the type of the WebAssembly build that will be loaded. If omitted, SDK will determine
     * the best possible WebAssembly build which should be loaded based on the browser support.
     *
     * Available WebAssembly builds:
     *
     * - 'BASIC'
     * - 'ADVANCED'
     * - 'ADVANCED_WITH_THREADS'
     *
     * For more information about different WebAssembly builds, check out the `src/MicroblinkSDK/WasmType.ts` file.
     */
    this.wasmType = '';
    /**
     * Amount of time in milliseconds before the recognition process is resumed after it is being paused previously.
     *
     * This setting applies only to video recognition.
     *
     * Keep in mind that the timer starts after the front side was scanned . This behaviour ensures
     * that the user has enough time to flip the document and place its back side in front of the camera
     * device.
     */
    this.recognitionPauseTimeout = 3800;
    /**
     * Configure camera experience state timeout durations
     */
    this.cameraExperienceStateDurations = null;
    /**
     * Set to 'true' if success frame should be included in final scanning results.
     *
     * Default value is 'false'.
     */
    this.includeSuccessFrame = false;
    /**
     * Set to 'false' if component should not enable drag and drop functionality.
     *
     * Default value is 'true'.
     */
    this.enableDrag = true;
    /**
     * If set to 'true', UI component will not display feedback, i.e. information and error messages.
     *
     * Setting this attribute to 'false' won't disable 'scanError' and 'scanInfo' events.
     *
     * Default value is 'false'.
     */
    this.hideFeedback = false;
    /**
     * If set to 'true', UI component will become visible after successful SDK initialization. Also, error screen
     * is not going to be displayed in case of initialization error.
     *
     * If set to 'false', loading and error screens of the UI component will be visible during initialization and in case
     * of an error.
     *
     * Default value is 'false'.
     */
    this.hideLoadingAndErrorUi = false;
    /**
     * Set to 'true' if scan from camera should be enabled. If set to 'true' and camera is not available or disabled,
     * related button will be visible but disabled.
     *
     * Default value is 'true'.
     */
    this.scanFromCamera = true;
    /**
     * Set to 'true' if scan from image should be enabled.
     *
     * Default value is 'true'.
     */
    this.scanFromImage = true;
    /**
     * Set to 'true' if scan from image should execute twice in case that first result is empty.
     *
     * If enabled, this option will add/remove 'scanCroppedDocumentImage' recognizer option for the
     * second scan action.
     */
    this.thoroughScanFromImage = false;
    /**
     * Define whether to use 'FULLSCREEN' or 'INLINE' gallery overlay type.
     *
     * If 'FULLSCREEN' is used, when a user selects an image from which data should be extracted, an overlay will pop up
     * and cover the whole screen.
     *
     * On the other hand, if 'INLINE' is used, there is no overlay but rather a 'Processing' message inside the UI
     * component.
     *
     * Default value is 'INLINE'.
     */
    this.galleryOverlayType = 'INLINE';
    /**
     * Define whether to use 'FULLSCREEN' or 'INLINE' gallery dropdown type.
     *
     * If 'FULLSCREEN' is used, when a user drags an image over the UI component, an overlay will pop up and cover the
     * whole screen.
     *
     * If 'INLINE' is used, there is no fullscreen overlay, but rather the overlay is restricted to the size of the UI
     * component.
     *
     * Default value is 'INLINE'.
     */
    this.galleryDropType = 'INLINE';
    /**
     * Set to 'true' if text labels should be displayed below action buttons.
     *
     * Default value is 'false'.
     */
    this.showActionLabels = false;
    /**
     * Set to 'true' if modal window should be displayed in case of an error.
     *
     * Default value is 'false'.
     */
    this.showModalWindows = false;
    /**
     * Set to 'true' if for Barcode scanning camera feedback message should be displayed on camera screen.
     *
     * Default value is 'false'.
     */
    this.showCameraFeedbackBarcodeMessage = false;
    /**
     * Camera device ID passed from root component.
     *
     * Client can choose which camera to turn on if array of cameras exists.
     *
     */
    this.cameraId = null;
  }
  /**
   * Control UI state of camera overlay.
   *
   * Possible values are 'ERROR' | 'LOADING' | 'NONE' | 'SUCCESS'.
   *
   * In case of state `ERROR` and if `showModalWindows` is set to `true`, modal window
   * with error message will be displayed. Otherwise, UI will close.
   */
  async setUiState(state) {
    this.mbComponentEl.setUiState(state);
  }
  /**
   * Starts camera scan using camera overlay with usage instructions.
   */
  async startCameraScan() {
    this.mbComponentEl.startCameraScan();
  }
  /**
   * Starts image scan, emits results from provided file.
   *
   * @param file File to scan
   */
  async startImageScan(file) {
    this.mbComponentEl.startImageScan(file);
  }
  /**
   * Starts combined image scan, emits results from provided files.
   *
   * @param firstFile File to scan as first image
   * @param secondFile File to scan as second image
   */
  async startCombinedImageScan(firstFile, secondFile) {
    this.mbComponentEl.startCombinedImageScan(firstFile, secondFile);
  }
  /**
   * Show message alongside UI component.
   *
   * Possible values for `state` are 'FEEDBACK_ERROR' | 'FEEDBACK_INFO' | 'FEEDBACK_OK'.
   */
  async setUiMessage(state, message) {
    this.feedbackEl.show({ state, message });
  }
  /**
   * Get information about product integration.
   */
  async getProductIntegrationInfo() {
    var _a;
    return (_a = this.sdkService) === null || _a === void 0 ? void 0 : _a.getProductIntegrationInfo();
  }
  componentWillLoad() {
    this.init();
  }
  componentWillUpdate() {
    var _a;
    if (this.blocked) {
      return;
    }
    (_a = this.sdkService) === null || _a === void 0 ? void 0 : _a.delete();
    this.init();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.sdkService) === null || _a === void 0 ? void 0 : _a.delete();
  }
  init() {
    const rawRecognizers = stringToArray(this.rawRecognizers);
    this.finalRecognizers = this.recognizers ? this.recognizers : rawRecognizers;
    const rawTranslations = stringToObject(this.rawTranslations);
    this.finalTranslations = this.translations ? this.translations : rawTranslations;
    this.translationService = new TranslationService(this.finalTranslations || {});
    this.sdkService = new SdkService();
  }
  render() {
    return (index.h(index.Host, null, index.h("mb-container", null, index.h("mb-component", { dir: this.hostEl.getAttribute('dir'), ref: el => this.mbComponentEl = el, allowHelloMessage: this.allowHelloMessage, recognitionPauseTimeout: this.recognitionPauseTimeout, cameraExperienceStateDurations: this.cameraExperienceStateDurations, engineLocation: this.engineLocation, workerLocation: this.workerLocation, licenseKey: this.licenseKey, wasmType: this.wasmType, recognizers: this.finalRecognizers, recognizerOptions: this.recognizerOptions, recognitionTimeout: this.recognitionTimeout, includeSuccessFrame: this.includeSuccessFrame, enableDrag: this.enableDrag, hideLoadingAndErrorUi: this.hideLoadingAndErrorUi, scanFromCamera: this.scanFromCamera, scanFromImage: this.scanFromImage, thoroughScanFromImage: this.thoroughScanFromImage, galleryOverlayType: this.galleryOverlayType, galleryDropType: this.galleryDropType, showActionLabels: this.showActionLabels, showModalWindows: this.showModalWindows, showCameraFeedbackBarcodeMessage: this.showCameraFeedbackBarcodeMessage, iconCameraDefault: this.iconCameraDefault, iconCameraActive: this.iconCameraActive, iconGalleryDefault: this.iconGalleryDefault, iconGalleryActive: this.iconGalleryActive, iconInvalidFormat: this.iconInvalidFormat, iconSpinnerScreenLoading: this.iconSpinnerScreenLoading, iconSpinnerFromGalleryExperience: this.iconSpinnerFromGalleryExperience, iconGalleryScanningCompleted: this.iconGalleryScanningCompleted, sdkService: this.sdkService, translationService: this.translationService, cameraId: this.cameraId, onBlock: (ev) => { this.blocked = ev.detail; }, onFeedback: (ev) => this.feedbackEl.show(ev.detail) }), index.h("mb-feedback", { dir: this.hostEl.getAttribute('dir'), visible: !this.hideFeedback, ref: el => this.feedbackEl = el }))));
  }
  get hostEl() { return index.getElement(this); }
};
BlinkidInBrowser.style = blinkidInBrowserCss;

const mbApiProcessStatusCss = "@keyframes reticle-rotation{100%{transform:rotate(360deg)}}@keyframes reticle-horizontal-shrink{0%{height:50%;top:25%}50%{height:30%;top:35%}80%{height:30%;top:35%}100%{height:50%;top:25%}}@keyframes reticle-cursor-horizontal-flip{0%{opacity:0}100%{opacity:0}}@keyframes reticle-horizontal-flip{0%{border-radius:0;background-color:transparent;-webkit-backdrop-filter:none;backdrop-filter:none;filter:drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05));background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05Mi4yODk3IDAuNTc3NDg0SDMuNzEwMzFDMS42NzEzMSAwLjU3NzQ4NCAwIDIuMjQ4NzkgMCA0LjI4Nzc5VjU3LjA2NzdDMCA1OS4xMDY3IDEuNjcxMzEgNjAuNzc4MSAzLjcxMDMxIDYwLjc3ODFIOTIuMjg5N0M5NC4zMjg3IDYwLjc3ODEgOTYgNTkuMTA2NyA5NiA1Ny4wNjc3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRaTTM4LjMzOTggMzYuNTQ0MUMzOC4zMzk4IDM4LjAxNDggMzcuMTM2NSAzOS4yMTgyIDM1LjY2NTcgMzkuMjE4MkgzMy4xNTg4QzMyLjU5MDUgMzYuNzQ0NiAzMS4yNTM1IDM1LjAwNjUgMjguMDExMSAzNC4yMDQyTDI1LjMzNyAzMy41MzU3TDI3LjIwODkgMzEuNTMwMUMyOC42NDYyIDI5Ljk5MjUgMjkuNDgxOSAyNy43NTMgMjkuNDgxOSAyNS40MTMxQzI5LjQ4MTkgMjIuNzM5IDI4Ljg0NjggMTYuNTIxOCAyMy4wOTc1IDE2LjUyMThDMTguMTUwNCAxNi41MjE4IDE2LjM3ODggMjEuMTAxMiAxNi4zNzg4IDI1LjQxMzFDMTYuMzc4OCAyNy43NTMgMTcuMjE0NSAyOS45OTI1IDE4LjY1MTggMzEuNTMwMUwyMC41MjM3IDMzLjUzNTdMMTcuODQ5NiAzNC4yMDQyQzE0LjkwODEgMzQuOTM5NiAxMy40MDM5IDM2LjM3NjkgMTIuNzM1NCAzOS4yMTgySDEwLjIyODRDOC43NTc2NiAzOS4yMTgyIDcuNTU0MzIgMzguMDE0OCA3LjU1NDMyIDM2LjU0NDFWMTEuMDczM0M3LjU1NDMyIDkuNjAyNTUgOC43NTc2NiA4LjM5OTIxIDEwLjIyODQgOC4zOTkyMUgzNS42OTkyQzM3LjE2OTkgOC4zOTkyMSAzOC4zNzMzIDkuNjAyNTUgMzguMzczMyAxMS4wNzMzVjM2LjU0NDFIMzguMzM5OFpNNzMuMTAzMSAzNC4yNzExSDQ3LjE2NDNWMzAuOTI4NUg3My4xMDMxVjM0LjI3MTFaTTg4LjMxMiA1My44OTIzSDc2LjU3OTRWNTAuNTQ5Nkg4OC4zMTJWNTMuODkyM1pNODguMzEyIDI1LjQ4SDQ3LjE2NDNWMjIuMTM3NEg4OC4zMTJWMjUuNDhaTTg4LjMxMiAxNi42ODg5SDQ3LjE2NDNWMTMuMzQ2M0g4OC4zMTJWMTYuNjg4OVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==);opacity:0;transform:rotate3d()}5%{opacity:1}15%{transform:rotateY(0deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05Mi4yODk3IDAuNTc3NDg0SDMuNzEwMzFDMS42NzEzMSAwLjU3NzQ4NCAwIDIuMjQ4NzkgMCA0LjI4Nzc5VjU3LjA2NzdDMCA1OS4xMDY3IDEuNjcxMzEgNjAuNzc4MSAzLjcxMDMxIDYwLjc3ODFIOTIuMjg5N0M5NC4zMjg3IDYwLjc3ODEgOTYgNTkuMTA2NyA5NiA1Ny4wNjc3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRaTTM4LjMzOTggMzYuNTQ0MUMzOC4zMzk4IDM4LjAxNDggMzcuMTM2NSAzOS4yMTgyIDM1LjY2NTcgMzkuMjE4MkgzMy4xNTg4QzMyLjU5MDUgMzYuNzQ0NiAzMS4yNTM1IDM1LjAwNjUgMjguMDExMSAzNC4yMDQyTDI1LjMzNyAzMy41MzU3TDI3LjIwODkgMzEuNTMwMUMyOC42NDYyIDI5Ljk5MjUgMjkuNDgxOSAyNy43NTMgMjkuNDgxOSAyNS40MTMxQzI5LjQ4MTkgMjIuNzM5IDI4Ljg0NjggMTYuNTIxOCAyMy4wOTc1IDE2LjUyMThDMTguMTUwNCAxNi41MjE4IDE2LjM3ODggMjEuMTAxMiAxNi4zNzg4IDI1LjQxMzFDMTYuMzc4OCAyNy43NTMgMTcuMjE0NSAyOS45OTI1IDE4LjY1MTggMzEuNTMwMUwyMC41MjM3IDMzLjUzNTdMMTcuODQ5NiAzNC4yMDQyQzE0LjkwODEgMzQuOTM5NiAxMy40MDM5IDM2LjM3NjkgMTIuNzM1NCAzOS4yMTgySDEwLjIyODRDOC43NTc2NiAzOS4yMTgyIDcuNTU0MzIgMzguMDE0OCA3LjU1NDMyIDM2LjU0NDFWMTEuMDczM0M3LjU1NDMyIDkuNjAyNTUgOC43NTc2NiA4LjM5OTIxIDEwLjIyODQgOC4zOTkyMUgzNS42OTkyQzM3LjE2OTkgOC4zOTkyMSAzOC4zNzMzIDkuNjAyNTUgMzguMzczMyAxMS4wNzMzVjM2LjU0NDFIMzguMzM5OFpNNzMuMTAzMSAzNC4yNzExSDQ3LjE2NDNWMzAuOTI4NUg3My4xMDMxVjM0LjI3MTFaTTg4LjMxMiA1My44OTIzSDc2LjU3OTRWNTAuNTQ5Nkg4OC4zMTJWNTMuODkyM1pNODguMzEyIDI1LjQ4SDQ3LjE2NDNWMjIuMTM3NEg4OC4zMTJWMjUuNDhaTTg4LjMxMiAxNi42ODg5SDQ3LjE2NDNWMTMuMzQ2M0g4OC4zMTJWMTYuNjg4OVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==)}20%{transform:rotateY(90deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05NiAxMC4wMDM3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRIMy43MTAzMUMxLjY3MTMxIDAuNTc3NDg0IDAgMi4yNDg3OSAwIDQuMjg3NzlWMTAuMDAzN0g5NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0wIDIwLjAzMTVWNTcuMDY3OEMwIDU5LjEwNjcgMS42NzEzMSA2MC43NzgxIDMuNzEwMzEgNjAuNzc4MUg5Mi4yODk3Qzk0LjMyODcgNjAuNzc4MSA5NiA1OS4xMDY3IDk2IDU3LjA2NzhWMjAuMDMxNUgwWk04OC4yNzg2IDUzLjgyNTRINy43MjE0NVY1MC40ODI4SDg4LjI3ODZWNTMuODI1NFpNODguMjc4NiA0NS4xMzQ2SDcuNzIxNDVWNDEuNzkySDg4LjI3ODZWNDUuMTM0NloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==)}25%{transform:rotateY(-15deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05NiAxMC4wMDM3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRIMy43MTAzMUMxLjY3MTMxIDAuNTc3NDg0IDAgMi4yNDg3OSAwIDQuMjg3NzlWMTAuMDAzN0g5NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0wIDIwLjAzMTVWNTcuMDY3OEMwIDU5LjEwNjcgMS42NzEzMSA2MC43NzgxIDMuNzEwMzEgNjAuNzc4MUg5Mi4yODk3Qzk0LjMyODcgNjAuNzc4MSA5NiA1OS4xMDY3IDk2IDU3LjA2NzhWMjAuMDMxNUgwWk04OC4yNzg2IDUzLjgyNTRINy43MjE0NVY1MC40ODI4SDg4LjI3ODZWNTMuODI1NFpNODguMjc4NiA0NS4xMzQ2SDcuNzIxNDVWNDEuNzkySDg4LjI3ODZWNDUuMTM0NloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==)}30%{transform:rotateY(0deg)}95%{opacity:1}100%{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05NiAxMC4wMDM3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRIMy43MTAzMUMxLjY3MTMxIDAuNTc3NDg0IDAgMi4yNDg3OSAwIDQuMjg3NzlWMTAuMDAzN0g5NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0wIDIwLjAzMTVWNTcuMDY3OEMwIDU5LjEwNjcgMS42NzEzMSA2MC43NzgxIDMuNzEwMzEgNjAuNzc4MUg5Mi4yODk3Qzk0LjMyODcgNjAuNzc4MSA5NiA1OS4xMDY3IDk2IDU3LjA2NzhWMjAuMDMxNUgwWk04OC4yNzg2IDUzLjgyNTRINy43MjE0NVY1MC40ODI4SDg4LjI3ODZWNTMuODI1NFpNODguMjc4NiA0NS4xMzQ2SDcuNzIxNDVWNDEuNzkySDg4LjI3ODZWNDUuMTM0NloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==);border-radius:0;-webkit-backdrop-filter:none;backdrop-filter:none;background-color:transparent;opacity:0}}:host .reticle{box-sizing:border-box;position:relative;width:100%;height:100%;border-radius:50%;background-color:rgba(107, 114, 128, 0.3);background-position:center;background-size:contain;background-repeat:no-repeat;-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter));transition:all 0.4s ease}:host .reticle__cursor{box-sizing:border-box;display:block;position:absolute;width:50%;height:50%;left:25%;top:25%;border-radius:50%;border-color:transparent;border-style:solid;border-width:4px;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74);background-position:center;background-size:contain;background-repeat:no-repeat}:host .reticle__cursor::before{content:\"\";position:absolute;width:4px;height:4px;top:50%;left:50%;transition:all 0.2s ease;transform-origin:center;transform:translate(-50%, -50%);background-color:#ffffff;border-radius:50%}:host .reticle__cursor::after{content:\"\";position:absolute;top:-4px;left:-4px;width:calc(50% + 4px);height:calc(50% + 4px);display:block;border-left-width:4px;border-left-style:solid;border-left-color:#ffffff;border-top-width:4px;border-top-style:solid;border-top-color:#ffffff;border-top-left-radius:100%;transition:all 0.2s ease;opacity:0;filter:drop-shadow(0 0 4px rgba(0, 0, 0, 0.1))}:host .reticle__el{box-sizing:border-box}:host .reticle__done{display:block;position:absolute;width:50%;height:50%;left:25%;top:25%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74);transform-origin:center;transform:rotate(15deg) translateY(-5%);opacity:0}:host .reticle.is-default~.label[data-message=is-default],:host .reticle.is-detection~.label[data-message=is-detection],:host .reticle.is-classification~.label[data-message=is-classification],:host .reticle.is-done~.label[data-message=is-done],:host .reticle.is-done-all~.label[data-message=is-done-all],:host .reticle.is-flip~.label[data-message=is-flip],:host .reticle.is-error-move-farther~.label[data-message=is-error-move-farther],:host .reticle.is-error-move-closer~.label[data-message=is-error-move-closer],:host .reticle.is-error-adjust-angle~.label[data-message=is-error-adjust-angle]{opacity:1;visibility:visible;margin:8px 0 0 0}:host .reticle.is-default .reticle__cursor{animation:reticle-rotation 1000ms ease-in-out infinite;border-style:none}:host .reticle.is-default .reticle__el{position:absolute;display:block;width:50%;height:50%;overflow:hidden}:host .reticle.is-default .reticle__el::after,:host .reticle.is-default .reticle__el::before{content:\"\";position:absolute;display:block;width:100%;height:100%}:host .reticle.is-default .reticle__el:nth-child(1){top:0;left:0}:host .reticle.is-default .reticle__el:nth-child(1)::after,:host .reticle.is-default .reticle__el:nth-child(1)::before{top:0;left:0;border-top:4px solid rgba(255, 255, 255, 0.5);border-left:4px solid rgba(255, 255, 255, 0.5);border-top-left-radius:100%;transform-origin:bottom right}:host .reticle.is-default .reticle__el:nth-child(1)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(1)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(2){top:0;right:0}:host .reticle.is-default .reticle__el:nth-child(2)::after,:host .reticle.is-default .reticle__el:nth-child(2)::before{top:0;right:0;border-top:4px solid rgba(255, 255, 255, 0.5);border-right:4px solid rgba(255, 255, 255, 0.5);border-top-right-radius:100%;transform-origin:bottom left}:host .reticle.is-default .reticle__el:nth-child(2)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(2)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(3){bottom:0;right:0}:host .reticle.is-default .reticle__el:nth-child(3)::after,:host .reticle.is-default .reticle__el:nth-child(3)::before{bottom:0;right:0;transform-origin:top left;border-bottom:4px solid rgba(255, 255, 255, 0.5);border-right:4px solid rgba(255, 255, 255, 0.5);border-bottom-right-radius:100%}:host .reticle.is-default .reticle__el:nth-child(3)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(3)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(4){bottom:0;left:0}:host .reticle.is-default .reticle__el:nth-child(4)::after,:host .reticle.is-default .reticle__el:nth-child(4)::before{bottom:0;left:0;border-bottom:4px solid rgba(255, 255, 255, 0.5);border-left:4px solid rgba(255, 255, 255, 0.5);border-bottom-left-radius:100%;transform-origin:top right}:host .reticle.is-default .reticle__el:nth-child(4)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(4)::before{transform:rotate(-67.5deg)}:host .reticle.is-detection .reticle__cursor{border-color:rgba(255, 255, 255, 0.75)}:host .reticle.is-classification .reticle__cursor{animation:reticle-rotation 250ms cubic-bezier(0.4, 0.02, 1, 1) infinite;border-style:solid;border-color:rgba(255, 255, 255, 0.25)}:host .reticle.is-classification .reticle__cursor::after{opacity:1}:host .reticle.is-flip{animation:reticle-horizontal-flip 3.5s cubic-bezier(0.4, 0.02, 1, 1) both}:host .reticle.is-flip .reticle__cursor{transform-style:preserve-3d;animation:reticle-cursor-horizontal-flip 3.5s cubic-bezier(0.4, 0.02, 1, 1) both}:host .reticle.is-done{display:none}:host .reticle.is-done-all{background-color:#ffffff;box-shadow:0px 2px 24px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05);transition:all 125ms cubic-bezier(0.4, 0.02, 1, 1)}:host .reticle.is-done-all .reticle__done{transform:rotate(0) translateY(0);opacity:1}:host .reticle.is-done-all .reticle__cursor::before{width:150vw;height:150vh;opacity:0;transition:all 200ms ease}:host .reticle.is-error-move-farther{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-move-farther .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);width:40%;height:40%;left:30%;top:30%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .reticle.is-error-move-closer{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-move-closer .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);width:60%;height:60%;left:20%;top:20%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .reticle.is-error-adjust-angle{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-adjust-angle .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);animation:reticle-horizontal-shrink 600ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}*::after,*::before{box-sizing:border-box}:host .message{display:block;position:absolute;top:100%;left:50%;transform-origin:center;transform:translate(-50%, 0);margin:8px 0 0 0;margin-top:20px;padding:8px 12px;font-weight:500;text-align:center;text-shadow:0px 1px 4px rgba(0, 0, 0, 0.1);white-space:nowrap;color:#fff;background-color:rgba(107, 114, 128, 0.3);-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter));border-radius:8px}:host .reticle-container{position:absolute;top:50%;left:50%;width:96px;height:96px;transform-origin:center;transform:translate(-50%, -50%);perspective:600px}:host button.modal-action-button{width:126px;height:32px;border-radius:0;border:0;background:#48B2E8;color:#ffffff;cursor:pointer}";

let MbApiProcessStatus = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.closeTryAgain = index.createEvent(this, "closeTryAgain", 7);
    this.closeFromStart = index.createEvent(this, "closeFromStart", 7);
    /**
     * Element visibility, default is 'false'.
     */
    this.visible = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (index.h(index.Host, { class: classNames({ visible: this.visible }) }, this.state === 'LOADING' &&
      index.h("div", { class: "reticle-container" }, index.h("div", { class: "reticle is-classification" }, index.h("div", { class: "reticle__cursor" }, index.h("div", { class: "reticle__el" }), index.h("div", { class: "reticle__el" }), index.h("div", { class: "reticle__el" }), index.h("div", { class: "reticle__el" }))), index.h("p", { class: "message" }, this.translationService.i('process-api-message').toString())), this.state === 'SUCCESS' &&
      index.h("div", { class: "reticle-container" }, index.h("div", { class: "reticle is-done-all" }, index.h("div", { class: "reticle__cursor" }, index.h("div", { class: "reticle__el" }), index.h("div", { class: "reticle__el" }), index.h("div", { class: "reticle__el" }), index.h("div", { class: "reticle__el" })), index.h("img", { class: "reticle__done", src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjk3MiAzMy40NkMyMC43MDk1IDMzLjQ2MDUgMjAuNDQ5NCAzMy40MDkyIDIwLjIwNjggMzMuMzA5QzE5Ljk2NDEgMzMuMjA4OCAxOS43NDM2IDMzLjA2MTYgMTkuNTU4IDMyLjg3NkwxMS4wNzQgMjQuMzlDMTAuODgyOSAyNC4yMDU2IDEwLjczMDMgMjMuOTg1MSAxMC42MjU0IDIzLjc0MTFDMTAuNTIwNCAyMy40OTcyIDEwLjQ2NSAyMy4yMzQ4IDEwLjQ2MjUgMjIuOTY5MkMxMC40NiAyMi43MDM3IDEwLjUxMDQgMjIuNDQwMyAxMC42MTA4IDIyLjE5NDRDMTAuNzExMiAyMS45NDg2IDEwLjg1OTYgMjEuNzI1MiAxMS4wNDcyIDIxLjUzNzNDMTEuMjM0OSAyMS4zNDkzIDExLjQ1ODEgMjEuMjAwNyAxMS43MDM4IDIxLjA5OTlDMTEuOTQ5NSAyMC45OTkyIDEyLjIxMjggMjAuOTQ4NCAxMi40Nzg0IDIwLjk1MDVDMTIuNzQzOSAyMC45NTI2IDEzLjAwNjQgMjEuMDA3NiAxMy4yNTA1IDIxLjExMjNDMTMuNDk0NiAyMS4yMTY5IDEzLjcxNTQgMjEuMzY5MSAxMy45IDIxLjU2TDIwLjk3IDI4LjYzTDMzLjcgMTUuOTA0QzM0LjA3NSAxNS41Mjg3IDM0LjU4MzggMTUuMzE3OCAzNS4xMTQzIDE1LjMxNzZDMzUuNjQ0OCAxNS4zMTc0IDM2LjE1MzcgMTUuNTI4IDM2LjUyOSAxNS45MDNDMzYuOTA0MyAxNi4yNzggMzcuMTE1MiAxNi43ODY4IDM3LjExNTQgMTcuMzE3M0MzNy4xMTU2IDE3Ljg0NzggMzYuOTA1IDE4LjM1NjcgMzYuNTMgMTguNzMyTDIyLjM4NiAzMi44NzZDMjIuMjAwNCAzMy4wNjE2IDIxLjk3OTkgMzMuMjA4OCAyMS43MzcyIDMzLjMwOUMyMS40OTQ2IDMzLjQwOTIgMjEuMjM0NSAzMy40NjA1IDIwLjk3MiAzMy40NloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=" }))), this.state === 'ERROR' &&
      index.h("mb-modal", { visible: true, modalTitle: this.translationService.i('feedback-scan-unsuccessful-title').toString(), content: this.translationService.i('feedback-scan-unsuccessful').toString(), onClose: () => this.closeFromStart.emit() }, index.h("div", { slot: "actionButtons" }, index.h("button", { class: "primary modal-action-button", onClick: () => this.closeTryAgain.emit() }, this.translationService.i('process-api-retry').toString())))));
  }
  get hostEl() { return index.getElement(this); }
};
MbApiProcessStatus.style = mbApiProcessStatusCss;

const mbButtonCss = ":host{box-sizing:border-box;display:none}button{display:grid;place-items:center;position:relative;width:calc(var(--mb-component-button-size) - 2 * var(--mb-component-button-border-width));height:calc(var(--mb-component-button-size) - 2 * var(--mb-component-button-border-width));background-color:var(--mb-component-button-background);border-color:var(--mb-component-button-border-color);border-radius:var(--mb-component-button-border-radius);border-style:var(--mb-component-button-border-style);border-width:var(--mb-component-button-border-width);box-shadow:var(--mb-component-button-box-shadow);text-decoration:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer}button>*{-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none}button .icon-active{display:none}button:focus-visible{border-color:var(--mb-component-button-border-color--visible)}button:hover,button:active{border-color:var(--mb-component-button-border-color-hover)}button:hover .icon-active,button:active .icon-active{display:block}button:hover .icon-default,button:active .icon-default{display:none}button:active{box-shadow:0px 1px 6px rgba(0, 0, 0, 0.3)}button[disabled]{border-color:var(--mb-component-button-border-color-disabled);box-shadow:var(--mb-component-button-box-shadow-disabled);pointer-events:none;cursor:default}button[disabled]::before{opacity:0.5}:host(.visible){display:flex;flex-direction:column;align-items:center}:host(.selected) button{background-color:var(--mb-component-button-background-selected);border-color:var(--mb-component-button-border-color-selected)}label{cursor:inherit}span{display:block;padding-top:8px;font-size:var(--mb-component-font-size);font-weight:var(--mb-font-weight);line-height:var(--mb-line-height);color:var(--mb-feedback-font-color-info)}";

let MbButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, { class: classNames({
        visible: this.visible,
        selected: this.selected,
      }) }, index.h("button", { onClick: this.clickHandler, title: this.buttonTitle, disabled: this.disabled }, index.h("img", { class: "icon-default", src: this.imageSrcDefault, alt: "" }), index.h("img", { class: "icon-active", src: this.imageSrcActive, alt: "" })), this.label !== "" && index.h("span", null, this.label)));
  }
  get hostEl() { return index.getElement(this); }
};
MbButton.style = mbButtonCss;

const mbButtonClassicCss = ":host{box-sizing:border-box;display:block}:host button{display:block;border:none;margin:0;padding:7px 16px;color:var(--mb-component-button-classic-text-color);background:var(--mb-component-button-classic-background);border:1px solid var(--mb-component-button-classic-background);border-radius:var(--mb-component-button-classic-border-radius);font-family:var(--mb-font-family);font-size:var(--mb-component-button-classic-font-size);font-weight:var(--mb-component-button-classic-font-weight)}:host button:not([disabled]){cursor:pointer}:host button[disabled]{opacity:0.5;pointer-events:none}:host(.inverted) a{background-color:white;color:var(--mb-component-button-classic-inverted-text-color);border:1px solid var(--mb-component-button-classic-inverted-border-color)}:host(.inverted) a:hover,:host(.inverted) a:active,:host(.inverted) a:focus{cursor:pointer;background-color:var(--mb-component-button-classic-inverted-hover-background)}:host(.inverted) a:focus{border-color:var(--mb-component-button-classic-focused-border-color)}";

let MbButtonClassic = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Set to 'true' if button should be inverted style.
     */
    this.inverted = false;
    /**
     * Set to 'true' if button should be disabled, and if click events should not be triggered.
     */
    this.disabled = false;
    /**
     * Set to 'true' if default event should be prevented.
     */
    this.preventDefault = false;
  }
  connectedCallback() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (index.h(index.Host, null, index.h("button", { disabled: this.disabled, onClick: this.clickHandler }, index.h("slot", null))));
  }
  get hostEl() { return index.getElement(this); }
};
MbButtonClassic.style = mbButtonClassicCss;

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function getStateClass(state) {
  let stateClass = 'is-default';
  switch (state) {
    case CameraExperienceState.BarcodeScanning:
    case CameraExperienceState.Classification:
      stateClass = 'is-classification';
      break;
    case CameraExperienceState.Default:
      stateClass = 'is-default';
      break;
    case CameraExperienceState.Detection:
      stateClass = 'is-detection';
      break;
    case CameraExperienceState.MoveFarther:
      stateClass = 'is-error-move-farther';
      break;
    case CameraExperienceState.MoveCloser:
      stateClass = 'is-error-move-closer';
      break;
    case CameraExperienceState.AdjustAngle:
      stateClass = 'is-error-adjust-angle';
      break;
    case CameraExperienceState.Flip:
      stateClass = 'is-flip';
      break;
    case CameraExperienceState.Done:
      stateClass = 'is-done';
      break;
    case CameraExperienceState.DoneAll:
      stateClass = 'is-done-all';
      break;
    // Reset class
  }
  return stateClass;
}

const mbCameraExperienceCss = "@charset \"UTF-8\";@keyframes reticle-rotation{100%{transform:rotate(360deg)}}@keyframes reticle-horizontal-shrink{0%{height:50%;top:25%}50%{height:30%;top:35%}80%{height:30%;top:35%}100%{height:50%;top:25%}}@keyframes reticle-cursor-horizontal-flip{0%{opacity:0}100%{opacity:0}}@keyframes reticle-horizontal-flip{0%{border-radius:0;background-color:transparent;-webkit-backdrop-filter:none;backdrop-filter:none;filter:drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05));background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05Mi4yODk3IDAuNTc3NDg0SDMuNzEwMzFDMS42NzEzMSAwLjU3NzQ4NCAwIDIuMjQ4NzkgMCA0LjI4Nzc5VjU3LjA2NzdDMCA1OS4xMDY3IDEuNjcxMzEgNjAuNzc4MSAzLjcxMDMxIDYwLjc3ODFIOTIuMjg5N0M5NC4zMjg3IDYwLjc3ODEgOTYgNTkuMTA2NyA5NiA1Ny4wNjc3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRaTTM4LjMzOTggMzYuNTQ0MUMzOC4zMzk4IDM4LjAxNDggMzcuMTM2NSAzOS4yMTgyIDM1LjY2NTcgMzkuMjE4MkgzMy4xNTg4QzMyLjU5MDUgMzYuNzQ0NiAzMS4yNTM1IDM1LjAwNjUgMjguMDExMSAzNC4yMDQyTDI1LjMzNyAzMy41MzU3TDI3LjIwODkgMzEuNTMwMUMyOC42NDYyIDI5Ljk5MjUgMjkuNDgxOSAyNy43NTMgMjkuNDgxOSAyNS40MTMxQzI5LjQ4MTkgMjIuNzM5IDI4Ljg0NjggMTYuNTIxOCAyMy4wOTc1IDE2LjUyMThDMTguMTUwNCAxNi41MjE4IDE2LjM3ODggMjEuMTAxMiAxNi4zNzg4IDI1LjQxMzFDMTYuMzc4OCAyNy43NTMgMTcuMjE0NSAyOS45OTI1IDE4LjY1MTggMzEuNTMwMUwyMC41MjM3IDMzLjUzNTdMMTcuODQ5NiAzNC4yMDQyQzE0LjkwODEgMzQuOTM5NiAxMy40MDM5IDM2LjM3NjkgMTIuNzM1NCAzOS4yMTgySDEwLjIyODRDOC43NTc2NiAzOS4yMTgyIDcuNTU0MzIgMzguMDE0OCA3LjU1NDMyIDM2LjU0NDFWMTEuMDczM0M3LjU1NDMyIDkuNjAyNTUgOC43NTc2NiA4LjM5OTIxIDEwLjIyODQgOC4zOTkyMUgzNS42OTkyQzM3LjE2OTkgOC4zOTkyMSAzOC4zNzMzIDkuNjAyNTUgMzguMzczMyAxMS4wNzMzVjM2LjU0NDFIMzguMzM5OFpNNzMuMTAzMSAzNC4yNzExSDQ3LjE2NDNWMzAuOTI4NUg3My4xMDMxVjM0LjI3MTFaTTg4LjMxMiA1My44OTIzSDc2LjU3OTRWNTAuNTQ5Nkg4OC4zMTJWNTMuODkyM1pNODguMzEyIDI1LjQ4SDQ3LjE2NDNWMjIuMTM3NEg4OC4zMTJWMjUuNDhaTTg4LjMxMiAxNi42ODg5SDQ3LjE2NDNWMTMuMzQ2M0g4OC4zMTJWMTYuNjg4OVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==);opacity:0;transform:rotate3d()}5%{opacity:1}15%{transform:rotateY(0deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05Mi4yODk3IDAuNTc3NDg0SDMuNzEwMzFDMS42NzEzMSAwLjU3NzQ4NCAwIDIuMjQ4NzkgMCA0LjI4Nzc5VjU3LjA2NzdDMCA1OS4xMDY3IDEuNjcxMzEgNjAuNzc4MSAzLjcxMDMxIDYwLjc3ODFIOTIuMjg5N0M5NC4zMjg3IDYwLjc3ODEgOTYgNTkuMTA2NyA5NiA1Ny4wNjc3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRaTTM4LjMzOTggMzYuNTQ0MUMzOC4zMzk4IDM4LjAxNDggMzcuMTM2NSAzOS4yMTgyIDM1LjY2NTcgMzkuMjE4MkgzMy4xNTg4QzMyLjU5MDUgMzYuNzQ0NiAzMS4yNTM1IDM1LjAwNjUgMjguMDExMSAzNC4yMDQyTDI1LjMzNyAzMy41MzU3TDI3LjIwODkgMzEuNTMwMUMyOC42NDYyIDI5Ljk5MjUgMjkuNDgxOSAyNy43NTMgMjkuNDgxOSAyNS40MTMxQzI5LjQ4MTkgMjIuNzM5IDI4Ljg0NjggMTYuNTIxOCAyMy4wOTc1IDE2LjUyMThDMTguMTUwNCAxNi41MjE4IDE2LjM3ODggMjEuMTAxMiAxNi4zNzg4IDI1LjQxMzFDMTYuMzc4OCAyNy43NTMgMTcuMjE0NSAyOS45OTI1IDE4LjY1MTggMzEuNTMwMUwyMC41MjM3IDMzLjUzNTdMMTcuODQ5NiAzNC4yMDQyQzE0LjkwODEgMzQuOTM5NiAxMy40MDM5IDM2LjM3NjkgMTIuNzM1NCAzOS4yMTgySDEwLjIyODRDOC43NTc2NiAzOS4yMTgyIDcuNTU0MzIgMzguMDE0OCA3LjU1NDMyIDM2LjU0NDFWMTEuMDczM0M3LjU1NDMyIDkuNjAyNTUgOC43NTc2NiA4LjM5OTIxIDEwLjIyODQgOC4zOTkyMUgzNS42OTkyQzM3LjE2OTkgOC4zOTkyMSAzOC4zNzMzIDkuNjAyNTUgMzguMzczMyAxMS4wNzMzVjM2LjU0NDFIMzguMzM5OFpNNzMuMTAzMSAzNC4yNzExSDQ3LjE2NDNWMzAuOTI4NUg3My4xMDMxVjM0LjI3MTFaTTg4LjMxMiA1My44OTIzSDc2LjU3OTRWNTAuNTQ5Nkg4OC4zMTJWNTMuODkyM1pNODguMzEyIDI1LjQ4SDQ3LjE2NDNWMjIuMTM3NEg4OC4zMTJWMjUuNDhaTTg4LjMxMiAxNi42ODg5SDQ3LjE2NDNWMTMuMzQ2M0g4OC4zMTJWMTYuNjg4OVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==)}20%{transform:rotateY(90deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05NiAxMC4wMDM3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRIMy43MTAzMUMxLjY3MTMxIDAuNTc3NDg0IDAgMi4yNDg3OSAwIDQuMjg3NzlWMTAuMDAzN0g5NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0wIDIwLjAzMTVWNTcuMDY3OEMwIDU5LjEwNjcgMS42NzEzMSA2MC43NzgxIDMuNzEwMzEgNjAuNzc4MUg5Mi4yODk3Qzk0LjMyODcgNjAuNzc4MSA5NiA1OS4xMDY3IDk2IDU3LjA2NzhWMjAuMDMxNUgwWk04OC4yNzg2IDUzLjgyNTRINy43MjE0NVY1MC40ODI4SDg4LjI3ODZWNTMuODI1NFpNODguMjc4NiA0NS4xMzQ2SDcuNzIxNDVWNDEuNzkySDg4LjI3ODZWNDUuMTM0NloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==)}25%{transform:rotateY(-15deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05NiAxMC4wMDM3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRIMy43MTAzMUMxLjY3MTMxIDAuNTc3NDg0IDAgMi4yNDg3OSAwIDQuMjg3NzlWMTAuMDAzN0g5NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0wIDIwLjAzMTVWNTcuMDY3OEMwIDU5LjEwNjcgMS42NzEzMSA2MC43NzgxIDMuNzEwMzEgNjAuNzc4MUg5Mi4yODk3Qzk0LjMyODcgNjAuNzc4MSA5NiA1OS4xMDY3IDk2IDU3LjA2NzhWMjAuMDMxNUgwWk04OC4yNzg2IDUzLjgyNTRINy43MjE0NVY1MC40ODI4SDg4LjI3ODZWNTMuODI1NFpNODguMjc4NiA0NS4xMzQ2SDcuNzIxNDVWNDEuNzkySDg4LjI3ODZWNDUuMTM0NloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==)}30%{transform:rotateY(0deg)}95%{opacity:1}100%{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNjEiIHZpZXdCb3g9IjAgMCA5NiA2MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik05NiAxMC4wMDM3VjQuMjg3NzlDOTYgMi4yNDg3OSA5NC4zMjg3IDAuNTc3NDg0IDkyLjI4OTcgMC41Nzc0ODRIMy43MTAzMUMxLjY3MTMxIDAuNTc3NDg0IDAgMi4yNDg3OSAwIDQuMjg3NzlWMTAuMDAzN0g5NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0wIDIwLjAzMTVWNTcuMDY3OEMwIDU5LjEwNjcgMS42NzEzMSA2MC43NzgxIDMuNzEwMzEgNjAuNzc4MUg5Mi4yODk3Qzk0LjMyODcgNjAuNzc4MSA5NiA1OS4xMDY3IDk2IDU3LjA2NzhWMjAuMDMxNUgwWk04OC4yNzg2IDUzLjgyNTRINy43MjE0NVY1MC40ODI4SDg4LjI3ODZWNTMuODI1NFpNODguMjc4NiA0NS4xMzQ2SDcuNzIxNDVWNDEuNzkySDg4LjI3ODZWNDUuMTM0NloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNjAuMjAwNiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMC41Nzc0ODQpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==);border-radius:0;-webkit-backdrop-filter:none;backdrop-filter:none;background-color:transparent;opacity:0}}:host .reticle{box-sizing:border-box;position:relative;width:100%;height:100%;border-radius:50%;background-color:rgba(107, 114, 128, 0.3);background-position:center;background-size:contain;background-repeat:no-repeat;-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter));transition:all 0.4s ease}:host .reticle__cursor{box-sizing:border-box;display:block;position:absolute;width:50%;height:50%;left:25%;top:25%;border-radius:50%;border-color:transparent;border-style:solid;border-width:4px;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74);background-position:center;background-size:contain;background-repeat:no-repeat}:host .reticle__cursor::before{content:\"\";position:absolute;width:4px;height:4px;top:50%;left:50%;transition:all 0.2s ease;transform-origin:center;transform:translate(-50%, -50%);background-color:#ffffff;border-radius:50%}:host .reticle__cursor::after{content:\"\";position:absolute;top:-4px;left:-4px;width:calc(50% + 4px);height:calc(50% + 4px);display:block;border-left-width:4px;border-left-style:solid;border-left-color:#ffffff;border-top-width:4px;border-top-style:solid;border-top-color:#ffffff;border-top-left-radius:100%;transition:all 0.2s ease;opacity:0;filter:drop-shadow(0 0 4px rgba(0, 0, 0, 0.1))}:host .reticle__el{box-sizing:border-box}:host .reticle__done{display:block;position:absolute;width:50%;height:50%;left:25%;top:25%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74);transform-origin:center;transform:rotate(15deg) translateY(-5%);opacity:0}:host .reticle.is-default~.label[data-message=is-default],:host .reticle.is-detection~.label[data-message=is-detection],:host .reticle.is-classification~.label[data-message=is-classification],:host .reticle.is-done~.label[data-message=is-done],:host .reticle.is-done-all~.label[data-message=is-done-all],:host .reticle.is-flip~.label[data-message=is-flip],:host .reticle.is-error-move-farther~.label[data-message=is-error-move-farther],:host .reticle.is-error-move-closer~.label[data-message=is-error-move-closer],:host .reticle.is-error-adjust-angle~.label[data-message=is-error-adjust-angle]{opacity:1;visibility:visible;margin:8px 0 0 0}:host .reticle.is-default .reticle__cursor{animation:reticle-rotation 1000ms ease-in-out infinite;border-style:none}:host .reticle.is-default .reticle__el{position:absolute;display:block;width:50%;height:50%;overflow:hidden}:host .reticle.is-default .reticle__el::after,:host .reticle.is-default .reticle__el::before{content:\"\";position:absolute;display:block;width:100%;height:100%}:host .reticle.is-default .reticle__el:nth-child(1){top:0;left:0}:host .reticle.is-default .reticle__el:nth-child(1)::after,:host .reticle.is-default .reticle__el:nth-child(1)::before{top:0;left:0;border-top:4px solid rgba(255, 255, 255, 0.5);border-left:4px solid rgba(255, 255, 255, 0.5);border-top-left-radius:100%;transform-origin:bottom right}:host .reticle.is-default .reticle__el:nth-child(1)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(1)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(2){top:0;right:0}:host .reticle.is-default .reticle__el:nth-child(2)::after,:host .reticle.is-default .reticle__el:nth-child(2)::before{top:0;right:0;border-top:4px solid rgba(255, 255, 255, 0.5);border-right:4px solid rgba(255, 255, 255, 0.5);border-top-right-radius:100%;transform-origin:bottom left}:host .reticle.is-default .reticle__el:nth-child(2)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(2)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(3){bottom:0;right:0}:host .reticle.is-default .reticle__el:nth-child(3)::after,:host .reticle.is-default .reticle__el:nth-child(3)::before{bottom:0;right:0;transform-origin:top left;border-bottom:4px solid rgba(255, 255, 255, 0.5);border-right:4px solid rgba(255, 255, 255, 0.5);border-bottom-right-radius:100%}:host .reticle.is-default .reticle__el:nth-child(3)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(3)::before{transform:rotate(-67.5deg)}:host .reticle.is-default .reticle__el:nth-child(4){bottom:0;left:0}:host .reticle.is-default .reticle__el:nth-child(4)::after,:host .reticle.is-default .reticle__el:nth-child(4)::before{bottom:0;left:0;border-bottom:4px solid rgba(255, 255, 255, 0.5);border-left:4px solid rgba(255, 255, 255, 0.5);border-bottom-left-radius:100%;transform-origin:top right}:host .reticle.is-default .reticle__el:nth-child(4)::after{transform:rotate(67.5deg)}:host .reticle.is-default .reticle__el:nth-child(4)::before{transform:rotate(-67.5deg)}:host .reticle.is-detection .reticle__cursor{border-color:rgba(255, 255, 255, 0.75)}:host .reticle.is-classification .reticle__cursor{animation:reticle-rotation 250ms cubic-bezier(0.4, 0.02, 1, 1) infinite;border-style:solid;border-color:rgba(255, 255, 255, 0.25)}:host .reticle.is-classification .reticle__cursor::after{opacity:1}:host .reticle.is-flip{animation:reticle-horizontal-flip 3.5s cubic-bezier(0.4, 0.02, 1, 1) both}:host .reticle.is-flip .reticle__cursor{transform-style:preserve-3d;animation:reticle-cursor-horizontal-flip 3.5s cubic-bezier(0.4, 0.02, 1, 1) both}:host .reticle.is-done{display:none}:host .reticle.is-done-all{background-color:#ffffff;box-shadow:0px 2px 24px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05);transition:all 125ms cubic-bezier(0.4, 0.02, 1, 1)}:host .reticle.is-done-all .reticle__done{transform:rotate(0) translateY(0);opacity:1}:host .reticle.is-done-all .reticle__cursor::before{width:150vw;height:150vh;opacity:0;transition:all 200ms ease}:host .reticle.is-error-move-farther{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-move-farther .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);width:40%;height:40%;left:30%;top:30%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .reticle.is-error-move-closer{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-move-closer .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);width:60%;height:60%;left:20%;top:20%;transition:all 125ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .reticle.is-error-adjust-angle{background-color:rgba(255, 45, 85, 0.75)}:host .reticle.is-error-adjust-angle .reticle__cursor{border-color:rgba(255, 255, 255, 0.75);animation:reticle-horizontal-shrink 600ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}@keyframes rectangle-shrink-animation{0%{transform:scale(1)}50%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes error-animation{0%{width:32px;height:32px}16%{width:100%;height:100%}84%{width:100%;height:100%}100%{width:32px;height:32px}}@keyframes error-animation-extended{0%{width:32px;height:32px}20%{width:100%;height:100%}80%{width:100%;height:100%}100%{width:32px;height:32px}}@keyframes scanning-line-animation{0%{top:-60%}45%{transform:matrix(1, 0, 0, 1, 0, 0)}50%{top:120%;transform:matrix(1, 0, 0, -1, 0, 0)}95%{transform:matrix(1, 0, 0, -1, 0, 0)}100%{top:-60%;transform:matrix(1, 0, 0, 1, 0, 0)}}@keyframes rectangle-horizontal-flip{0%{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA0IiBoZWlnaHQ9IjE0NiIgdmlld0JveD0iMCAwIDIwNCAxNDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2QpIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMC40ODc5IDIyLjE5NTNDMjYuOTA0NyAyMi4xOTUzIDI0IDI1LjEwMDEgMjQgMjguNjgzM1YxMTMuMDI3QzI0IDExNi42MSAyNi45MDQ3IDExOS41MTUgMzAuNDg3OSAxMTkuNTE1SDE3My4yMjJDMTc2LjgwNSAxMTkuNTE1IDE3OS43MSAxMTYuNjEgMTc5LjcxIDExMy4wMjdWMjguNjgzM0MxNzkuNzEgMjUuMTAwMSAxNzYuODA1IDIyLjE5NTMgMTczLjIyMiAyMi4xOTUzSDMwLjQ4NzlaTTQ1LjQ5MTIgNDQuMDkyMkM0My42OTk2IDQ0LjA5MjIgNDIuMjQ3MyA0NS41NDQ1IDQyLjI0NzMgNDcuMzM2MVY1OS4wOTU2QzQyLjI0NzMgNjAuODg3MiA0My42OTk2IDYyLjMzOTUgNDUuNDkxMiA2Mi4zMzk1SDY4LjE5ODlDNjkuOTkwNSA2Mi4zMzk1IDcxLjQ0MjkgNjAuODg3MiA3MS40NDI5IDU5LjA5NTZWNDcuMzM2MUM3MS40NDI5IDQ1LjU0NDUgNjkuOTkwNSA0NC4wOTIyIDY4LjE5ODkgNDQuMDkyMkg0NS40OTEyWk00Mi4yNDczIDc3Ljc0ODRDNDIuMjQ3MyA3NS45NTY4IDQzLjY5OTYgNzQuNTA0NSA0NS40OTEyIDc0LjUwNDVIMTU4LjIxOUMxNjAuMDEgNzQuNTA0NSAxNjEuNDYzIDc1Ljk1NjggMTYxLjQ2MyA3Ny43NDg0Vjc4LjU1OTRDMTYxLjQ2MyA4MC4zNTEgMTYwLjAxIDgxLjgwMzQgMTU4LjIxOSA4MS44MDM0SDQ1LjQ5MTJDNDMuNjk5NiA4MS44MDM0IDQyLjI0NzMgODAuMzUxIDQyLjI0NzMgNzguNTU5NFY3Ny43NDg0Wk00NS40OTEyIDkwLjMxODlDNDMuNjk5NiA5MC4zMTg5IDQyLjI0NzMgOTEuNzcxMiA0Mi4yNDczIDkzLjU2MjhWOTQuMzczOEM0Mi4yNDczIDk2LjE2NTQgNDMuNjk5NiA5Ny42MTc4IDQ1LjQ5MTIgOTcuNjE3OEgxMDMuNDc3QzEwNS4yNjkgOTcuNjE3OCAxMDYuNzIxIDk2LjE2NTQgMTA2LjcyMSA5NC4zNzM4VjkzLjU2MjhDMTA2LjcyMSA5MS43NzEyIDEwNS4yNjkgOTAuMzE4OSAxMDMuNDc3IDkwLjMxODlINDUuNDkxMloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMCIgeT0iMC4xOTUzMTIiIHdpZHRoPSIyMDMuNzEiIGhlaWdodD0iMTQ1LjMxOSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPgo8ZmVPZmZzZXQgZHk9IjIiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=);opacity:0}5%{opacity:1}15%{transform:rotateY(0deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA0IiBoZWlnaHQ9IjE0NiIgdmlld0JveD0iMCAwIDIwNCAxNDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2QpIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMC40ODc5IDIyLjE5NTNDMjYuOTA0NyAyMi4xOTUzIDI0IDI1LjEwMDEgMjQgMjguNjgzM1YxMTMuMDI3QzI0IDExNi42MSAyNi45MDQ3IDExOS41MTUgMzAuNDg3OSAxMTkuNTE1SDE3My4yMjJDMTc2LjgwNSAxMTkuNTE1IDE3OS43MSAxMTYuNjEgMTc5LjcxIDExMy4wMjdWMjguNjgzM0MxNzkuNzEgMjUuMTAwMSAxNzYuODA1IDIyLjE5NTMgMTczLjIyMiAyMi4xOTUzSDMwLjQ4NzlaTTQ1LjQ5MTIgNDQuMDkyMkM0My42OTk2IDQ0LjA5MjIgNDIuMjQ3MyA0NS41NDQ1IDQyLjI0NzMgNDcuMzM2MVY1OS4wOTU2QzQyLjI0NzMgNjAuODg3MiA0My42OTk2IDYyLjMzOTUgNDUuNDkxMiA2Mi4zMzk1SDY4LjE5ODlDNjkuOTkwNSA2Mi4zMzk1IDcxLjQ0MjkgNjAuODg3MiA3MS40NDI5IDU5LjA5NTZWNDcuMzM2MUM3MS40NDI5IDQ1LjU0NDUgNjkuOTkwNSA0NC4wOTIyIDY4LjE5ODkgNDQuMDkyMkg0NS40OTEyWk00Mi4yNDczIDc3Ljc0ODRDNDIuMjQ3MyA3NS45NTY4IDQzLjY5OTYgNzQuNTA0NSA0NS40OTEyIDc0LjUwNDVIMTU4LjIxOUMxNjAuMDEgNzQuNTA0NSAxNjEuNDYzIDc1Ljk1NjggMTYxLjQ2MyA3Ny43NDg0Vjc4LjU1OTRDMTYxLjQ2MyA4MC4zNTEgMTYwLjAxIDgxLjgwMzQgMTU4LjIxOSA4MS44MDM0SDQ1LjQ5MTJDNDMuNjk5NiA4MS44MDM0IDQyLjI0NzMgODAuMzUxIDQyLjI0NzMgNzguNTU5NFY3Ny43NDg0Wk00NS40OTEyIDkwLjMxODlDNDMuNjk5NiA5MC4zMTg5IDQyLjI0NzMgOTEuNzcxMiA0Mi4yNDczIDkzLjU2MjhWOTQuMzczOEM0Mi4yNDczIDk2LjE2NTQgNDMuNjk5NiA5Ny42MTc4IDQ1LjQ5MTIgOTcuNjE3OEgxMDMuNDc3QzEwNS4yNjkgOTcuNjE3OCAxMDYuNzIxIDk2LjE2NTQgMTA2LjcyMSA5NC4zNzM4VjkzLjU2MjhDMTA2LjcyMSA5MS43NzEyIDEwNS4yNjkgOTAuMzE4OSAxMDMuNDc3IDkwLjMxODlINDUuNDkxMloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMCIgeT0iMC4xOTUzMTIiIHdpZHRoPSIyMDMuNzEiIGhlaWdodD0iMTQ1LjMxOSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPgo8ZmVPZmZzZXQgZHk9IjIiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=)}20%{transform:rotateY(90deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA0IiBoZWlnaHQ9IjE0NiIgdmlld0JveD0iMCAwIDIwNCAxNDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2QpIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNzMuMjIyIDIyLjE5NTNDMTc2LjgwNSAyMi4xOTUzIDE3OS43MSAyNS4xMDAxIDE3OS43MSAyOC42ODMzVjExMy4wMjdDMTc5LjcxIDExNi42MSAxNzYuODA1IDExOS41MTUgMTczLjIyMiAxMTkuNTE1SDMwLjQ4NzlDMjYuOTA0NyAxMTkuNTE1IDIzLjk5OTkgMTE2LjYxIDIzLjk5OTkgMTEzLjAyN1YyOC42ODMzQzIzLjk5OTkgMjUuMTAwMSAyNi45MDQ3IDIyLjE5NTMgMzAuNDg3OSAyMi4xOTUzSDE3My4yMjJaTTE1OC4yMTkgNDQuMDkyMkMxNjAuMDEgNDQuMDkyMiAxNjEuNDYzIDQ1LjU0NDUgMTYxLjQ2MyA0Ny4zMzYxVjU5LjA5NTZDMTYxLjQ2MyA2MC44ODcyIDE2MC4wMSA2Mi4zMzk1IDE1OC4yMTkgNjIuMzM5NUgxMzUuNTExQzEzMy43MTkgNjIuMzM5NSAxMzIuMjY3IDYwLjg4NzIgMTMyLjI2NyA1OS4wOTU2VjQ3LjMzNjFDMTMyLjI2NyA0NS41NDQ1IDEzMy43MTkgNDQuMDkyMiAxMzUuNTExIDQ0LjA5MjJIMTU4LjIxOVpNMTYxLjQ2MyA3Ny43NDg0QzE2MS40NjMgNzUuOTU2OCAxNjAuMDEgNzQuNTA0NSAxNTguMjE5IDc0LjUwNDVINDUuNDkxMkM0My42OTk2IDc0LjUwNDUgNDIuMjQ3MiA3NS45NTY4IDQyLjI0NzIgNzcuNzQ4NFY3OC41NTk0QzQyLjI0NzIgODAuMzUxIDQzLjY5OTYgODEuODAzNCA0NS40OTEyIDgxLjgwMzRIMTU4LjIxOUMxNjAuMDEgODEuODAzNCAxNjEuNDYzIDgwLjM1MSAxNjEuNDYzIDc4LjU1OTRWNzcuNzQ4NFpNMTU4LjIxOSA5MC4zMTg5QzE2MC4wMSA5MC4zMTg5IDE2MS40NjMgOTEuNzcxMiAxNjEuNDYzIDkzLjU2MjhWOTQuMzczOEMxNjEuNDYzIDk2LjE2NTQgMTYwLjAxIDk3LjYxNzggMTU4LjIxOSA5Ny42MTc4SDEwMC4yMzNDOTguNDQxNCA5Ny42MTc4IDk2Ljk4OSA5Ni4xNjU0IDk2Ljk4OSA5NC4zNzM4VjkzLjU2MjhDOTYuOTg5IDkxLjc3MTIgOTguNDQxNCA5MC4zMTg5IDEwMC4yMzMgOTAuMzE4OUgxNTguMjE5WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwLjE5NTMxMiIgd2lkdGg9IjIwMy43MSIgaGVpZ2h0PSIxNDUuMzE5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMiIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMiIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==)}25%{transform:rotateY(-15deg);background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA0IiBoZWlnaHQ9IjE0NiIgdmlld0JveD0iMCAwIDIwNCAxNDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2QpIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNzMuMjIyIDIyLjE5NTNDMTc2LjgwNSAyMi4xOTUzIDE3OS43MSAyNS4xMDAxIDE3OS43MSAyOC42ODMzVjExMy4wMjdDMTc5LjcxIDExNi42MSAxNzYuODA1IDExOS41MTUgMTczLjIyMiAxMTkuNTE1SDMwLjQ4NzlDMjYuOTA0NyAxMTkuNTE1IDIzLjk5OTkgMTE2LjYxIDIzLjk5OTkgMTEzLjAyN1YyOC42ODMzQzIzLjk5OTkgMjUuMTAwMSAyNi45MDQ3IDIyLjE5NTMgMzAuNDg3OSAyMi4xOTUzSDE3My4yMjJaTTE1OC4yMTkgNDQuMDkyMkMxNjAuMDEgNDQuMDkyMiAxNjEuNDYzIDQ1LjU0NDUgMTYxLjQ2MyA0Ny4zMzYxVjU5LjA5NTZDMTYxLjQ2MyA2MC44ODcyIDE2MC4wMSA2Mi4zMzk1IDE1OC4yMTkgNjIuMzM5NUgxMzUuNTExQzEzMy43MTkgNjIuMzM5NSAxMzIuMjY3IDYwLjg4NzIgMTMyLjI2NyA1OS4wOTU2VjQ3LjMzNjFDMTMyLjI2NyA0NS41NDQ1IDEzMy43MTkgNDQuMDkyMiAxMzUuNTExIDQ0LjA5MjJIMTU4LjIxOVpNMTYxLjQ2MyA3Ny43NDg0QzE2MS40NjMgNzUuOTU2OCAxNjAuMDEgNzQuNTA0NSAxNTguMjE5IDc0LjUwNDVINDUuNDkxMkM0My42OTk2IDc0LjUwNDUgNDIuMjQ3MiA3NS45NTY4IDQyLjI0NzIgNzcuNzQ4NFY3OC41NTk0QzQyLjI0NzIgODAuMzUxIDQzLjY5OTYgODEuODAzNCA0NS40OTEyIDgxLjgwMzRIMTU4LjIxOUMxNjAuMDEgODEuODAzNCAxNjEuNDYzIDgwLjM1MSAxNjEuNDYzIDc4LjU1OTRWNzcuNzQ4NFpNMTU4LjIxOSA5MC4zMTg5QzE2MC4wMSA5MC4zMTg5IDE2MS40NjMgOTEuNzcxMiAxNjEuNDYzIDkzLjU2MjhWOTQuMzczOEMxNjEuNDYzIDk2LjE2NTQgMTYwLjAxIDk3LjYxNzggMTU4LjIxOSA5Ny42MTc4SDEwMC4yMzNDOTguNDQxNCA5Ny42MTc4IDk2Ljk4OSA5Ni4xNjU0IDk2Ljk4OSA5NC4zNzM4VjkzLjU2MjhDOTYuOTg5IDkxLjc3MTIgOTguNDQxNCA5MC4zMTg5IDEwMC4yMzMgOTAuMzE4OUgxNTguMjE5WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwLjE5NTMxMiIgd2lkdGg9IjIwMy43MSIgaGVpZ2h0PSIxNDUuMzE5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMiIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMiIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==)}30%{transform:rotateY(0deg)}95%{opacity:1}100%{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA0IiBoZWlnaHQ9IjE0NiIgdmlld0JveD0iMCAwIDIwNCAxNDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2QpIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNzMuMjIyIDIyLjE5NTNDMTc2LjgwNSAyMi4xOTUzIDE3OS43MSAyNS4xMDAxIDE3OS43MSAyOC42ODMzVjExMy4wMjdDMTc5LjcxIDExNi42MSAxNzYuODA1IDExOS41MTUgMTczLjIyMiAxMTkuNTE1SDMwLjQ4NzlDMjYuOTA0NyAxMTkuNTE1IDIzLjk5OTkgMTE2LjYxIDIzLjk5OTkgMTEzLjAyN1YyOC42ODMzQzIzLjk5OTkgMjUuMTAwMSAyNi45MDQ3IDIyLjE5NTMgMzAuNDg3OSAyMi4xOTUzSDE3My4yMjJaTTE1OC4yMTkgNDQuMDkyMkMxNjAuMDEgNDQuMDkyMiAxNjEuNDYzIDQ1LjU0NDUgMTYxLjQ2MyA0Ny4zMzYxVjU5LjA5NTZDMTYxLjQ2MyA2MC44ODcyIDE2MC4wMSA2Mi4zMzk1IDE1OC4yMTkgNjIuMzM5NUgxMzUuNTExQzEzMy43MTkgNjIuMzM5NSAxMzIuMjY3IDYwLjg4NzIgMTMyLjI2NyA1OS4wOTU2VjQ3LjMzNjFDMTMyLjI2NyA0NS41NDQ1IDEzMy43MTkgNDQuMDkyMiAxMzUuNTExIDQ0LjA5MjJIMTU4LjIxOVpNMTYxLjQ2MyA3Ny43NDg0QzE2MS40NjMgNzUuOTU2OCAxNjAuMDEgNzQuNTA0NSAxNTguMjE5IDc0LjUwNDVINDUuNDkxMkM0My42OTk2IDc0LjUwNDUgNDIuMjQ3MiA3NS45NTY4IDQyLjI0NzIgNzcuNzQ4NFY3OC41NTk0QzQyLjI0NzIgODAuMzUxIDQzLjY5OTYgODEuODAzNCA0NS40OTEyIDgxLjgwMzRIMTU4LjIxOUMxNjAuMDEgODEuODAzNCAxNjEuNDYzIDgwLjM1MSAxNjEuNDYzIDc4LjU1OTRWNzcuNzQ4NFpNMTU4LjIxOSA5MC4zMTg5QzE2MC4wMSA5MC4zMTg5IDE2MS40NjMgOTEuNzcxMiAxNjEuNDYzIDkzLjU2MjhWOTQuMzczOEMxNjEuNDYzIDk2LjE2NTQgMTYwLjAxIDk3LjYxNzggMTU4LjIxOSA5Ny42MTc4SDEwMC4yMzNDOTguNDQxNCA5Ny42MTc4IDk2Ljk4OSA5Ni4xNjU0IDk2Ljk4OSA5NC4zNzM4VjkzLjU2MjhDOTYuOTg5IDkxLjc3MTIgOTguNDQxNCA5MC4zMTg5IDEwMC4yMzMgOTAuMzE4OUgxNTguMjE5WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSIwIiB5PSIwLjE5NTMxMiIgd2lkdGg9IjIwMy43MSIgaGVpZ2h0PSIxNDUuMzE5IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldCBkeT0iMiIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMiIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==);opacity:0}}:host #card-payment .rectangle{box-sizing:border-box;position:relative;background-color:transparent;background-position:center;background-repeat:no-repeat;transition:all 0.3s ease-in;order:1;flex:0 1 327px}:host #card-payment .rectangle__cursor{width:calc(100% + 4px);height:calc(100% + 4px);border-radius:8px;position:relative;top:-2px;left:-2px;overflow:hidden}:host #card-payment .rectangle__el{box-sizing:border-box;position:absolute;display:block;width:50%;height:50%;overflow:hidden}:host #card-payment .rectangle__el::after,:host #card-payment .rectangle__el::before{content:\"\";position:absolute;display:block;width:32px;height:32px}:host #card-payment .rectangle__el:nth-child(1){top:0;left:0}:host #card-payment .rectangle__el:nth-child(1)::after,:host #card-payment .rectangle__el:nth-child(1)::before{top:0;left:0;border-top:4px solid white;border-left:4px solid white;border-top-left-radius:8px;box-shadow:inset 3px 3px 8px -6px rgba(0, 0, 0, 0.2), -3px -3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #card-payment .rectangle__el:nth-child(2){top:0;right:0}:host #card-payment .rectangle__el:nth-child(2)::after,:host #card-payment .rectangle__el:nth-child(2)::before{top:0;right:0;border-top:4px solid white;border-right:4px solid white;border-top-right-radius:8px;box-shadow:inset -3px 3px 8px -6px rgba(0, 0, 0, 0.2), 3px -3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #card-payment .rectangle__el:nth-child(3){bottom:0;right:0}:host #card-payment .rectangle__el:nth-child(3)::after,:host #card-payment .rectangle__el:nth-child(3)::before{bottom:0;right:0;border-bottom:4px solid white;border-right:4px solid white;border-bottom-right-radius:8px;box-shadow:inset -3px -3px 8px -6px rgba(0, 0, 0, 0.2), 3px 3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #card-payment .rectangle__el:nth-child(4){bottom:0;left:0}:host #card-payment .rectangle__el:nth-child(4)::after,:host #card-payment .rectangle__el:nth-child(4)::before{bottom:0;left:0;border-bottom:4px solid white;border-left:4px solid white;border-bottom-left-radius:8px;box-shadow:inset 3px -3px 8px -6px rgba(0, 0, 0, 0.2), -3px 3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #card-payment .rectangle.is-default~.label[data-message=is-default],:host #card-payment .rectangle.is-detection~.label[data-message=is-detection],:host #card-payment .rectangle.is-classification~.label[data-message=is-classification],:host #card-payment .rectangle.is-done~.label[data-message=is-done],:host #card-payment .rectangle.is-done-all~.label[data-message=is-done-all],:host #card-payment .rectangle.is-flip~.label[data-message=is-flip],:host #card-payment .rectangle.is-error-move-farther~.label[data-message=is-error-move-farther],:host #card-payment .rectangle.is-error-move-closer~.label[data-message=is-error-move-closer],:host #card-payment .rectangle.is-error-adjust-angle~.label[data-message=is-error-adjust-angle]{opacity:1;visibility:visible;margin:8px 0 0 0}:host #card-payment .rectangle.is-flip{background:rgba(0, 0, 0, 0.2)}:host #card-payment .rectangle.is-flip .rectangle__el{display:none}:host #card-payment .rectangle.is-flip .rectangle__cursor{border-radius:0;background-color:transparent;background-size:auto;background-repeat:no-repeat;background-position:center;-webkit-backdrop-filter:none;backdrop-filter:none;filter:drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.05));transform:rotate3d(0);transform-style:preserve-3d;animation:rectangle-horizontal-flip 3.5s cubic-bezier(0.4, 0.02, 1, 1) both 0.5s}:host #card-payment .rectangle.is-done,:host #card-payment .rectangle.is-done-all{-webkit-animation-delay:0;-webkit-animation-duration:250ms;-webkit-animation-name:rectangle-shrink-animation;-moz-animation-delay:0;-moz-animation-duration:250ms;-moz-animation-name:rectangle-shrink-animation;animation-delay:0;animation-duration:250ms;animation-name:rectangle-shrink-animation}:host #card-payment .rectangle.is-error-move-farther .rectangle__el:nth-child(1)::after,:host #card-payment .rectangle.is-error-move-farther .rectangle__el:nth-child(1)::before,:host #card-payment .rectangle.is-error-move-closer .rectangle__el:nth-child(1)::after,:host #card-payment .rectangle.is-error-move-closer .rectangle__el:nth-child(1)::before,:host #card-payment .rectangle.is-error-adjust-angle .rectangle__el:nth-child(1)::after,:host #card-payment .rectangle.is-error-adjust-angle .rectangle__el:nth-child(1)::before{border-top:4px solid #FF2D55;border-left:4px solid #FF2D55;animation:1800ms 0s error-animation ease-in}:host #card-payment .rectangle.is-error-move-farther .rectangle__el:nth-child(2)::after,:host #card-payment .rectangle.is-error-move-farther .rectangle__el:nth-child(2)::before,:host #card-payment .rectangle.is-error-move-closer .rectangle__el:nth-child(2)::after,:host #card-payment .rectangle.is-error-move-closer .rectangle__el:nth-child(2)::before,:host #card-payment .rectangle.is-error-adjust-angle .rectangle__el:nth-child(2)::after,:host #card-payment .rectangle.is-error-adjust-angle .rectangle__el:nth-child(2)::before{border-top:4px solid #FF2D55;border-right:4px solid #FF2D55;animation:1800ms 0s error-animation ease-in}:host #card-payment .rectangle.is-error-move-farther .rectangle__el:nth-child(3)::after,:host #card-payment .rectangle.is-error-move-farther .rectangle__el:nth-child(3)::before,:host #card-payment .rectangle.is-error-move-closer .rectangle__el:nth-child(3)::after,:host #card-payment .rectangle.is-error-move-closer .rectangle__el:nth-child(3)::before,:host #card-payment .rectangle.is-error-adjust-angle .rectangle__el:nth-child(3)::after,:host #card-payment .rectangle.is-error-adjust-angle .rectangle__el:nth-child(3)::before{border-bottom:4px solid #FF2D55;border-right:4px solid #FF2D55;animation:1800ms 0s error-animation ease-in}:host #card-payment .rectangle.is-error-move-farther .rectangle__el:nth-child(4)::after,:host #card-payment .rectangle.is-error-move-farther .rectangle__el:nth-child(4)::before,:host #card-payment .rectangle.is-error-move-closer .rectangle__el:nth-child(4)::after,:host #card-payment .rectangle.is-error-move-closer .rectangle__el:nth-child(4)::before,:host #card-payment .rectangle.is-error-adjust-angle .rectangle__el:nth-child(4)::after,:host #card-payment .rectangle.is-error-adjust-angle .rectangle__el:nth-child(4)::before{border-bottom:4px solid #FF2D55;border-left:4px solid #FF2D55;animation:1800ms 0s error-animation ease-in}:host .scanning-line{opacity:0;visibility:hidden;position:absolute;width:100%;height:115px;left:0px;top:-125px;background:radial-gradient(100% 100% at 49.85% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);filter:blur(var(--mb-blur-scanning-line))}:host .scanning-line.is-active{opacity:1;visibility:visible;animation:scanning-line-animation 2400ms cubic-bezier(0.13, 0.71, 1, 0.82) infinite}@media only screen and (min-width: 1440px){:host .rectangle.is-error-move-farther .rectangle__el:nth-child(1)::after,:host .rectangle.is-error-move-farther .rectangle__el:nth-child(1)::before,:host .rectangle.is-error-move-closer .rectangle__el:nth-child(1)::after,:host .rectangle.is-error-move-closer .rectangle__el:nth-child(1)::before,:host .rectangle.is-error-adjust-angle .rectangle__el:nth-child(1)::after,:host .rectangle.is-error-adjust-angle .rectangle__el:nth-child(1)::before{border-top:4px solid #FF2D55;border-left:4px solid #FF2D55;animation:2400ms 0s error-animation-extended ease-in !important}:host .rectangle.is-error-move-farther .rectangle__el:nth-child(2)::after,:host .rectangle.is-error-move-farther .rectangle__el:nth-child(2)::before,:host .rectangle.is-error-move-closer .rectangle__el:nth-child(2)::after,:host .rectangle.is-error-move-closer .rectangle__el:nth-child(2)::before,:host .rectangle.is-error-adjust-angle .rectangle__el:nth-child(2)::after,:host .rectangle.is-error-adjust-angle .rectangle__el:nth-child(2)::before{border-top:4px solid #FF2D55;border-right:4px solid #FF2D55;animation:2400ms 0s error-animation-extended ease-in !important}:host .rectangle.is-error-move-farther .rectangle__el:nth-child(3)::after,:host .rectangle.is-error-move-farther .rectangle__el:nth-child(3)::before,:host .rectangle.is-error-move-closer .rectangle__el:nth-child(3)::after,:host .rectangle.is-error-move-closer .rectangle__el:nth-child(3)::before,:host .rectangle.is-error-adjust-angle .rectangle__el:nth-child(3)::after,:host .rectangle.is-error-adjust-angle .rectangle__el:nth-child(3)::before{border-bottom:4px solid #FF2D55;border-right:4px solid #FF2D55;animation:2400ms 0s error-animation-extended ease-in !important}:host .rectangle.is-error-move-farther .rectangle__el:nth-child(4)::after,:host .rectangle.is-error-move-farther .rectangle__el:nth-child(4)::before,:host .rectangle.is-error-move-closer .rectangle__el:nth-child(4)::after,:host .rectangle.is-error-move-closer .rectangle__el:nth-child(4)::before,:host .rectangle.is-error-adjust-angle .rectangle__el:nth-child(4)::after,:host .rectangle.is-error-adjust-angle .rectangle__el:nth-child(4)::before{border-bottom:4px solid #FF2D55;border-left:4px solid #FF2D55;animation:2400ms 0s error-animation-extended ease-in !important}}@keyframes rectangle-shrink-animation{0%{transform:scale(1)}50%{transform:scale(0.95)}100%{transform:scale(1)}}@keyframes scanning-line-animation{0%{top:-60%}45%{transform:matrix(1, 0, 0, 1, 0, 0)}50%{top:120%;transform:matrix(1, 0, 0, -1, 0, 0)}95%{transform:matrix(1, 0, 0, -1, 0, 0)}100%{top:-60%;transform:matrix(1, 0, 0, 1, 0, 0)}}:host #barcode .rectangle{width:100%;height:100%;box-sizing:border-box;position:relative;background-color:transparent;background-position:center;background-repeat:no-repeat;transition:all 0.3s ease-in}:host #barcode .rectangle__cursor{width:100%;height:100%;border-radius:8px;position:relative}:host #barcode .rectangle__el{box-sizing:border-box;position:absolute;display:block;width:50%;height:50%;overflow:hidden}:host #barcode .rectangle__el::after,:host #barcode .rectangle__el::before{content:\"\";position:absolute;display:block;width:32px;height:32px}:host #barcode .rectangle__el:nth-child(1){top:0;left:0}:host #barcode .rectangle__el:nth-child(1)::after,:host #barcode .rectangle__el:nth-child(1)::before{top:0;left:0;border-top:4px solid white;border-left:4px solid white;border-top-left-radius:8px;box-shadow:inset 3px 3px 8px -6px rgba(0, 0, 0, 0.2), -3px -3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #barcode .rectangle__el:nth-child(2){top:0;right:0}:host #barcode .rectangle__el:nth-child(2)::after,:host #barcode .rectangle__el:nth-child(2)::before{top:0;right:0;border-top:4px solid white;border-right:4px solid white;border-top-right-radius:8px;box-shadow:inset -3px 3px 8px -6px rgba(0, 0, 0, 0.2), 3px -3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #barcode .rectangle__el:nth-child(3){bottom:0;right:0}:host #barcode .rectangle__el:nth-child(3)::after,:host #barcode .rectangle__el:nth-child(3)::before{bottom:0;right:0;border-bottom:4px solid white;border-right:4px solid white;border-bottom-right-radius:8px;box-shadow:inset -3px -3px 8px -6px rgba(0, 0, 0, 0.2), 3px 3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #barcode .rectangle__el:nth-child(4){bottom:0;left:0}:host #barcode .rectangle__el:nth-child(4)::after,:host #barcode .rectangle__el:nth-child(4)::before{bottom:0;left:0;border-bottom:4px solid white;border-left:4px solid white;border-bottom-left-radius:8px;box-shadow:inset 3px -3px 8px -6px rgba(0, 0, 0, 0.2), -3px 3px 8px -6px rgba(0, 0, 0, 0.2);transition:border-color 0.15s linear}:host #barcode .rectangle.is-default~.label[data-message=is-default],:host #barcode .rectangle.is-detection~.label[data-message=is-detection],:host #barcode .rectangle.is-classification~.label[data-message=is-classification],:host #barcode .rectangle.is-done~.label[data-message=is-done],:host #barcode .rectangle.is-done-all~.label[data-message=is-done-all],:host #barcode .rectangle.is-flip~.label[data-message=is-flip],:host #barcode .rectangle.is-error-move-farther~.label[data-message=is-error-move-farther],:host #barcode .rectangle.is-error-move-closer~.label[data-message=is-error-move-closer],:host #barcode .rectangle.is-error-adjust-angle~.label[data-message=is-error-adjust-angle]{opacity:1;visibility:visible;margin:8px 0 0 0}:host #barcode .rectangle.is-done,:host #barcode .rectangle.is-done-all{-webkit-animation-delay:0;-webkit-animation-duration:250ms;-webkit-animation-name:rectangle-shrink-animation;-moz-animation-delay:0;-moz-animation-duration:250ms;-moz-animation-name:rectangle-shrink-animation;animation-delay:0;animation-duration:250ms;animation-name:rectangle-shrink-animation}:host .scanning-line{opacity:0;visibility:hidden;position:absolute;width:100%;height:115px;left:0px;top:-125px;background:radial-gradient(100% 100% at 49.85% 100%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);filter:blur(var(--mb-blur-scanning-line))}:host .scanning-line.is-active{opacity:1;visibility:visible;animation:scanning-line-animation 2400ms cubic-bezier(0.13, 0.71, 1, 0.82) infinite}*::after,*::before{box-sizing:border-box}:host{display:block}:host .gradient-overlay{position:absolute;width:100%;height:112px;background:linear-gradient(180deg, rgba(0, 0, 0, 0.35625) 0%, rgba(0, 0, 0, 0.25) 20.83%, rgba(0, 0, 0, 0) 100%)}:host .gradient-overlay.bottom{bottom:0;transform:matrix(1, 0, 0, -1, 0, 0)}:host(.is-error) mb-camera-toolbar{display:none}:host::after{width:124px;height:58px;position:absolute;bottom:10px;left:calc(50% - 62px);background:no-repeat center url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCA4NSAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjA4NzcgNi41NzIwNEMyMS40MDE3IDYuNTcyMDQgMjIuMjY1NyA1LjY4MTA0IDIyLjI2NTcgNC40MTIwNEMyMi4yNjU3IDMuMTI1MDQgMjEuNDEwNyAyLjI2MTA0IDIwLjA4NzcgMi4yNjEwNEgxNy40ODY3VjguODQwMDRIMTguNjM4N1Y2LjU3MjA0SDIwLjA4NzdaTTE5Ljg2MjcgMy4yODcwNEMyMC42Mjc3IDMuMjg3MDQgMjEuMDU5NyAzLjY4MzA0IDIxLjA1OTcgNC40MDMwNEMyMS4wNTk3IDUuMTIzMDQgMjAuNjM2NyA1LjU0NjA0IDE5Ljg0NDcgNS41NDYwNEgxOC42Mzg3VjMuMjg3MDRIMTkuODYyN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMi43NzIgNi42MDgwNEMyMi43NzIgNy45OTQwNCAyMy43NzEgOC45NDgwNCAyNS4xNDggOC45NDgwNEMyNi41MjUgOC45NDgwNCAyNy41MjQgNy45OTQwNCAyNy41MjQgNi42MDgwNEMyNy41MjQgNS4yMjIwNCAyNi41MjUgNC4yNjgwNCAyNS4xNDggNC4yNjgwNEMyMy43NzEgNC4yNjgwNCAyMi43NzIgNS4yMjIwNCAyMi43NzIgNi42MDgwNFpNMjMuODcgNi42MDgwNEMyMy44NyA1Ljc5ODA0IDI0LjM5MiA1LjI0OTA0IDI1LjE0OCA1LjI0OTA0QzI1LjkwNCA1LjI0OTA0IDI2LjQyNiA1Ljc5ODA0IDI2LjQyNiA2LjYwODA0QzI2LjQyNiA3LjQxODA0IDI1LjkwNCA3Ljk2NzA0IDI1LjE0OCA3Ljk2NzA0QzI0LjM5MiA3Ljk2NzA0IDIzLjg3IDcuNDE4MDQgMjMuODcgNi42MDgwNFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yOS4zMzU2IDguODQwMDRIMzAuNDA2NkwzMS4wMTg2IDYuOTMyMDRDMzEuMjQzNiA2LjIwMzA0IDMxLjMyNDYgNS44ODgwNCAzMS4zNjk2IDUuNjgxMDRDMzEuNDA1NiA1LjkwNjA0IDMxLjUwNDYgNi4zMjkwNCAzMS42ODQ2IDYuOTE0MDRMMzIuMjk2NiA4Ljg0MDA0SDMzLjMyMjZMMzQuODYxNiA0LjM5NDA0SDMzLjcwMDZMMzMuMTA2NiA2LjMwMjA0QzMzLjAyNTYgNi41ODEwNCAzMi44ODE2IDcuMTEyMDQgMzIuODA5NiA3LjQ0NTA0QzMyLjc1NTYgNy4xNDgwNCAzMi41NzU2IDYuNDgyMDQgMzIuNTIxNiA2LjMwMjA0TDMxLjkyNzYgNC4zOTQwNEgzMC44MTE2TDMwLjE5OTYgNi4zMDIwNEMzMC4wNTU2IDYuNzQzMDQgMjkuOTc0NiA3LjAyMjA0IDI5Ljg5MzYgNy40NTQwNEMyOS44MTI2IDcuMDQwMDQgMjkuNzIyNiA2LjY1MzA0IDI5LjYyMzYgNi4zMDIwNEwyOS4wMzg2IDQuMzk0MDRIMjcuODk1NkwyOS4zMzU2IDguODQwMDRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzcuNDc1OCA4Ljk1NzA0QzM4LjYzNjggOC45NTcwNCAzOS40NDY4IDguMzcyMDQgMzkuNjM1OCA3LjQwMDA0SDM4LjYxODhDMzguNDkyOCA3LjgyMzA0IDM4LjA5NjggOC4wNTcwNCAzNy40OTM4IDguMDU3MDRDMzYuNzY0OCA4LjA1NzA0IDM2LjM1MDggNy42NjEwNCAzNi4yNjk4IDYuODc4MDRMMzkuNjE3OCA2Ljg2OTA0VjYuNTM2MDRDMzkuNjE3OCA1LjE1MDA0IDM4Ljc3MTggNC4yNTkwNCAzNy40Mzk4IDQuMjU5MDRDMzYuMTM0OCA0LjI1OTA0IDM1LjIyNTggNS4yMjIwNCAzNS4yMjU4IDYuNjE3MDRDMzUuMjI1OCA3Ljk5NDA0IDM2LjE1MjggOC45NTcwNCAzNy40NzU4IDguOTU3MDRaTTM3LjQ0ODggNS4xNTkwNEMzOC4xMDU4IDUuMTU5MDQgMzguNTI4OCA1LjU2NDA0IDM4LjUyODggNi4xNzYwNEgzNi4yOTY4QzM2LjQwNDggNS41MTAwNCAzNi44MDA4IDUuMTU5MDQgMzcuNDQ4OCA1LjE1OTA0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTQzLjQ2NjUgNC4zNzYwNEM0My4yODY1IDQuMzMxMDQgNDMuMTMzNSA0LjMxMzA0IDQyLjk4MDUgNC4zMTMwNEM0Mi4zODY1IDQuMzEzMDQgNDEuOTYzNSA0LjYxMDA0IDQxLjc3NDUgNS4wNTEwNEw0MS43MTE1IDQuNDAzMDRINDAuNjc2NVY4Ljg0MDA0SDQxLjc3NDVWNi42ODAwNEM0MS43NzQ1IDUuODE2MDQgNDIuMjY5NSA1LjM5MzA0IDQzLjA2MTUgNS4zOTMwNEg0My40NjY1VjQuMzc2MDRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNDYuMjI5MyA4Ljk1NzA0QzQ3LjM5MDMgOC45NTcwNCA0OC4yMDAzIDguMzcyMDQgNDguMzg5MyA3LjQwMDA0SDQ3LjM3MjNDNDcuMjQ2MyA3LjgyMzA0IDQ2Ljg1MDMgOC4wNTcwNCA0Ni4yNDczIDguMDU3MDRDNDUuNTE4MyA4LjA1NzA0IDQ1LjEwNDMgNy42NjEwNCA0NS4wMjMzIDYuODc4MDRMNDguMzcxMyA2Ljg2OTA0VjYuNTM2MDRDNDguMzcxMyA1LjE1MDA0IDQ3LjUyNTMgNC4yNTkwNCA0Ni4xOTMzIDQuMjU5MDRDNDQuODg4MyA0LjI1OTA0IDQzLjk3OTMgNS4yMjIwNCA0My45NzkzIDYuNjE3MDRDNDMuOTc5MyA3Ljk5NDA0IDQ0LjkwNjMgOC45NTcwNCA0Ni4yMjkzIDguOTU3MDRaTTQ2LjIwMjMgNS4xNTkwNEM0Ni44NTkzIDUuMTU5MDQgNDcuMjgyMyA1LjU2NDA0IDQ3LjI4MjMgNi4xNzYwNEg0NS4wNTAzQzQ1LjE1ODMgNS41MTAwNCA0NS41NTQzIDUuMTU5MDQgNDYuMjAyMyA1LjE1OTA0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTUxLjI1NzEgOC45NTcwNEM1MS45MzIxIDguOTU3MDQgNTIuNTA4MSA4LjY2MDA0IDUyLjc3ODEgOC4xNDcwNEw1Mi44NTAxIDguODQwMDRINTMuODU4MVYyLjE0NDA0SDUyLjc2OTFWNC45NjEwNEM1Mi40OTAxIDQuNTIwMDQgNTEuOTQxMSA0LjI1OTA0IDUxLjMyMDEgNC4yNTkwNEM0OS45NzkxIDQuMjU5MDQgNDkuMTY5MSA1LjI0OTA0IDQ5LjE2OTEgNi42MzUwNEM0OS4xNjkxIDguMDEyMDQgNDkuOTcwMSA4Ljk1NzA0IDUxLjI1NzEgOC45NTcwNFpNNTEuNTAwMSA3Ljk0OTA0QzUwLjczNTEgNy45NDkwNCA1MC4yNjcxIDcuMzkxMDQgNTAuMjY3MSA2LjU5OTA0QzUwLjI2NzEgNS44MDcwNCA1MC43MzUxIDUuMjQwMDQgNTEuNTAwMSA1LjI0MDA0QzUyLjI2NTEgNS4yNDAwNCA1Mi43NjAxIDUuNzk4MDQgNTIuNzYwMSA2LjU5OTA0QzUyLjc2MDEgNy40MDAwNCA1Mi4yNjUxIDcuOTQ5MDQgNTEuNTAwMSA3Ljk0OTA0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTU4LjgwNTEgOC44NDAwNEw1OC44NzcxIDguMTQ3MDRDNTkuMTM4MSA4LjY2MDA0IDU5LjcwNTEgOC45NTcwNCA2MC4zNzExIDguOTU3MDRDNjEuNjQ5MSA4Ljk1NzA0IDYyLjQ4NjEgOC4wMTIwNCA2Mi40ODYxIDYuNjQ0MDRDNjIuNDg2MSA1LjI0MDA0IDYxLjcxMjEgNC4yNTAwNCA2MC40NDMxIDQuMjUwMDRDNTkuNzY4MSA0LjI1MDA0IDU5LjE3NDEgNC41NDcwNCA1OC44ODYxIDUuMDQyMDRWMi4xNDQwNEg1Ny43ODgxVjguODQwMDRINTguODA1MVpNNTguODk1MSA2LjU5OTA0QzU4Ljg5NTEgNS43OTgwNCA1OS4zOTAxIDUuMjQwMDQgNjAuMTQ2MSA1LjI0MDA0QzYwLjkyMDEgNS4yNDAwNCA2MS4zNzkxIDUuODA3MDQgNjEuMzc5MSA2LjU5OTA0QzYxLjM3OTEgNy4zOTEwNCA2MC45MjAxIDcuOTQ5MDQgNjAuMTQ2MSA3Ljk0OTA0QzU5LjM5MDEgNy45NDkwNCA1OC44OTUxIDcuNDAwMDQgNTguODk1MSA2LjU5OTA0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTYyLjk4NjQgMTAuOTAxQzYzLjIyOTQgMTAuOTY0IDYzLjQ5OTQgMTEgNjMuODA1NCAxMUM2NC41MzQ0IDExIDY1LjAwMjQgMTAuNjU4IDY1LjMzNTQgOS44MzAwNEw2Ny41MTM0IDQuMzk0MDRINjYuMzc5NEw2NS4xNzM0IDcuNjM0MDRMNjQuMDMwNCA0LjM5NDA0SDYyLjg2OTRMNjQuNjYwNCA5LjAyOTA0TDY0LjUzNDQgOS4zNjIwNEM2NC4zNDU0IDkuODg0MDQgNjQuMDc1NCA5Ljk4MzA0IDYzLjY0MzQgOS45ODMwNEg2Mi45ODY0VjEwLjkwMVoiIGZpbGw9IndoaXRlIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF81NjZfMTU1NDMpIj4KPHBhdGggZD0iTTQuODE2MzMgMjIuNTk1OUwxLjkyNTE5IDE1LjE2MzZIMFYyNC44MzY2SDEuMzEzNzdWMTcuMjI4OUw0LjMwOTkzIDI0Ljg3NzRINS4yNjg0N0w4LjI5MTQxIDE3LjE2MDhWMjQuODM2Nkg5LjY0NTcxVjE1LjE2MzZINy43MDc0N0w0LjgxNjMzIDIyLjU5NTlaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTMuNjUyOSAxNS4xNjM2SDEyLjIzMTNWMjQuODM2NkgxMy42NTI5VjE1LjE2MzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMzIuNjYyOCAxOS45OTEzQzMzLjA1MDIgMTkuNDQ3OSAzMy4yNTY5IDE4Ljc5MjcgMzMuMjUyNyAxOC4xMjE0QzMzLjI1MjcgMTcuMzI5NyAzMi45MTI2IDE2LjU5MTQgMzIuMjk0OCAxNi4wNDE3QzMxLjY1NzcgMTUuNDc1NiAzMC43NzIxIDE1LjE2NSAyOS43OTggMTUuMTY1SDI1Ljg3MzdWMjQuODM4SDI3LjI5NTNWMjEuMzc4NkgyOS41OTc5TDMxLjYwNjYgMjQuODM2NkgzMy4yOTM5TDMxLjE0NDIgMjEuMTQwOUMzMS43NTA3IDIwLjkxODMgMzIuMjc4OSAyMC41MTgzIDMyLjY2MjggMTkuOTkxM1pNMzEuODAzOSAxOC4xMzVDMzEuODA3MSAxOC4zODg5IDMxLjc2MDIgMTguNjQwOSAzMS42NjYgMTguODc1OUMzMS41NzE3IDE5LjExMSAzMS40MzIgMTkuMzI0NSAzMS4yNTUyIDE5LjUwMzdDMzAuODkzMyAxOS44NjU4IDMwLjM4NTUgMjAuMDY1MiAyOS44MjUyIDIwLjA2NTJIMjcuMjkzNVYxNi40OTE3SDI5LjgyNTJDMzAuOTUzMiAxNi40OTE3IDMxLjgwMzkgMTcuMTk3NyAzMS44MDM5IDE4LjEzNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zOS4yODAzIDE1QzM3Ljk0NjEgMTUgMzYuNzQzIDE1LjUyNDYgMzUuODg4IDE2LjQ3NjZDMzUuMDY1NSAxNy4zOTQ1IDM0LjYxMjMgMTguNjQ1OSAzNC42MTIzIDE5Ljk5OThDMzQuNjEyMyAyMS4zNTM4IDM1LjA2NTUgMjIuNjEyIDM1Ljg4OCAyMy41Mjg1QzM2Ljc0MDEgMjQuNDc3MiAzNy45NDQ3IDI0Ljk5ODYgMzkuMjgwMyAyNC45OTg2QzQwLjYyMTUgMjQuOTk4NiA0MS44MzA2IDI0LjQ3NTggNDIuNjg0MiAyMy41Mjg1QzQzLjUwODEgMjIuNjEzIDQzLjk2MTYgMjEuMzU5OSA0My45NjE2IDE5Ljk5OThDNDMuOTYxNiAxOC42Mzk4IDQzLjUwODEgMTcuMzkzOCA0Mi42ODQ1IDE2LjQ3NjZDNDEuODI5MiAxNS41MjM1IDQwLjYyMDEgMTUgMzkuMjgwMyAxNVpNMzkuMjgwMyAyMy42NDQ2QzM4Ljg0MjQgMjMuNjQ2MyAzOC40MDkzIDIzLjU1MTcgMzguMDEwNyAyMy4zNjc0QzM3LjYxMjEgMjMuMTgzIDM3LjI1NzMgMjIuOTEzMiAzNi45NzA2IDIyLjU3NjVDMzYuMzg0MiAyMS44OTkxIDM2LjA2MSAyMC45ODM3IDM2LjA2MSAxOS45OTk4QzM2LjA2MSAxOS4wMTU5IDM2LjM4NDIgMTguMTA3NyAzNi45NzA2IDE3LjQyODJDMzcuNTY3OSAxNi43MzYyIDM4LjM4OCAxNi4zNTUgMzkuMjgwMyAxNi4zNTVDNDAuMTcyNiAxNi4zNTUgNDAuOTk2MSAxNi43MzYyIDQxLjU5NyAxNy40Mjg2QzQyLjE4NzYgMTguMTA5OCA0Mi41MTMyIDE5LjAyMiA0Mi41MTMyIDE5Ljk5OThDNDIuNTEzMiAyMC45Nzc2IDQyLjE4OCAyMS44OTc3IDQxLjU5NyAyMi41NzY1QzQxLjMwODcgMjIuOTEzMiA0MC45NTI3IDIzLjE4MjkgNDAuNTUyOSAyMy4zNjcyQzQwLjE1MzIgMjMuNTUxNSAzOS43MTkxIDIzLjY0NjEgMzkuMjgwMyAyMy42NDQ2WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTUxLjc1NCAxOS43NjI1QzUyLjU4MzIgMTkuMjk2NCA1My4wNzU5IDE4LjQ3ODkgNTMuMDc1OSAxNy41NjMxQzUzLjA3NTkgMTYuMTUwMyA1MS44NDI1IDE1LjE2MzYgNTAuMDgwNSAxNS4xNjM2SDQ1LjkxMTVWMjQuODM2Nkg1MC4yODEzQzUyLjAxNzMgMjQuODM2NiA1My4yNzY4IDIzLjY2MTIgNTMuMjc2OCAyMi4wNDE5QzUzLjI3ODIgMjEuMDcwNiA1Mi42OTYgMjAuMjAzMiA1MS43NTQgMTkuNzYyNVpNNTAuMzIyNiAyMy41MDg4SDQ3LjMzMjRWMjAuNTA3Nkg1MC4xMTkyQzUxLjE0MTIgMjAuNTA3NiA1MS44Mjg0IDIxLjA2NDUgNTEuODI4NCAyMS44OTI4QzUxLjgyOTUgMjIuODc0MSA1MS4yMzc4IDIzLjUwODggNTAuMzIyNiAyMy41MDg4Wk00OS45NTg1IDE5LjIwNkg0Ny4zMzI0VjE2LjQ5MTdINTAuMTE5MkM1MS4wMzU1IDE2LjQ5MTcgNTEuNjI2MSAxNi45NzY1IDUxLjYyNjEgMTcuNzI3QzUxLjYyNzIgMTguNDYzOCA1MS4xMTEyIDE5LjIwNjcgNDkuOTU4NSAxOS4yMDY3VjE5LjIwNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01Ni43NDYyIDE1LjE2MzZINTUuMzI0MlYyNC44MzY2SDYxLjU0NTZWMjMuNDgxNkg1Ni43NDYyVjE1LjE2MzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNjQuNTUzOCAxNS4xNjM2SDYzLjEzMThWMjQuODM2Nkg2NC41NTM4VjE1LjE2MzZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNzMuNDg0NCAyMi4zMjAyTDY4LjUyOTkgMTUuMTkzN0w2OC41MDg4IDE1LjE2MzZINjcuMTM0NFYyNC44MzY2SDY4LjQ3NTNWMTcuMzI1N0w3My42OTM3IDI0LjgzNjZINzQuODI1M1YxNS4xNjM2SDczLjQ4NDRWMjIuMzIwMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik04MS4xNzc4IDE5LjQxOTRMODQuODk4NSAxNS4xNjM2SDgzLjE1OTRMNzguODI1OSAyMC4xMTE0VjE1LjE2MzZINzcuNDAzOVYyNC44MzY2SDc4LjgyNTlWMjIuMDI4Nkw4MC4yMDUyIDIwLjQ2ODJMODMuMjc2MSAyNC44MzY2SDg1TDgxLjE3NzggMTkuNDE5NFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMi45MTM0IDIxLjU2MzlDMjIuMjc5MSAyMy4wMzE4IDIxLjQ2NTQgMjMuNjU4MyAyMC4xODY5IDIzLjY1ODNDMTkuMzEzMyAyMy42NTgzIDE4LjUxMjkgMjMuMjc4NSAxNy45MzM2IDIyLjU4OTRDMTcuMzYzIDIxLjkxMDYgMTcuMDQ4NyAyMC45OTA5IDE3LjA0ODcgMTkuOTk5OEMxNy4wNDg3IDE5LjAxNjMgMTcuMzU2IDE4LjEwMjcgMTcuOTEzNSAxNy40MjcxQzE4LjQ4NDQgMTYuNzM1OCAxOS4yNzczIDE2LjM1NSAyMC4xNDY3IDE2LjM1NUMyMS4zMjQ0IDE2LjM1NSAyMi4xODU3IDE2Ljk1MiAyMi43Nzk5IDE4LjE4MDFMMjIuODA1MyAxOC4yMzIxSDI0LjI5MjhMMjQuMjg1NyAxOC4xOTAxQzI0LjI1MDUgMTcuOTg2NSAyNC4xNzcyIDE3Ljc5NTcgMjQuMTA2MyAxNy42MDg2TDI0LjA4MzQgMTcuNTQ4M0MyMy43NzkzIDE2Ljc3ODcgMjMuMjQ3MiAxNi4xMjQ1IDIyLjU2MSAxNS42NzY2QzIxLjg3NTYgMTUuMjI3NyAyMS4wNDk2IDE1IDIwLjEwNjIgMTVDMTguODE2NCAxNSAxNy42NTI3IDE1LjUyNDYgMTYuODI4OCAxNi40Nzc2QzE2LjAzNjIgMTcuMzk0OCAxNS41OTk2IDE4LjY0NTkgMTUuNTk5NiAxOS45OTk4QzE1LjU5OTYgMjEuMzcyIDE2LjAzODcgMjIuNjI4NSAxNi44MzU5IDIzLjUzNzhDMTcuNjc0NiAyNC40OTQ0IDE4LjgyMzggMjUgMjAuMTU5NyAyNUMyMS4wOTU3IDI1IDIxLjkxODIgMjQuNzUzMyAyMi42MDQ3IDI0LjI2NzFDMjIuNzIwMSAyNC4xODU0IDIyLjgzMTEgMjQuMDk3NSAyMi45MzcxIDI0LjAwMzVDMjMuNjMzMSAyMy4zODc1IDI0LjE2MDMgMjIuNTExNiAyNC4zNDY3IDIxLjY2TDI0LjM1MTMgMjEuNjM3N0MyNC4zNTc2IDIxLjYwODMgMjQuMzYzMiAyMS41Nzg5IDI0LjM2ODIgMjEuNTQ5NUwyNC4zNzUyIDIxLjUwNzZIMjIuOTM2TDIyLjkxMzQgMjEuNTYzOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfNTY2XzE1NTQzIj4KPHJlY3Qgd2lkdGg9Ijg1IiBoZWlnaHQ9IjEwIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxNSkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K\");background-size:100%;content:\" \"}:host(.no-overlay)::after{display:none}:host #card-identity,:host #barcode,:host #card-payment{position:absolute;top:0;bottom:0;left:0;right:0;display:none}:host #card-identity.visible,:host #barcode.visible,:host #card-payment.visible{display:block}:host .message{display:block;opacity:0;visibility:hidden;position:absolute;transform-origin:center;transform:translate(-50%, 0);margin:0;padding:8px 12px;font-size:1em;font-weight:600;text-align:center;text-shadow:0px 1px 4px rgba(0, 0, 0, 0.1);white-space:nowrap;color:#fff;background-color:rgba(107, 114, 128, 0.7);-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter));border-radius:8px;transition:all 200ms cubic-bezier(0.42, 0.01, 0.35, 1.74)}:host .message.is-active{opacity:1;visibility:visible;margin:8px 0 0 0}:host #card-identity .reticle-container{position:absolute;top:50%;left:50%;width:var(--mb-reticle-size);height:var(--mb-reticle-size);transform-origin:center;transform:translate(-50%, -50%);perspective:600px}:host #card-identity .reticle-container .message{top:100%;left:50%}:host #barcode .rectangle-container{position:absolute;top:112px;left:20px;width:calc(100% - 40px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}:host #card-payment .rectangle-container{width:100%;height:100%;display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:center;align-content:center;align-items:center;transform-origin:center;perspective:600px;-webkit-transform:translate3d(0, 0, 0);-webkit-backface-visibility:hidden}:host #card-payment .rectangle-container .box{align-self:stretch;flex:1 1 auto}:host #card-payment .rectangle-container .box.wrapper,:host #card-payment .rectangle-container .box .wrapper{background:rgba(0, 0, 0, 0.2)}:host #card-payment .rectangle-container .box.body{flex:0 1 230px;display:flex;position:relative;max-height:calc(100vh - 200px)}:host #card-payment .rectangle-container .box.body .middle-left{order:0;flex:1 1 auto}:host #card-payment .rectangle-container .box.body .middle-right{order:2;flex:1 1 auto}:host #card-payment .rectangle-container .message{top:-70px;left:50%}@media only screen and (min-width: 568px) and (orientation: landscape){:host::after{bottom:40px;left:unset;right:5%}:host .gradient-overlay{height:88px}:host #barcode .rectangle-container{top:88px;left:186px;width:calc(100% - 372px);height:calc(100% - 128px)}:host #barcode .rectangle-container .message{top:-50px;left:50%}:host #card-payment .rectangle-container .box.body{flex:0 1 263px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 374px !important}}@media only screen and (min-width: 768px) and (orientation: portrait){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:50px;width:calc(100% - 100px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}:host #card-payment .rectangle-container .box.body{flex:0 1 472px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 672px !important}}@media only screen and (min-width: 1024px) and (orientation: landscape){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:50px;width:calc(100% - 100px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}:host #card-payment .rectangle-container .box.body{flex:0 1 548px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 780px !important}}@media only screen and (min-width: 1280px){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:188px;width:calc(100% - 374px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}:host #card-payment .rectangle-container .box.body{flex:0 1 500px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 712px !important}}@media only screen and (min-width: 1440px){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:188px;width:calc(100% - 374px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}:host #card-payment .rectangle-container .box.body{flex:0 1 680px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 968px !important}}@media only screen and (min-width: 1920px){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:112px}:host #barcode .rectangle-container{top:112px;left:188px;width:calc(100% - 374px);height:calc(100% - 224px);perspective:600px}:host #barcode .rectangle-container .message{top:-70px;left:50%}:host #card-payment .rectangle-container .box.body{flex:0 1 860px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 1224px !important}}@media only screen and (max-height: 299px) and (orientation: landscape){:host::after{bottom:10px;left:unset;right:20px}:host .gradient-overlay{height:88px}:host #card-payment .rectangle-container .box.body{flex:0 1 180px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 260px !important}}@media only screen and (min-height: 300px) and (max-height: 499px) and (orientation: landscape){:host::after{bottom:30px;left:unset;right:20px}:host .gradient-overlay{height:88px}:host #card-payment .rectangle-container .box.body{flex:0 1 240px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 340px !important}}@media only screen and (max-width: 360px) and (orientation: portrait){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:88px}:host #card-payment .rectangle-container .box.body{flex:0 1 300px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 500px !important}}@media only screen and (min-height: 500px) and (max-height: 699px) and (orientation: landscape){:host::after{bottom:10px;left:calc(50% - 61px)}:host .gradient-overlay{height:88px}:host #card-payment .rectangle-container .box.body{flex:0 1 300px !important}:host #card-payment .rectangle-container .box.body .rectangle{flex:0 1 500px !important}}";

let MbCameraExperience = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.close = index.createEvent(this, "close", 7);
    this.setIsCameraActive = index.createEvent(this, "setIsCameraActive", 7);
    this.changeCameraDevice = index.createEvent(this, "changeCameraDevice", 7);
    this.flipCameraAction = index.createEvent(this, "flipCameraAction", 7);
    this.cameraCursorBarcodeClassName = 'rectangle';
    this.cameraCursorIdentityCardClassName = 'reticle';
    this.cameraCursorPaymentCardClassName = 'rectangle';
    this.cameraMessageIdentityCardClassName = 'message';
    this.cameraStateChangeId = 0;
    this.cameraStateInProgress = false;
    this.flipCameraStateInProgress = false;
    this.barcodeScanningInProgress = false;
    /**
     * Configure camera experience state timeout durations
     */
    this.cameraExperienceStateDurations = null;
    /**
     * Unless specifically granted by your license key, you are not allowed to
     * modify or remove the Microblink logo displayed on the bottom of the camera
     * overlay.
     */
    this.showOverlay = true;
    /**
     * Camera horizontal state passed from root component.
     *
     * Horizontal camera image can be mirrored
     */
    this.cameraFlipped = false;
    /**
     * Show scanning line on camera
     */
    this.showScanningLine = false;
    /**
     * Show camera feedback message on camera for Barcode scanning
     */
    this.showCameraFeedbackBarcodeMessage = false;
    this.clearIsCameraActive = false;
  }
  apiStateHandler(apiState, _oldValue) {
    if (apiState === '' && (this.type === CameraExperience.CardSingleSide || this.type === CameraExperience.CardCombined))
      this.cardIdentityElement.classList.add('visible');
    else
      this.cardIdentityElement.classList.remove('visible');
  }
  /**
   * Change active camera.
   */
  async setActiveCamera(cameraId) {
    this.cameraToolbar.setActiveCamera(cameraId);
  }
  /**
   * Populate list of camera devices.
   */
  async populateCameraDevices() {
    await this.cameraToolbar.populateCameraDevices();
  }
  /**
   * Method is exposed outside which allow us to control Camera Flip state from parent component.
   */
  async setCameraFlipState(isFlipped) {
    this.cameraFlipped = isFlipped;
  }
  /**
   * Set camera state which includes animation and message.
   */
  setState(state, isBackSide = false, force = false) {
    return new Promise((resolve) => {
      if (!force && (!state || this.cameraStateInProgress || this.flipCameraStateInProgress)) {
        resolve();
        return;
      }
      if (state === CameraExperienceState.BarcodeScanning) {
        this.barcodeScanningInProgress = true;
      }
      this.cameraStateInProgress = true;
      let cameraStateChangeId = this.cameraStateChangeId + 1;
      this.cameraStateChangeId = cameraStateChangeId;
      if (state === CameraExperienceState.Flip) {
        this.flipCameraStateInProgress = true;
      }
      const stateClass = getStateClass(state);
      switch (this.type) {
        case CameraExperience.CardSingleSide:
        case CameraExperience.CardCombined:
          this.cameraCursorIdentityCardClassName = `reticle ${stateClass}`;
          break;
        case CameraExperience.Barcode:
          stateClass === 'is-detection' && this.showScanningLine ? this.scanningLineBarcodeClassName = 'is-active' : this.scanningLineBarcodeClassName = '';
          this.cameraCursorBarcodeClassName = `rectangle ${stateClass}`;
          break;
        case CameraExperience.PaymentCard:
          stateClass === 'is-default' && this.showScanningLine ? this.scanningLinePaymentCardClassName = 'is-active' : this.scanningLinePaymentCardClassName = '';
          this.cameraCursorPaymentCardClassName = `rectangle ${stateClass}`;
          break;
      }
      this.setMessage(state, isBackSide, this.type);
      window.setTimeout(() => {
        if (this.flipCameraStateInProgress && state === CameraExperienceState.Flip) {
          this.flipCameraStateInProgress = false;
        }
        if (this.cameraStateChangeId === cameraStateChangeId) {
          this.cameraStateInProgress = false;
        }
        resolve();
      }, this.getCameraExperienceStateDuration(state));
    });
  }
  getCameraExperienceStateDuration(state) {
    return this.cameraExperienceStateDurations ? this.getStateDurationFromUserInput(state) : CameraExperienceStateDuration.get(state);
  }
  getStateDurationFromUserInput(state) {
    const cameraExperienceStateDurationMap = new Map(Object.entries(this.cameraExperienceStateDurations));
    const stateAdjusted = state[0].toLocaleLowerCase() + state.slice(1);
    const duration = cameraExperienceStateDurationMap.get(stateAdjusted);
    return duration || CameraExperienceStateDuration.get(state);
  }
  /**
   * Set camera state to initial method.
   */
  resetState() {
    return new Promise((resolve) => {
      // Reset flags
      this.cameraStateChangeId = 0;
      this.cameraStateInProgress = false;
      this.flipCameraStateInProgress = false;
      this.barcodeScanningInProgress = false;
      // Reset DOM
      while (this.cameraMessageIdentityCard.firstChild) {
        this.cameraMessageIdentityCard.removeChild(this.cameraMessageIdentityCard.firstChild);
      }
      while (this.cameraMessagePaymentCard.firstChild) {
        this.cameraMessagePaymentCard.removeChild(this.cameraMessagePaymentCard.firstChild);
      }
      while (this.cameraMessageBarcode.firstChild) {
        this.cameraMessageBarcode.removeChild(this.cameraMessageBarcode.firstChild);
      }
      resolve();
    });
  }
  flipCamera() {
    this.flipCameraAction.emit();
  }
  handleStop() {
    this.close.emit();
  }
  setMessage(state, isBackSide, type) {
    const message = this.getStateMessage(state, isBackSide, type);
    switch (type) {
      case CameraExperience.CardSingleSide:
      case CameraExperience.CardCombined:
        while (this.cameraMessageIdentityCard.firstChild) {
          this.cameraMessageIdentityCard.removeChild(this.cameraMessageIdentityCard.firstChild);
        }
        if (message) {
          this.cameraMessageIdentityCard.appendChild(message);
        }
        this.cameraMessageIdentityCardClassName = message && message !== null ? 'message is-active' : 'message';
        break;
      case CameraExperience.PaymentCard:
        while (this.cameraMessagePaymentCard.firstChild) {
          this.cameraMessagePaymentCard.removeChild(this.cameraMessagePaymentCard.firstChild);
        }
        if (message) {
          this.cameraMessagePaymentCard.appendChild(message);
        }
        this.cameraMessagePaymentCard.setAttribute('class', message && message !== null ? 'message is-active' : 'message');
        break;
      case CameraExperience.Barcode:
        while (this.cameraMessageBarcode.firstChild) {
          this.cameraMessageBarcode.removeChild(this.cameraMessageBarcode.firstChild);
        }
        if (this.showCameraFeedbackBarcodeMessage) {
          if (message) {
            this.cameraMessageBarcode.appendChild(message);
          }
          this.cameraMessageBarcode.setAttribute('class', message && message !== null ? 'message is-active' : 'message');
        }
        break;
      // Do nothing
    }
  }
  getStateMessage(state, isBackSide = false, type) {
    const getStateMessageAsHTML = (message) => {
      if (message) {
        const messageArray = typeof message === 'string' ? [message] : message;
        const children = [];
        while (messageArray.length) {
          const sentence = messageArray.shift();
          children.push(document.createTextNode(sentence));
          if (messageArray.length) {
            children.push(document.createElement('br'));
          }
        }
        const spanElement = document.createElement('span');
        while (children.length) {
          spanElement.appendChild(children.shift());
        }
        return spanElement;
      }
    };
    switch (state) {
      case CameraExperienceState.Default:
        if (type === CameraExperience.Barcode && this.showCameraFeedbackBarcodeMessage) {
          return getStateMessageAsHTML(this.translationService.i('camera-feedback-barcode-message'));
        }
        const key = isBackSide ? 'camera-feedback-scan-back' : 'camera-feedback-scan-front';
        if (this.barcodeScanningInProgress) {
          return getStateMessageAsHTML(this.translationService.i('camera-feedback-barcode'));
        }
        return getStateMessageAsHTML(this.translationService.i(key));
      case CameraExperienceState.MoveFarther:
        return getStateMessageAsHTML(this.translationService.i('camera-feedback-move-farther'));
      case CameraExperienceState.MoveCloser:
        return getStateMessageAsHTML(this.translationService.i('camera-feedback-move-closer'));
      case CameraExperienceState.AdjustAngle:
        return getStateMessageAsHTML(this.translationService.i('camera-feedback-adjust-angle'));
      case CameraExperienceState.Flip:
        return getStateMessageAsHTML(this.translationService.i('camera-feedback-flip'));
      case CameraExperienceState.BarcodeScanning:
        return getStateMessageAsHTML(this.translationService.i('camera-feedback-barcode'));
      case CameraExperienceState.Classification:
      case CameraExperienceState.Detection:
        return type === CameraExperience.Barcode ? getStateMessageAsHTML(this.translationService.i('camera-feedback-barcode-message')) : null;
      case CameraExperienceState.Done:
      case CameraExperienceState.DoneAll:
      default:
        return null;
    }
  }
  handleChangeCameraDevice(camera) {
    this.changeCameraDevice.emit(camera);
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
    const parts = getWebComponentParts(this.hostEl.shadowRoot);
    this.hostEl.setAttribute('exportparts', parts.join(', '));
  }
  render() {
    return (index.h(index.Host, { class: classNames({ 'no-overlay': !this.showOverlay }) }, index.h("div", { id: "barcode", class: classNames({ visible: this.type === CameraExperience.Barcode }) }, index.h("div", { class: "rectangle-container" }, index.h("div", { class: this.cameraCursorBarcodeClassName }, index.h("div", { class: "rectangle__cursor" }, index.h("div", { class: "rectangle__el" }), index.h("div", { class: "rectangle__el" }), index.h("div", { class: "rectangle__el" }), index.h("div", { class: "rectangle__el" }), index.h("div", { class: `scanning-line ${this.scanningLineBarcodeClassName}` }))), index.h("p", { class: "message", ref: el => this.cameraMessageBarcode = el }))), index.h("div", { id: "card-identity", ref: (el) => this.cardIdentityElement = el, class: classNames({ visible: this.type === CameraExperience.CardSingleSide || this.type === CameraExperience.CardCombined }) }, index.h("div", { class: "reticle-container" }, index.h("div", { class: this.cameraCursorIdentityCardClassName }, index.h("div", { class: "reticle__cursor" }, index.h("div", { class: "reticle__el" }), index.h("div", { class: "reticle__el" }), index.h("div", { class: "reticle__el" }), index.h("div", { class: "reticle__el" })), index.h("img", { class: "reticle__done", src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjk3MiAzMy40NkMyMC43MDk1IDMzLjQ2MDUgMjAuNDQ5NCAzMy40MDkyIDIwLjIwNjggMzMuMzA5QzE5Ljk2NDEgMzMuMjA4OCAxOS43NDM2IDMzLjA2MTYgMTkuNTU4IDMyLjg3NkwxMS4wNzQgMjQuMzlDMTAuODgyOSAyNC4yMDU2IDEwLjczMDMgMjMuOTg1MSAxMC42MjU0IDIzLjc0MTFDMTAuNTIwNCAyMy40OTcyIDEwLjQ2NSAyMy4yMzQ4IDEwLjQ2MjUgMjIuOTY5MkMxMC40NiAyMi43MDM3IDEwLjUxMDQgMjIuNDQwMyAxMC42MTA4IDIyLjE5NDRDMTAuNzExMiAyMS45NDg2IDEwLjg1OTYgMjEuNzI1MiAxMS4wNDcyIDIxLjUzNzNDMTEuMjM0OSAyMS4zNDkzIDExLjQ1ODEgMjEuMjAwNyAxMS43MDM4IDIxLjA5OTlDMTEuOTQ5NSAyMC45OTkyIDEyLjIxMjggMjAuOTQ4NCAxMi40Nzg0IDIwLjk1MDVDMTIuNzQzOSAyMC45NTI2IDEzLjAwNjQgMjEuMDA3NiAxMy4yNTA1IDIxLjExMjNDMTMuNDk0NiAyMS4yMTY5IDEzLjcxNTQgMjEuMzY5MSAxMy45IDIxLjU2TDIwLjk3IDI4LjYzTDMzLjcgMTUuOTA0QzM0LjA3NSAxNS41Mjg3IDM0LjU4MzggMTUuMzE3OCAzNS4xMTQzIDE1LjMxNzZDMzUuNjQ0OCAxNS4zMTc0IDM2LjE1MzcgMTUuNTI4IDM2LjUyOSAxNS45MDNDMzYuOTA0MyAxNi4yNzggMzcuMTE1MiAxNi43ODY4IDM3LjExNTQgMTcuMzE3M0MzNy4xMTU2IDE3Ljg0NzggMzYuOTA1IDE4LjM1NjcgMzYuNTMgMTguNzMyTDIyLjM4NiAzMi44NzZDMjIuMjAwNCAzMy4wNjE2IDIxLjk3OTkgMzMuMjA4OCAyMS43MzcyIDMzLjMwOUMyMS40OTQ2IDMzLjQwOTIgMjEuMjM0NSAzMy40NjA1IDIwLjk3MiAzMy40NloiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=" })), index.h("p", { class: this.cameraMessageIdentityCardClassName, ref: el => this.cameraMessageIdentityCard = el }))), index.h("div", { id: "card-payment", class: classNames({ visible: this.type === CameraExperience.PaymentCard }) }, index.h("div", { class: "rectangle-container" }, index.h("div", { class: "box wrapper" }), index.h("div", { class: "box body" }, index.h("div", { class: "middle-left wrapper" }), index.h("div", { class: this.cameraCursorPaymentCardClassName }, index.h("div", { class: "rectangle__cursor" }, index.h("div", { class: "rectangle__el" }), index.h("div", { class: "rectangle__el" }), index.h("div", { class: "rectangle__el" }), index.h("div", { class: "rectangle__el" }), index.h("div", { class: `scanning-line ${this.scanningLinePaymentCardClassName}` }))), index.h("p", { class: "message", ref: el => this.cameraMessagePaymentCard = el }), index.h("div", { class: "middle-right wrapper" })), index.h("div", { class: "box wrapper" }))), index.h("div", { class: "gradient-overlay bottom" }), index.h("mb-camera-toolbar", { "clear-is-camera-active": this.clearIsCameraActive, "show-close": this.apiState !== "error", "camera-flipped": this.cameraFlipped, onCloseEvent: () => this.handleStop(), onFlipEvent: () => this.flipCamera(), onChangeCameraDevice: (ev) => this.handleChangeCameraDevice(ev.detail), ref: el => this.cameraToolbar = el })));
  }
  get hostEl() { return index.getElement(this); }
  static get watchers() { return {
    "apiState": ["apiStateHandler"]
  }; }
};
MbCameraExperience.style = mbCameraExperienceCss;

const mbCameraSelectionCss = ":host{display:block;font-family:inherit;font-size:var(--mb-font-size)}:host *{box-sizing:border-box}:host .active-camera{all:unset;box-sizing:border-box;display:block;width:var(--mb-toolbar-selection-width);height:calc(var(--mb-line-height) + 8px + 2px);margin:0 auto;color:var(--mb-toolbar-color);line-height:var(--mb-line-height);text-align:center;text-decoration:none;border:1px solid transparent;border-radius:var(--mb-toolbar-border-radius)}:host .active-camera .icon,:host .active-camera .name{display:inline-block;vertical-align:middle}:host .active-camera .icon{width:20px;height:20px}:host .active-camera .icon svg{width:20px;height:20px}:host .active-camera .name{max-width:calc(100% - 16px - 40px);font-weight:var(--mb-toolbar-camera-name-font-weight);padding:0 8px 0 4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host .active-camera{padding:4px 16px;background-color:transparent}:host .active-camera:hover,:host .active-camera:active,:host .active-camera:focus{background-color:rgba(107, 114, 128, 0.3)}:host .active-camera.active,:host .active-camera:active,:host .active-camera:focus{padding:4px 16px;border-color:var(--mb-toolbar-border-color)}:host #list-background{display:none;position:fixed;top:0;left:0;width:100vw;height:100vh}:host #list-background.visible{display:block}:host .list{display:none;position:absolute;top:calc(var(--mb-font-size) * 1.5 + 16px);left:calc(50% - var(--mb-toolbar-selection-width) / 2);width:var(--mb-toolbar-selection-width);padding:0;background-color:var(--mb-toolbar-list-background);border-radius:var(--mb-toolbar-border-radius);box-shadow:var(--mb-toolbar-list-shadow)}:host .list.visible{display:block}:host .list svg,:host .list .name,:host .list .spacer{display:inline-block;vertical-align:middle}:host .list .spacer,:host .list svg{width:24px;height:20px}:host .list .name{max-width:calc(100% - 24px);overflow:hidden;text-overflow:ellipsis}:host .list ul{margin:0;padding:8px;border-radius:var(--mb-toolbar-list-border-radius);list-style:none}:host .list ul li{display:block}:host .list ul li.active{color:#0062F2}:host .list ul button{all:unset;box-sizing:border-box;display:block;width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--mb-toolbar-list-item-border-radius);padding:4px 16px;line-height:var(--mb-line-height);cursor:pointer}:host .list ul button:hover,:host .list ul button:focus{background-color:rgba(116, 116, 128, 0.08)}";

let MbCameraSelection = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.setIsCameraActive = index.createEvent(this, "setIsCameraActive", 7);
    this.changeCameraDevice = index.createEvent(this, "changeCameraDevice", 7);
    this.activeCamera = {
      prettyName: '-',
      details: null
    };
    this.cameraList = [];
    this.isListVisible = false;
    this.clearIsCameraActive = false;
  }
  /**
   * Change active camera.
   */
  async setActiveCamera(cameraId) {
    const camera = this.cameraList.find((el) => el.details.deviceId === cameraId);
    if (!camera) {
      return;
    }
    this.activeCamera = camera;
  }
  /**
   * Populate list of camera devices.
   */
  async populateCameraDevices() {
    try {
      const devices = await getCameraDevices();
      this.cameraList = devices;
    }
    catch (error) {
      // Camera access error is handled by the video recognizer.
      this.cameraList = [];
    }
  }
  handleListOpen(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.setListVisibility(!this.isListVisible);
  }
  handleCameraSelection(ev, camera) {
    ev.preventDefault();
    ev.stopPropagation();
    this.changeCameraDevice.emit(camera);
    this.activeCamera = camera;
    this.setListVisibility(false);
  }
  setListVisibility(visible) {
    this.isListVisible = visible;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    const cameraListElements = this.cameraList.map((camera) => {
      var _a, _b;
      const isActive = !this.clearIsCameraActive && ((_b = (_a = this.activeCamera) === null || _a === void 0 ? void 0 : _a.details) === null || _b === void 0 ? void 0 : _b.deviceId) === camera.details.deviceId;
      this.setIsCameraActive.emit(isActive);
      let content = (index.h("span", { class: "spacer" }));
      if (isActive) {
        content = (index.h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M17.2559 5.24408C17.5813 5.56951 17.5813 6.09715 17.2559 6.42259L8.92257 14.7559C8.59713 15.0814 8.06949 15.0814 7.74406 14.7559L3.57739 10.5893C3.25195 10.2638 3.25195 9.73618 3.57739 9.41074C3.90283 9.08531 4.43047 9.08531 4.7559 9.41074L8.33331 12.9882L16.0774 5.24408C16.4028 4.91864 16.9305 4.91864 17.2559 5.24408Z", fill: "#0062F2" })));
      }
      return (index.h("li", { class: classNames({ active: isActive }) }, index.h("button", { onClick: (ev) => this.handleCameraSelection(ev, camera) }, content, index.h("span", { class: "name" }, camera.prettyName))));
    });
    return (index.h(index.Host, null, index.h("button", { class: this.isListVisible ? 'active-camera active' : 'active-camera', onClick: (ev) => this.handleListOpen(ev) }, index.h("span", { class: "icon" }, index.h("svg", { width: "21", height: "20", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M6.82145 2.98816C7.13401 2.6756 7.55793 2.5 7.99996 2.5H13C13.442 2.5 13.8659 2.6756 14.1785 2.98816C14.491 3.30072 14.6666 3.72464 14.6666 4.16667C14.6666 4.38768 14.7544 4.59964 14.9107 4.75592C15.067 4.9122 15.2789 5 15.5 5H16.3333C16.9963 5 17.6322 5.26339 18.1011 5.73223C18.5699 6.20107 18.8333 6.83696 18.8333 7.5V15C18.8333 15.663 18.5699 16.2989 18.1011 16.7678C17.6322 17.2366 16.9963 17.5 16.3333 17.5H4.66663C4.00358 17.5 3.3677 17.2366 2.89886 16.7678C2.43002 16.2989 2.16663 15.663 2.16663 15V7.5C2.16663 6.83696 2.43002 6.20107 2.89886 5.73223C3.3677 5.26339 4.00358 5 4.66663 5H5.49996C5.72097 5 5.93293 4.9122 6.08922 4.75592C6.2455 4.59964 6.33329 4.38768 6.33329 4.16667C6.33329 3.72464 6.50889 3.30072 6.82145 2.98816ZM4.66663 6.66667C4.44561 6.66667 4.23365 6.75446 4.07737 6.91074C3.92109 7.06702 3.83329 7.27899 3.83329 7.5V15C3.83329 15.221 3.92109 15.433 4.07737 15.5893C4.23365 15.7455 4.44561 15.8333 4.66663 15.8333H16.3333C16.5543 15.8333 16.7663 15.7455 16.9225 15.5893C17.0788 15.433 17.1666 15.221 17.1666 15V7.5C17.1666 7.27899 17.0788 7.06702 16.9225 6.91074C16.7663 6.75446 16.5543 6.66667 16.3333 6.66667H15.5C14.8369 6.66667 14.201 6.40327 13.7322 5.93443C13.2634 5.46559 13 4.82971 13 4.16667L7.99996 4.16667C7.99996 4.82971 7.73657 5.46559 7.26773 5.93443C6.79889 6.40327 6.163 6.66667 5.49996 6.66667H4.66663Z", fill: "white" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.5 9.16667C9.57948 9.16667 8.83329 9.91286 8.83329 10.8333C8.83329 11.7538 9.57948 12.5 10.5 12.5C11.4204 12.5 12.1666 11.7538 12.1666 10.8333C12.1666 9.91286 11.4204 9.16667 10.5 9.16667ZM7.16663 10.8333C7.16663 8.99238 8.65901 7.5 10.5 7.5C12.3409 7.5 13.8333 8.99238 13.8333 10.8333C13.8333 12.6743 12.3409 14.1667 10.5 14.1667C8.65901 14.1667 7.16663 12.6743 7.16663 10.8333Z", fill: "white" }))), index.h("span", { class: "name" }, this.activeCamera.prettyName), index.h("span", { class: "icon" }, index.h("svg", { width: "21", height: "20", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.9107 6.91076C5.23614 6.58533 5.76378 6.58533 6.08922 6.91076L10.5 11.3215L14.9107 6.91076C15.2361 6.58533 15.7638 6.58533 16.0892 6.91076C16.4147 7.2362 16.4147 7.76384 16.0892 8.08928L11.0892 13.0893C10.7638 13.4147 10.2361 13.4147 9.9107 13.0893L4.9107 8.08928C4.58527 7.76384 4.58527 7.2362 4.9107 6.91076Z", fill: "white" })))), index.h("div", { id: "list-background", class: classNames({ visible: this.isListVisible }), onClick: () => this.setListVisibility(false) }), index.h("div", { class: this.isListVisible ? 'list visible' : 'list' }, index.h("ul", null, cameraListElements))));
  }
  get hostEl() { return index.getElement(this); }
};
MbCameraSelection.style = mbCameraSelectionCss;

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function hasVideoDevices() {
  return new Promise((resolve) => {
    if (!window.navigator ||
      !window.navigator.mediaDevices ||
      typeof window.navigator.mediaDevices.enumerateDevices !== 'function') {
      resolve(false);
      return;
    }
    window.navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices = devices || [];
      for (const device of devices) {
        if (device && device.kind === 'videoinput') {
          resolve(true);
          return;
        }
      }
      resolve(false);
    });
  });
}
function isWasmSupported() {
  return new Promise((resolve) => {
    const wasmSupport = isBrowserSupported();
    resolve(wasmSupport);
  });
}
async function checkMandatoryCapabilites() {
  const wasmSupport = await isWasmSupported();
  return wasmSupport;
}
/**
 * Determine whether this is a desktop device based on the screen resolution.
 */
function isDesktop() {
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return viewportWidth >= 1024;
}

const mbCameraToolbarCss = ":host{position:absolute;top:0;left:0;right:0;background-color:rgba(107, 114, 128, 0.7);-webkit-backdrop-filter:blur(var(--mb-blur-filter));backdrop-filter:blur(var(--mb-blur-filter))}:host header{display:flex;height:44px;align-items:center;padding-inline:32px}:host header>*{display:block;flex-grow:1}:host .camera-selection-wrapper{position:relative}:host mb-camera-selection{display:none}:host mb-camera-selection.visible{display:block}@media only screen and (min-width: 1280px){:host header{max-width:1024px;margin:0 auto;padding-left:0;padding-right:0}}:host .toolbar-button{all:unset;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;width:40px;height:40px;box-sizing:border-box;border-radius:var(--mb-toolbar-border-radius);display:grid;place-content:center}:host .toolbar-button svg{filter:drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.4))}:host .toolbar-button:hover{background-color:rgba(107, 114, 128, 0.3);box-shadow:0px 1px 4px rgba(0, 0, 0, 0.1)}:host .toolbar-button:focus,:host .toolbar-button:active{box-shadow:0 0 0 1px var(--mb-toolbar-border-color)}:host .flip-button{transform-style:preserve-3d;perspective:600px;transition:transform 800ms;z-index:1}:host .flip-button.flipped{transform:rotateY(180deg)}";

let MbCameraToolbar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.setIsCameraActive = index.createEvent(this, "setIsCameraActive", 7);
    this.closeEvent = index.createEvent(this, "closeEvent", 7);
    this.flipEvent = index.createEvent(this, "flipEvent", 7);
    this.changeCameraDevice = index.createEvent(this, "changeCameraDevice", 7);
    this.showCloseButton = false;
    this.isDesktop = isDesktop();
    /**
     * Set to `true` if close button should be displayed.
     */
    this.showClose = false;
    this.clearIsCameraActive = false;
    /**
     * Whether to show 'Camera flip' button.
     */
    this.enableCameraFlip = false;
    /**
     * Whether the camera is flipped, this property will be flip the relevant icon.
     */
    this.cameraFlipped = false;
    this.handleResize = () => {
      this.isDesktop = isDesktop();
    };
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  connectedCallback() {
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  }
  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize, false);
  }
  /**
   * Change active camera.
   */
  async setActiveCamera(cameraId) {
    this.cameraSelection.setActiveCamera(cameraId);
    this.showCloseButton = this.showClose;
  }
  /**
   * Populate list of camera devices.
   */
  async populateCameraDevices() {
    await this.cameraSelection.populateCameraDevices();
  }
  handleClose(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.closeEvent.emit();
    this.showCloseButton = false;
  }
  handleFlip(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    this.flipEvent.emit();
  }
  handleChangeCameraDevice(camera) {
    this.changeCameraDevice.emit(camera);
  }
  handleSetIsCameraActive(ev) {
    if (ev.detail) {
      this.showCloseButton = this.showClose;
    }
    else {
      this.showCloseButton = ev.detail;
    }
  }
  render() {
    let flipButton = '';
    if (this.enableCameraFlip) {
      flipButton = (index.h("button", { class: this.cameraFlipped ? 'toolbar-button flip-button flipped' : 'toolbar-button flip-button', onClick: (ev) => this.handleFlip(ev) }, index.h("svg", { width: "28", height: "28", viewBox: "0 0 28 28", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16 5C16.5523 5 17 5.44772 17 6V24C17 24.5523 16.5523 25 16 25C15.4477 25 15 24.5523 15 24V6C15 5.44772 15.4477 5 16 5Z", fill: "white" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19.7702 9.02676C20.2216 8.9202 20.687 9.13798 20.8944 9.55279L25.8944 19.5528C26.0494 19.8628 26.0329 20.2309 25.8507 20.5257C25.6684 20.8206 25.3466 21 25 21H20C19.4477 21 19 20.5523 19 20V10C19 9.53623 19.3189 9.13331 19.7702 9.02676ZM21 14.2361V19H23.382L21 14.2361Z", fill: "white" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.2298 9.02676C12.6811 9.13331 13 9.53623 13 10V20C13 20.5523 12.5523 21 12 21H7C6.65342 21 6.33156 20.8206 6.14935 20.5257C5.96714 20.2309 5.95058 19.8628 6.10557 19.5528L11.1056 9.55279C11.313 9.13798 11.7784 8.9202 12.2298 9.02676ZM8.61803 19H11V14.2361L8.61803 19Z", fill: "white" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M19.7702 9.02676C20.2216 8.9202 20.687 9.13798 20.8944 9.55279L25.8944 19.5528C26.0494 19.8628 26.0329 20.2309 25.8507 20.5257C25.6684 20.8206 25.3466 21 25 21H20C19.4477 21 19 20.5523 19 20V10C19 9.53623 19.3189 9.13331 19.7702 9.02676Z", fill: "white" }))));
    }
    let closeButton = '';
    if (this.showCloseButton) {
      closeButton = (index.h("button", { class: "toolbar-button close-button", onClick: (ev) => this.handleClose(ev) }, index.h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z", fill: "white" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z", fill: "white" }))));
    }
    return (index.h(index.Host, null, index.h("header", null, flipButton, index.h("div", { class: "camera-selection-wrapper" }, index.h("mb-camera-selection", { "clear-is-camera-active": !this.showCloseButton || this.clearIsCameraActive, onChangeCameraDevice: (ev) => this.handleChangeCameraDevice(ev.detail), class: classNames({ visible: this.isDesktop }), ref: el => this.cameraSelection = el })), closeButton)));
  }
  get hostEl() { return index.getElement(this); }
};
MbCameraToolbar.style = mbCameraToolbarCss;

const mbCompletedCss = ":host{display:block;padding:0}:host img{display:block;width:24px;height:24px}";

let MbCompleted = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Value of `src` attribute for <img> element.
     */
    this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS4yMDcxIDYuMjkyODlDMjEuNTk3NiA2LjY4MzQyIDIxLjU5NzYgNy4zMTY1OCAyMS4yMDcxIDcuNzA3MTFMMTEuMjA3MSAxNy43MDcxQzEwLjgxNjYgMTguMDk3NiAxMC4xODM0IDE4LjA5NzYgOS43OTI4OSAxNy43MDcxTDQuNzkyODkgMTIuNzA3MUM0LjQwMjM3IDEyLjMxNjYgNC40MDIzNyAxMS42ODM0IDQuNzkyODkgMTEuMjkyOUM1LjE4MzQyIDEwLjkwMjQgNS44MTY1OCAxMC45MDI0IDYuMjA3MTEgMTEuMjkyOUwxMC41IDE1LjU4NThMMTkuNzkyOSA2LjI5Mjg5QzIwLjE4MzQgNS45MDIzNyAyMC44MTY2IDUuOTAyMzcgMjEuMjA3MSA2LjI5Mjg5WiIgZmlsbD0iIzAwNjJGMiIvPgo8L3N2Zz4K';
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (index.h(index.Host, null, index.h("img", { src: this.icon })));
  }
  get hostEl() { return index.getElement(this); }
};
MbCompleted.style = mbCompletedCss;

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function getSDKWasmType(wasmType) {
  switch (wasmType) {
    case 'BASIC':
      return WasmType.Basic;
    case 'ADVANCED':
      return WasmType.Advanced;
    case 'ADVANCED_WITH_THREADS':
      return WasmType.AdvancedWithThreads;
    default:
      return null;
  }
}

const mbComponentCss = ":host{box-sizing:border-box;position:relative;display:block;width:var(--mb-component-width);background:var(--mb-component-background);color:var(--mb-component-font-color);font-size:var(--mb-font-size);font-style:var(--mb-font-style);font-weight:var(--mb-font-weight);letter-spacing:var(--mb-letter-spacing);line-height:var(--mb-line-height);text-transform:var(--mb-component-text-transform);border-color:var(--mb-component-border-color);border-radius:var(--mb-component-border-radius);border-style:var(--mb-component-border-style);border-width:var(--mb-component-border-width);box-shadow:var(--mb-component-box-shadow);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media only screen and (min-width: 1440px){:host{font-size:var(--mb-font-size-desktop)}}:host #mb-screen-loading{display:flex;align-items:center;justify-content:center;padding:16px}:host #mb-screen-loading:not(.visible) img{animation-play-state:paused}:host #mb-screen-error{display:flex;flex-direction:row;align-items:center;justify-content:center}:host #mb-screen-error .icon-alert{display:flex;margin-right:10px}:host :host #mb-screen-error:not(.visible),:host :host #mb-screen-action:not(.visible),:host :host #mb-screen-loading:not(.visible),:host :host #mb-screen-processing:not(.visible){border:none}:host #mb-screen-action .actions{display:flex;justify-content:space-between;align-items:center}:host #mb-screen-action .action-label{display:var(--mb-component-action-label);margin:0 16px 0 0;cursor:default;font-size:var(--mb-component-action-label-font-size)}:host #mb-screen-action .action-label:dir(rtl){background-color:black}:host #mb-screen-action .action-buttons{display:flex;gap:var(--mb-component-action-buttons-gap);justify-content:var(--mb-component-action-buttons-justify-content);flex:1}:host #mb-screen-action .combined-image-upload{display:none;width:100%;padding:0;padding:8px 0}:host #mb-screen-action .combined-image-upload mb-image-box,:host #mb-screen-action .combined-image-upload mb-button-classic{display:block;box-sizing:border-box;float:left}:host #mb-screen-action .combined-image-upload mb-image-box{width:calc(50% - 4px)}:host #mb-screen-action .combined-image-upload mb-image-box:nth-of-type(1){margin-right:4px}:host #mb-screen-action .combined-image-upload mb-image-box:nth-of-type(2){margin-left:4px}:host #mb-screen-action .combined-image-upload mb-button-classic{width:100%;margin-top:8px}:host([dir=rtl]) #mb-screen-action .action-label{margin:0 0 0 16px}:host #mb-screen-processing p{display:none;margin:8px 0}:host #mb-screen-processing p.visible{display:flex;flex-direction:row;align-items:center;justify-content:center;font-size:var(--mb-component-font-size)}:host #mb-screen-processing p.in-progress{color:var(--mb-component-font-color-secondary)}:host #mb-screen-processing p.done{color:var(--mb-component-font-color)}:host #mb-screen-processing[data-type=single] p span{margin-left:8px}:host #mb-screen-processing[data-type=combined] p span{margin-left:8px}:host #mb-overlay-device-selection{display:flex;align-items:center;justify-content:center;background-color:var(--mb-overlay-deviceselection-background)}:host #mb-overlay-device-selection-mobile{display:flex;align-items:center;justify-content:center;background-color:var(--mb-overlay-deviceselection-background)}:host #mb-overlay-drag-and-drop{display:flex;align-items:center;justify-content:center;flex-direction:column}:host #mb-overlay-drag-and-drop .drag-and-drop-icon{display:block;width:24px;height:24px}:host #mb-overlay-drag-and-drop .drag-and-drop-message{max-width:360px;margin:12px 0 0 0;text-align:center;color:var(--mb-component-font-color);font-size:var(--mb-font-size);font-style:var(--mb-font-style);font-weight:var(--mb-font-weight);letter-spacing:var(--mb-letter-spacing);line-height:var(--mb-line-height);text-transform:var(--mb-component-text-transform)}:host #mb-overlay-drag-and-drop.visible{background-color:var(--mb-overlay-draganddrop-background)}:host #mb-overlay-drag-and-drop.visible.error{background-color:var(--mb-overlay-draganddrop-background-error)}:host #mb-overlay-drag-and-drop.visible.error .drag-and-drop-message{color:var(--mb-overlay-draganddrop-text-error-color)}:host #mb-overlay-drag-and-drop.hidden{display:none}:host #mb-overlay-drag-and-drop.inline{position:absolute;flex-direction:row;border-style:var(--mb-overlay-draganddrop-border-style);border-radius:var(--mb-component-border-radius);border-width:var(--mb-component-border-width)}:host #mb-overlay-drag-and-drop.inline .drag-and-drop-message{margin:0 0 0 8px;color:var(--mb-overlay-draganddrop-text-color);font-size:var(--mb-component-font-size)}:host #mb-overlay-drag-and-drop.inline.visible{border-color:var(--mb-overlay-draganddrop-border-color)}:host #mb-overlay-drag-and-drop.inline.visible.error{border-color:var(--mb-overlay-draganddrop-border-color-error)}:host #mb-overlay-drag-and-drop.inline.visible.error .drag-and-drop-icon{margin-left:16px}:host #mb-overlay-drag-and-drop.inline.visible.error .drag-and-drop-message{text-align:left}:host #drag-and-drop-zone{position:absolute;top:0;bottom:0;left:0;right:0;background-color:transparent}:host #mb-overlay-gallery-experience.visible{display:flex;align-items:center;justify-content:center;flex-direction:column;background-color:var(--mb-overlay-gallery-experience-background);color:var(--mb-overlay-gallery-experience-font-color)}:host #mb-overlay-gallery-experience.visible p{margin:8px 0 0 0;font-size:var(--mb-overlay-gallery-experience-font-size);font-weight:var(--mb-overlay-gallery-experience-font-weight);line-height:var(--mb-overlay-gallery-experience-line-height)}:host #mb-overlay-camera-experience{width:100%;height:100%;min-height:100%;min-height:-webkit-fill-available;overflow:hidden;justify-content:center;align-items:center;background-color:#000;overflow-y:hidden}:host #mb-overlay-camera-experience .holder{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}:host #mb-overlay-camera-experience video{display:block;width:100%;height:auto}:host #mb-overlay-camera-experience mb-camera-experience{position:absolute;top:0;bottom:0;left:0;right:0}:host #mb-overlay-camera-experience mb-camera-experience.is-muted{background-color:rgba(0, 0, 0, 0.6)}:host #mb-overlay-camera-experience mb-camera-experience.is-error{background-color:black}:host #mb-overlay-camera-experience.visible{display:flex;z-index:1000}:host input[type=file]{width:0;height:0;opacity:0;clip:rect(1px, 1px, 1px, 1px);position:absolute}:host button.modal-action-button{width:126px;height:32px;border-radius:0;border:0;background:#48B2E8;color:#ffffff;cursor:pointer}";

let MbComponent = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.block = index.createEvent(this, "block", 7);
    this.fatalError = index.createEvent(this, "fatalError", 7);
    this.ready = index.createEvent(this, "ready", 7);
    this.scanError = index.createEvent(this, "scanError", 7);
    this.scanSuccess = index.createEvent(this, "scanSuccess", 7);
    this.feedback = index.createEvent(this, "feedback", 7);
    this.cameraScanStarted = index.createEvent(this, "cameraScanStarted", 7);
    this.imageScanStarted = index.createEvent(this, "imageScanStarted", 7);
    this.scanAborted = index.createEvent(this, "scanAborted", 7);
    this.setIsCameraActive = index.createEvent(this, "setIsCameraActive", 7);
    this.screens = {
      action: null,
      error: null,
      loading: null,
      processing: null
    };
    this.overlays = {
      camera: null,
      draganddrop: null,
      processing: null,
      modal: null,
      deviceselection: null,
      deviceselectionmobile: null
    };
    this.scanReset = false;
    this.detectionSuccessLock = false;
    this.isBackSide = false;
    this.cameraChangeInProgress = false;
    this.blocked = false;
    this.combinedGalleryOpened = false;
    this.galleryImageFirstFile = null;
    this.galleryImageSecondFile = null;
    this.isCameraActive = false;
    this.galleryExperienceModalErrorWindowVisible = false;
    this.clearIsCameraActive = false;
    this.apiProcessStatusVisible = false;
    this.apiProcessStatusState = 'NONE';
    /**
     * See description in public component.
     */
    this.allowHelloMessage = true;
    /**
     * See description in public component.
     */
    this.engineLocation = '';
    /**
     * See description in public component.
     */
    this.workerLocation = '';
    /**
     * See description in public component.
     */
    this.cameraExperienceStateDurations = null;
    /**
     * See description in public component.
     */
    this.includeSuccessFrame = false;
    /**
     * See description in public component.
     */
    this.enableDrag = true;
    /**
     * See description in public component.
     */
    this.hideLoadingAndErrorUi = false;
    /**
     * See description in public component.
     */
    this.rtl = false;
    /**
     * See description in public component.
     */
    this.scanFromCamera = true;
    /**
     * See description in public component.
     */
    this.scanFromImage = true;
    /**
     * See description in public component.
     */
    this.thoroughScanFromImage = false;
    /**
     * See description in public component.
     */
    this.galleryOverlayType = 'INLINE';
    /**
     * See description in public component.
     */
    this.galleryDropType = 'INLINE';
    /**
     * See description in public component.
     */
    this.showActionLabels = false;
    /**
     * See description in public component.
     */
    this.showModalWindows = false;
    /**
     * See description in public component.
     */
    this.showCameraFeedbackBarcodeMessage = false;
    /**
     * See description in public component.
     */
    this.showScanningLine = false;
    /**
     * See description in public component.
     */
    this.iconCameraDefault = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.32151 2.98816C6.63407 2.6756 7.05799 2.5 7.50002 2.5H12.5C12.942 2.5 13.366 2.6756 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667C14.1667 4.38768 14.2545 4.59964 14.4108 4.75592C14.567 4.9122 14.779 5 15 5H15.8334C16.4964 5 17.1323 5.26339 17.6011 5.73223C18.07 6.20107 18.3334 6.83696 18.3334 7.5V15C18.3334 15.663 18.07 16.2989 17.6011 16.7678C17.1323 17.2366 16.4964 17.5 15.8334 17.5H4.16669C3.50365 17.5 2.86776 17.2366 2.39892 16.7678C1.93008 16.2989 1.66669 15.663 1.66669 15V7.5C1.66669 6.83696 1.93008 6.20107 2.39892 5.73223C2.86776 5.26339 3.50365 5 4.16669 5H5.00002C5.22103 5 5.433 4.9122 5.58928 4.75592C5.74556 4.59964 5.83335 4.38768 5.83335 4.16667C5.83335 3.72464 6.00895 3.30072 6.32151 2.98816ZM4.16669 6.66667C3.94567 6.66667 3.73371 6.75446 3.57743 6.91074C3.42115 7.06702 3.33335 7.27899 3.33335 7.5V15C3.33335 15.221 3.42115 15.433 3.57743 15.5893C3.73371 15.7455 3.94567 15.8333 4.16669 15.8333H15.8334C16.0544 15.8333 16.2663 15.7455 16.4226 15.5893C16.5789 15.433 16.6667 15.221 16.6667 15V7.5C16.6667 7.27899 16.5789 7.06702 16.4226 6.91074C16.2663 6.75446 16.0544 6.66667 15.8334 6.66667H15C14.337 6.66667 13.7011 6.40327 13.2323 5.93443C12.7634 5.46559 12.5 4.82971 12.5 4.16667L7.50002 4.16667C7.50002 4.82971 7.23663 5.46559 6.76779 5.93443C6.29895 6.40327 5.66306 6.66667 5.00002 6.66667H4.16669Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.16667C9.07955 9.16667 8.33335 9.91286 8.33335 10.8333C8.33335 11.7538 9.07955 12.5 10 12.5C10.9205 12.5 11.6667 11.7538 11.6667 10.8333C11.6667 9.91286 10.9205 9.16667 10 9.16667ZM6.66669 10.8333C6.66669 8.99238 8.15907 7.5 10 7.5C11.841 7.5 13.3334 8.99238 13.3334 10.8333C13.3334 12.6743 11.841 14.1667 10 14.1667C8.15907 14.1667 6.66669 12.6743 6.66669 10.8333Z" fill="black"/></svg>';
    /**
    * See description in public component.
    */
    this.iconCameraActive = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.32151 2.98816C6.63407 2.6756 7.05799 2.5 7.50002 2.5H12.5C12.942 2.5 13.366 2.6756 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667C14.1667 4.38768 14.2545 4.59964 14.4108 4.75592C14.567 4.9122 14.779 5 15 5H15.8334C16.4964 5 17.1323 5.26339 17.6011 5.73223C18.07 6.20107 18.3334 6.83696 18.3334 7.5V15C18.3334 15.663 18.07 16.2989 17.6011 16.7678C17.1323 17.2366 16.4964 17.5 15.8334 17.5H4.16669C3.50365 17.5 2.86776 17.2366 2.39892 16.7678C1.93008 16.2989 1.66669 15.663 1.66669 15V7.5C1.66669 6.83696 1.93008 6.20107 2.39892 5.73223C2.86776 5.26339 3.50365 5 4.16669 5H5.00002C5.22103 5 5.433 4.9122 5.58928 4.75592C5.74556 4.59964 5.83335 4.38768 5.83335 4.16667C5.83335 3.72464 6.00895 3.30072 6.32151 2.98816ZM4.16669 6.66667C3.94567 6.66667 3.73371 6.75446 3.57743 6.91074C3.42115 7.06702 3.33335 7.27899 3.33335 7.5V15C3.33335 15.221 3.42115 15.433 3.57743 15.5893C3.73371 15.7455 3.94567 15.8333 4.16669 15.8333H15.8334C16.0544 15.8333 16.2663 15.7455 16.4226 15.5893C16.5789 15.433 16.6667 15.221 16.6667 15V7.5C16.6667 7.27899 16.5789 7.06702 16.4226 6.91074C16.2663 6.75446 16.0544 6.66667 15.8334 6.66667H15C14.337 6.66667 13.7011 6.40327 13.2323 5.93443C12.7634 5.46559 12.5 4.82971 12.5 4.16667L7.50002 4.16667C7.50002 4.82971 7.23663 5.46559 6.76779 5.93443C6.29895 6.40327 5.66306 6.66667 5.00002 6.66667H4.16669Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.16667C9.07955 9.16667 8.33335 9.91286 8.33335 10.8333C8.33335 11.7538 9.07955 12.5 10 12.5C10.9205 12.5 11.6667 11.7538 11.6667 10.8333C11.6667 9.91286 10.9205 9.16667 10 9.16667ZM6.66669 10.8333C6.66669 8.99238 8.15907 7.5 10 7.5C11.841 7.5 13.3334 8.99238 13.3334 10.8333C13.3334 12.6743 11.841 14.1667 10 14.1667C8.15907 14.1667 6.66669 12.6743 6.66669 10.8333Z" fill="%2348B2E8"/></svg>';
    /**
    * See description in public component.
    */
    this.iconGalleryDefault = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6667 6.66666C11.6667 6.20642 12.0398 5.83333 12.5 5.83333H12.5084C12.9686 5.83333 13.3417 6.20642 13.3417 6.66666C13.3417 7.1269 12.9686 7.5 12.5084 7.5H12.5C12.0398 7.5 11.6667 7.1269 11.6667 6.66666Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.83333 4.16667C4.91286 4.16667 4.16667 4.91286 4.16667 5.83333V14.1667C4.16667 15.0871 4.91286 15.8333 5.83333 15.8333H14.1667C15.0871 15.8333 15.8333 15.0871 15.8333 14.1667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1667 4.16667H5.83333ZM2.5 5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H14.1667C16.0076 2.5 17.5 3.99238 17.5 5.83333V14.1667C17.5 16.0076 16.0076 17.5 14.1667 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1667V5.83333Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.24972 9.76212L3.92259 13.0892C3.59715 13.4147 3.06951 13.4147 2.74408 13.0892C2.41864 12.7638 2.41864 12.2362 2.74408 11.9107L6.07741 8.57741L6.08885 8.56618C6.59083 8.08315 7.22016 7.7751 7.91667 7.7751C8.61317 7.7751 9.2425 8.08315 9.74448 8.56618L9.75592 8.57741L13.9226 12.7441C14.248 13.0695 14.248 13.5971 13.9226 13.9226C13.5972 14.248 13.0695 14.248 12.7441 13.9226L8.58361 9.76212C8.32758 9.51773 8.09662 9.44177 7.91667 9.44177C7.73672 9.44177 7.50575 9.51773 7.24972 9.76212Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.083 11.4288L12.2559 12.2559C11.9305 12.5814 11.4028 12.5814 11.0774 12.2559C10.752 11.9305 10.752 11.4028 11.0774 11.0774L11.9107 10.2441L11.9222 10.2329C12.4241 9.74982 13.0535 9.44177 13.75 9.44177C14.4465 9.44177 15.0758 9.74982 15.5778 10.2329L15.5892 10.2441L17.2559 11.9107C17.5813 12.2362 17.5813 12.7638 17.2559 13.0893C16.9305 13.4147 16.4028 13.4147 16.0774 13.0893L14.4169 11.4288C14.1609 11.1844 13.9299 11.1084 13.75 11.1084C13.57 11.1084 13.3391 11.1844 13.083 11.4288Z" fill="black"/></svg>';
    /**
     * See description in public component.
     */
    this.iconDragAndDropGalleryDefault = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNCA4QzE0IDcuNDQ3NzIgMTQuNDQ3NyA3IDE1IDdIMTUuMDFDMTUuNTYyMyA3IDE2LjAxIDcuNDQ3NzIgMTYuMDEgOEMxNi4wMSA4LjU1MjI4IDE1LjU2MjMgOSAxNS4wMSA5SDE1QzE0LjQ0NzcgOSAxNCA4LjU1MjI4IDE0IDhaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNyA1QzUuODk1NDMgNSA1IDUuODk1NDMgNSA3VjE3QzUgMTguMTA0NiA1Ljg5NTQzIDE5IDcgMTlIMTdDMTguMTA0NiAxOSAxOSAxOC4xMDQ2IDE5IDE3VjdDMTkgNS44OTU0MyAxOC4xMDQ2IDUgMTcgNUg3Wk0zIDdDMyA0Ljc5MDg2IDQuNzkwODYgMyA3IDNIMTdDMTkuMjA5MSAzIDIxIDQuNzkwODYgMjEgN1YxN0MyMSAxOS4yMDkxIDE5LjIwOTEgMjEgMTcgMjFIN0M0Ljc5MDg2IDIxIDMgMTkuMjA5MSAzIDE3VjdaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOC42OTk2NiAxMS43MTQ1TDQuNzA3MTEgMTUuNzA3MUM0LjMxNjU4IDE2LjA5NzYgMy42ODM0MiAxNi4wOTc2IDMuMjkyODkgMTUuNzA3MUMyLjkwMjM3IDE1LjMxNjUgMi45MDIzNyAxNC42ODM0IDMuMjkyODkgMTQuMjkyOEw3LjI5Mjg5IDEwLjI5MjhMNy4zMDY2MiAxMC4yNzk0QzcuOTA5IDkuNjk5NzQgOC42NjQxOSA5LjMzMDA4IDkuNSA5LjMzMDA4QzEwLjMzNTggOS4zMzAwOCAxMS4wOTEgOS42OTk3NCAxMS42OTM0IDEwLjI3OTRMMTEuNzA3MSAxMC4yOTI4TDE2LjcwNzEgMTUuMjkyOEMxNy4wOTc2IDE1LjY4MzQgMTcuMDk3NiAxNi4zMTY1IDE2LjcwNzEgMTYuNzA3MUMxNi4zMTY2IDE3LjA5NzYgMTUuNjgzNCAxNy4wOTc2IDE1LjI5MjkgMTYuNzA3MUwxMC4zMDAzIDExLjcxNDVDOS45OTMxIDExLjQyMTIgOS43MTU5NCAxMS4zMzAxIDkuNSAxMS4zMzAxQzkuMjg0MDYgMTEuMzMwMSA5LjAwNjkgMTEuNDIxMiA4LjY5OTY2IDExLjcxNDVaIiBmaWxsPSIjMDA2MkYyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuNjk5NyAxMy43MTQ1TDE0LjcwNzEgMTQuNzA3MUMxNC4zMTY2IDE1LjA5NzYgMTMuNjgzNCAxNS4wOTc2IDEzLjI5MjkgMTQuNzA3MUMxMi45MDI0IDE0LjMxNjUgMTIuOTAyNCAxMy42ODM0IDEzLjI5MjkgMTMuMjkyOEwxNC4yOTI5IDEyLjI5MjhMMTQuMzA2NiAxMi4yNzk0QzE0LjkwOSAxMS42OTk3IDE1LjY2NDIgMTEuMzMwMSAxNi41IDExLjMzMDFDMTcuMzM1OCAxMS4zMzAxIDE4LjA5MSAxMS42OTk3IDE4LjY5MzQgMTIuMjc5NEwxOC43MDcxIDEyLjI5MjhMMjAuNzA3MSAxNC4yOTI4QzIxLjA5NzYgMTQuNjgzNCAyMS4wOTc2IDE1LjMxNjUgMjAuNzA3MSAxNS43MDcxQzIwLjMxNjYgMTYuMDk3NiAxOS42ODM0IDE2LjA5NzYgMTkuMjkyOSAxNS43MDcxTDE3LjMwMDMgMTMuNzE0NUMxNi45OTMxIDEzLjQyMTIgMTYuNzE1OSAxMy4zMzAxIDE2LjUgMTMuMzMwMUMxNi4yODQxIDEzLjMzMDEgMTYuMDA2OSAxMy40MjEyIDE1LjY5OTcgMTMuNzE0NVoiIGZpbGw9IiMwMDYyRjIiLz4KPC9zdmc+Cg==';
    /**
     * See description in public component.
     */
    this.iconDragAndDropWarningDefault = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiA4QzEyLjU1MjMgOCAxMyA4LjQ0NzcyIDEzIDlWMTFDMTMgMTEuNTUyMyAxMi41NTIzIDEyIDEyIDEyQzExLjQ0NzcgMTIgMTEgMTEuNTUyMyAxMSAxMVY5QzExIDguNDQ3NzIgMTEuNDQ3NyA4IDEyIDhaTTEyIDE0QzEyLjU1MjMgMTQgMTMgMTQuNDQ3NyAxMyAxNVYxNS4wMUMxMyAxNS41NjIzIDEyLjU1MjMgMTYuMDEgMTIgMTYuMDFDMTEuNDQ3NyAxNi4wMSAxMSAxNS41NjIzIDExIDE1LjAxVjE1QzExIDE0LjQ0NzcgMTEuNDQ3NyAxNCAxMiAxNFoiIGZpbGw9IiNFMTFENDgiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC40NzY0IDIuMzgzOTdDMTAuOTM4MSAyLjExMTgxIDExLjQ2NDIgMS45NjgyNiAxMi4wMDAxIDEuOTY4MjZDMTIuNTM1OSAxLjk2ODI2IDEzLjA2MjEgMi4xMTE4MSAxMy41MjM3IDIuMzgzOTdDMTMuOTgzMSAyLjY1NDg1IDE0LjM2MiAzLjA0MzMgMTQuNjIxNCAzLjUwOTI1TDIxLjYxODMgMTUuNzUzOUMyMS42NDA0IDE1Ljc5MjUgMjEuNjU5OCAxNS44MzI1IDIxLjY3NjUgMTUuODczN0MyMS44NTY2IDE2LjMxNzEgMjEuOTI4IDE2Ljc5NzEgMjEuODg0OCAxNy4yNzM3QzIxLjg0MTYgMTcuNzUwMiAyMS42ODUgMTguMjA5NiAyMS40MjgxIDE4LjYxMzNDMjEuMTcxMSAxOS4wMTcgMjAuODIxNCAxOS4zNTM0IDIwLjQwOCAxOS41OTQ0QzE5Ljk5NDUgMTkuODM1NCAxOS41Mjk0IDE5Ljk3NDEgMTkuMDUxNSAxOS45OTg3QzE5LjAzNDQgMTkuOTk5NiAxOS4wMTcyIDIwIDE5LjAwMDEgMjBINS4wNzAwNUM1LjA1ODU3IDIwIDUuMDQ3MTQgMTkuOTk5OCA1LjAzNTc1IDE5Ljk5OTRDNS4wMDY5NiAyMC4wMDA0IDQuOTc3ODggMjAuMDAwMiA0Ljk0ODU3IDE5Ljk5ODdDNC40NzA2NiAxOS45NzQxIDQuMDA1NTggMTkuODM1NCAzLjU5MjE2IDE5LjU5NDRDMy4xNzg3MyAxOS4zNTM0IDIuODI4OTYgMTkuMDE3IDIuNTcyMDQgMTguNjEzM0MyLjMxNTEzIDE4LjIwOTYgMi4xNTg1MiAxNy43NTAyIDIuMTE1MjkgMTcuMjczN0MyLjA3MjA3IDE2Ljc5NzEgMi4xNDM0OCAxNi4zMTcxIDIuMzIzNTcgMTUuODczN0MyLjM0MDMgMTUuODMyNSAyLjM1OTc1IDE1Ljc5MjUgMi4zODE4MSAxNS43NTM5TDkuMzc4NzQgMy41MDkyNUM5LjYzODA4IDMuMDQzMyAxMC4wMTcgMi42NTQ4NSAxMC40NzY0IDIuMzgzOTdaTTUuMDM3NjcgMTguMDAwNUM1LjA0ODQyIDE4LjAwMDIgNS4wNTkyMiAxOCA1LjA3MDA1IDE4SDE4Ljk2OTlDMTkuMTIxNyAxNy45ODg5IDE5LjI2OTEgMTcuOTQzMyAxOS40MDA3IDE3Ljg2NjZDMTkuNTM4NSAxNy43ODYzIDE5LjY1NTEgMTcuNjc0MSAxOS43NDA3IDE3LjUzOTVDMTkuODI2NCAxNy40MDUgMTkuODc4NiAxNy4yNTE5IDE5Ljg5MyAxNy4wOTNDMTkuOTA1NyAxNi45NTI1IDE5Ljg4ODYgMTYuODExMiAxOS44NDMgMTYuNjc4MkwxMi44NzUgNC40ODQxOEMxMi43ODg1IDQuMzI3ODggMTIuNjYxOCA0LjE5NzU1IDEyLjUwNzkgNC4xMDY4M0MxMi4zNTQxIDQuMDE2MTEgMTIuMTc4NyAzLjk2ODI2IDEyLjAwMDEgMy45NjgyNkMxMS44MjE0IDMuOTY4MjYgMTEuNjQ2MSA0LjAxNjExIDExLjQ5MjIgNC4xMDY4M0MxMS4zMzgzIDQuMTk3NTUgMTEuMjExNSA0LjMyNzg0IDExLjEyNTEgNC40ODQxNEwxMS4xMTg0IDQuNDk2Mkw0LjE1NzE0IDE2LjY3ODJDNC4xMTE1MSAxNi44MTEyIDQuMDk0MzggMTYuOTUyNSA0LjEwNzEyIDE3LjA5M0M0LjEyMTUyIDE3LjI1MTkgNC4xNzM3MyAxNy40MDUgNC4yNTkzNyAxNy41Mzk1QzQuMzQ1MDEgMTcuNjc0MSA0LjQ2MTYgMTcuNzg2MyA0LjU5OTQgMTcuODY2NkM0LjczMzIxIDE3Ljk0NDYgNC44ODMyNCAxNy45OTA0IDUuMDM3NjcgMTguMDAwNVoiIGZpbGw9IiNFMTFENDgiLz4KPC9zdmc+Cg==';
    /**
     * See description in public component.
     */
    this.iconGalleryActive = 'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.6667 6.66667C11.6667 6.20643 12.0398 5.83334 12.5 5.83334H12.5084C12.9686 5.83334 13.3417 6.20643 13.3417 6.66667C13.3417 7.12691 12.9686 7.5 12.5084 7.5H12.5C12.0398 7.5 11.6667 7.12691 11.6667 6.66667Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.83333 4.16667C4.91286 4.16667 4.16667 4.91286 4.16667 5.83333V14.1667C4.16667 15.0871 4.91286 15.8333 5.83333 15.8333H14.1667C15.0871 15.8333 15.8333 15.0871 15.8333 14.1667V5.83333C15.8333 4.91286 15.0871 4.16667 14.1667 4.16667H5.83333ZM2.5 5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H14.1667C16.0076 2.5 17.5 3.99238 17.5 5.83333V14.1667C17.5 16.0076 16.0076 17.5 14.1667 17.5H5.83333C3.99238 17.5 2.5 16.0076 2.5 14.1667V5.83333Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7.24972 9.76213L3.92259 13.0893C3.59715 13.4147 3.06951 13.4147 2.74408 13.0893C2.41864 12.7638 2.41864 12.2362 2.74408 11.9107L6.07741 8.57741L6.08885 8.56619C6.59083 8.08316 7.22016 7.77511 7.91667 7.77511C8.61317 7.77511 9.2425 8.08316 9.74448 8.56619L9.75592 8.57741L13.9226 12.7441C14.248 13.0695 14.248 13.5972 13.9226 13.9226C13.5972 14.248 13.0695 14.248 12.7441 13.9226L8.58361 9.76213C8.32758 9.51774 8.09662 9.44177 7.91667 9.44177C7.73672 9.44177 7.50575 9.51774 7.24972 9.76213Z" fill="%2348B2E8"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13.083 11.4288L12.2559 12.2559C11.9305 12.5814 11.4028 12.5814 11.0774 12.2559C10.752 11.9305 10.752 11.4028 11.0774 11.0774L11.9107 10.2441L11.9222 10.2329C12.4241 9.74982 13.0535 9.44177 13.75 9.44177C14.4465 9.44177 15.0758 9.74982 15.5778 10.2329L15.5892 10.2441L17.2559 11.9107C17.5813 12.2362 17.5813 12.7638 17.2559 13.0893C16.9305 13.4147 16.4028 13.4147 16.0774 13.0893L14.4169 11.4288C14.1609 11.1844 13.9299 11.1084 13.75 11.1084C13.57 11.1084 13.3391 11.1844 13.083 11.4288Z" fill="%2348B2E8"/></svg>';
    /**
     * See description in public component.
     */
    this.iconInvalidFormat = 'data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="black"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 9.29289C9.68342 8.90237 10.3166 8.90237 10.7071 9.29289L12 10.5858L13.2929 9.29289C13.6834 8.90237 14.3166 8.90237 14.7071 9.29289C15.0976 9.68342 15.0976 10.3166 14.7071 10.7071L13.4142 12L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L12 13.4142L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071C8.90237 14.3166 8.90237 13.6834 9.29289 13.2929L10.5858 12L9.29289 10.7071C8.90237 10.3166 8.90237 9.68342 9.29289 9.29289Z" fill="black"/></svg>';
    /**
     * Camera device ID passed from root component.
     */
    this.cameraId = null;
  }
  componentDidLoad() {
    // Set `exportparts` attribute on root `mb-component` element to enable ::part() CSS customization
    setWebComponentParts(this.hostEl);
    const parts = getWebComponentParts(this.hostEl.shadowRoot);
    const exportedParts = getWebComponentExportedParts(this.hostEl.shadowRoot);
    this.hostEl.setAttribute('exportparts', parts.concat(exportedParts).join(', '));
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.sdkService) === null || _a === void 0 ? void 0 : _a.stopRecognition();
  }
  handleKeyUp(ev) {
    if (ev.key === 'Escape' || ev.code === 'Escape') {
      if (this.overlays.camera.visible && this.isCameraActive) {
        this.abortScan();
        this.handleSetIsCameraActive(false);
        this.clearIsCameraActive = true;
      }
    }
  }
  handleSetIsCameraActive(isCameraActive) {
    this.isCameraActive = isCameraActive;
    this.clearIsCameraActive = false;
  }
  /**
   * Starts camera scan using camera overlay with usage instructions.
   */
  async startCameraScan() {
    this.startScanFromCamera();
  }
  /**
   * Starts image scan, emits results from provided file.
   *
   * @param file File to scan
   */
  async startImageScan(file) {
    this.startScanFromImage(file);
  }
  /**
   * Starts combined image scan, emits results from provided files.
   *
   * @param firstFile File to scan as first image
   * @param secondFile File to scan as second image
   */
  async startCombinedImageScan(firstFile, secondFile) {
    this.startScanFromImageCombined(firstFile, secondFile);
  }
  /**
   * Method is exposed outside which allow us to control UI state from parent component.
   *
   * In case of state `ERROR` and if `showModalWindows` is set to `true`, modal window
   * with error message will be displayed.
   */
  async setUiState(state) {
    window.setTimeout(() => {
      if (this.overlays.camera.visible) {
        if (state === 'ERROR' && !this.showModalWindows) {
          this.apiProcessStatusState = 'NONE';
          this.apiProcessStatusVisible = false;
          this.stopRecognition();
          return;
        }
        this.apiProcessStatusState = state;
        this.apiProcessStatusVisible = true;
        if (state !== 'ERROR') {
          this.cameraExperience.classList.add('is-muted');
        }
        else {
          this.cameraExperience.classList.add('is-error');
        }
        this.cameraExperience.apiState = state;
      }
      else if (this.overlays.processing.visible) {
        if (state === 'ERROR') {
          if (this.showModalWindows) {
            this.galleryExperienceModalErrorWindowVisible = true;
          }
          else {
            this.galleryExperienceModalErrorWindowVisible = false;
            this.stopRecognition();
          }
        }
      }
      if (state === 'SUCCESS') {
        window.setTimeout(() => this.stopRecognition(), 400);
      }
      if (state === 'ERROR') {
        this.hideScanFromImageUi(false);
        this.clearInputImages();
      }
    }, 400);
  }
  async closeApiProcessStatus(restart = false) {
    window.setTimeout(() => {
      this.apiProcessStatusVisible = false;
      this.apiProcessStatusState = 'NONE';
      this.cameraExperience.classList.remove('is-muted');
      this.cameraExperience.classList.remove('is-error');
    }, 600);
    if (restart) {
      await this.checkInputProperties()
        .then(() => this.sdkService.resumeRecognition())
        .then(() => {
        window.setTimeout(() => this.cameraExperience.apiState = '', 400);
        this.isBackSide = false;
        this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide, true);
      });
    }
  }
  async init() {
    if (!this.hideLoadingAndErrorUi) {
      this.showScreen('loading');
      this.showOverlay('');
    }
    if (this.blocked) {
      return;
    }
    const internetIsAvailable = navigator.onLine;
    if (!internetIsAvailable) {
      this.setFatalError(new SDKError({
        code: ErrorCodes.InternetNotAvailable,
        message: this.translationService.i('check-internet-connection').toString()
      }));
      return;
    }
    const hasMandatoryProperties = await this.checkInputProperties();
    if (!hasMandatoryProperties) {
      return;
    }
    const hasMandatoryCapabilities = await checkMandatoryCapabilites();
    if (!hasMandatoryCapabilities) {
      this.setFatalError(new SDKError(componentErrors.browserNotSupported));
      return;
    }
    this.blocked = true;
    this.block.emit(true);
    const initEvent = await this.sdkService.initialize(this.licenseKey, {
      allowHelloMessage: this.allowHelloMessage,
      engineLocation: this.engineLocation,
      workerLocation: this.workerLocation,
      wasmType: getSDKWasmType(this.wasmType)
    });
    this.cameraExperience.showOverlay = this.sdkService.showOverlay;
    if (initEvent instanceof SDKError) {
      this.setFatalError(initEvent);
      return;
    }
    if (this.showActionLabels) {
      this.scanFromCameraButton.label = this.translationService.i('action-message-camera').toString();
      this.scanFromImageButton.label = this.translationService.i('action-message-image').toString();
    }
    if (this.scanFromCamera) {
      this.scanFromCameraButton.visible = true;
      const hasVideoDevices$1 = await hasVideoDevices();
      this.scanFromCameraButton.disabled = !hasVideoDevices$1;
      if (!hasVideoDevices$1) {
        this.feedback.emit({
          code: FeedbackCode.CameraDisabled,
          state: 'FEEDBACK_INFO',
          message: this.translationService.i('camera-disabled').toString()
        });
        if (this.showActionLabels) {
          this.scanFromCameraButton.label = this.translationService.i('action-message-camera-disabled').toString();
        }
      }
    }
    if (this.scanFromImage) {
      this.scanFromImageButton.visible = true;
      const imageScanIsAvailable = this.sdkService.isScanFromImageAvailable(this.recognizers, this.recognizerOptions);
      this.scanFromImageButton.disabled = !imageScanIsAvailable;
      if (imageScanIsAvailable) {
        this.imageRecognitionType = this.sdkService.getScanFromImageType(this.recognizers, this.recognizerOptions);
        if (this.imageRecognitionType === ImageRecognitionType.Single) {
          this.screens.processing.setAttribute('data-type', 'single');
        }
        if (this.imageRecognitionType === ImageRecognitionType.Combined) {
          this.screens.processing.setAttribute('data-type', 'combined');
        }
      }
      else {
        if (this.showActionLabels) {
          this.scanFromImageButton.label = this.translationService.i('action-message-image-not-supported').toString();
        }
      }
    }
    this.ready.emit(initEvent);
    this.blocked = false;
    this.block.emit(false);
    this.showScreen('action');
    if (this.enableDrag) {
      this.setDragAndDrop();
    }
  }
  async flipCameraAction() {
    await this.sdkService.flipCamera();
    const cameraFlipped = await this.sdkService.isCameraFlipped();
    this.cameraExperience.setCameraFlipState(cameraFlipped);
  }
  async changeCameraDevice(camera) {
    if (this.cameraChangeInProgress) {
      return;
    }
    this.cameraChangeInProgress = true;
    await this.sdkService.changeCameraDevice(camera.details);
    this.cameraChangeInProgress = false;
  }
  async checkInputProperties() {
    if (!this.licenseKey) {
      this.setFatalError(new SDKError(sdkErrors.licenseKeyMissing));
      return false;
    }
    // Recognizers
    const conclusion = this.sdkService.checkRecognizers(this.recognizers);
    if (!conclusion.status) {
      const fatalError = new SDKError({
        code: ErrorCodes.InvalidRecognizers,
        message: conclusion.message
      });
      this.setFatalError(fatalError);
      return false;
    }
    this.cameraExperience.type = this.sdkService.getDesiredCameraExperience(this.recognizers, this.recognizerOptions);
    return true;
  }
  async openDeviceModal() {
    this.startScanFromCamera();
  }
  async startScanFromCamera() {
    const configuration = {
      recognizers: this.recognizers,
      successFrame: this.includeSuccessFrame,
      cameraFeed: this.videoElement,
      cameraId: this.cameraId
    };
    if (this.recognizerOptions && Object.keys(this.recognizerOptions).length > 0) {
      configuration.recognizerOptions = this.recognizerOptions;
    }
    if (this.recognitionTimeout && typeof this.recognitionTimeout === 'number') {
      configuration.recognitionTimeout = this.recognitionTimeout;
    }
    this.isBackSide = false;
    const eventHandler = (recognitionEvent) => {
      var _a;
      switch (recognitionEvent.status) {
        case RecognitionStatus.Preparing:
          this.feedback.emit({
            code: FeedbackCode.ScanStarted,
            state: 'FEEDBACK_OK',
            message: ''
          });
          this.showOverlay('camera');
          this.cameraExperience.setState(CameraExperienceState.Default);
          break;
        case RecognitionStatus.Ready:
          this.cameraExperience.setActiveCamera(this.sdkService.videoRecognizer.deviceId);
          break;
        case RecognitionStatus.Processing:
          // Just keep working
          break;
        case RecognitionStatus.EmptyResultState:
          if (!recognitionEvent.data.initiatedByUser) {
            this.scanError.emit({
              code: Code.EmptyResult,
              fatal: false,
              message: 'Could not extract information from video feed!',
              recognizerName: recognitionEvent.data.recognizerName
            });
            this.feedback.emit({
              code: FeedbackCode.ScanUnsuccessful,
              state: 'FEEDBACK_ERROR',
              message: this.translationService.i('feedback-scan-unsuccessful').toString()
            });
          }
          this.showOverlay('');
          break;
        case RecognitionStatus.UnknownError:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          break;
        case RecognitionStatus.DetectionFailed:
          this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          this.detectionSuccessLock = false;
          break;
        case RecognitionStatus.DetectionStatusChange:
          // Use this event if information about card location is required
          break;
        case RecognitionStatus.DetectionStatusFail:
          this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          break;
        case RecognitionStatus.DetectionStatusSuccess:
          this.detectionSuccessLock = true;
          window.setTimeout(() => {
            if (this.detectionSuccessLock) {
              this.cameraExperience.setState(CameraExperienceState.Detection);
              this.scanReset = false;
            }
          }, 100);
          break;
        case RecognitionStatus.DetectionStatusCameraTooHigh:
          this.cameraExperience.setState(CameraExperienceState.MoveCloser)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.DetectionStatusCameraAtAngle:
          this.cameraExperience.setState(CameraExperienceState.AdjustAngle)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.DetectionStatusCameraTooNear:
        case RecognitionStatus.DetectionStatusDocumentTooCloseToEdge:
        case RecognitionStatus.DetectionStatusPartial:
          this.cameraExperience.setState(CameraExperienceState.MoveFarther)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.BarcodeScanningStarted:
          this.cameraExperience.setState(CameraExperienceState.BarcodeScanning, this.isBackSide, true)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
          });
          break;
        case RecognitionStatus.DocumentClassified:
          this.cameraExperience.setState(CameraExperienceState.Classification);
          break;
        case RecognitionStatus.OnFirstSideResult:
          this.sdkService.videoRecognizer.pauseRecognition();
          window.setTimeout(async () => {
            await this.sdkService.videoRecognizer.resumeRecognition(false);
          }, this.recognitionPauseTimeout);
          this.cameraExperience.setState(CameraExperienceState.Done, false, true)
            .then(() => {
            this.cameraExperience.setState(CameraExperienceState.Flip, this.isBackSide, true)
              .then(() => {
              if (!this.scanReset) {
                this.isBackSide = true;
                this.cameraExperience.setState(CameraExperienceState.Default, this.isBackSide);
              }
            });
          });
          break;
        case RecognitionStatus.ScanSuccessful:
          /* Which recognizer is it? ImageCapture or some other?
           *
           * ImageCapture has the 'imageCapture' flag set to true, we do not want to close camera overlay after image
           * acquisition process is finished. Cause maybe backend service will failed and we can press retry to resume
           * with the same video recognizer and try again
           */
          if (!recognitionEvent.data.imageCapture) {
            this.cameraExperience.setState(CameraExperienceState.DoneAll, false, true)
              .then(() => {
              var _a;
              this.cameraExperience.resetState();
              this.cameraExperience.classList.add('hide');
              this.scanSuccess.emit((_a = recognitionEvent.data) === null || _a === void 0 ? void 0 : _a.result);
              this.feedback.emit({
                code: FeedbackCode.ScanSuccessful,
                state: 'FEEDBACK_OK',
                message: ''
              });
              this.showOverlay('');
            });
          }
          else {
            const resultIsValid = recognitionEvent.data.result.recognizer.processingStatus === 0 && recognitionEvent.data.result.recognizer.state === 2;
            if (resultIsValid) {
              this.scanSuccess.emit((_a = recognitionEvent.data) === null || _a === void 0 ? void 0 : _a.result);
              this.feedback.emit({
                code: FeedbackCode.ScanSuccessful,
                state: 'FEEDBACK_OK',
                message: ''
              });
            }
            else if (!recognitionEvent.data.initiatedByUser) {
              this.scanError.emit({
                code: Code.EmptyResult,
                fatal: true,
                message: 'Could not extract information from video feed!',
                recognizerName: recognitionEvent.data.recognizerName
              });
            }
          }
          break;
        case RecognitionStatus.CameraNotAllowed:
          this.scanError.emit({
            code: Code.CameraNotAllowed,
            fatal: true,
            message: 'Cannot access camera!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.CameraNotAllowed,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('camera-not-allowed').toString()
          });
          window.setTimeout(() => {
            this.scanFromCameraButton.disabled = true;
            if (this.showActionLabels) {
              this.scanFromCameraButton.label = this.translationService.i('action-message-camera-not-allowed').toString();
            }
          }, 10);
          this.showOverlay('');
          break;
        case RecognitionStatus.CameraInUse:
          this.scanError.emit({
            code: Code.CameraInUse,
            fatal: true,
            message: 'Camera already in use!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.CameraInUse,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('camera-in-use').toString()
          });
          window.setTimeout(() => {
            this.scanFromCameraButton.disabled = true;
            if (this.showActionLabels) {
              this.scanFromCameraButton.label = this.translationService.i('action-message-camera-in-use').toString();
            }
          }, 10);
          this.showOverlay('');
          break;
        case RecognitionStatus.NoSupportForMediaDevices:
        case RecognitionStatus.CameraNotFound:
        case RecognitionStatus.UnableToAccessCamera:
          this.scanError.emit({
            code: Code.CameraGenericError,
            fatal: true,
            message: `There was a problem while accessing camera ${recognitionEvent.status}`,
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.CameraGenericError,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('camera-generic-error').toString()
          });
          window.setTimeout(() => {
            this.scanFromCameraButton.disabled = true;
            if (this.showActionLabels) {
              this.scanFromCameraButton.label = this.translationService.i('action-message-camera-disabled').toString();
            }
          }, 10);
          this.showOverlay('');
          break;
        // console.warn('Unhandled video recognition status:', recognitionEvent.status);
      }
    };
    try {
      this.cameraExperience.classList.remove('hide');
      this.cameraScanStarted.emit();
      void this.cameraExperience.populateCameraDevices();
      await this.sdkService.scanFromCamera(configuration, eventHandler);
      const cameraFlipped = this.sdkService.isCameraFlipped();
      this.cameraExperience.setCameraFlipState(cameraFlipped);
    }
    catch (error) {
      this.handleScanError(error);
      this.showOverlay('');
    }
  }
  async startScanFromImage(file) {
    const configuration = {
      recognizers: this.recognizers,
      file: file || this.scanFromImageInput.files[0]
    };
    if (this.recognizerOptions && Object.keys(this.recognizerOptions).length > 0) {
      configuration.recognizerOptions = this.recognizerOptions;
    }
    const eventHandler = (recognitionEvent) => {
      switch (recognitionEvent.status) {
        case RecognitionStatus.Preparing:
          this.feedback.emit({
            code: FeedbackCode.ScanStarted,
            state: 'FEEDBACK_OK',
            message: ''
          });
          this.showScanFromImageUi();
          break;
        case RecognitionStatus.Processing:
          // Just keep working
          break;
        case RecognitionStatus.NoImageFileFound:
          this.scanError.emit({
            code: Code.NoImageFileFound,
            fatal: true,
            message: 'No image file was provided to SDK service!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.DetectionFailed:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.EmptyResultState:
          this.scanError.emit({
            code: Code.EmptyResult,
            fatal: false,
            message: 'Could not extract information from image!',
            recognizerName: recognitionEvent.data.recognizerName
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.UnknownError:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.ScanSuccessful:
          this.scanSuccess.emit(recognitionEvent.data);
          this.feedback.emit({
            code: FeedbackCode.ScanSuccessful,
            state: 'FEEDBACK_OK',
            message: ''
          });
          this.clearInputImages();
          if (!recognitionEvent.data.imageCapture) {
            this.hideScanFromImageUi(true);
          }
          break;
        //console.warn('Unhandled image recognition status:', recognitionEvent.status);
      }
    };
    try {
      this.imageScanStarted.emit();
      if (this.thoroughScanFromImage) {
        configuration.thoroughScan = true;
      }
      await this.sdkService.scanFromImage(configuration, eventHandler);
    }
    catch (error) {
      this.handleScanError(error);
      this.hideScanFromImageUi(false);
    }
  }
  async startScanFromImageCombined(firstFile, secondFile) {
    const configuration = {
      recognizers: this.recognizers,
      firstFile: firstFile || this.galleryImageFirstFile,
      secondFile: secondFile || this.galleryImageSecondFile
    };
    if (this.recognizerOptions) {
      configuration.recognizerOptions = this.recognizerOptions;
    }
    const eventHandler = (recognitionEvent) => {
      switch (recognitionEvent.status) {
        case RecognitionStatus.Preparing:
          this.showScanFromImageUi();
          this.feedback.emit({
            code: FeedbackCode.ScanStarted,
            state: 'FEEDBACK_OK',
            message: ''
          });
          break;
        case RecognitionStatus.Ready:
          this.cameraExperience.setActiveCamera(this.sdkService.videoRecognizer.deviceId);
          break;
        case RecognitionStatus.Processing:
          // Just keep working
          break;
        case RecognitionStatus.NoFirstImageFileFound:
          this.scanError.emit({
            code: Code.NoFirstImageFileFound,
            fatal: true,
            message: 'First image file is missing!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.NoSecondImageFileFound:
          this.scanError.emit({
            code: Code.NoSecondImageFileFound,
            fatal: true,
            message: 'Second image file is missing!',
            recognizerName: ''
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.DetectionFailed:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.EmptyResultState:
          this.scanError.emit({
            code: Code.EmptyResult,
            fatal: false,
            message: 'Could not extract information from image!',
            recognizerName: recognitionEvent.data.recognizerName
          });
          this.feedback.emit({
            code: FeedbackCode.ScanUnsuccessful,
            state: 'FEEDBACK_ERROR',
            message: this.translationService.i('feedback-scan-unsuccessful').toString()
          });
          this.hideScanFromImageUi(false);
          this.clearInputImages();
          break;
        case RecognitionStatus.UnknownError:
          // Do nothing, RecognitionStatus.EmptyResultState will handle negative outcome
          this.clearInputImages();
          break;
        case RecognitionStatus.ScanSuccessful:
          this.scanSuccess.emit(recognitionEvent.data);
          this.feedback.emit({
            code: FeedbackCode.ScanSuccessful,
            state: 'FEEDBACK_OK',
            message: ''
          });
          this.clearInputImages();
          if (!recognitionEvent.data.imageCapture) {
            this.hideScanFromImageUi(true);
          }
          break;
        //console.warn('Unhandled image recognition status:', recognitionEvent.status);
      }
    };
    try {
      this.imageScanStarted.emit();
      if (this.thoroughScanFromImage) {
        configuration.thoroughScan = true;
      }
      await this.sdkService.scanFromImageCombined(configuration, eventHandler);
    }
    catch (error) {
      this.handleScanError(error);
      this.hideScanFromImageUi(false);
    }
  }
  handleScanError(error) {
    const isAvailable = navigator.onLine;
    if (!isAvailable) {
      const fatalError = new SDKError({
        code: ErrorCodes.InternetNotAvailable,
        message: this.translationService.i('check-internet-connection').toString()
      });
      this.setFatalError(fatalError);
      this.showLicenseInfoModal(this.translationService.i('check-internet-connection').toString());
      return;
    }
    if ((error === null || error === void 0 ? void 0 : error.code) === ErrorCodes$1.LICENSE_UNLOCK_ERROR) {
      this.setFatalError(new SDKError(componentErrors.licenseError, error));
      this.showLicenseInfoModal(error);
    }
    else {
      this.scanError.emit({
        code: Code.GenericScanError,
        fatal: true,
        message: 'There was a problem during scan action.',
        recognizerName: '',
        details: error
      });
      this.feedback.emit({
        code: FeedbackCode.GenericScanError,
        state: 'FEEDBACK_ERROR',
        message: this.translationService.i('feedback-error-generic').toString()
      });
      this.showOverlay('');
    }
  }
  showLicenseInfoModal(error) {
    if (typeof error === 'string') {
      this.licenseExperienceModal.content = error;
    }
    else {
      if (error.type === 'NETWORK_ERROR') {
        this.licenseExperienceModal.content = this.translationService.i('network-error').toString();
      }
      else {
        this.licenseExperienceModal.content = this.translationService.i('scanning-not-available').toString();
      }
    }
    this.showOverlay('modal');
  }
  showScreen(screenName) {
    for (const screenKey in this.screens) {
      if (this.screens[screenKey]) {
        this.screens[screenKey].visible = screenName === screenKey;
      }
    }
  }
  showOverlay(overlayName) {
    if (overlayName === 'camera') {
      this.initialBodyOverflowValue = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = this.initialBodyOverflowValue;
    }
    for (const overlayKey in this.overlays) {
      if (this.overlays[overlayKey]) {
        this.overlays[overlayKey].visible = overlayName === overlayKey;
      }
    }
  }
  setDragAndDrop() {
    const dropTarget = this.galleryDropType === 'FULLSCREEN' ? window : this.hostEl;
    const lockTimeout = 3000;
    let lockDragAndDrop = false;
    if (this.galleryDropType === 'INLINE') {
      this.overlays.draganddrop.classList.add('inline');
    }
    const closeOverlay = () => {
      if (lockDragAndDrop) {
        window.setTimeout(() => {
          this.hostEl.style.borderStyle = 'solid';
          this.overlays.draganddrop.classList.add('hidden');
          this.showOverlay('');
          window.setTimeout(() => {
            this.overlays.draganddrop.classList.remove('hidden');
            this.showScreen('action');
            this.hostEl.style.borderStyle = 'solid';
          }, 500);
        }, lockTimeout);
      }
      else {
        this.showOverlay('');
        window.setTimeout(() => {
          this.showScreen('action');
          this.hostEl.style.borderStyle = 'solid';
        }, 500);
      }
    };
    dropTarget.addEventListener('dragenter', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      this.hostEl.style.borderStyle = 'none';
    });
    dropTarget.addEventListener('dragover', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      this.hostEl.style.borderStyle = 'none';
      this.overlays.draganddrop.classList.remove('error');
      this.overlays.draganddrop.querySelector('img').src = this.iconDragAndDropGalleryDefault;
      this.overlays.draganddrop.querySelector('p').innerText = this.translationService.i('drop-info').toString();
      this.showOverlay('draganddrop');
    });
    this.dragAndDropZone.addEventListener('dragleave', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      closeOverlay();
    });
    this.dragAndDropZone.addEventListener('drop', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      if (!this.scanFromImageButton.visible) {
        return;
      }
      if (hasSupportedImageFiles(ev.dataTransfer.files)) {
        this.startScanFromImage(ev.dataTransfer.files[0]);
      }
      else {
        this.overlays.draganddrop.classList.add('error');
        this.overlays.draganddrop.querySelector('p').innerText = this.translationService.i('drop-error').toString();
        this.overlays.draganddrop.querySelector('img').src = this.iconDragAndDropWarningDefault;
        lockDragAndDrop = true;
        window.setTimeout(() => {
          lockDragAndDrop = false;
        }, lockTimeout);
      }
      closeOverlay();
    });
  }
  setFatalError(error) {
    var _a, _b;
    this.fatalError.emit(error);
    if (this.hideLoadingAndErrorUi) {
      return;
    }
    if (error.details) {
      switch ((_a = error.details) === null || _a === void 0 ? void 0 : _a.code) {
        case ErrorCodes$1.LICENSE_UNLOCK_ERROR:
          const licenseErrorType = (_b = error.details) === null || _b === void 0 ? void 0 : _b.type;
          switch (licenseErrorType) {
            case LicenseErrorType.NetworkError:
              this.errorMessage.innerText = this.translationService.i('network-error').toString();
              break;
            default:
              this.errorMessage.innerText = this.translationService.i('scanning-not-available').toString();
          }
          break;
        // Do nothing
      }
    }
    else {
      this.errorMessage.innerText = error.message;
    }
    this.showScreen('error');
    this.showOverlay('');
  }
  abortScan() {
    this.scanAborted.emit();
    this.stopRecognition();
  }
  stopRecognition() {
    this.cameraExperience.classList.add('hide');
    this.sdkService.stopRecognition();
    this.scanReset = true;
    window.setTimeout(() => {
      this.cameraExperience.setState(CameraExperienceState.Default, false, true);
      this.cameraExperience.apiState = '';
    }, 500);
    this.showOverlay('');
    this.closeApiProcessStatus();
  }
  closeGalleryExperienceModal() {
    this.galleryExperienceModalErrorWindowVisible = false;
    this.stopRecognition();
  }
  onFromImageClicked() {
    if (this.imageRecognitionType === ImageRecognitionType.Single) {
      this.scanFromImageInput.click();
    }
    if (this.imageRecognitionType === ImageRecognitionType.Combined) {
      if (this.combinedGalleryOpened) {
        this.closeCombinedGalleryUpload();
      }
      else {
        this.openCombinedGalleryUpload();
      }
    }
  }
  clearInputImages() {
    if (this.imageRecognitionType === ImageRecognitionType.Single) {
      this.scanFromImageInput.value = '';
    }
    if (this.imageRecognitionType === ImageRecognitionType.Combined) {
      this.imageBoxFirst.clear();
      this.imageBoxSecond.clear();
    }
  }
  openCombinedGalleryUpload() {
    const dialog = this.screens.action.querySelector('.combined-image-upload');
    dialog.classList.add('visible');
    this.scanFromImageButton.selected = true;
    this.combinedGalleryOpened = true;
  }
  closeCombinedGalleryUpload() {
    const dialog = this.screens.action.querySelector('.combined-image-upload');
    dialog.classList.remove('visible');
    this.scanFromImageButton.selected = false;
    this.combinedGalleryOpened = false;
  }
  async onCombinedImageChange(ev, imageType) {
    if (imageType === CombinedImageType.First) {
      this.galleryImageFirstFile = getImageFile(ev);
    }
    if (imageType === CombinedImageType.Second) {
      this.galleryImageSecondFile = getImageFile(ev);
    }
    // Enable scan button only if both images have values
    this.combinedScanFromImageButton.disabled = this.galleryImageFirstFile === null || this.galleryImageSecondFile === null;
  }
  showScanFromImageUi() {
    if (this.galleryOverlayType === 'INLINE') {
      const inProgress = this.screens.processing.querySelector('p.in-progress');
      const done = this.screens.processing.querySelector('p.done');
      inProgress.classList.add('visible');
      done.classList.remove('visible');
      this.showScreen('processing');
    }
    if (this.galleryOverlayType === 'FULLSCREEN') {
      this.showOverlay('processing');
    }
  }
  hideScanFromImageUi(success) {
    if (this.galleryOverlayType === 'INLINE') {
      let timeout = 0;
      const inProgress = this.screens.processing.querySelector('p.in-progress');
      const done = this.screens.processing.querySelector('p.done');
      inProgress.classList.remove('visible');
      if (success) {
        done.classList.add('visible');
        timeout = 1000;
      }
      window.setTimeout(() => this.showScreen('action'), timeout);
    }
    if (this.galleryOverlayType === 'FULLSCREEN') {
      this.showOverlay('');
    }
  }
  render() {
    return (index.h(index.Host, null, index.h("mb-screen", { id: "mb-screen-loading", visible: !this.hideLoadingAndErrorUi, ref: el => this.screens.loading = el }, index.h("mb-spinner", { icon: this.iconSpinnerScreenLoading })), index.h("mb-screen", { id: "mb-screen-error", visible: false, ref: el => this.screens.error = el }, index.h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z", fill: "#6B7280" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12 7C12.5523 7 13 7.44772 13 8V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V8C11 7.44772 11.4477 7 12 7Z", fill: "#6B7280" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11 16C11 15.4477 11.4477 15 12 15H12.01C12.5623 15 13.01 15.4477 13.01 16C13.01 16.5523 12.5623 17 12.01 17H12C11.4477 17 11 16.5523 11 16Z", fill: "#6B7280" })), index.h("p", { ref: el => this.errorMessage = el })), index.h("mb-screen", { id: "mb-screen-action", visible: false, ref: el => this.screens.action = el }, index.h("div", { class: "actions" }, index.h("p", { class: "action-label" }, this.translationService.i('action-message').toString()), index.h("div", { class: "action-buttons" }, index.h("mb-button", { ref: el => this.scanFromCameraButton = el, visible: true, disabled: false, clickHandler: () => this.openDeviceModal(), imageSrcDefault: this.iconCameraDefault, imageSrcActive: this.iconCameraActive, buttonTitle: this.translationService.i('action-alt-camera') }), index.h("input", { tabindex: "-1", id: "scan-from-image-input", ref: el => this.scanFromImageInput = el, type: "file", accept: "image/*", onChange: () => this.scanFromImageInput.value && this.startScanFromImage() }), index.h("mb-button", { ref: el => this.scanFromImageButton = el, disabled: false, visible: false, selected: false, clickHandler: () => this.onFromImageClicked(), imageSrcDefault: this.iconGalleryDefault, imageSrcActive: this.iconGalleryActive, buttonTitle: this.translationService.i('action-alt-gallery') }))), index.h("div", { class: "combined-image-upload" }, index.h("mb-image-box", { ref: el => this.imageBoxFirst = el, "box-title": this.translationService.i('process-image-box-first').toString(), "anchor-text": this.translationService.i('process-image-box-add').toString(), onImageChange: (ev) => this.onCombinedImageChange(ev.detail, CombinedImageType.First) }), index.h("mb-image-box", { ref: el => this.imageBoxSecond = el, "box-title": this.translationService.i('process-image-box-second').toString(), "anchor-text": this.translationService.i('process-image-box-add').toString(), onImageChange: (ev) => this.onCombinedImageChange(ev.detail, CombinedImageType.Second) }), index.h("mb-button-classic", { ref: el => this.combinedScanFromImageButton = el, disabled: true, clickHandler: () => this.startScanFromImageCombined() }, this.translationService.i('process-image-upload-cta').toString()))), index.h("mb-screen", { id: "mb-screen-processing", visible: false, ref: el => this.screens.processing = el }, index.h("p", { class: "in-progress" }, index.h("mb-spinner", { icon: this.iconSpinnerScreenLoading }), index.h("span", null, this.translationService.i('process-image-message-inline').toString())), index.h("p", { class: "done" }, index.h("mb-completed", { icon: this.iconGalleryScanningCompleted }), index.h("span", null, this.translationService.i('process-image-message-inline-done').toString()))), index.h("mb-overlay", { id: "mb-overlay-drag-and-drop", visible: false, ref: el => this.overlays.draganddrop = el }, index.h("img", { class: "drag-and-drop-icon", src: this.iconDragAndDropGalleryDefault }), index.h("p", { class: "drag-and-drop-message" }, "Whoops, we don't support that image format. Please upload a JPEG or PNG file."), index.h("div", { id: "drag-and-drop-zone", ref: el => this.dragAndDropZone = el })), index.h("mb-overlay", { id: "mb-overlay-gallery-experience", ref: el => this.overlays.processing = el }, index.h("mb-spinner", { icon: this.iconSpinnerFromGalleryExperience, size: "large" }), index.h("p", null, this.translationService.i('process-image-message').toString()), index.h("mb-modal", { visible: this.galleryExperienceModalErrorWindowVisible, modalTitle: this.translationService.i('feedback-scan-unsuccessful-title').toString(), content: this.translationService.i('feedback-scan-unsuccessful').toString(), onClose: () => this.closeGalleryExperienceModal() }, index.h("div", { slot: "actionButtons" }, index.h("button", { class: "primary modal-action-button", onClick: () => this.closeGalleryExperienceModal() }, this.translationService.i('modal-window-close').toString())))), index.h("mb-overlay", { id: "mb-overlay-camera-experience", visible: false, ref: el => this.overlays.camera = el }, index.h("div", { class: "holder" }, index.h("video", { part: "mb-camera-video", ref: el => this.videoElement = el, playsinline: true }), index.h("mb-camera-experience", { ref: el => this.cameraExperience = el, cameraExperienceStateDurations: this.cameraExperienceStateDurations, translationService: this.translationService, showScanningLine: this.showScanningLine, showCameraFeedbackBarcodeMessage: this.showCameraFeedbackBarcodeMessage, "clear-is-camera-active": this.clearIsCameraActive, onClose: () => this.abortScan(), onFlipCameraAction: () => this.flipCameraAction(), onSetIsCameraActive: (ev) => this.handleSetIsCameraActive(ev.detail), onChangeCameraDevice: (ev) => this.changeCameraDevice(ev.detail), class: "overlay-camera-element" }), index.h("mb-api-process-status", { visible: this.apiProcessStatusVisible, state: this.apiProcessStatusState, translationService: this.translationService, onCloseTryAgain: () => this.closeApiProcessStatus(true), onCloseFromStart: () => this.stopRecognition() }))), index.h("mb-overlay", { id: "mb-overlay-modal", visible: false, ref: el => this.overlays.modal = el }, index.h("mb-modal", { ref: el => this.licenseExperienceModal = el, modalTitle: "Error" }, index.h("div", { slot: "actionButtons" }, index.h("button", { class: "primary modal-action-button", onClick: () => this.showOverlay('') }, this.translationService.i('modal-window-close').toString()))))));
  }
  get hostEl() { return index.getElement(this); }
};
MbComponent.style = mbComponentCss;

const mbContainerCss = ":host{display:block;min-width:280px;width:100%;height:100%;font-family:var(--mb-font-family)}";

let MbContainer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", null)));
  }
  get hostEl() { return index.getElement(this); }
};
MbContainer.style = mbContainerCss;

/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
function getFeedbackClassName(state) {
  switch (state) {
    case 'FEEDBACK_ERROR':
      return 'error';
    case 'FEEDBACK_INFO':
      return 'info';
    default:
      return '';
  }
}

const mbFeedbackCss = ":host{display:none}:host p{margin:4px 16px;font-family:var(--mb-font-family);font-size:var(--mb-feedback-font-size);font-style:var(--mb-feedback-font-style);font-weight:var(--mb-feedback-font-weight);letter-spacing:var(--mb-feedback-letter-spacing);line-height:var(--mb-feedback-line-height);text-align:right;text-transform:var(--mb-feedback-text-transform)}:host p.info{color:var(--mb-feedback-font-color-info)}:host p.error{color:var(--mb-feedback-font-color-error)}:host(.visible){display:block}:host([dir=rtl]) p{text-align:left}";

let MbFeedback = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    this.paragraphClassName = getFeedbackClassName(feedback.state);
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (index.h(index.Host, { class: classNames({ visible: this.visible }) }, index.h("p", { class: this.paragraphClassName }, this.paragraphValue)));
  }
  get hostEl() { return index.getElement(this); }
};
MbFeedback.style = mbFeedbackCss;

const mbImageBoxCss = ":host{display:block;padding:8px;border:var(--mb-component-image-box-border-width) solid var(--mb-component-image-box-border-color);border-radius:var(--mb-component-image-box-border-radius)}:host .label{margin:0;padding:0 0 4px 0;height:var(--mb-component-image-box-label-height);line-height:var(--mb-component-image-box-label-height);color:var(--mb-component-image-box-label-color);font-family:var(--mb-font-family);font-size:var(--mb-component-image-box-label-font-size);font-weight:var(--mb-component-image-box-label-font-weight)}:host .cta{all:unset;box-sizing:border-box;display:block;height:var(--mb-component-image-box-cta-height);color:var(--mb-component-image-box-cta-color);text-decoration:none;font-family:var(--mb-font-family);font-size:var(--mb-component-image-box-cta-font-size);font-weight:var(--mb-component-image-box-cta-font-weight)}:host .cta .cta-label,:host .cta svg{vertical-align:middle}:host .cta .cta-label{display:inline-block;max-width:calc(100% - 28px);height:var(--mb-component-image-box-cta-label-height);line-height:var(--mb-component-image-box-cta-label-height);margin:0;padding:0 8px 0 0}:host .cta .cta-label.filename{max-width:unset;width:calc(100% - 20px);padding:0;color:var(--mb-component-image-box-file-color);font-weight:var(--mb-component-image-box-file-font-weight);text-overflow:ellipsis;overflow:hidden}:host .cta svg{display:none;width:20px;height:20px;margin:0}:host .cta svg.visible{display:inline-block}:host input[type=file]{position:absolute;width:0;height:0;opacity:0;clip:rect(1px, 1px, 1px, 1px)}";

let MbImageBox = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.imageChange = index.createEvent(this, "imageChange", 7);
    this.hasImage = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  componentDidRender() {
    this.ctaLabel.innerText = this.anchorText;
  }
  /**
   * Clear input image.
   */
  async clear() {
    this.onClearImage();
  }
  onFromImageClicked(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.hasImage) {
      this.onClearImage();
    }
    else {
      this.scanFromImageInput.click();
    }
  }
  onImageChange(ev) {
    const target = ev.target;
    if (target.files && target.files.length) {
      this.ctaLabel.innerText = extractFilenameFromPath(target.value);
      this.ctaLabel.classList.add('filename');
      this.addIcon.classList.remove('visible');
      this.removeIcon.classList.add('visible');
      this.hasImage = true;
      this.imageChange.emit(target.files);
    }
    else {
      this.onClearImage();
    }
  }
  onClearImage() {
    this.ctaLabel.innerText = this.anchorText;
    this.ctaLabel.classList.remove('filename');
    this.addIcon.classList.add('visible');
    this.removeIcon.classList.remove('visible');
    this.hasImage = false;
    this.scanFromImageInput.value = "";
    this.imageChange.emit();
  }
  render() {
    return (index.h(index.Host, null, index.h("p", { class: "label" }, this.boxTitle), index.h("input", { id: "scan-from-image-input", ref: el => this.scanFromImageInput = el, type: "file", accept: "image/*", onChange: (ev) => this.onImageChange(ev) }), index.h("button", { class: "cta", onClick: (ev) => this.onFromImageClicked(ev) }, index.h("p", { class: "cta-label", ref: el => this.ctaLabel = el }), index.h("svg", { ref: el => this.addIcon = el, class: "visible", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.8333 4.16666C10.8333 3.70642 10.4602 3.33333 9.99992 3.33333C9.53968 3.33333 9.16659 3.70642 9.16659 4.16666V9.16666H4.16659C3.70635 9.16666 3.33325 9.53976 3.33325 10C3.33325 10.4602 3.70635 10.8333 4.16659 10.8333H9.16659V15.8333C9.16659 16.2936 9.53968 16.6667 9.99992 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333V10.8333H15.8333C16.2935 10.8333 16.6666 10.4602 16.6666 10C16.6666 9.53976 16.2935 9.16666 15.8333 9.16666H10.8333V4.16666Z", fill: "#48B2E8" })), index.h("svg", { ref: el => this.removeIcon = el, width: "21", height: "20", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M16.0893 5.58928C16.4147 5.26384 16.4147 4.7362 16.0893 4.41076C15.7638 4.08533 15.2362 4.08533 14.9108 4.41076L10.5 8.82151L6.08928 4.41076C5.76384 4.08533 5.2362 4.08533 4.91076 4.41076C4.58533 4.7362 4.58533 5.26384 4.91076 5.58928L9.32151 10L4.91076 14.4108C4.58533 14.7362 4.58533 15.2638 4.91076 15.5893C5.2362 15.9147 5.76384 15.9147 6.08928 15.5893L10.5 11.1785L14.9108 15.5893C15.2362 15.9147 15.7638 15.9147 16.0893 15.5893C16.4147 15.2638 16.4147 14.7362 16.0893 14.4108L11.6785 10L16.0893 5.58928Z", fill: "#48B2E8" })))));
  }
  get hostEl() { return index.getElement(this); }
};
MbImageBox.style = mbImageBoxCss;

const mbModalCss = ":host{position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;visibility:hidden;display:flex;justify-content:center;align-items:flex-start;overflow:hidden;overflow-y:auto;padding:24px}:host .mb-modal{width:100%;border-radius:var(--mb-modal-border-radius);position:relative;background-color:var(--mb-modal-background);color:var(--mb-component-font-color)}:host .mb-modal .inner{padding:24px}:host .mb-modal .footer{padding:24px;background-color:rgba(116, 116, 128, 0.08)}:host .mb-modal .close-wrapper{position:absolute;right:24px;top:24px;cursor:pointer}:host .mb-modal .close-wrapper svg{width:20px;height:20px}:host .mb-modal .back-wrapper{position:absolute;left:24px;top:20px;cursor:pointer}:host .mb-modal .back-wrapper svg{width:20px;height:20px}:host .mb-modal .title{text-align:center;font-weight:400;font-size:var(--mb-modal-title-font-size);line-height:var(--mb-modal-title-line-height)}:host .mb-modal .content{margin:24px 0;font-weight:400;font-size:var(--mb-modal-content-font-size);line-height:var(--mb-modal-content-line-height)}:host .mb-modal .content.centered{text-align:center}:host .mb-modal .actions{display:flex;justify-content:center}:host .mb-modal .actions button{width:126px;height:32px;border-radius:0;border:0;background:#48B2E8;color:#ffffff;cursor:pointer}:host(.visible){visibility:visible;opacity:1}:host(.elevated) .mb-modal{box-shadow:0px 2px 24px 0px #0000001A;box-shadow:0px 2px 8px 0px #0000000D}:host(.centered){align-items:center;justify-content:center}";

let MbModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.close = index.createEvent(this, "close", 7);
    this.back = index.createEvent(this, "back", 7);
    /**
     * Show modal content
     */
    this.visible = false;
    /**
     * Show shadow drop
     */
    this.elevated = false;
    /**
     * Center component
     */
    this.centered = false;
    /**
     * Passed title content from parent component
     */
    this.modalTitle = "";
    /**
     * Passed body content from parent component
     */
    this.content = "";
    /**
     * Center content inside modal
     */
    this.contentCentered = true;
    /**
     * Whether to show back arrow or not
     */
    this.showBackButton = false;
    /**
     * Whether to hide the footer or not
     */
    this.hideFooter = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
    const parts = getWebComponentParts(this.hostEl.shadowRoot);
    this.hostEl.setAttribute('exportparts', parts.join(', '));
  }
  render() {
    return (index.h(index.Host, { class: classNames({ visible: this.visible, elevated: this.elevated, centered: this.centered }) }, index.h("div", { class: "mb-modal" }, index.h("div", { part: "mb-modal-inner", class: "inner" }, index.h("div", { class: "close-wrapper" }, index.h("div", { class: "close-icon", onClick: () => this.close.emit() }, index.h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.5892 4.41058C15.9147 4.73602 15.9147 5.26366 15.5892 5.58909L5.58925 15.5891C5.26381 15.9145 4.73617 15.9145 4.41073 15.5891C4.0853 15.2637 4.0853 14.736 4.41073 14.4106L14.4107 4.41058C14.7362 4.08514 15.2638 4.08514 15.5892 4.41058Z", fill: "#9CA3AF" }), index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.41073 4.41058C4.73617 4.08514 5.26381 4.08514 5.58925 4.41058L15.5892 14.4106C15.9147 14.736 15.9147 15.2637 15.5892 15.5891C15.2638 15.9145 14.7362 15.9145 14.4107 15.5891L4.41073 5.58909C4.0853 5.26366 4.0853 4.73602 4.41073 4.41058Z", fill: "#9CA3AF" })))), this.showBackButton ? (index.h("div", { class: "back-wrapper" }, index.h("div", { onClick: () => this.back.emit() }, index.h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.75596 4.41058C10.0814 4.73602 10.0814 5.26366 9.75596 5.58909L6.17855 9.1665H15.8334C16.2936 9.1665 16.6667 9.5396 16.6667 9.99984C16.6667 10.4601 16.2936 10.8332 15.8334 10.8332H6.17855L9.75596 14.4106C10.0814 14.736 10.0814 15.2637 9.75596 15.5891C9.43053 15.9145 8.90289 15.9145 8.57745 15.5891L3.57745 10.5891C3.25201 10.2637 3.25201 9.73602 3.57745 9.41058L3.57799 9.41005L8.57745 4.41058C8.90289 4.08514 9.43053 4.08514 9.75596 4.41058Z", fill: "#9CA3AF" }))))) : null, index.h("div", { class: "title" }, this.modalTitle), index.h("div", { class: this.contentCentered ? 'centered' : '' }, this.content), index.h("slot", { name: "content" }), index.h("div", { class: "actions" }, index.h("slot", { name: "actionButtons" }))), this.hideFooter ? null : (index.h("div", { class: "footer" }, index.h("slot", { name: "footer" }))))));
  }
  get hostEl() { return index.getElement(this); }
};
MbModal.style = mbModalCss;

const mbOverlayCss = ":host{display:block;width:100%;height:100%;position:fixed;top:0;left:0;z-index:-1;opacity:0;border-radius:0px;visibility:hidden;overflow:hidden;background-color:transparent;border-style:none;border-color:transparent;transform:translate(0, 0);transform-origin:center;transition:background-color 0.2s ease 0.4s, border-style 0.2s ease 0.4s, border-color 0.2s ease 0.4s, opacity 0.2s ease 0.4s, visibility 0.1s ease 0.5s, z-index 0.7s}:host(.visible){z-index:200;visibility:visible;opacity:1;background-color:transparent;transform:translate(0, 0);transition:opacity 0.2s ease, visibility 0.1s ease}:host(.non-fullscreen){width:auto;height:auto;position:absolute;top:calc(0px - var(--mb-component-border-width));bottom:calc(0px - var(--mb-component-border-width));left:calc(0px - var(--mb-component-border-width));right:calc(0px - var(--mb-component-border-width))}";

let MbOverlay = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, { class: `${classNames({ visible: this.visible, 'non-fullscreen': !this.fullscreen })} ${this.getHostClassNames()}` }, index.h("slot", null)));
  }
  get hostEl() { return index.getElement(this); }
};
MbOverlay.style = mbOverlayCss;

const mbScreenCss = ":host{box-sizing:border-box;width:100%;height:100%;padding:8px 16px;display:grid}:host(:not(.visible)){display:none !important}";

let MbScreen = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    /**
     * Set to 'true' if screen should be visible.
     */
    this.visible = false;
  }
  componentDidLoad() {
    setWebComponentParts(this.hostEl);
  }
  render() {
    return (index.h(index.Host, { class: classNames({ visible: this.visible }) }, index.h("slot", null)));
  }
  get hostEl() { return index.getElement(this); }
};
MbScreen.style = mbScreenCss;

const mbSpinnerCss = ":host{display:block;padding:0}:host img{display:block;width:24px;height:24px;animation:rotation 700ms linear infinite}:host(.large) img{width:100px;height:100px}@keyframes rotation{100%{transform-origin:center;transform:rotate(360deg)}}";

let MbSpinner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, { class: this.size }, index.h("img", { src: this.icon })));
  }
  get hostEl() { return index.getElement(this); }
};
MbSpinner.style = mbSpinnerCss;

exports.blinkid_in_browser = BlinkidInBrowser;
exports.mb_api_process_status = MbApiProcessStatus;
exports.mb_button = MbButton;
exports.mb_button_classic = MbButtonClassic;
exports.mb_camera_experience = MbCameraExperience;
exports.mb_camera_selection = MbCameraSelection;
exports.mb_camera_toolbar = MbCameraToolbar;
exports.mb_completed = MbCompleted;
exports.mb_component = MbComponent;
exports.mb_container = MbContainer;
exports.mb_feedback = MbFeedback;
exports.mb_image_box = MbImageBox;
exports.mb_modal = MbModal;
exports.mb_overlay = MbOverlay;
exports.mb_screen = MbScreen;
exports.mb_spinner = MbSpinner;
