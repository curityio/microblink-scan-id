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

package com.example.curity.microblink.config;

import se.curity.identityserver.sdk.config.Configuration;
import se.curity.identityserver.sdk.config.annotation.DefaultString;
import se.curity.identityserver.sdk.config.annotation.Description;
import se.curity.identityserver.sdk.service.*;

public interface MicroblinkAuthenticationActionConfig extends Configuration {
    SessionManager getSessionManager();

    Json getJson();

    ExceptionFactory getExceptionFactory();

    @Description("Bucket to store state")
    Bucket getBucket();

    @Description(("The Microblink BlinkID license key"))
    @DefaultString("sRwAAAYWaWdnYm9tLWN1cml0eS5uZ3Jvay5pb815HXRDygbSukz/Rr2IGB/hcu/bK6jWXIziN6fQCYLCtNVSthcGyrUolLAqlolCTR9EzblNZ6pgI06Y+hFrrNapQsWYRP3u+ZqAIRJb3Q067GMtzm03c5BobrTE+0V1tSEZMVgwKYhTTzVqdWj8mm5BW/aznp2jHIEjrff7fSkYpG3w5ylc9QZbo/cpWCwaxDRniNFiXXpDJpYsRz5PiNje1htVGGWFmtU=")
    String getMicroblinkLicenseKey();
}