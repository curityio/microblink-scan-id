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

package com.example.curity.microblink.models;

import jakarta.validation.Valid;
import se.curity.identityserver.sdk.Nullable;
import se.curity.identityserver.sdk.web.Request;

import java.util.Optional;

import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormFieldNames.DOCUMENT_ID;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormFieldNames.FULL_NAME;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormFieldNames.DATE_OF_BIRTH;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormFieldNames.DATE_OF_EXPIRY;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormFieldNames.SEX;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.FormFieldNames.NATIONALITY;

public class OutputReviewActionRequestModel
{
    @Nullable
    @Valid
    private final Post _postRequestModel;

    public OutputReviewActionRequestModel(Request request) {
        _postRequestModel = request.isPostRequest() ? new Post(request) : null;;
    }

    public Post getPostRequestModel()
    {
        return Optional.ofNullable(_postRequestModel).orElseThrow(() ->
                new RuntimeException("Post RequestModel does not exist"));
    }

    public static class Post
    {
        String civilId;
        String fullName;
        String dateOfBirth;
        String dateOfExpiry;
        String sex;
        String nationality;

        public Post(Request request)
        {
            civilId = request.getFormParameterValueOrError(DOCUMENT_ID);
            fullName = request.getFormParameterValueOrError(FULL_NAME);
            dateOfBirth = request.getFormParameterValueOrError(DATE_OF_BIRTH);
            dateOfExpiry = request.getFormParameterValueOrError(DATE_OF_EXPIRY);
            sex = request.getFormParameterValueOrError(SEX);
            nationality = request.getFormParameterValueOrError(NATIONALITY);
        }

        public String getCivilId()
        {
            return civilId;
        }

        public String getFullName()
        {
            return fullName;
        }

        public String getDateOfBirth()
        {
            return dateOfBirth;
        }

        public String getDateOfExpiry()
        {
            return dateOfExpiry;
        }

        public String getSex()
        {
            return sex;
        }

        public String getNationality()
        {
            return nationality;
        }
    }
}
