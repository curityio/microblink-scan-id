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
import se.curity.identityserver.sdk.authenticationaction.completions.ActionCompletionRequestHandler;
import se.curity.identityserver.sdk.authenticationaction.completions.ActionCompletionResult;
import se.curity.identityserver.sdk.service.ExceptionFactory;
import se.curity.identityserver.sdk.web.Request;
import se.curity.identityserver.sdk.web.Response;

import java.net.MalformedURLException;
import java.util.Optional;

import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.MessageKeys.USER_CANCELLED;
import static com.example.curity.microblink.Utils.stripLastPathPart;

public class MicroblinkAuthenticationCancelRequestHandler implements ActionCompletionRequestHandler<Request> {

    private final ExceptionFactory _exceptionFactory;

    public MicroblinkAuthenticationCancelRequestHandler(MicroblinkAuthenticationActionConfig config)
    {
        _exceptionFactory = config.getExceptionFactory();
    }

    @Override
    public Optional<ActionCompletionResult> get(Request request, Response response) 
    {
        try {
            throw _exceptionFactory.redirectException(stripLastPathPart(request.getUrl()) + "/failed?_errorMessage=" + USER_CANCELLED);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Optional<ActionCompletionResult> post(Request request, Response response)
    {
        throw _exceptionFactory.methodNotAllowed("HTTP POST not supported for this url.");
    }

    @Override
    public Request preProcess(Request request, Response response) {
        return request;
    }
}
