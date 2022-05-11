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

import { lookupRegion, LookupRegionRequestData } from "../src";

test("lookupRegion should return a response for valid request", async () => {
  const headers = {
    "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
  };

  const data: LookupRegionRequestData = {
    identifiers: [
      {
        location: { place: "newark" },
        place_type: "locality" as const,
        region_code: "us",
        language: "en",
        max_candidates: 3,
      },
    ],
  };

  const response = await lookupRegion({ headers, data });
  expect(response.data.matches[0].matched_place_id).toBeTruthy();
  expect(response.data.matches[0].candidate_place_ids.length).toBeTruthy();
});
