# Region Lookup Service

[![npm](https://img.shields.io/npm/v/@googlemaps/region-lookup.svg)](https://www.npmjs.com/package/@googlemaps/region-lookup)
![CI](https://github.com/googlemaps/js-region-lookup/workflows/Test/badge.svg)
![Release](https://github.com/googlemaps/js-region-lookup/workflows/Release/badge.svg)
[![codecov](https://codecov.io/gh/googlemaps/js-region-lookup/branch/main/graph/badge.svg)](https://codecov.io/gh/googlemaps/js-region-lookup)
![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/js-region-lookup?color=green)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Discord](https://img.shields.io/discord/676948200904589322)](https://discord.gg/jRteCzP)

> **Note:** This library wraps a service that is in Experimental status.

## Install

```sh
npm install @googlemaps/region-lookup

# optionally if not already installed
npm install axios
```

## Usage

For complete documentation of this library, see [Use the Region Lookup API](https://developers.google.com/maps/documentation/javascript/dds-boundaries/region-lookup) in the Google Maps Platform documentation.

Below is a simple example calling the `lookupRegion` method of the service.

```js
import { 
  lookupRegion, 
  LookupRegionRequestData, 
  LookupRegionResponseData, 
  LookupRegionResponse, 
  RegionIdentifier 
} from "@googlemaps/region-lookup";

const headers = {
    "X-Goog-Api-Key": "YOUR API KEY",
  };

const data: LookupRegionRequestData = {
  identifiers: [
    {
      place: "newark",
      place_type: "locality" as const,
      region_code: "us",
      language: "en",
    },
  ],
};

try {
  const response: LookupRegionResponse = await lookupRegion({ headers, data });
  console.log(response.data);
} catch (e) {
  console.log(e.response);
  throw e;
}

```

See the [reference documentation](https://googlemaps.github.io/js-region-lookup/) for more information on the request and response interfaces.

## Developing

In order to run the end-to-end tests, you'll need to supply your API key via an
environment variable.

    $ export GOOGLE_MAPS_API_KEY=AIza-your-api-key
    $ npm test
