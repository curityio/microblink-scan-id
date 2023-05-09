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

package com.example.curity.microblink.descriptor;


import com.example.curity.microblink.MicroblinkAuthenticationAction;
import com.example.curity.microblink.config.MicroblinkAuthenticationActionConfig;
import com.example.curity.microblink.handlers.MicroblinkAuthenticationActionFailedRequestHandler;
import com.example.curity.microblink.handlers.MicroblinkAuthenticationActionRequestHandler;
import com.example.curity.microblink.handlers.MicroblinkAuthenticationCancelRequestHandler;
import com.example.curity.microblink.handlers.MicroblinkAuthenticationOutputReviewActionRequestHandler;
import se.curity.identityserver.sdk.authenticationaction.AuthenticationAction;

import se.curity.identityserver.sdk.authenticationaction.completions.ActionCompletionRequestHandler;
import se.curity.identityserver.sdk.plugin.descriptor.AuthenticationActionPluginDescriptor;

import java.util.HashMap;
import java.util.Map;

import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.Endpoints.*;


public final class MicroblinkAuthenticationActionDescriptor implements AuthenticationActionPluginDescriptor<MicroblinkAuthenticationActionConfig>
{
    @Override
    public Class<? extends AuthenticationAction> getAuthenticationAction()
    {
        return MicroblinkAuthenticationAction.class;
    }

    @Override
    public String getPluginImplementationType()
    {
        return "microblink-scan-id";
    }

    @Override
    public Class<? extends MicroblinkAuthenticationActionConfig> getConfigurationType()
    {
        return MicroblinkAuthenticationActionConfig.class;
    }

    @Override
    public Map<String, Class<? extends ActionCompletionRequestHandler<?>>> getAuthenticationActionRequestHandlerTypes()
    {
        Map<String, Class<? extends ActionCompletionRequestHandler<?>>> endpoints = new HashMap<>();
        endpoints.put(INDEX, MicroblinkAuthenticationActionRequestHandler.class);
        endpoints.put(REVIEW_SCAN, MicroblinkAuthenticationOutputReviewActionRequestHandler.class);
        endpoints.put(CANCEL, MicroblinkAuthenticationCancelRequestHandler.class);
        endpoints.put(FAILED, MicroblinkAuthenticationActionFailedRequestHandler.class);
        return endpoints;
    }
}
