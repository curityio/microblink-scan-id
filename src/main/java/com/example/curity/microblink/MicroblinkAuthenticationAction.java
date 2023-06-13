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

package com.example.curity.microblink;

import com.example.curity.microblink.config.MicroblinkAuthenticationActionConfig;
import com.google.gson.Gson;
import se.curity.identityserver.sdk.Nullable;
import se.curity.identityserver.sdk.attribute.*;
import se.curity.identityserver.sdk.authenticationaction.AuthenticationAction;
import se.curity.identityserver.sdk.authenticationaction.AuthenticationActionContext;
import se.curity.identityserver.sdk.authenticationaction.AuthenticationActionResult;
import se.curity.identityserver.sdk.service.*;

import java.util.Map;

import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.SessionKeys.SCANNED_DOCUMENT;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.SessionKeys.SESSION_KEY;
import static com.example.curity.microblink.Utils.cleanup;
import static se.curity.identityserver.sdk.authenticationaction.completions.RequiredActionCompletion.PromptUser.prompt;

public final class MicroblinkAuthenticationAction implements AuthenticationAction
{
    private final SessionManager _sessionManager;
    private static final Gson gson = new Gson();

    public MicroblinkAuthenticationAction(MicroblinkAuthenticationActionConfig configuration)
    {
        _sessionManager = configuration.getSessionManager();
    }

    @Override
    public AuthenticationActionResult apply(AuthenticationActionContext context)
    {
        @Nullable Attribute attributeView = _sessionManager.get(SESSION_KEY);

        if (attributeView != null)
        {
            Map<String, Object> authenticatedUserAttributes = gson.fromJson(_sessionManager.get(SCANNED_DOCUMENT).getValueOfType(String.class), Map.class);
            cleanup(_sessionManager);
            _sessionManager.remove(SESSION_KEY);

            return AuthenticationActionResult.successfulResult(context.getAuthenticationAttributes(),
                    AuthenticationActionAttributes.fromAttributes(Attributes.fromMap(authenticatedUserAttributes)));
        }

        return AuthenticationActionResult.pendingResult(prompt());
    }
}
