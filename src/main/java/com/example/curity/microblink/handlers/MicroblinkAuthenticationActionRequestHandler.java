/*
 *  Copyright 2023 Curity AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.example.curity.microblink.handlers;

import com.example.curity.microblink.config.MicroblinkAuthenticationActionConfig;
import com.example.curity.microblink.models.ScanRequestModel;
import com.google.gson.Gson;
import se.curity.identityserver.sdk.Nullable;
import se.curity.identityserver.sdk.attribute.Attribute;
import se.curity.identityserver.sdk.authenticationaction.completions.ActionCompletionRequestHandler;
import se.curity.identityserver.sdk.authenticationaction.completions.ActionCompletionResult;
import se.curity.identityserver.sdk.service.ExceptionFactory;
import se.curity.identityserver.sdk.service.Json;
import se.curity.identityserver.sdk.service.SessionManager;
import se.curity.identityserver.sdk.web.Request;
import se.curity.identityserver.sdk.web.Response;
import se.curity.identityserver.sdk.web.ResponseModel;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.Optional;

import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.Endpoints.REVIEW_SCAN;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormValueNames.BLINKIDSCAN_URL;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormValueNames.BLINKID_LICENSE_KEY;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.SessionKeys.SCANNED_DOCUMENT;
import static se.curity.identityserver.sdk.http.HttpStatus.ACCEPTED;
import static se.curity.identityserver.sdk.web.Response.ResponseModelScope.ANY;


public class MicroblinkAuthenticationActionRequestHandler implements ActionCompletionRequestHandler<ScanRequestModel>
{
    private final SessionManager _sessionManager;
    private final Json _json;
    private final ExceptionFactory _exceptionFactory;
    private final String _blinkIdLicenseKey;
    private String _urlPath;

    private static final Gson gson = new Gson();


    public MicroblinkAuthenticationActionRequestHandler(MicroblinkAuthenticationActionConfig configuration)
    {
        _sessionManager = configuration.getSessionManager();
        _json = configuration.getJson();
        _exceptionFactory = configuration.getExceptionFactory();
        _blinkIdLicenseKey = configuration.getMicroblinkLicenseKey();
    }

    @Override
    public ScanRequestModel preProcess(Request request, Response response)
    {
        try {
            _urlPath = new URL(request.getUrl()).getPath();

            response.setResponseModel(ResponseModel.templateResponseModel(Map.of(
                            BLINKIDSCAN_URL, _urlPath,
                            BLINKID_LICENSE_KEY, _blinkIdLicenseKey),
                    "microblink-scan-id/get"), ANY);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e); //TODO: Throw different exception here, Internalservice
        }

        return new ScanRequestModel(request, _json);
    }

    @Override
    public Optional<ActionCompletionResult> get(ScanRequestModel request, Response response)
    {
        return Optional.empty();
    }

    @Override
    public Optional<ActionCompletionResult> post(ScanRequestModel scanRequestModel, Response response)
    {
        if (scanRequestModel.getPostRequestModel().isPollingDone())
        {
            throw _exceptionFactory.redirectException(_urlPath + "/" + REVIEW_SCAN);
        }
        else
        {
            response.setHttpStatus(ACCEPTED); // stop polling
        }

        @Nullable Map<String, Object> scannedAttributes = scanRequestModel.getPostRequestModel().getAttributes();

        _sessionManager.put(Attribute.of(SCANNED_DOCUMENT,  gson.toJson(scannedAttributes)));

        return Optional.empty();
    }
}