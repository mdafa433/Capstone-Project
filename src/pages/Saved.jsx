import React from "react";
import { useSelector, useDispatch } from "react-redux";

 function Saved() {
  const dispatch = useDispatch();
  const savedNews = useSelector((state) => state.savedNews); // Ambil berita yang disimpan dari Redux state

  // Fungsi untuk menghapus berita yang disimpan
  const handleUnsave = (newsItem) => {
    dispatch({ type: "UNSAVE_NEWS", payload: newsItem });
  };

  if (!savedNews || savedNews.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-8">
        Tidak ada berita yang disimpan.
      </p>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Berita yang Disimpan</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead> 
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 px-4 py-2">Source</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {savedNews.map((article) => (
            <tr key={article._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {article.source || "Unknown Source"}
                <br />
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  News Page
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">{article.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {article.description}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleUnsave(article)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Hapus Simpanan
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Saved