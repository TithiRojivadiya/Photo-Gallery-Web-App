function Card(props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <img
        src={props.download_url}
        alt={props.author}
        className="h-48 w-full object-cover"
      />

      <div className="flex items-center justify-between p-4">
        <h3 className="font-semibold text-gray-800">
          {props.author}
        </h3>

        <button
          onClick={props.onToggleFavourite}
          aria-label={
            props.isFavourite
              ? "Remove from favourites"
              : "Add to favourites"
          }
          className={`text-2xl ${
            props.isFavourite
              ? "text-red-500"
              : "text-gray-400 hover:text-red-500"
          }`}
        >
          {props.isFavourite ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}

export default Card;
