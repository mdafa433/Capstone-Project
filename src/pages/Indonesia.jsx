import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsCard from "../components/Card";

function Indonesia() {
  const [news, setNews] = useState([]); // State untuk menyimpan data berita
  const dispatch = useDispatch();
  const savedNews = useSelector((state) => state.savedNews);

  // Fungsi untuk memeriksa apakah berita sudah disimpan
  const isSaved = (newsItem) => {
    return savedNews.some((saved) => saved._id === newsItem._id);
  };

  // Fungsi untuk menyimpan berita
  const saveNews = (newsItem) => {
    dispatch({ type: "SAVE_NEWS", payload: newsItem });
  };

  // Fungsi untuk menghapus berita yang disimpan
  const unSaveNews = (newsItem) => {
    dispatch({ type: "UNSAVE_NEWS", payload: newsItem });
  };

  // Mengambil data berita dari API
  useEffect(() => {
    const apikey = import.meta.env.VITE_API_KEY;
    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=indonesia&api-key=${apikey}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(
          data.response.docs.map((article) => ({
            _id: article._id, // ID unik dari API
            source: article.source, // Menambahkan sumber berita
            title: article.headline.main,
            description: article.snippet,
            url: article.web_url,
          }))
        );
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Berita Indonesia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.slice(0, 9).map((article) => (
          <NewsCard
            key={article._id}
            id={article._id}
            source={article.source} // Menampilkan sumber berita
            title={article.title}
            description={article.description}
            url={article.url}
            isSaved={isSaved(article)}
            onSave={() =>
            isSaved(article) ? unSaveNews(article) : saveNews(article)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Indonesia;
