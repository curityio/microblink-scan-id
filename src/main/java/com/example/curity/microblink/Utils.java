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

import org.apache.commons.lang3.StringUtils;
import se.curity.identityserver.sdk.service.Bucket;
import se.curity.identityserver.sdk.service.SessionManager;

import java.net.MalformedURLException;
import java.net.URL;

import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.BUCKET_PURPOSE_SCANNED_USER_ATTRS;
import static com.example.curity.microblink.MicroblinkAuthenticationActionConstants.SessionKeys.SCANNED_DOCUMENT_ID;

public final class Utils
{
    public static void cleanup(SessionManager sessionManager, Bucket bucket)
    {
        String scannedDocumentId = sessionManager.remove(SCANNED_DOCUMENT_ID).getOptionalValueOfType(String.class);

        if (StringUtils.isNotBlank(scannedDocumentId))
        {
            bucket.clearBucket(scannedDocumentId, BUCKET_PURPOSE_SCANNED_USER_ATTRS);
        }
    }

    public static String getUrlPath(String url) throws MalformedURLException
    {
        String urlPath = new URL(url).getPath();
        return urlPath.substring(0,urlPath.lastIndexOf('/'));
    }
}
