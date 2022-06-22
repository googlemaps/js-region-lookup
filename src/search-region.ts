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
  PaginationData,
  RegionMatch,
  Request,
} from "./common";

/**
 * Desired search values of a single region.
 *
 * Location must be specified by one of the following: `address`, `latlng` or
 * `place_id`. If none is specified, an INVALID_ARGUMENT error is returned.
 * `region_code` must also be provided when `address` is specified.
 *
 * The fields `address`, `latlng` and `place_id` specify a location contained inside
 * the region to match. For example if `address` is "1600 Amphitheatre Pkwy,
 * Mountain View, CA 94043" the API returns the following `matched_place_id`
 * results when the following place_types are specified:
 *
 * `place_type`:                   `matched_place_id` results:
 * postal_code                   Place ID for "94043"
 * administrative_area_level_1   Place ID for The State of California
 * administrative_area_level_2   Place ID for Santa Clara County
 *
 * More Examples:
 *
 * If `latlng` is "latitude: 37.4220656 longitude: -122.0862784" and `place_type`
 * is "locality", the result contains the Place ID (of type "locality") for
 * that location (the Place ID of Mountain View, CA, in this case).
 *
 * If `place_id` is "ChIJj61dQgK6j4AR4GeTYWZsKWw" (Place ID for Google office in
 * Mountain view, CA) and `place_type` is "locality", the result contains the
 * Place ID (of type "locality") for that location (the Place ID of Mountain
 * View, CA, in this case).
 *
 * If no match is found, `matched_place_id` is not set.
 */
export interface RegionSearchValue extends LanguageRegion {
  /**
   *  The location must be specified by one of the following: `address`, `latlng` or `place_id`.
   */
  /**
   * The unstructured street address that is contained inside a region to
   * match. `region_code` is required when address is specified.
   */
  address?: string;
  /**
   * The latitude and longitude that is contained inside a region to match.
   */
  latlng?: {
    latitude: number;
    longitude: number;
  };
  /**
   * The Place ID that is contained inside a region to match.
   */
  place_id?: string;

  /**
   * Place type to match.
   */
  place_type:
    | "administrative_area_level_1"
    | "administrative_area_level_2"
    | "administrative_area_level_3"
    | "administrative_area_level_4"
    | "country"
    | "locality"
    | "sublocality_level_1"
    | "neighborhood"
    | "postal_code";

  /**
   * The BCP-47 language code, such as "en-US" or "sr-Latn", corresponding to
   * the language in which the place name and address is requested. If none is
   * requested, then it defaults to English.
   */
  language_code?: string;

  /**
   * Two-letter ISO-3166 country/region code for the location you're trying to
   * match. region_code is optional if place_type is "country".
   */
  region_code?: string;
}

export interface SearchRegionRequestData extends PaginationData {
  /**
   * Each `RegionIdentifier` represents the desired fields used to lookup a single region.
   */
  search_values: RegionSearchValue[];
}

export interface SearchRegionRequest extends Request {
  data: SearchRegionRequestData;
}

export interface SearchRegionResponseData {
  /**
   * Region matches, one for each {@link RegionSearchValue} in {@link SearchRegionRequest.search_values}.
   */
  matches: RegionMatch[];
  /**
   * A token that can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   * */
  next_page_token?: string;
}

export interface SearchRegionResponse extends AxiosResponse {
  data: SearchRegionResponseData;
}

export const searchRegionUrl =
  "https://regionlookup.googleapis.com/v1alpha:searchRegion";

/**
 * Searches for a set of region Place IDs of types related to geographic
 * boundaries.
 *
 * Similar to {@link loookupRegion} RPC but instead of looking up Place IDs for the
 * given {@link RegionIdentifier}, the API searches for Region Place IDs by
 * considering all regions that are contained within a specified location. The
 * {@link RegionSearchValue} is used to specify the search values.
 *
 * The following region place types are supported for look up: `postal_code`,
 * `administrative_area_level_1`, `administrative_area_level_2`, `locality`,
 * `neighborhood`, and `country`.
 */
export function searchRegion(
  {
    method = "post",
    headers,
    data,
    url = searchRegionUrl,
    ...config
  }: SearchRegionRequest,
  axiosInstance: AxiosInstance = axios
): Promise<SearchRegionResponse> {
  headers = { ...headers, "Content-Type": "application/json" };
  return axiosInstance({
    data,
    headers,
    method,
    url,
    ...config,
  }) as Promise<SearchRegionResponse>;
}
