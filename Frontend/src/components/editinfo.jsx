import React, { useEffect, useState } from "react";
import { changeprofile, getprofile, updateloginfo } from "./api/endpoint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserInformation = () => {
  const [showFirstCode, setShowFirstCode] = useState(true);
  const [updateprofile, setUpdateprofile] = useState({
    userName: "",
    email: "",
    state: "",
    pincode: ""
  });
  const notify = () => toast("Profile Updated Sucessfully");

  const [profile, setProfiledata] = useState({});
  const toggleCode = () => {
    setShowFirstCode(!showFirstCode);
  };
  const ProfileID = localStorage.getItem("userId");
  const fetchprofile = async () => {
    try {
      const res = await updateloginfo(ProfileID);
      setProfiledata(res.data.user);
      console.log(res.data);
      setUpdateprofile({
        userName: res.data.user.userName,
        email: res.data.user.email,
        country: res.data.user.country,
        state: res.data.user.state,
        pincode: res.data.user.pincode,
      });
      console.log(updateprofile);
    } catch (err) {
      console.log(err, "jlsnfel");
    }
  };
  useEffect(() => {
    fetchprofile();
  }, []);

  const handlesave = async () => {
      await getprofile(updateprofile, ProfileID);
      handlechangepfp();
      setShowFirstCode(!showFirstCode);
      fetchprofile();
  };
  const handlechangepfp = async () => {
    try {
      const formdata = new FormData();
      formdata.append("profilePhoto", profile);
       await changeprofile(formdata, ProfileID);
       fetchprofile()
    } catch (err) {
      console.log(err, "sdfb ");
    }
  };
  return (
    <div>
      {showFirstCode ? (
        <div className="cont">
          <div className="sec2">
            <div className="sec-left">
              <div className="user-pfp-sec">Profile Photo</div>
              <div className="user-div">
                <img
                  className="user-foto"
                  src={`https://social-blog-api-r3az.onrender.com/${profile.profilePhoto}`}
                  alt=""
                />
              </div>
              <div className="btn-edit">
                <button className="edit-info-btn" onClick={toggleCode}>
                  Edit User
                </button>
              </div>
            </div>
            <div className="sec-right">
              <div className="heading-user-pf">User Profile</div>
              <div className="two-fields">
                <div className="all-names">
                  <div className="user-detail">Name</div>
                  <div className="user-detail">Email</div>
                  <div className="user-detail">State</div>
                  <div className="user-detail">Pincode</div>
                  <div className="user-detail">Country</div>
                </div>
                <div className="ipf">
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder={profile.userName}
                      aria-label="Example example"
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder={profile.email}
                      aria-label="Example example"
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder={profile.state}
                      aria-label="Example example"
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder={profile.pincode}
                      aria-label="Example example"
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder={profile.country}
                      aria-label="Example example"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="cont">
            <div className="top-sec">Edit User Information </div>
            <div className="sec2">
              <div className="two-fields">
                <div className="all-names">
                  <div className="user-detail">Choose Photo</div>
                  <div className="user-detail">Name</div>
                  <div className="user-detail">Email</div>
                  <div className="user-detail">State</div>
                  <div className="user-detail">Pincode</div>
                  <div className="user-detail">Country</div>
                </div>
                <div className="ipf">
                  <div>
                    <input
                      class="form-control"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files.length) {
                          const selectpfp = e.target.files[0];
                          console.log(selectpfp, "asdfgnb");
                          setProfiledata(selectpfp);
                        } else {
                          setProfiledata({});
                        }
                      }}
                    />
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Name Example"
                      value={updateprofile.userName}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          userName: e.target.value,
                        });
                      }}
                      // aria-label="Example example"
                    />
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Email Example"
                      value={updateprofile.email}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          email: e.target.value,
                        });
                      }}
                      // aria-label="Example example"
                    />
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="State Example"
                      value={updateprofile.state}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          state: e.target.value,
                        });
                      }}
                      // aria-label="Example example"
                    />
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Pincode Example"
                      value={updateprofile.pincode}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          pincode: e.target.value,
                        });
                      }}
                      // aria-label="Example example"
                    />
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Country Example"
                      value={updateprofile.country}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          country: e.target.value,
                        });
                      }}
                      // aria-label="Example example"
                    />
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="two-btn">
              <div className="edit-info-btn2">
                <button className="info-btn2" onClick={toggleCode}>
                  Cancel
                </button>
              </div>
              <div className="edit-info-btn2">
                <button
                  className="info-btn2"
                  onClick={() => {
                    handlesave();
                    notify();
                  }}
                >
                  Save
                </button>
                {/* <button>
                  Change password
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInformation;
