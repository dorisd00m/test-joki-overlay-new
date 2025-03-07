import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SpreadsheetCSV = () => {
  const [spreadsheetUrl, setSpreadsheetUrl] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [textLabel,setTextLabel] = useState("JOKI AKUN")
  const [activeData,setActiveData] = useState()
  const [activeVIP,setActiveVIP] = useState(false)

  const [totalPiloting,setTotalPiloting] = useState()
  const [totalFinished,setTotalFinished] = useState()
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
    
    if(findData[0]?.length > 0) {
      findData[0]?.map((item, id) => {
        if (id == 1) {

          setActiveData(item)
        }
        if (id == 0 ) {
          if (item === "" || item === "VIP"){
            setActiveVIP(true)

          } else {
            setActiveVIP(false)

          }
        }
      })
      // console.log(findData)
    } else {
      setActiveVIP(false)
      setActiveData(null)
    }       
  }

  const countTotalPiloting = () => {
    const dat = data?.filter((item,id)=>(id !== 0))
    if(dat?.length > 0 ) {
      // console.log(dat?.length)
      setTotalPiloting(dat?.length)
    } else {
      setTotalPiloting(false)      
    }
  }

  const countTotalFinished = () => {
    const dat = data?.filter((item,id)=>(id !== 0 && item[item?.length - 2] == "TRUE"))
    if(dat?.length > 0 ) {
      console.log({finished: dat?.length})
      setTotalFinished(dat?.length)
    } else {
      setTotalFinished(null)

    }
  }

  useEffect(() => {
    const savedUrl = localStorage.getItem("spreadsheetUrl");
    const savedTextLabel = localStorage.getItem("textLabel");
    if (savedUrl) {
      setSpreadsheetUrl(savedUrl);
      setSpreadsheetId(extractSpreadsheetId(savedUrl));
    }
    if (savedTextLabel) {
      setTextLabel(savedTextLabel);      
    }
  }, []);

  useEffect(() => {
      fetchCSVData()
    const interval = setInterval(fetchCSVData, 3000); // Update setiap 5 detik
    return () => clearInterval(interval); // Hapus interval saat komponen unmount 
  }, [spreadsheetId]);

  useEffect(()=>{
    // console.log(data)
    dataCheckActiveName()
    countTotalPiloting()
    countTotalFinished()
  },[data])

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setSpreadsheetUrl(url);
    localStorage.setItem("spreadsheetUrl", url); // Simpan ke localStorage
    setSpreadsheetId(extractSpreadsheetId(url));
  };
  const handleLabelChange = (e)=> {
    const textL = e.target.innerText;

    localStorage.setItem("textLabel", textL); // Simpan ke localStorage
    setTextLabel(textL);
    console.log({ text: localStorage.getItem("textLabel") })
  }
  return (
    <div className="p-4">
      <input
        type="text"
        value={spreadsheetUrl}
        onChange={handleUrlChange}
        placeholder="Masukkan URL Google Spreadsheet"
        className="p-2 border border-gray-300 rounded-md w-full mb-10"
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
        {loading ? (
          <div className="flex gap-2">
           
            <div className="px-5 py-2 relative h-[30px]">
              <div className="z-10 absolute top-0 left-0 w-full h-full bg-black skew-x-[-20deg] overflow-hidden"></div>
              <div className="z-20 relative font-bold " >Loading</div>
            </div>
          </div>
        ) :
          <>
            <div className="flex gap-2 text-white mb-10">
              <div className="px-5 py-2 relative h-[40px]">
                <div className="z-10 absolute top-0 left-0 w-full h-full bg-black skew-x-[-20deg] overflow-hidden
                  before:content-['']
                  before:absolute
                  before:left-[-10px]
                  before:top-[-10px]
                  before:w-[120%]
                  before:h-[70px]
                  before:skew-x-[20deg]
                  before:bg-gif
                  before:bg-cover
                  
                ">
                  
                </div>
                <div className="z-20 relative font-bold" contentEditable="true" onBlur={(e) => handleLabelChange(e) } suppressContentEditableWarning={true}>{textLabel}</div>
              </div>
              <div className="px-5 py-2 relative h-[40px]">
                <div className="z-10 absolute top-0 left-0 w-full h-full bg-name-color skew-x-[-20deg]"></div>
                <div className="z-20 relative min-w-[200px] text-center">

                  <AnimatePresence>    
                    {activeData ? 
                      <motion.div key={activeData} className="absolute w-full left-0 right-0 mx-auto"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeData }
                      </motion.div>
                    : 
                      <motion.div key={activeData} className="absolute w-full left-0 right-0 mx-auto"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.5 }}
                      >
                        BELUM ADA AKUN DIJOKI
                        
                      </motion.div>
                    }

                    
                  </AnimatePresence>
                </div>
              </div>            
              {activeVIP && (
                
                  <motion.div key={activeData} className="px-5 py-2 relative h-[40px]"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  
                    transition={{ duration: 0.5}}
                  >
                    <div className="z-10 absolute top-0 left-0 w-full h-full bg-yellow-400 skew-x-[-20deg]"></div>
                    <div className="z-20 relative text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" className="absolute left-0 right-0 mx-auto top-[-30px] size-[30px]">
                        <g fill-rule="evenodd">
                          <g fill="#c8832e">
                            <path d="M22.07 17.472c0 1.614-1.255 2.919-2.801 2.919c-1.55 0-2.801-1.305-2.801-2.919c0-1.612 1.251-2.923 2.801-2.923c1.547 0 2.801 1.31 2.801 2.923" />
                            <path d="M15.353 29.21s6.567-4.072 3.215-12.305c0 0 11.883 17.11 15.238 9.83c3.354-7.281-.979 8.885-1.258 9.32c-.279.439-5.871 4.808-5.871 4.808h-8.806z" />
                            <ellipse cx="44.735" cy="17.472" rx="2.804" ry="2.919" />
                            <path d="M48.647 29.21s-6.571-4.072-3.215-12.305c0 0-11.884 17.11-15.24 9.83c-3.353-7.281.981 8.885 1.263 9.32c.274.439 5.867 4.808 5.867 4.808h8.81z" />
                          </g>
                          <path fill="#f79420" d="M60.07 14.566c-2.146 0-3.884 1.907-3.884 4.263c0 .628.13 1.224.353 1.76c-6.01 3.454-11.595 8.788-11.595 8.788c-5.079 5.863-9.192-3.694-11.435-11.02c2.732-.771 4.757-3.488 4.757-6.73c0-3.843-2.836-6.958-6.338-6.958c-3.501 0-6.338 3.115-6.338 6.958c0 3.293 2.085 6.04 4.886 6.768c-2.248 7.327-6.354 16.843-11.42 10.987c0 0-5.585-5.334-11.601-8.788a4.6 4.6 0 0 0 .355-1.76c0-2.356-1.74-4.263-3.884-4.263S.042 16.478.042 18.834s1.74 4.265 3.884 4.265c.72 0 1.383-.229 1.963-.604c2.244 4.679 5.412 13.09 3.758 20.804c0 0 2.435 9.755 22.351 9.426c19.915.329 22.347-9.426 22.347-9.426c-1.652-7.711 1.515-16.12 3.761-20.804c.58.375 1.243.604 1.963.604c2.145 0 3.885-1.909 3.885-4.265s-1.739-4.264-3.884-4.264" />
                          <path fill="#c8832e" d="M32 54.955c-15.913.263-20.662-5.909-21.927-8.402a21 21 0 0 1-.424 3.347S12.084 59.653 32 59.328c19.915.325 22.347-9.428 22.347-9.428a21 21 0 0 1-.422-3.347c-1.265 2.493-6.01 8.665-21.925 8.402" />
                          <path fill="#f19d43" d="M31.1 52.614c2.858-14.365 4.01-29.03-.271-43.3c-.488-1.624-.616-3.138-.475-4.531c-2.74.769-4.765 3.486-4.765 6.734c0 3.293 2.085 6.05 4.886 6.766c-2.248 7.329-6.354 16.847-11.42 10.989c0 0-5.585-5.334-11.601-8.789a4.6 4.6 0 0 0 .355-1.761c0-2.352-1.74-4.261-3.884-4.261S.041 16.37.041 18.722c0 2.358 1.74 4.267 3.884 4.267c.72 0 1.383-.231 1.963-.604c2.244 4.676 5.412 13.09 3.758 20.801c0 0 2.375 9.447 21.454 9.431" />
                        </g>
                        <g fill="#fff">
                          <path d="m32 40.26l1.692 3.16l3.777.504l-2.737 2.456l.648 3.471L32 48.21l-3.376 1.641l.646-3.471l-2.734-2.456l3.774-.504z" />
                          <path d="M31.938 41.922a8 8 0 0 1 .096-1.598l-.031-.064l-1.691 3.158l-3.776.506l2.73 2.454l-.643 3.473l3.38-1.638l3.375 1.638l-.272-1.474c-1.927-1.679-3.073-4.01-3.168-6.455m13.272.053l1.04 1.933l2.312.312l-1.671 1.503l.389 2.131l-2.07-1l-2.07 1l.396-2.131l-1.674-1.503l2.318-.312z" />
                          <path d="M45.17 42.992a5 5 0 0 1 .061-.979l-.02-.039l-1.035 1.934l-2.315.311l1.674 1.504l-.393 2.131l2.069-1l2.069 1l-.166-.904c-1.181-1.031-1.884-2.463-1.944-3.958m-26.466-1.017l1.033 1.933l2.313.312l-1.673 1.503l.396 2.131l-2.069-1l-2.07 1l.396-2.131l-1.677-1.503l2.313-.312z" />
                          <path d="M18.662 42.992a4.3 4.3 0 0 1 .063-.979l-.021-.039l-1.038 1.934l-2.313.311l1.673 1.504l-.393 2.131l2.07-1l2.069 1l-.168-.904c-1.181-1.031-1.883-2.463-1.942-3.958" />
                        </g>
                      </svg>
                      VIP
                    </div>
                  </motion.div>           
                
              )}
            </div>
            <div className="flex flex-col gap-3 text-white text-xs">
              <div className="flex gap-2">
                <div className="px-5 py-[6px] relative h-[30px]">
                  <div className="z-10 absolute top-0 left-0 w-full h-full bg-blue-900 skew-x-[-20deg] overflow-hidden"></div>
                  <div className="z-20 relative font-bold" >TOTAL JOKIAN</div>
                </div>
                <div className="px-5 py-[6px] relative h-[30px]">
                  <div className="z-10 absolute top-0 left-0 w-full h-full bg-name-color skew-x-[-20deg] overflow-hidden"></div>
                  <div className="z-20 relative font-bold min-w-5 text-center text-lg" >
                    <motion.div key={totalPiloting} className="absolute w-full left-0 right-0 mx-auto top-[-6px]"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {totalPiloting || "--"}
                    </motion.div>
                    
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="px-5 py-[6px] relative h-[30px]">
                  <div className="z-10 absolute top-0 left-0 w-full h-full bg-blue-900 skew-x-[-20deg] overflow-hidden"></div>
                  <div className="z-20 relative font-bold" >SELESAI</div>
                </div>
                <div className="px-5 py-[6px] relative h-[30px]">
                  <div className="z-10 absolute top-0 left-0 w-full h-full bg-name-color skew-x-[-20deg] overflow-hidden"></div>
                  <div className="z-20 relative font-bold min-w-5 text-center text-lg" >
                    <motion.div key={totalFinished} className="absolute w-full left-0 right-0 mx-auto top-[-6px]"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {totalFinished || "--"}
                    </motion.div>
                    
                    </div>
                </div>
              </div>
            </div>
          </>
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
