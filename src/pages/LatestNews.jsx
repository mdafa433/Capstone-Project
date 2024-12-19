import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsCard from "../components/Card";

function LatestNews() {
  const [news, setNews] = useState([]); 
  const dispatch = useDispatch();
  const savedNews = useSelector((state) => state.savedNews);

  const isSaved = (newsItem) => {
    return savedNews.some((saved) => saved._id === newsItem._id);
  };

  const saveNews = (newsItem) => {
    dispatch({ type: "Save_News", payload: newsItem });
  };

  const unSaveNews = (newsItem) => {
    dispatch({ type: "Unsave_News", payload: newsItem });
  };

  useEffect(() => {
    const apikey = import.meta.env.VITE_API_KEY;
    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&api-key=${apikey}`)
      .then((response) => response.json())
      .then((data) => {

        const randomNews = data.response.docs.map((article) => ({
            _id: article._id,
            source: article.source,
            title: article.headline.main,
            description: article.snippet,
            url: article.web_url,
          }))
          .sort(() => Math.random() - 0.5);
        setNews(randomNews);
      });
  }, []);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Berita Terbaru</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.slice(0, 9).map((article) => (
          <NewsCard
            key={article._id}
            id={article._id}
            source={article.source}
            title={article.title}
            description={article.description}
            url={article.url}
            isSaved={isSaved(article)}
            onSave={() => (isSaved(article) ? unSaveNews(article) : saveNews(article))}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestNews;
