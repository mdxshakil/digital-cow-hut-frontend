export const profileOptions = (userRole: string) => {
  const adminOptions = [
    {
      id: 1,
      path: "/profile",
      label: "Profile",
    },
    {
      id: 2,
      path: "/manage-orders",
      label: "Manage Orders",
    },
    {
      id: 3,
      path: "/manage-coupons",
      label: "Manage Coupons",
    },
    {
      id: 4,
      path: "/manage-cows",
      label: "Manage Cows",
    },
  ];
  const buyerOptions = [
    {
      id: 1,
      path: "/profile",
      label: "Profile",
    },
    {
      id: 2,
      path: "/my-orders",
      label: "My Orders",
    },
    {
      id: 3,
      path: "/my-coupons",
      label: "My Coupons",
    },
  ];
  const sellerOptions = [
    {
      id: 1,
      path: "/profile",
      label: "Profile",
    },
    {
      id: 2,
      path: "/my-sells",
      label: "My Sells",
    },
    {
      id: 3,
      path: "/my-cows",
      label: "My Cows",
    },
  ];

  if (userRole === "admin") {
    return adminOptions;
  } else if (userRole === "buyer") {
    return buyerOptions;
  } else if (userRole === "seller") {
    return sellerOptions;
  }
};
