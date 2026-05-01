import React, {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* PAGE REFRESH RESTORE */
  useEffect(() => {

    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    let savedProfile = null;
    try {
      savedProfile = JSON.parse(localStorage.getItem("profileData"));
    } catch {}

    if (savedUser && token) {
      try {
        const parsedUser = JSON.parse(savedUser);

        setUser({
          ...parsedUser,
          token,

          // 🔥 PREMIUM + ROLE SAFE
          isPremium: parsedUser?.isPremium || false,
          role: parsedUser?.role || "user",

          name: savedProfile?.name || parsedUser.name,
          email: savedProfile?.email || parsedUser.email,
          image: savedProfile?.image || parsedUser.image || ""
        });

      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);

  }, []);

  /* LOGIN */
  const login = (token, userData) => {

    let savedProfile = null;
    try {
      savedProfile = JSON.parse(localStorage.getItem("profileData"));
    } catch {}

    const loggedInUser = {
      ...userData,
      token,

      // 🔥 DEFAULT FREE USER
      isPremium: userData?.isPremium || false,
      role: userData?.role || "user",
      plan: userData?.plan || "free",

      name: savedProfile?.name || userData?.name,
      email: savedProfile?.email || userData?.email,
      image: savedProfile?.image || userData?.image || ""
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    setUser(loggedInUser);
  };

  /* UPDATE PROFILE */
  const updateProfile = (profileData) => {

    localStorage.setItem(
      "profileData",
      JSON.stringify(profileData)
    );

    const updatedUser = {
      ...user,
      name: profileData.name,
      email: profileData.email,
      image: profileData.image
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  };

  /* LOGOUT */
  const logout = () => {

    localStorage.clear();   // 🔥 cleaner
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};