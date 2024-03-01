import { AiFillDashboard } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";
import { BsSendFill } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";

const Tabs = [
  { tab: "Dashboard", tabName: "dashboard", icon: <AiFillDashboard /> },
  {
    tab: "Send Notification",
    tabName: "notice",
    icon: <MdNotificationsActive />,
  },
  { tab: "Documents", tabName: "documents", icon: <BsSendFill /> },
  { tab: "Login", tabName: "login", icon: <IoIosAddCircle /> },
];
export default Tabs;
