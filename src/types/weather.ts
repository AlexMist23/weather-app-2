// types/weather.ts

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number, number];
  };
  properties: {
    meta: {
      updated_at: string;
      units: {
        air_pressure_at_sea_level: string;
        air_temperature: string;
        cloud_area_fraction: string;
        precipitation_amount: string;
        relative_humidity: string;
        wind_from_direction: string;
        wind_speed: string;
      };
    };
    timeseries: TimeseriesEntry[];
  };
}

export interface TimeseriesEntry {
  time: string;
  data: {
    instant: {
      details: {
        air_pressure_at_sea_level: number;
        air_temperature: number;
        cloud_area_fraction: number;
        relative_humidity: number;
        wind_from_direction: number;
        wind_speed: number;
      };
    };
    next_12_hours?: {
      summary: {
        symbol_code: string;
      };
    };
    next_1_hours?: {
      summary: {
        symbol_code: string;
      };
      details: {
        precipitation_amount: number;
      };
    };
    next_6_hours?: {
      summary: {
        symbol_code: string;
      };
      details: {
        precipitation_amount: number;
      };
    };
  };
}

export interface WeatherResponse {
  coordinates: Coordinates;
  weather: WeatherData;
}

export interface WeatherError {
  error: string;
}

export type WeatherApiResponse = WeatherResponse | WeatherError;

export interface OpenCageResponse {
  documentation: string;
  licenses: Array<{ name: string; url: string }>;
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
  results: OpenCageResult[];
  status: {
    code: number;
    message: string;
  };
  stay_informed: {
    blog: string;
    twitter: string;
  };
  thanks: string;
  timestamp: {
    created_http: string;
    created_unix: number;
  };
  total_results: number;
}

export interface OpenCageAnnotations {
  DMS: {
    lat: string;
    lng: string;
  };
  MGRS: string;
  Maidenhead: string;
  Mercator: {
    x: number;
    y: number;
  };
  OSM: {
    edit_url: string;
    note_url: string;
    url: string;
  };
  UN_M49: {
    regions: {
      [key: string]: string;
    };
    statistical_groupings: string[];
  };
  callingcode: number;
  currency: {
    alternate_symbols: string[];
    decimal_mark: string;
    html_entity: string;
    iso_code: string;
    iso_numeric: string;
    name: string;
    smallest_denomination: number;
    subunit: string;
    subunit_to_unit: number;
    symbol: string;
    symbol_first: number;
    thousands_separator: string;
  };
  flag: string;
  geohash: string;
  qibla: number;
  roadinfo: {
    drive_on: string;
    road: string;
    speed_in: string;
  };
  sun: {
    rise: {
      apparent: number;
      astronomical: number;
      civil: number;
      nautical: number;
    };
    set: {
      apparent: number;
      astronomical: number;
      civil: number;
      nautical: number;
    };
  };
  timezone: {
    name: string;
    now_in_dst: number;
    offset_sec: number;
    offset_string: string;
    short_name: string;
  };
  what3words: {
    words: string;
  };
  wikidata: string;
  // Add any other specific annotations you commonly use
}

export interface OpenCageResult {
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
  components: {
    [key: string]: string;
  };
  bounds: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
  annotations: OpenCageAnnotations;
}

export interface OpenCageResponse {
  documentation: string;
  licenses: Array<{ name: string; url: string }>;
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
  results: OpenCageResult[];
  status: {
    code: number;
    message: string;
  };
  stay_informed: {
    blog: string;
    twitter: string;
  };
  thanks: string;
  timestamp: {
    created_http: string;
    created_unix: number;
  };
  total_results: number;
}
