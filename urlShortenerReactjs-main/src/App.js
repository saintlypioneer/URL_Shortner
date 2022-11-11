// import logo from './logo.svg';
import "./App.css";
import Spinner from "./components/spinner";
import Clipboard from "./components/clipboard";
import { useState } from "react";

// const RedirectCheck = () =>{
//   const currPath = window.location.pathname;
//   if (currPath !== "/"){
//     console.log(currPath)
//     window.location.href = API_URL+currPath.substring(1);
//   }
//   return(

//     <p>Hello world</p>


//     // <>
//     //   <Router>
//     //     <Routes>
//     //       <Route exact path="/" element={App()} />
//     //       <Route path="*" element={window.location.href = "http://google.com"} replace={true} />
//     //     </Routes>
//     //   </Router>
//     // </>
//   );
// };

const API_URL = "https://aqueous-ridge-95807.herokuapp.com/";

const App = () => {
  const currPath = window.location.pathname;
  if (currPath !== "/"){
    console.log(currPath)
    window.location.href = API_URL+currPath.substring(1);
  }
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [longUrlButtonType, setLongUrlButtonType] = useState(1);
  const [shortUrlButtonType, setShortUrlButtonType] = useState(1);
  const [longUrlButtonText, setLongUrlButtonText] = useState("Shorten Link");
  const [shortUrlButtonText, setShortUrlButtonText] =
    useState("unShorten Link");
  // type 1-> text
  // type 2-> spinner
  // type 3-> clipboard icon

  function handleLongInput(event) {
    setLongUrl(event.target.value);
  }
  function handleShortInput(event) {
    setShortUrl(event.target.value);
  }

  function handleLongSubmit(event) {
    event.preventDefault();
    if (longUrlButtonType === 3) {
      console.log("copying");
      navigator.clipboard.writeText(longUrl);
      setLongUrlButtonText("Shorten Link");
      setLongUrlButtonType(1);
      return;
    }
    setLongUrlButtonText(<Spinner />);
    setLongUrlButtonType(2);
    const requOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", mode: "cors" },
      body: JSON.stringify({
        lurl: longUrl,
      }),
    };
    fetch(
      API_URL+"urlShorterner",
      requOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLongUrlButtonText(<Clipboard />);
        setLongUrlButtonType(3);
        // setLongUrl(data.shortCode);
        setLongUrl("https://" + window.location.host + "/" + data.shortCode);
      });
  }

  function handleShortSubmit(event) {
    event.preventDefault();
    if (shortUrlButtonType === 3) {
      console.log("copying");
      navigator.clipboard.writeText(shortUrl);
      setShortUrlButtonText("unShorten Link");
      setShortUrlButtonType(1);
      return;
    }
    setShortUrlButtonText(<Spinner />);
    setShortUrlButtonType(2);
    const requOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", mode: "cors" },
    };
    const tempCode = shortUrl.substring(shortUrl.length - 7, shortUrl.length);
    // console.log("hkbd"+tempCode);
    fetch(
      API_URL+"urlShorterner/" + tempCode,
      requOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShortUrlButtonText(<Clipboard />);
        setShortUrlButtonType(3);
        // setShortUrl(data.shortCode);
        // setShortUrl(data.longUrl);
        setShortUrl(data.longUrl);
      });
  }

  return (
    <>
      {/* <Route exact path={`/${shortUrl}`}>
        {
          <Redirect push to={`${API_URL}
          ${shortUrl}`} />
        }
      </Route> */}
      <div className="p-8">
        <div className="py-3 text-yellow-500 font-Poppins text-3xl md:text-5xl font-bold tracking-tighter text-center">
          <h1>Short URLs</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 ">
          <img
            className="w-full object-contain"
            src="/static/illustration.svg"
            alt="Illustration File"
          ></img>
          <div className="w-full h-full flex flex-col justify-center">
            <form className="w-full py-4 flex flex-col space-y-3 justify-center items-end">
              <input
                value={longUrl}
                type="text"
                onChange={handleLongInput}
                className="w-full p-2 border-2 border-yellow-400 rounded-full text-lg"
                placeholder="Enter long URL"
              />
              <button
                onClick={handleLongSubmit}
                className="py-2 px-3 text-md font-bold bg-yellow-400 rounded-full"
              >
                {longUrlButtonText}
              </button>
            </form>

            <form className="w-full py-4 flex flex-col space-y-3 justify-center items-end">
              <input
                value={shortUrl}
                type="text"
                onChange={handleShortInput}
                className="w-full p-2 border-2 border-blue-400 rounded-full text-lg"
                placeholder="Enter short URL"
              />
              <button
                onClick={handleShortSubmit}
                className="py-2 px-3 text-md font-bold bg-blue-400 rounded-full text-white"
              >
                {shortUrlButtonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
