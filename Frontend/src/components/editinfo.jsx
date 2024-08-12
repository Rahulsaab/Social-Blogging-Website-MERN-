import React, { useEffect, useState } from "react";
import { changeprofile, getprofile, updateloginfo } from "./api/endpoint";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserInformation = () => {
  const [showFirstCode, setShowFirstCode] = useState(true);
  const [updateprofile, setUpdateprofile] = useState({
    userName: "",
    email: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [profile, setProfiledata] = useState({});
  const toggleCode = () => {
    setShowFirstCode(!showFirstCode);
  };
  const ProfileID = localStorage.getItem("userId");

  const fetchprofile = async () => {
    try {
      const res = await updateloginfo(ProfileID);
      setProfiledata(res.data.user);
      setUpdateprofile({
        userName: res.data.user.userName,
        email: res.data.user.email,
        country: res.data.user.country,
        state: res.data.user.state,
        pincode: res.data.user.pincode,
      });
    } catch (err) {
      console.log("Error fetching profile data", err);
    }
  };

  useEffect(() => {
    fetchprofile();
  }, []);

  const handlesave = async () => {
    try {
      await getprofile(updateprofile, ProfileID);
      await handlechangepfp();
      setShowFirstCode(!showFirstCode);
      fetchprofile();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
      console.log("Error updating profile", err);
    }
  };

  const handlechangepfp = async () => {
    try {
      const formdata = new FormData();
      formdata.append("profilePhoto", profile);
      await changeprofile(formdata, ProfileID);
      fetchprofile();
    } catch (err) {
      toast.error("Failed to change profile photo");
      console.log("Error changing profile photo", err);
    }
  };

  return (
    <div>
      <ToastContainer />
      {showFirstCode ? (
        <div className="cont">
          <div className="sec2">
            <div className="sec-left">
              <div className="user-pfp-sec">Profile Photo</div>
              <div className="user-div">
                <img
                  className="user-foto"
                  src={`https://social-blog-api-r3az.onrender.com/${profile.profilePhoto}`}
                  alt="Profile"
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
                      className="form-control"
                      type="text"
                      placeholder={profile.userName}
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      placeholder={profile.email}
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      placeholder={profile.state}
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      placeholder={profile.pincode}
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      placeholder={profile.country}
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
            <div className="top-sec">Edit User Information</div>
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
                      className="form-control"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files.length) {
                          const selectpfp = e.target.files[0];
                          setProfiledata(selectpfp);
                        } else {
                          setProfiledata({});
                        }
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      value={updateprofile.userName}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          userName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      value={updateprofile.email}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      value={updateprofile.state}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          state: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      value={updateprofile.pincode}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          pincode: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      value={updateprofile.country}
                      onChange={(e) => {
                        setUpdateprofile({
                          ...updateprofile,
                          country: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="two-btn">
              <div className="edit-info-btn2">
                <button className="info-btn2" onClick={toggleCode}>
                  Cancel
                </button>
              </div>
              <div className="edit-info-btn2">
                <button className="info-btn2" onClick={handlesave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInformation;
