import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return jwtDecode<JwtPayload>(token);
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return !this.isTokenExpired();
  }

  isTokenExpired() {
    // TODO: return a value that indicates if the token is
    try {
      const profile = this.getProfile();
      const currentTime = Math.floor(Date.now() / 1000);

      return profile.exp == undefined || profile.exp < currentTime;
    } catch (error) {
      // Handle decoding errors, possibly log them
      console.error("Error decoding JWT:", error);
      return true; // Consider expired if decoding fails
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem("id_token") || "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem("id_token", idToken);
    // TODO: redirect to the home page
    window.location.assign("/");
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem("id_token");
    // TODO: redirect to the login page
    window.location.assign("/login");
  }
}

export default new AuthService();
