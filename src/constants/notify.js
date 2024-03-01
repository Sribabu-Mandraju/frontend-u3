const notifications = [
    {
      title: "Important Announcement: Class Cancellation",
      desc1:
        "Due to unforeseen circumstances, classes for tomorrow (September 28, 2023) are canceled. Please check your email for further updates and assignments.",
      desc2: "We apologize for any inconvenience.",
      by: "Academic Affairs",
      time: "September 27, 2023, 6:45 pm",
    },
    {
      title: "Research Symposium Registration Open",
      desc1:
        "Registration for the Annual Research Symposium is now open. Researchers and students are invited to submit their abstracts by October 10, 2023.",
      desc2: "Visit our website for more details: http://www.exampleuniversity.edu/research-symposium",
      by: "Research Office",
      time: "September 29, 2023, 11:00 am",
    },
    {
      title: "Student Council Elections - Nomination Period",
      desc1:
        "The nomination period for the Student Council Elections is now open. If you are interested in representing your fellow students, submit your nominations by October 5, 2023.",
      desc2: "Visit the Student Affairs office for more information.",
      by: "Student Affairs",
      time: "September 30, 2023, 2:30 pm",
    },
    {
      title: "Guest Lecture on Sustainable Energy",
      desc1:
        "A guest lecture on 'Advancements in Sustainable Energy' will be held on October 15, 2023, at 2:00 pm in the auditorium. All students are encouraged to attend.",
      desc2: "Refreshments will be provided after the lecture.",
      by: "Faculty Development",
      time: "October 1, 2023, 9:15 am",
    },
    {
      title: "IT Services Downtime - Maintenance",
      desc1:
        "The university's IT services will experience downtime due to scheduled maintenance on October 8, 2023, from 8:00 pm to 12:00 am. Please plan your work accordingly.",
      desc2: "We appreciate your understanding.",
      by: "IT Department",
      time: "October 2, 2023, 4:20 pm",
    },
    {
      title: "Reminder: Fee Payment Deadline",
      desc1:
        "This is a reminder that the deadline for fee payment for the current semester is October 12, 2023. Late payments will incur a penalty.",
      desc2: "Visit the Finance Office for assistance.",
      by: "Finance Office",
      time: "October 3, 2023, 1:10 pm",
    },
    {
      title: "Call for Volunteers: Community Service Day",
      desc1:
        "We are looking for volunteers to participate in the Community Service Day on October 20, 2023. Help make a positive impact in the local community.",
      desc2: "Sign up at the Student Affairs office.",
      by: "Community Outreach",
      time: "October 4, 2023, 10:45 am",
    },
    {
      title: "Reminder: Thesis Proposal Submission",
      desc1:
        "A friendly reminder to all graduate students: the deadline for submitting your thesis proposals is October 18, 2023. Ensure all necessary documents are prepared.",
      desc2: "Contact your advisor for guidance.",
      by: "Graduate Studies",
      time: "October 5, 2023, 3:25 pm",
    },
    {
      title: "Campus Safety Awareness Workshop",
      desc1:
        "In collaboration with local law enforcement, a Campus Safety Awareness Workshop will be conducted on October 25, 2023. Attendance is mandatory for all students.",
      desc2: "Learn valuable safety tips and emergency procedures.",
      by: "Security Office",
      time: "October 6, 2023, 12:15 pm",
    },
    {
      title: "Study Abroad Information Session",
      desc1:
        "Interested in studying abroad? Attend the Study Abroad Information Session on October 30, 2023, at 4:00 pm in the international programs office.",
      desc2: "Explore opportunities and get your questions answered.",
      by: "International Programs",
      time: "October 7, 2023, 9:50 am",
    },
    {
      title: "Library Workshop on Research Skills",
      desc1:
        "The library will host a workshop on Research Skills on November 5, 2023. Enhance your research capabilities and learn about available resources.",
      desc2: "Registration is required. Check library notices for details.",
      by: "Library Services",
      time: "October 8, 2023, 2:55 pm",
    },
    {
      title: "Career Development Seminar",
      desc1:
        "Join us for a Career Development Seminar on November 10, 2023, at 1:30 pm. Industry professionals will provide insights and advice for career planning.",
      desc2: "Open to all students from various disciplines.",
      by: "Career Services",
      time: "October 9, 2023, 11:20 am",
    },
    {
      title: "Intramural Sports Tournament Sign-ups",
      desc1:
        "Sign-ups for the Intramural Sports Tournament are now open. Gather your team and register by November 15, 2023, to participate in this exciting event.",
      desc2: "Check the sports office for more details.",
      by: "Sports Department",
      time: "October 10, 2023, 3:30 pm",
    },
    {
      title: "Call for Art Submissions: Student Art Exhibition",
      desc1:
        "We invite all talented student artists to submit their artworks for the upcoming Student Art Exhibition. Submissions are accepted until November 20, 2023.",
      desc2: "Showcase your creativity and contribute to the vibrant art community.",
      by: "Fine Arts Department",
      time: "October 11, 2023, 9:15 am",
    },
    {
      title: "Health and Wellness Fair",
      desc1:
        "Save the date for the Health and Wellness Fair on November 25, 2023. Explore various health resources, attend informative sessions, and prioritize your well-being.",
      desc2: "Details will be posted in common areas soon.",
      by: "Health Services",
      time: "October 12, 2023, 5:05 pm",
    },
    {
      title: "Holiday Closure Notice",
      desc1:
        "The university will be closed for the holidays from December 22, 2023, to January 2, 2024. Enjoy your break and celebrate responsibly.",
      desc2: "Regular operations will resume on January 3, 2024.",
      by: "University Administration",
      time: "October 13, 2023, 10:10 am",
    },
    {
      title: "Winter Clothing Drive",
      desc1:
        "The Student Council is organizing a Winter Clothing Drive. Donate gently used winter clothing items at designated collection points on campus by December 5, 2023.",
      desc2: "Help those in need stay warm this winter season.",
      by: "Student Council",
      time: "October 14, 2023, 1:40 pm",
    },
    {
      title: "Year-End Celebration",
      desc1:
        "Join us for the Year-End Celebration on December 15, 2023, at 7:00 pm in the university courtyard. Let's come together to celebrate our achievements and successes.",
      desc2: "Refreshments and entertainment will be provided.",
      by: "Event Planning Committee",
      time: "October 15, 2023, 4:30 pm",
    },
    {
      title: "Final Exams Schedule Released",
      desc1:
        "The schedule for final exams has been released. Please check the university website for details and ensure you are prepared for your exams.",
      desc2: "Wishing you success in your exams!",
      by: "Academic Affairs",
      time: "October 16, 2023, 11:55 am",
    },
    {
      title: "Graduation Ceremony Information",
      desc1:
        "Attention graduating students! Information regarding the upcoming graduation ceremony has been emailed to your university accounts. Check your email for details.",
      desc2: "Congratulations on reaching this milestone!",
      by: "Registrar's Office",
      time: "October 17, 2023, 9:20 am",
    },
    {
      title: "Feedback Survey - Student Services",
      desc1:
        "We value your feedback! Please take a few minutes to complete the Student Services Feedback Survey. Your input will help us enhance our services.",
      desc2: "Survey link: http://www.exampleuniversity.edu/feedback-survey",
      by: "Student Services",
      time: "October 18, 2023, 2:00 pm",
    },
    {
      title: "Spring Semester Registration Opens Soon",
      desc1:
        "Get ready for the upcoming semester! Spring semester registration will open on January 2, 2024. Plan your courses and ensure a smooth registration process.",
      desc2: "Check the university portal for registration details.",
      by: "Registrar's Office",
      time: "October 19, 2023, 10:35 am",
    },
    // Add more dummy data objects as needed...
  ];
  
  export default notifications;
  