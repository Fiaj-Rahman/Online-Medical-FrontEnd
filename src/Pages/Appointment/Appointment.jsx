import React, { useState, useEffect, useContext } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { AuthContext } from "../../Component/Authentication/AuthProvider/AuthProvider";

// Component to render Appointment Table
const Appointment = () => {
  const { user } = useContext(AuthContext); // Get the user context (email)
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointment data from the API
  useEffect(() => {
    if (user?.email) {
      fetch("https://medconnect-eta.vercel.app/order")
        .then((response) => response.json())
        .then((data) => {
          // Filter appointments where patient email matches the logged-in user's email
          const userAppointments = data.filter((item) => item?.paitent_email === user?.email);
          setAppointments(userAppointments);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch appointments");
          setLoading(false);
        });
    }
  }, [user?.email]);

  // Format Date and Time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(); // Example: 11/28/2024
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Example: 10:30 AM
    return { formattedDate, formattedTime };
  };

  // Table headers
  const TABLE_HEAD = [
    "Index", 
    "Doctor Name", 
    "Specialization", 
    "Visit Fee", 
    "Appointment Date", 
    "Appointment Time", 
    "Appointment Status",
    "Google Meet Link"  // Added Google Meet Link column
  ];

  return (
    <div className="max-w-screen-lg mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Appointments List</h2>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <Card className="overflow-hidden shadow-xl bg-white">
        {/* Make the table scrollable horizontally on small screens */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left bg-gray-50 rounded-lg">
            <thead>
              <tr className="text-gray-700 bg-blue-100">
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map(({ 
                  doctor_name, 
                  doctor_specialization, 
                  doctor_visit, 
                  appointment_status, 
                  createdDate, 
                  google_meet_link  // Added google_meet_link
                }, index) => {
                  const { formattedDate, formattedTime } = formatDateTime(createdDate);
                  const isLast = index === appointments.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={doctor_name} className={`even:bg-blue-gray-50/50 hover:bg-gray-100`}>
                      {/* Display the index number in the first column */}
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {index + 1} {/* Index starts from 1 */}
                        </Typography>
                      </td>
                      {/* Doctor Name */}
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {doctor_name}
                        </Typography>
                      </td>
                      {/* Specialization */}
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {doctor_specialization}
                        </Typography>
                      </td>
                      {/* Visit Fee */}
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {doctor_visit}
                        </Typography>
                      </td>
                      {/* Appointment Date */}
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {formattedDate || 'No Date'}
                        </Typography>
                      </td>
                      {/* Appointment Time */}
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {formattedTime || 'No Time'}
                        </Typography>
                      </td>
                      {/* Appointment Status */}
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color={appointment_status === "true" ? "green" : "red"}
                          className="font-normal"
                        >
                          {appointment_status === "true" ? "Confirmed" : "Pending"}
                        </Typography>
                      </td>
                      {/* Google Meet Link */}
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {google_meet_link ? (
                            <a href={google_meet_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                              Join Meeting
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </Typography>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Appointment;
