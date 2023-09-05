import { useRef, useState } from "react";
const API_KEY = "df6273095e01016faa955ee881dc4ac0";

function App() {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const weatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];

  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&appid=${API_KEY}`
      ).then((res) =>
        res.json().then((data) => {
          setApiData(null);
          if (data.cod == 404 || data.cod == 400) {
            setShowWeather([
              {
                type: "Not found",
                img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
              },
            ]);
          }
          setShowWeather(
            weatherTypes.filter(
              (weather) => weather.type === data.weather[0].main
            )
          );
          setApiData(data);
          console.log(showWeather);
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    console.log(apiData);
  };
  return (
    <div className="bg-gradient min-h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your location"
            className="text-xl  p-1 border-b border-gray-300 font-semibold uppercase flex-1"
          />
          <button onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="find"
              className="w-8 "
            ></img>
          </button>
        </div>
        <div
          className={`duration-300 delay-75 overflow-hidden ${
            showWeather ? "h-[27rem]" : "h-0"
          } `}
        >
          {isLoading ? (
            <div className="grid place-items-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="loading"
                className="w-14 mx-auto mb-2 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-semibold">
                    {apiData?.name.toUpperCase() + "," + apiData?.sys?.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt="Current weather"
                  className="w-52 mx-auto"
                />
                <h3 className="text-4xl font-bold text-zinc-800">
                  {showWeather[0].type}
                </h3>
                {apiData && (
                  <>
                    <div className="flex justify-center">
                      <img
                        className=" h-9 mt-1"
                        src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                        alt="temperature"
                      />
                      <h2 className="text-4xl font-extrabold">
                        {apiData?.main?.temp.toString().substring(0, 2)}
                        &#176;C
                      </h2>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
