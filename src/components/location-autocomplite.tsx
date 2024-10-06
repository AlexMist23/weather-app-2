"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Suggestion {
  place_name: string;
  lat: number;
  lng: number;
}

interface LocationAutocompleteProps {
  onLocationSelect: (location: string, lat: number, lon: number) => void;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  onLocationSelect,
}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/geocode?q=${encodeURIComponent(input)}`
        );
        const data = await response.json();
        setSuggestions(data.results || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [input]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInput(suggestion.place_name);
    setShowSuggestions(false);
    onLocationSelect(suggestion.place_name, suggestion.lat, suggestion.lng);
  };

  const handleSearch = () => {
    if (suggestions.length > 0) {
      const firstSuggestion = suggestions[0];
      onLocationSelect(
        firstSuggestion.place_name,
        firstSuggestion.lat,
        firstSuggestion.lng
      );
    } else {
      // If no suggestions, pass the input as is
      onLocationSelect(input, 0, 0);
    }
  };

  return (
    <div ref={autocompleteRef} className="relative">
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter location"
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          Search
        </Button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute z-10 w-full max-h-60 overflow-auto">
          <CardContent className="p-0">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.place_name}
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationAutocomplete;
