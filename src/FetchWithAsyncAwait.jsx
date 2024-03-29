import React, { useEffect, useState } from "react";

export default function FetchWithAsyncAwait() {
  const [data, setData] = useState([]);

  //INI ADALAH FETCH MENGGUNAKAN METHOD async dan await
  //Pilih salah satu, mau pake then atau async await
  // then = cara lama
  // async await = cara baru/modern
  async function fetchDataWithAsyncAwait() {
    try {
      const response = await fetch(
        "https://digimon-api.vercel.app/api/digimon"
        // "https://jsonplaceholder.typicode.com/todos"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const items = await response.json();
      console.log("Data received with Async/Await:!!!", data);
      setData(items);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    console.log("process ", process?.env);
    fetchDataWithAsyncAwait();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {data?.map((e, i) => (
          <div key={i}>
            <div>{e?.name}</div>
            <div>{e?.level}</div>
            <div>{e?.img}</div>
            <img src={e?.img} />
          </div>
        ))}
      </div>
    </div>
  );
}
