"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { SearchIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockStocks, mockProfiles, mockPortfolios } from "@/lib/mock-search-data"

type FilterType = "all" | "stocks" | "profiles" | "portfolios"

export function Search() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 3))
    }
  }, [])

  // Save recent search to localStorage
  const saveRecentSearch = (search: string) => {
    const updatedSearches = [search, ...recentSearches.filter((s) => s !== search)].slice(0, 3)
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  // Filter suggestions based on query and active filter
  const getFilteredSuggestions = () => {
    if (!query.trim()) {
      return { stocks: [], profiles: [], portfolios: [], showRecent: true }
    }

    const lowerQuery = query.toLowerCase()

    const filteredStocks =
      activeFilter === "all" || activeFilter === "stocks"
        ? mockStocks
            .filter(
              (stock) =>
                stock.ticker.toLowerCase().includes(lowerQuery) || stock.name.toLowerCase().includes(lowerQuery),
            )
            .slice(0, 5)
        : []

    const filteredProfiles =
      activeFilter === "all" || activeFilter === "profiles"
        ? mockProfiles
            .filter(
              (profile) =>
                profile.name.toLowerCase().includes(lowerQuery) || profile.role.toLowerCase().includes(lowerQuery),
            )
            .slice(0, 5)
        : []

    const filteredPortfolios =
      activeFilter === "all" || activeFilter === "portfolios"
        ? mockPortfolios
            .filter(
              (portfolio) =>
                portfolio.name.toLowerCase().includes(lowerQuery) ||
                portfolio.creator.toLowerCase().includes(lowerQuery),
            )
            .slice(0, 5)
        : []

    return {
      stocks: filteredStocks,
      profiles: filteredProfiles,
      portfolios: filteredPortfolios,
      showRecent: false,
    }
  }

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length >= 2) {
      setIsLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false)
        setShowDropdown(true)
      }, 300)
    } else {
      setShowDropdown(true)
      setIsLoading(false)
    }

    setHighlightedIndex(-1)
  }

  // Handle input focus
  const handleInputFocus = () => {
    setIsFocused(true)
    setShowDropdown(true)
  }

  // Handle input blur
  const handleInputBlur = (e: React.FocusEvent) => {
    // Don't hide the dropdown if clicking inside the dropdown
    if (searchRef.current && searchRef.current.contains(e.relatedTarget as Node)) {
      return
    }

    // Keep focus state if dropdown is still open (for filter toggles)
    if (!showDropdown) {
      setIsFocused(false)
    }
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { stocks, profiles, portfolios } = getFilteredSuggestions()

    let allItems: any[] = []

    if (query.length < 2) {
      // When no query or short query, show suggested stocks and recent searches
      allItems = [
        ...recentSearches.map((search) => ({ type: "recent", value: search })),
        ...mockStocks.slice(0, 5).map((stock) => ({ type: "stock", value: stock })),
      ]
    } else {
      // When searching, show filtered results
      allItems = [
        ...stocks.map((stock) => ({ type: "stock", value: stock })),
        ...profiles.map((profile) => ({ type: "profile", value: profile })),
        ...portfolios.map((portfolio) => ({ type: "portfolio", value: portfolio })),
      ]
    }

    const maxIndex = allItems.length - 1

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex <= maxIndex) {
          const selected = allItems[highlightedIndex]
          handleItemClick(selected.type, selected.value)
        }
        break
      case "Escape":
        e.preventDefault()
        setShowDropdown(false)
        setIsFocused(false)
        inputRef.current?.blur()
        break
    }
  }

  // Handle clicking on a suggestion
  const handleItemClick = (type: string, item: any) => {
    switch (type) {
      case "stock":
        saveRecentSearch(item.ticker)
        router.push(`/stock/${item.ticker}`)
        break
      case "profile":
        saveRecentSearch(item.name)
        router.push(`/profile/${item.username}`)
        break
      case "portfolio":
        saveRecentSearch(item.name)
        router.push(`/portfolio/${item.id}`)
        break
      case "recent":
        setQuery(item)
        setShowDropdown(true)
        break
    }

    setQuery("")
    setShowDropdown(false)
    setIsFocused(false)
  }

  const { stocks, profiles, portfolios, showRecent } = getFilteredSuggestions()
  const hasResults = stocks.length > 0 || profiles.length > 0 || portfolios.length > 0
  const hasNoResults = query.trim().length >= 2 && !hasResults && !isLoading

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search stocks, profiles, or portfolios..."
            className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            </div>
          )}
        </div>

        {/* Filter Toggles - Only visible when search is focused */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 flex justify-center space-x-2 py-2 bg-white z-50 border-x border-b border-gray-200 rounded-b-md shadow-sm">
            <button
              onClick={() => setActiveFilter("all")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                activeFilter === "all" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("stocks")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                activeFilter === "stocks"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Stocks
            </button>
            <button
              onClick={() => setActiveFilter("profiles")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                activeFilter === "profiles"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Profiles
            </button>
            <button
              onClick={() => setActiveFilter("portfolios")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                activeFilter === "portfolios"
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Portfolios
            </button>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute z-50 w-full top-[calc(100%+40px)] rounded-md border border-gray-200 bg-white py-1 shadow-lg max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            </div>
          ) : query.length >= 2 ? (
            hasResults ? (
              <div>
                {/* Stocks */}
                {stocks.length > 0 && (
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500">Stocks</h3>
                    <div className="mt-1 space-y-1">
                      {stocks.map((stock, index) => (
                        <div
                          key={stock.ticker}
                          className={`cursor-pointer rounded-md px-3 py-2 text-sm ${
                            highlightedIndex === index ? "bg-gray-100" : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleItemClick("stock", stock)}
                        >
                          <span className="font-medium">{stock.ticker}</span> - {stock.name} | €{stock.price.toFixed(2)}{" "}
                          <span className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                            ({stock.change >= 0 ? "+" : ""}
                            {stock.change}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Profiles */}
                {profiles.length > 0 && (
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500">Profiles</h3>
                    <div className="mt-1 space-y-1">
                      {profiles.map((profile, index) => (
                        <div
                          key={profile.username}
                          className={`cursor-pointer rounded-md px-3 py-2 text-sm ${
                            highlightedIndex === stocks.length + index ? "bg-gray-100" : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleItemClick("profile", profile)}
                        >
                          <span className="font-medium">{profile.name}</span> | {profile.role} |{" "}
                          {profile.followers.toLocaleString()} followers
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolios */}
                {portfolios.length > 0 && (
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500">Portfolios</h3>
                    <div className="mt-1 space-y-1">
                      {portfolios.map((portfolio, index) => (
                        <div
                          key={portfolio.id}
                          className={`cursor-pointer rounded-md px-3 py-2 text-sm ${
                            highlightedIndex === stocks.length + profiles.length + index
                              ? "bg-gray-100"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleItemClick("portfolio", portfolio)}
                        >
                          <span className="font-medium">{portfolio.name}</span> by {portfolio.creator} |{" "}
                          <span className={portfolio.ytd >= 0 ? "text-green-600" : "text-red-600"}>
                            {portfolio.ytd >= 0 ? "+" : ""}
                            {portfolio.ytd}% YTD
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">No results found. Try a different search term.</div>
            )
          ) : (
            <div>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500">Recent Searches</h3>
                  <div className="mt-1 space-y-1">
                    {recentSearches.map((search, index) => (
                      <div
                        key={search}
                        className={`cursor-pointer rounded-md px-3 py-2 text-sm ${
                          highlightedIndex === index ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleItemClick("recent", search)}
                      >
                        {search}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Stocks */}
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-500">Suggested Stocks</h3>
                <div className="mt-1 space-y-1">
                  {mockStocks.slice(0, 5).map((stock, index) => (
                    <div
                      key={stock.ticker}
                      className={`cursor-pointer rounded-md px-3 py-2 text-sm ${
                        highlightedIndex === (recentSearches.length + index) ? "bg-gray-100" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleItemClick("stock", stock)}
                    >
                      <span className="font-medium">{stock.ticker}</span> - {stock.name} | €{stock.price.toFixed(2)}{" "}
                      <span className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                        ({stock.change >= 0 ? "+" : ""}
                        {stock.change}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
