/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export interface Request extends Partial<AxiosRequestConfig> {
  headers: {
    "X-Goog-Api-Key": string;
  } & AxiosRequestHeaders;
}

export interface PaginationData {
  /*
   * The maximum number of matches to return. The service may return fewer than
   * this value.
   *
   * If unspecified, at most 50 matches will be returned. The maximum value is
   * 1000; values above 1000 will be coerced to 1000.
   */
  page_size?: number;
  /**
   * A page token, received from a previous call. Provide this to
   * retrieve the subsequent page.
   *
   * When paginating, all other parameters provided must match
   * the call that provided the page token.
   */
  page_token?: string;
}

export interface LanguageRegion {
  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn", corresponding to
   * the language in which the place name and address is requested. If none is
   * requested, then it defaults to English.
   */
  language?: string;
  /**
   * Two-letter ISO-3166 country/region code for the location you're trying to match.
   */
  region_code?: string;
}

export interface RegionMatch {
  /**
   * Place ID of the boundary that is matched. If no match is found, this field
   * is not set.
   */
  matched_place_id?: string;
  /**
   * Region candidate IDs. Up to three candidates may be requested,
   * as additional options for cases in which either no match is found, or the
   * client-side logic deems the matched Place ID as unsuitable.
   */
  candidate_place_ids: string[];
  /**
   * Boundary matching debug information for when no match is found.
   */
  debug_info?: string;
}
