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

public final class MicroblinkAuthenticationActionConstants {

    public static class Endpoints
    {
        public static final String INDEX = "index";
        public static final String REVIEW_SCAN = "review-scan";
        public static final String CANCEL = "cancel";
        public static final String FAILED = "failed";
    }

    public static class FormValueNames
    {
        public static final String CANCEL_URL = "_cancelUrl";
        public static final String RESTART_URL = "_restartUrl";
        public static final String BLINKIDSCAN_URL = "_blinkIdScanUrl";
        public static final String BLINKID_LICENSE_KEY = "_blinkIdLicenseKey";
        public static final String POLLING_DONE = "_pollingDone";
        public static final String ERROR_MESSAGE = "_errorMessage";
    }

    public static class SessionKeys
    {
        public static final String SCANNED_DOCUMENT = "scannedDocument";
        public final static String SESSION_KEY = "MICROBLINK";
    }

    public static class SubjectAttributes
    {
        public static final String KEY = "userAttributes";
        public static final String SUBJECT_ATTRIBUTES_VERIFICATION = "verification";
        public static final String SUBJECT_ATTRIBUTES_VERIFICATION_VALUE = "online";
    }

    public static class FormFieldNames
    {
        public static final String FULL_NAME = "_fullName";
        public static final String DOCUMENT_ID = "_documentId";
        public static final String NATIONALITY = "_nationality";
        public static final String DATE_OF_BIRTH = "_dateOfBirth";
        public static final String DATE_OF_EXPIRY = "_dateOfExpiry";
        public static final String SEX = "_sex";
    }

    public static class MessageKeys
    {
        public static final String USER_CANCELLED = "user.cancelled";
    }
}
