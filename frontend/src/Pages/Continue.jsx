import React, { useState } from "react";
import axios from "axios";

const MentorMenteeForm = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    correspondenceAddress: "",
    permanentAddress: "",
    studentMobile: "",
    parentMobile: "",
    studentEmail: "",  // Only one student email field now
    occupation: "",
    localGuardian: "",
    parentName: "",
    parentAddress: "",
    academicQualifications: [
      {
        class: "10th",
        board: "",
        percentage: "",
        pcm: "",
        division: ""
      },
      {
        class: "12th",
        board: "",
        percentage: "",
        pcm: "",
        division: ""
      },
      {
        class: "Other",
        board: "",
        percentage: "",
        pcm: "",
        division: ""
      }
    ],
    extracurricularActivities: ["", "", ""],
    category: "GEN",
    achievement: "",
    class: "",  // New field for class
    branch: ""  // New field for branch
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAcademicChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAcademicQualifications = [...formData.academicQualifications];
    updatedAcademicQualifications[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      academicQualifications: updatedAcademicQualifications
    }));
  };

  const handleExtracurricularChange = (e, index) => {
    const updatedActivities = [...formData.extracurricularActivities];
    updatedActivities[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      extracurricularActivities: updatedActivities
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/mentor-mentee", formData);
      alert("Form submitted successfully!");
    } catch (error) {
      alert("Error submitting form.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <header className="text-center bg-blue-600 text-white py-5">
        <h1 className="text-3xl font-bold">
          Babu Banarasi Das Institute of Technology and Management
        </h1>
        <h3 className="text-lg mt-2">
          (Formerly known as Babu Banarasi Das National Institute of Technology
          and Management)
        </h3>
      </header>
      <section className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6 mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Mentor-Mentee Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="form-group">
            <label htmlFor="roll-no" className="block font-medium">
              University Roll No.
            </label>
            <input
              type="text"
              id="roll-no"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="block font-medium">
              Student Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Class and Branch */}
          <div className="form-group">
            <label htmlFor="class" className="block font-medium">
              Class
            </label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label htmlFor="branch" className="block font-medium">
              Branch
            </label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Correspondence and Permanent Address */}
          <div className="form-group">
            <label htmlFor="correspondence-address" className="block font-medium">
              Correspondence Address
            </label>
            <textarea
              id="correspondence-address"
              name="correspondenceAddress"
              value={formData.correspondenceAddress}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label htmlFor="permanent-address" className="block font-medium">
              Permanent Address
            </label>
            <textarea
              id="permanent-address"
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Parent Details */}
          <div className="form-group">
            <label htmlFor="parent-name" className="block font-medium">
              Parent Name
            </label>
            <input
              type="text"
              id="parent-name"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="form-group">
            <label htmlFor="parent-mobile" className="block font-medium">
              Parent Mobile Number
            </label>
            <input
              type="text"
              id="parent-mobile"
              name="parentMobile"
              value={formData.parentMobile}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Student Email (Only One Email Field Now) */}
          <div className="form-group">
            <label htmlFor="student-email" className="block font-medium">
              Student Email
            </label>
            <input
              type="email"
              id="student-email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Local Guardian */}
          <div className="form-group">
            <label htmlFor="local-guardian" className="block font-medium">
              Local Guardian Name
            </label>
            <input
              type="text"
              id="local-guardian"
              name="localGuardian"
              value={formData.localGuardian}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Academic Qualifications */}
          <fieldset className="border border-gray-300 p-4 rounded-md">
            <legend className="text-lg font-bold">Academic Qualifications</legend>
            <table className="table-auto w-full text-left border-collapse mt-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Class</th>
                  <th className="border border-gray-300 p-2">Board/University</th>
                  <th className="border border-gray-300 p-2">Percentage (Aggr.)</th>
                  <th className="border border-gray-300 p-2">Percentage (PCM/PCB/Science)</th>
                  <th className="border border-gray-300 p-2">Division</th>
                </tr>
              </thead>
              <tbody>
                {formData.academicQualifications.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{item.class}</td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name="board"
                        value={item.board}
                        onChange={(e) => handleAcademicChange(e, index)}
                        className="w-full p-2"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        name="percentage"
                        value={item.percentage}
                        onChange={(e) => handleAcademicChange(e, index)}
                        className="w-full p-2"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        name="pcm"
                        value={item.pcm}
                        onChange={(e) => handleAcademicChange(e, index)}
                        className="w-full p-2"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name="division"
                        value={item.division}
                        onChange={(e) => handleAcademicChange(e, index)}
                        className="w-full p-2"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>

          {/* Extra-curricular Activities */}
          <div className="form-group">
            <label className="block font-medium">
              Participation in Extra Curricular Activities (during course):
            </label>
            <ol className="list-decimal list-inside space-y-2">
              {formData.extracurricularActivities.map((activity, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={activity}
                    onChange={(e) => handleExtracurricularChange(e, index)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </li>
              ))}
            </ol>
          </div>

          {/* Achievement */}
          <div className="form-group">
            <label htmlFor="achievement" className="block font-medium">
              Achievement
            </label>
            <textarea
              id="achievement"
              name="achievement"
              value={formData.achievement}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default MentorMenteeForm;









