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

import com.google.gson.annotations.SerializedName;

public class Recognizer
{
    @SerializedName("personalIdNumber")
    PersonalIdNumber documentId;

    DocumentNumber documentNumber;
    FirstName firstName;
    LastName lastName;
    Sex sex;
    @SerializedName("classInfo")
    CountryDetails countryDetails;
    @SerializedName("dateOfBirth")
    DateOfBirth dateOfBirth;
    @SerializedName("dateOfExpiry")
    DateOfExpiry dateOfExpiry;

    public String getFullName()
    {
        return firstName.getFirstName() + " " + lastName.getLastName();
    }

    public String getDocumentId()
    {
        return documentId.getPersonalIdNumber();
    }

    public String getDocumentNumber()
    {
        return documentNumber.getDocumentNumber();
    }

    public String getSex()
    {
        return sex.getSex();
    }

    public CountryDetails getCountryDetails()
    {
        return countryDetails;
    }

    public DateOfBirth getDateOfBirth()
    {
        return dateOfBirth;
    }

    public DateOfExpiry getDateOfExpiry()
    {
        return dateOfExpiry;
    }
}
