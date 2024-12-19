function Card({ source, title, description, url, isSaved, onSave }) {
  return (
    <div className="border rounded p-4 flex flex-col gap-2">
      <p className="text-gray-800 text-sm font-medium">{source}</p>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-700">{description}</p>
      
      
      <div className="flex justify-between items-center mt-auto">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:underline"
        >
          Baca selengkapnya
        </a>
        <button
          onClick={onSave}
          className={`px-4 py-2 ${
            isSaved ? "bg-red-500 hover:bg-red-600" : " bg-black text-white hover:bg-red-500 transition ease-in-out delay-50"
          } text-white rounded transition`}
        >
          {isSaved ? "Hapus Simpanan" : "Simpan"}
        </button>
      </div>
    </div>
  );
}

export default Card;
