import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconMoodHappy,
  IconTypography,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard", // ✅ Dashboard is at root
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "Form",
    icon: IconTypography,
    href: "ui/form", // ✅ Relative path
  },
  {
    id: uniqueId(),
    title: "Shadow",
    icon: IconCopy,
    href: "ui/shadow", // ✅ Relative path
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "icons", // ✅ Relative path
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "sample-page", // ✅ Relative path
  },
];

export default Menuitems;
