import React, { useEffect, useState } from "react";
export default function App() {
  const [data, setData] = useState([]);

  const API_KEY = "123";
  //INI ADALAH FETCH MENGGUNAKAN METHOD .then dan .catch
  //Pilih salah satu, mau pake then atau async await(hanya beda syntax saja. tujuannya sama)
  function fetchDataWithThen() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((items) => {
        setData(items);
        console.log("Data received with Then:", items); // <-- INI PENTING BUAT CEK DATANYA
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    fetchDataWithThen();
  }, []);

  return (
    <div>
      {data?.map((e) => (
        <div>{e?.title}</div>
      ))}
    </div>
  );
}
// OPTIONAL: Fetch salah satu URL dibawah dan desain tampilannya.
// "https://randomuser.me/api/"
// "http://universities.hipolabs.com/search?country=indonesia"
// "http://all.api.radio-browser.info/json/countries"
// "https://api.imgflip.com/get_memes"
// "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ind-indonesianislam.json"
// "https://api.disneyapi.dev/character"
// "https://digimon-api.vercel.app/api/digimon"
// "http://api.citybik.es/v2/networks"
// "https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleVariableList?format=json"
// "https://api.jikan.moe/v4/top/anime"
// "https://api.alquran.cloud/v1/quran/id.indonesian"
