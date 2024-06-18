import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCookieMutation } from "../RTK/UserApi";

const useAuthGuard = () => {
  const navigate = useNavigate();
  const [getCookie] = useGetCookieMutation();

  useEffect(() => {
    getCookie({})
      .then((result) => {
        if (!result.data.message) {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, [getCookie, history]);
};

export default useAuthGuard;
