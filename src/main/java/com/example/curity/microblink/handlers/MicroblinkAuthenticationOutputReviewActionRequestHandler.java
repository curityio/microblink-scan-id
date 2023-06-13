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
import com.example.curity.microblink.models.OutputReviewActionRequestModel;

import com.example.curity.microblink.models.Recognizer;
import com.example.curity.microblink.models.ScannedDocument;
import com.google.gson.Gson;
import org.apache.commons.lang3.StringUtils;
import se.curity.identityserver.sdk.attribute.Attribute;
import se.curity.identityserver.sdk.authenticationaction.completions.ActionCompletionRequestHandler;
import se.curity.identityserver.sdk.authenticationaction.completions.ActionCompletionResult;
import se.curity.identityserver.sdk.service.SessionManager;
import se.curity.identityserver.sdk.web.Request;
import se.curity.identityserver.sdk.web.Response;
import se.curity.identityserver.sdk.web.alerts.ErrorMessage;

import java.net.MalformedURLException;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.Endpoints.CANCEL;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormFieldNames.*;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormValueNames.CANCEL_URL;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.SessionKeys.SCANNED_DOCUMENT;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.SessionKeys.SESSION_KEY;
import static com.example.curity.microblink.Utils.stripLastPathPart;
import static se.curity.identityserver.sdk.authenticationaction.completions.ActionCompletionResult.complete;
import static se.curity.identityserver.sdk.web.Response.ResponseModelScope.NOT_FAILURE;
import static se.curity.identityserver.sdk.web.ResponseModel.templateResponseModel;

public class MicroblinkAuthenticationOutputReviewActionRequestHandler implements ActionCompletionRequestHandler<OutputReviewActionRequestModel>
{
    private final SessionManager _sessionManager;
//    private final Bucket _bucket;
    private static final Gson gson = new Gson();

    public MicroblinkAuthenticationOutputReviewActionRequestHandler(MicroblinkAuthenticationActionConfig config)
    {
        _sessionManager = config.getSessionManager();
    }
    @Override
    public Optional<ActionCompletionResult> get(OutputReviewActionRequestModel outputReviewActionRequestModel, Response response)
    {
        return Optional.empty();
    }

    @Override
    public Optional<ActionCompletionResult> post(OutputReviewActionRequestModel outputReviewActionRequestModel, Response response)
    {
        _sessionManager.put(Attribute.of(SESSION_KEY, true));
        return  Optional.of(complete());
    }

    @Override
    public OutputReviewActionRequestModel preProcess(Request request, Response response)
    {
        String attributes = Optional.ofNullable(_sessionManager.get(SCANNED_DOCUMENT))
                .map(attribute -> attribute.getOptionalValueOfType(String.class))
                .orElse("");

        Recognizer recognizer = gson.fromJson(attributes, ScannedDocument.class).getRecognizer();

        String documentId = recognizer.getDocumentId();
        if (StringUtils.isBlank(documentId))
        {
            documentId = recognizer.getDocumentNumber();
        }

        try {
            response.setResponseModel(templateResponseModel(Map.of(
                            DOCUMENT_ID, documentId,
                            FULL_NAME, recognizer.getFullName(),
                            NATIONALITY, recognizer.getCountryDetails().getCountryName(),
                            DATE_OF_BIRTH, recognizer.getDateOfBirth().getDateOfBirth(),
                            DATE_OF_EXPIRY, recognizer.getDateOfExpiry().getDateOfExpiry(),
                            SEX, recognizer.getSex(),
                            CANCEL_URL, stripLastPathPart(request.getUrl()) + "/" + CANCEL),
                    "review-scan/review"), NOT_FAILURE);

        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }

        return new OutputReviewActionRequestModel(request);
    }

    @Override
    public void onRequestModelValidationFailure(Request request, Response response, Set<ErrorMessage> errorMessages)
    {
        ActionCompletionRequestHandler.super.onRequestModelValidationFailure(request, response, errorMessages);
    }
}
