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

import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type {
  LanguageRegion,
  RegionMatch,
  Request,
  PaginationData,
} from "./common";

/**
 * Identifies a region to look up.
 *
 * One of `place` or `unit_code` must be specified. If none is specified,
 * an INVALID_ARGUMENT error is returned. `region_code` must also be specified
 * except when `place_type` is "country". Optionally, more candidates can be
 * requested (by setting the `max_candidates` field), as additional options for
 * cases in which matches are found with `place_types` different than the one
 * requested.
 *
 * `place` and `unit_code` specify a location to match a Place ID to. For
 * example if `place` is "California" and `region_code` "US" the API
 * returns the following `matched_place_id` results when the following
 * `place_type` are specified:
 *
 * `place_type`:                   `matched_place_id` results:
 * administrative_area_level_1   Place ID for The State of California
 * (All other supported types)   No Match
 *
 * If unit_code is "6" (FIPs code for California) and region_code is "US
 * the API returns the following matched_place_id results when the
 * following place_types are specified:
 *
 * `place_type`:                   `matched_place_id` results:
 * administrative_area_level_1   Place ID for The State of California
 * (All other supported types)   No Match
 *
 * or if unit_code is "US" the API returns the following results when
 * the following place_types are specified:
 *
 * `place_type`:                   `matched_place_id` results:
 * country                       Place ID for the United States
 * (All other supported types)   No Match
 *
 * If no match is found, `matched_place_id` is not set.
 *
 * In all of the examples above if candidate Place IDs are requested, no
 * candidate is retuned when a lookup is successful (`matched_place_id` is
 * set). Candidate Place IDs are returned when a lookup finds a region with a
 * different `place_type` then the one requested. For example if `place` is
 * "California" and `place_type` is "country" the Place ID for "The State of
 * California" is returned as a candidate.
 */
export interface RegionIdentifier extends LanguageRegion {
  /**
   *  The location must be specified by one of the following: `place` or `unit_code`.
   */
  location: {
    /**
     * The name of the region to match to a Place ID.
     *
     * The place field is used in combination with place_type to look up
     * the region Place ID.
     *
     * For example:
     * - If place_type is "locality", a valid place can be "Palo Alto, CA".
     * - If place_type is "postal_code", a valid place can be "94109".
     * - If place_type is "country", a valid place can be "United States".
     *
     * `region_code` is required when place is specified except when
     * place_type is "country".
     */
    place?: string;
    /**
     * The FIPs state or county codes (US only) or ISO-3166-1 country code to be
     * matched.
     *
     * The `unit_code` field is used in combination with `place_type` to look up
     * the region Place ID.
     *
     * For example:
     * - If `place_type` is "country", a valid `unit_code` can be "US" (ISO-3166-1
     * Alpha-2 code for United States) or "BR" (ISO-3166-1 Alpha-2 code for
     * Brazil).
     * - If `place_type` is "administrative_area_level_1" (state) and `region_code` is
     * "US", a valid `unit_code` can be "6" (FIPs code for California) or
     * "12"(FIPs code for Florida).
     * - If `place_type` is "administrative_area_level_2" (county) and `region_code`
     * is "US", a valid `unit_code` can be "6001" (FIPs code for Alameda County in
     * California) or "12086" (FIPs code for Miami-Dade County in Florida).
     *
     * `region_code` is required when specifying a FIPs code. `region_code` is
     * ignored for ISO-3166-1 country codes.
     */
    unit_code?: string;
  };

  /**
   * Place type to match.
   */
  place_type:
    | "administrative_area_level_1"
    | "administrative_area_level_2"
    | "country"
    | "locality"
    | "neighborhood"
    | "postal_code";

  /**
   * Specifies the maximum candidates to return. Candidates are other possible
   * Place ID matches for the given request. At most three candidates are
   * currently supported.
   */
  max_candidates?: number;
}

export interface LookupRegionRequestData extends PaginationData {
  /**
   * Each `RegionIdentifier` represents the desired fields used to lookup a single region.
   */
  identifiers: RegionIdentifier[];
}

export interface LookupRegionRequest extends Request {
  data: LookupRegionRequestData;
}

export interface LookupRegionResponseData {
  /**
   * Region matches, one for each {@link RegionIdentifier} in {@link LookupRegionRequest.identifiers}.
   */
  matches: RegionMatch[];
  /**
   * A token that can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   * */
  next_page_token?: string;
}

export interface LookupRegionResponse extends AxiosResponse {
  data: LookupRegionResponseData;
}

export const lookupRegionUrl =
  "https://regionlookup.googleapis.com/v1alpha:lookupRegion";

/**
 * Looks up a set of region Place IDs of types related to geographic boundaries.
 *
 * The following region place types are supported for look up: `postal_code`,
 * `administrative_area_level_1`, `administrative_area_level_2`, `locality`,
 * `neighborhood`, and `country`.
 */
export function lookupRegion(
  {
    method = "post",
    headers,
    data,
    url = lookupRegionUrl,
    ...config
  }: LookupRegionRequest,
  axiosInstance: AxiosInstance = axios
): Promise<LookupRegionResponse> {
  headers = { ...headers, "Content-Type": "application/json" };
  return axiosInstance({
    data,
    headers,
    method,
    url,
    ...config,
  }) as Promise<LookupRegionResponse>;
}
