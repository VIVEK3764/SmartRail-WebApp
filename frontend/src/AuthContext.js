export const isAuthenticated = async () => {
    try {
        const response = await fetch("http://localhost:5000/auth/verify", {
            method: "GET",
            credentials: "include", // if you’re using cookies
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}` // if using token
            },
        });

        const res = await response.json();
        // console.log(res.verified, "Devvvv");
        return res.verified; // Adjust depending on your backend response
    } catch (error) {
        console.error("Auth check failed:", error);
        return false;
    }
};