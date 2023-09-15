import React, { useEffect } from 'react'
import './Search.scss';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";



export default function Search({ postQuery, latest, setSearchParams }) {
  const [search, setSearch] = useState(postQuery);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

const normalizeQuery = (query) => {
  return query.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().trim();
};
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;
    const normalizedQuery = normalizeQuery(query);
    const params = {};

    if (normalizedQuery.length) {
      params.post = normalizedQuery;
    }

    setSearchParams(params);
    navigate(`/Shop/?post=${normalizedQuery}`);
  };

  return (
    <div>
      <div className="advanced-search">
        <form onSubmit={handleSubmit}>
          <div className="group">
            <input
              type="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What do you need?"
            />
            <button type="submit" value="Search">
              <div>
                <BsSearch />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

