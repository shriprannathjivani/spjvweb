export type NavItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "सतगुरु व परमहंस",
    href: "/satguru",
    children: [
      { label: "परमहंस", href: "/satguru/paramhans" },
      { label: "ब्रह्मवाणी", href: "/satguru/brahmvani" },
    ],
  },
  {
    label: "कार्यक्रम",
    href: "/karyakram",
  },
  {
    label: "बाल केंद्र",
    href: "/bal-kendra",
  },
  {
    label: "मंदिर व सेवा",
    href: "/mandir-seva",
    children: [
      { label: "सेवा", href: "/mandir-seva/seva" },
      { label: "मंदिर", href: "/mandir-seva/mandir" },
    ],
  },
];
