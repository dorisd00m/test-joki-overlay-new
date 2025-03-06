import { useEffect, useState } from "react";


const SpreadsheetCSV = () => {
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeData,setActiveData] = useState()

  // Fungsi untuk mengekstrak SPREADSHEET_ID dari URL
  const extractSpreadsheetId = (url) => {
    const match = url.match(/\/d\/(.*?)(\/|$)/);
    return match ? match[1] : "";
  };

  const fetchCSVData = () => {
    if (spreadsheetId) {
      // setLoading(true);
      // Ambil CSV dari Google Sheets
      const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv`;
      fetch(csvUrl)
        .then((res) => res.text())
        .then((csv) => {
          // Split CSV by lines and then by comma, also clean quotes
          const rows = csv
            .split("\n")
            .map((row) =>
              row
                .split(",")
                .map((cell) => cell.replace(/(^"|"$)/g, "")) // Hilangkan tanda kutip di awal dan akhir cell
            );

          setData(rows);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching CSV:", error);
          setLoading(false);
        });
    }
  }

  const dataCheckActiveName = () => {
    const findData = data?.filter((item, id) => (id !== 0 && item[item?.length - 1] == "TRUE"))
    findData[0]?.map((item,id)=>{
      if(id == 1) {

        setActiveData(item)
      }
    })
    
   
  }

  useEffect(() => {
      fetchCSVData()
    const interval = setInterval(fetchCSVData, 5000); // Update setiap 5 detik
    return () => clearInterval(interval); // Hapus interval saat komponen unmount 
  }, [spreadsheetId]);

  useEffect(()=>{
    // console.log(data)
    dataCheckActiveName()

  },[data])

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setSpreadsheetUrl(url);
    const id = extractSpreadsheetId(url);
    setSpreadsheetId(id);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={spreadsheetUrl}
        onChange={handleUrlChange}
        placeholder="Masukkan URL Google Spreadsheet"
        className="p-2 border border-gray-300 rounded-md w-full mb-4"
      />
      {/* <h2 className="font-bold mb-2">SPREADSHEET_ID: {spreadsheetId}</h2>

      <h1 className="text-xl font-bold mb-4">Data dari Spreadsheet</h1> */}
{/* 
      {loading ? (
        <p>Loading...</p>
      ) : spreadsheetId ? (
        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
                {data[0]?.map((cell, j) => (
                  <th key={j} className="p-2 border border-gray-300">
                    {cell}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, i) => {
              return (
                <tr key={i} className="border border-gray-300">
                  {row.map((cell, j) => ( i !== 0 &&
                    <td key={j} className="p-2 border border-gray-300">
                      {cell}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <p>Masukkan URL spreadsheet untuk melihat data</p>
      )} */}

      <div className="max-w-[500px]">
        {loading ? (<p>loading</p>) :
          <div className="flex gap-3 text-white">
            <div className="px-5 py-2 rounded bg-gray-600">JOKI AKUN  </div>
            <div className="px-5 py-2 rounded border bg-purple-600">
              {activeData ? activeData : "Tidak ada akun aktif"}
            </div>
          </div>
        }
      </div>
{/* 
      {loading ? (
        <p>Loading...</p>
      ) : spreadsheetId ? (
        <table className="border-collapse border border-gray-400 w-full">
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border border-gray-300">
                {row.map((cell, j) => (
                  <td key={j} className="p-2 border border-gray-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Masukkan URL spreadsheet untuk melihat data</p>
      )} */}
    </div>
  );
};

export default SpreadsheetCSV;
