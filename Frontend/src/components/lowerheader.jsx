import { GoSearch } from "react-icons/go";
import "../componentCss/figma.css";
import "@fontsource/poppins";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState, Navigate } from "react";
import { filterAPI, getData, searchApi } from "./api/endpoint";
import { useNavigate } from "react-router-dom";
// import Addons from "./addons";
const navigate = useNavigate;
const Header = ({ setGetdata }) => {
  const [title, setTitle] = useState("");
  const [createddate, setCreateddate] = useState("");
  const [searchdata, setSearchdata] = useState([]);
  const navigate = useNavigate();
  const search = async (text) => {
    try {
      const res = await searchApi(text);
      setSearchdata(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchfilter = async () => {
    try {
      const res = await filterAPI(title, createddate);
      if (res.data) {
        setGetdata(res.data);
      }
    } catch (err) {}
  };
  const [allpost, setAllpost] = useState([]);

  const fetchdata = async () => {
    try {
      const res = await getData();
      if (res.data) {
        setAllpost(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    fetchfilter();
  }, [title, createddate]);
  console.log(title, createddate);
  return (
    <>
    
      <header className="head">
        <div className="bottom-header">
          <div className="container bottom-inside-header">
            <div className="Filters" style={{ fontSize: "25px" }}>
              Filters
            </div>
            <div className="create">
              By Title <br />
              <select
                className="select"
                name="All"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value == "All" ? "" : e.target.value)
                }
              >
                <option value="All">All</option>

                {allpost.map((item) => {
                  return <option value={item.title}>{item.title}</option>;
                })}
              </select>
            </div>
            <div className="Publish">
              Published Date <br />
              <input
                type="date"
                className="Select2"
                value={createddate}
                onChange={(e) => setCreateddate(e.target.value)}
              ></input>
            </div>
            <div className="merge-search">
              <div className="search-bar1">
                <Popup
                  trigger={
                    <div className="search-bar">
                      <input
                        placeholder="Search..."
                        type="text"
                        className="search-input"
                        onChange={(e) => {
                          const updatetext = e.target.value;
                          search(updatetext);
                        }}
                      />
                      <button
                        type="submit"
                        onClick={(e) => setGetdata(searchdata)}
                        className="search-button"
                      >
                        Go
                      </button>
                    </div>
                  }
                >
                  <div>
                    {searchdata.map((item) => {
                      return (
                        <div onClick={() => navigate(`/detail/${item._id}`)}>
                          {item.title}
                        </div>
                      );
                    })}
                  </div>
                </Popup>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <Addons/> */}
    </>
  );
};
export default Header;
