import axios from "axios";
import React, { useState, useEffect } from "react";

const Content = () => {
  const [facultyCall, setFacultyCall] = useState([]);
  const [deptCall, setDeptCall] = useState([]);
  const [courseCall, setCourseCall] = useState([]);
  const [countryCall, setCountryCall] = useState([]);
  const [years, setYears] = useState([]);
  const [checkboxValue1, setCheckboxValue1] = useState(false);
  const [checkboxValue2, setCheckboxValue2] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    tokenfetcher();
    fetchData();
    yearDropDown();
  }, []);

  const API_URL =
    "http://testtrans-env.eba-t2cppmty.us-east-1.elasticbeanstalk.com/api/v1/token";
  const facultyAPI_URL =
    "http://testtrans-env.eba-t2cppmty.us-east-1.elasticbeanstalk.com/api/v1/cus/getFaculty";
  const deptAPI_URL =
    "http://testtrans-env.eba-t2cppmty.us-east-1.elasticbeanstalk.com/api/v1/cus/getDepartment/1";
  const courseAPI_URL =
    "http://testtrans-env.eba-t2cppmty.us-east-1.elasticbeanstalk.com/api/v1/cus/getCourse/1";
  const countriesAPI_URL =
    "http://testtrans-env.eba-t2cppmty.us-east-1.elasticbeanstalk.com/api/v1/cus/getCountries";

  const tokenfetcher = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      email: "9709ce778b113727f49ca40a0c35083d75ef01c66c48bf60babdd33ccc75f786",
      password:
        "c5ed44c0f1ca21317ab79c66ad5f21fe916cf6d2a94799b4fd4b2b58f9f12421",
    };

    axios
      .post(API_URL, data, { headers })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const fetchData = () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    const getFaculty = axios.get(facultyAPI_URL, { headers: headers });
    const getDept = axios.get(deptAPI_URL, { headers: headers });
    const getCourse = axios.get(courseAPI_URL, { headers: headers });
    const getCountries = axios.get(countriesAPI_URL, { headers: headers });

    axios.all([getFaculty, getDept, getCourse, getCountries]).then(
      axios.spread((...allData) => {
        const allDataFaculty = allData[0].data;
        const allDataDept = allData[1].data;
        const allDataCourse = allData[2].data;
        const allDataCountry = allData[3].data;

        setFacultyCall(allDataFaculty);
        setDeptCall(allDataDept);
        setCourseCall(allDataCourse);
        setCountryCall(allDataCountry);
      })
    );
  };

  countryCall.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  const yearDropDown = () => {
    const currentYear = new Date().getFullYear();
    const yearArray = [];
    for (let i = 2005; i <= currentYear; i++) {
      yearArray.push(i);
    }
    setYears(yearArray);
  };

  const handleCheckbox1Change = () => {
    setCheckboxValue1(!checkboxValue1);
    if (checkboxValue2) {
      setCheckboxValue2(false);
    }
  };

  const handleCheckbox2Change = () => {
    setCheckboxValue2(!checkboxValue2);
    if (checkboxValue1) {
      setCheckboxValue1(false);
    }
  };

  return (
    <main>
      <div className="main-content">
        <div className="title">
          <h4>
            {" "}
            <span className="dash">-------</span> Personal Details
          </h4>
        </div>
        {/* ------------PERSONAL FORM---------------------- */}
        <form className="personal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-field">
            <label>Surname</label>
            <input type="text" placeholder="Enter Surname" required />
          </div>
          <div className="input-field">
            <label>First Name</label>
            <input type="text" placeholder="Enter First Name" required />
          </div>
          <div className="input-field a">
            <label>Middle Name</label>
            <input type="text" placeholder="Enter Middle Name" required />
          </div>
          <div className="input-field b">
            <label>Email</label>
            <input type="email" placeholder="Enter Email" required />
          </div>
          <div className="input-field b">
            <label>Phone</label>
            <input type="tel" placeholder="Enter Phone Number" required />
          </div>
        </form>
        {/* -----X-------PERSONAL FORM---------X------------- */}

        {/* ------------IDENTITY FORM---------------------- */}
        <div className="title">
          <h4>
            {" "}
            <span className="dash">-------</span> Identity Details
          </h4>
        </div>
        <div className="selection">
          <div className="select-field">
            <label>Transcript Type</label>
            <select name="" id="" required>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
          <div className="select-field">
            <label>Faculty</label>
            <select name="" id="" required>
              {facultyCall.map((facultyItem) => (
                <option value="Undergraduate">
                  {facultyItem.facultyName}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="select-field">
            <label>Department</label>
            <select name="" id="" required>
              {deptCall.map((deptItem) => (
                <option value="Undergraduate">
                  {deptItem.departmentName}{" "}
                </option>
              ))}
            </select>
          </div>
          <div className="select-field">
            <label>Course Area</label>
            <select name="" id="" required>
              {courseCall.map((courseItem) => (
                <option value="Undergraduate">{courseItem.courseName} </option>
              ))}
            </select>
          </div>
          <div className="select-field">
            <label>Matriculation No.</label>
            <input type="text" placeholder="Mat No." required />
          </div>
          <div className="select-field">
            <label>Year Of Graduation</label>
            <select name="" id="" required>
              {years.map((yearItem) => (
                <option key={yearItem} value={yearItem}>
                  {yearItem}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* -----X-------IDENTITY FORM----------X------------ */}
        <div className="title">
          <h4>
            {" "}
            <span className="dash">-------</span> Other Details
          </h4>
        </div>
        <div className="checkbox">
          <div className="checkbox-field">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="checkbox"
                checked={checkboxValue1}
                id="international"
                name="international"
                value="international"
                onChange={handleCheckbox1Change}
                required
              />
              <label for="vehicle1"> International</label>
              <input
                type="checkbox"
                checked={checkboxValue2}
                id="local"
                name="local"
                value="local"
                onChange={handleCheckbox2Change}
                required
              />
              <label for="vehicle1"> Local</label>
            </form>
          </div>
        </div>
        <form className="receiver-form" onSubmit={(e) => e.preventDefault()}>
          <div className="receiver-field">
            <label>Reciever's Name</label>
            <input type="text" placeholder="Enter Full Name" required />
          </div>
          <div className="receiver-field">
            <label>Reciever's Address</label>
            <input type="text" placeholder="Enter Address" required />
          </div>
          <div className="receiver-field postal">
            <label>Reciever's Postal Code</label>
            <input type="text" placeholder="Enter Postal Code" required />
          </div>
          <div className="selection">
            <div className="select-field">
              <label>Reciever's Country</label>
              <select
                name="country"
                id="country"
                disabled={!checkboxValue1}
                required
              >
                {countryCall.map((countryItem) => (
                  <option
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    {countryItem.name}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <textarea
            name="comment"
            id="user-comment"
            placeholder="Additional Information (Optional)"
          ></textarea>
        </form>
        <form
          method="post"
          enctype="multipart/form-data"
          className="attach"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="file">
            <label for="profile_pic">Attach File</label>
            <input type="file" id="attachmentfile" name="attachmentfile" />
          </div>
          <div className="btn">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Content;
