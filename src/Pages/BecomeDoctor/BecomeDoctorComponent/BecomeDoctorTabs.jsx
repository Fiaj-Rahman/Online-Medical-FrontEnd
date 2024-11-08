import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const BecomeDoctorTabs = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', backgroundColor: '#f7fafc', padding: '40px 0' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="Become a Doctor Tabs"
            variant="fullWidth"
            sx={{ backgroundColor: '#4A90E2', color: 'white', borderRadius: '8px' }}
          >
            <Tab label="How to Start" value="1" sx={{ fontWeight: 'bold' }} />
            <Tab label="Telemedicine Benefits" value="2" sx={{ fontWeight: 'bold' }} />
            <Tab label="Skills & Qualifications" value="3" sx={{ fontWeight: 'bold' }} />
          </TabList>
        </Box>

        {/* Tab 1: How to Start */}
        <TabPanel value="1">
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 4,
            padding: { xs: '20px', sm: '40px' },
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            marginTop: '20px',
          }}>
            <Box sx={{ flex: 1 }}>
              <h2 className="text-3xl font-semibold mb-4 text-blue-800">How to Start Your Journey as an Online Doctor</h2>
              <p className="text-lg mb-4 text-gray-700">
                Starting your career as an online doctor is now easier and more accessible than ever. With the rise of telemedicine, doctors can now provide consultations, treatments, and follow-ups virtually. Follow these steps to get started:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong>Obtain your medical license:</strong> Ensure that you are fully licensed to practice medicine in your jurisdiction.</li>
                <li><strong>Complete telemedicine certification:</strong> Some platforms may require additional certifications for practicing telemedicine.</li>
                <li><strong>Choose the right telemedicine platform:</strong> Choose a platform that fits your specialty, is user-friendly, and compliant with medical privacy regulations.</li>
                <li><strong>Start consulting patients online:</strong> Once set up, begin offering virtual consultations with the right tools like a webcam and secure communication software.</li>
              </ul>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/online-doctor-appointment-illustration-download-in-svg-png-gif-file-formats--healthcare-app-reminder-web-and-mobile-application-pack-design-development-illustrations-3838793.png?f=webp"
                alt="How to Start"
                style={{
                  width: '280px',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                }}
              />
            </Box>
          </Box>
        </TabPanel>

        {/* Tab 2: Telemedicine Benefits */}
        <TabPanel value="2">
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 4,
            padding: { xs: '20px', sm: '40px' },
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            marginTop: '20px',
          }}>
            <Box sx={{ flex: 1 }}>
              <h2 className="text-3xl font-semibold mb-4 text-blue-800">Why Choose Telemedicine? The Benefits for Doctors and Patients</h2>
              <p className="text-lg mb-4 text-gray-700">
                Telemedicine offers incredible benefits for both medical professionals and patients. It provides flexibility, convenience, and access to care for people who may have difficulty seeing a doctor in person. Here’s why telemedicine is a great option:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong>Convenience of Virtual Consultations:</strong> No more long commutes to the clinic or waiting rooms.</li>
                <li><strong>Global Patient Reach:</strong> Break geographical barriers and offer services internationally.</li>
                <li><strong>Improved Work-Life Balance:</strong> Enjoy a flexible schedule that fits your lifestyle.</li>
                <li><strong>Cost-Effective for Healthcare Providers:</strong> Reduce overhead costs like office space and staff.</li>
                <li><strong>Reduction in No-Show Rates:</strong> Telemedicine makes it easier for patients to attend appointments.</li>
              </ul>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/female-fertilization-checkup-appointment-illustration-download-in-svg-png-gif-file-formats--doctor-medical-and-healthcare-pack-people-illustrations-4159256.png?f=webp"
                alt="Telemedicine Benefits"
                style={{
                  width: '280px',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                }}
              />
            </Box>
          </Box>
        </TabPanel>

        {/* Tab 3: Skills & Qualifications */}
        <TabPanel value="3">
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 4,
            padding: { xs: '20px', sm: '40px' },
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            marginTop: '20px',
          }}>
            <Box sx={{ flex: 1 }}>
              <h2 className="text-3xl font-semibold mb-4 text-blue-800">Skills & Qualifications for Online Medical Doctors</h2>
              <p className="text-lg mb-4 text-gray-700">
                To become a successful online medical doctor, certain qualifications and skills are required. Telemedicine involves both traditional medical expertise and a deep understanding of how to deliver healthcare virtually. Here are the key skills and qualifications you will need:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong>MD or DO Degree:</strong> You must hold a medical degree (MD) or Doctor of Osteopathic Medicine (DO) from an accredited institution.</li>
                <li><strong>Specialization (Optional):</strong> Specializations like psychiatry, dermatology, or pediatrics can help.</li>
                <li><strong>Telemedicine Certification:</strong> Some platforms may offer additional certifications.</li>
                <li><strong>Excellent Communication Skills:</strong> Ability to communicate clearly and effectively in virtual consultations.</li>
                <li><strong>Technological Proficiency:</strong> Comfort with telemedicine platforms and EHR systems.</li>
                <li><strong>Strong Clinical Judgment:</strong> Making accurate diagnoses and providing effective treatments virtually.</li>
              </ul>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/employee-hiring-illustration-download-in-svg-png-gif-file-formats--hire-candidate-recruitment-agency-pack-business-illustrations-10330812.png?f=webp"
                alt="Skills & Qualifications"
                style={{
                  width: '280px',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                }}
              />
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default BecomeDoctorTabs;
