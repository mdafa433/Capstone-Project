import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NewsCard from "../components/Card";

export default function Search() {
  const [news, setNews] = useState([]);
  const dispatch = useDispatch();
  const savedNews = useSelector((state) => state.savedNews);
  const apikey = import.meta.env.VITE_API_KEY;
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    if (query) {
      fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apikey}`)
        .then((response) => response.json())
        .then((data) => {
          setNews(
            data.response?.docs.map((article) => ({
              _id: article._id,
              source: article.source,
              title: article.headline.main,
              description: article.snippet,
              url: article.web_url,
            }))
          );
        })
        .catch(() => {
          setNews([]);
        });
    }
  }, [query, apikey]);

  
  const isSaved = (url) => savedNews.some((article) => article.url === url);
  const handleSave = (article) => {
    if (isSaved(article.url)) {
      dispatch({ type: "Unsave_News", payload: article });
    } else {
      dispatch({ type: "Save_News", payload: article });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hasil Pencarian: "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.length > 0 ? (
          news.slice(0, 9).map((article) => (
            <NewsCard
              key={article._id}
              id={article._id}
              source={article.source}
              title={article.title}
              description={article.description}
              url={article.url}
              isSaved={isSaved(article.url)}
              onSave={() => handleSave(article)}
            />
          ))
        ) : (
          <p className="text-gray-600">Tidak ada berita yang ditemukan.</p>
        )}
      </div>
    </div>
  );
}