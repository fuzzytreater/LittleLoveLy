import { useState, useEffect } from "react";
import backgroundImage from "../assets/images/backgroundDemo.jpg";
import "../assets/css/loginAndRegister.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerAPI } from "../services/auth/UsersService";
import { FaExclamationCircle } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { Button, Container, Icon, IconButton, Typography } from "@mui/material";

const checkChema = Yup.object({
  mail: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  phone: Yup.string().required("Vui lòng điền số điện thoại"),
  name: Yup.string().required("Vui lòng điền họ và tên"),
  password: Yup.string().required("Vui lòng điền mật khẩu"),
  confirmPassword: Yup.string()
    .required("Vui lòng điền đầy đủ mật khẩu")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng nhau"),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      mail: "",
      phone: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: checkChema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formValues = {
          mail: values.mail,
          phone: values.phone,
          name: values.name,
          password: values.password,
        };
        const response = await registerAPI(formValues);
        console.log("API response:", response);
        if (response.success) {
          navigate(routes.login);
        } else {
          console.error("Registration failed:", response.message);
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    // Set class and background image for the body
    document.body.classList.add("img");
    document.body.classList.add("js-fullheight");
    document.body.style.backgroundImage = `url(${backgroundImage})`;

    // Cleanup function to remove added class and background image
    return () => {
      document.body.classList.remove("img");
      document.body.classList.remove("js-fullheight");
      document.body.style.backgroundImage = "none";
    };
  }, []);

  return (
    <div className="ftco-section-register">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center">Đăng kí tài khoản</h3>
              <form onSubmit={formik.handleSubmit} className="signin-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gmail"
                    name="mail"
                    value={formik.values.mail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.mail && formik.errors.mail && (
                    <Tooltip title={formik.errors.mail} placement="right" arrow>
                      <span className="tooltip-icon">
                        <FaExclamationCircle />
                      </span>
                    </Tooltip>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <Tooltip
                      title={formik.errors.phone}
                      placement="right"
                      arrow>
                      <span className="tooltip-icon">
                        <FaExclamationCircle />
                      </span>
                    </Tooltip>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <Tooltip title={formik.errors.name} placement="right" arrow>
                      <span className="tooltip-icon">
                        <FaExclamationCircle />
                      </span>
                    </Tooltip>
                  )}
                </div>
                <div className="form-group">
                  <input
                    id="password-field"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Mật khẩu"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    toggle="#password-field"
                    className={
                      showPassword
                        ? "fa fa-fw fa-eye-slash field-icon"
                        : "fa fa-fw fa-eye field-icon"
                    }
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}></span>
                  {formik.touched.password && formik.errors.password && (
                    <Tooltip
                      title={formik.errors.password}
                      placement="right"
                      arrow>
                      <span className="tooltip-icon">
                        <FaExclamationCircle />
                      </span>
                    </Tooltip>
                  )}
                </div>
                <div className="form-group">
                  <input
                    id="confirm-password-field"
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Xác nhận mật khẩu"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    toggle="#confirm-password-field"
                    className={
                      showConfirmPassword
                        ? "fa fa-fw fa-eye-slash field-icon"
                        : "fa fa-fw fa-eye field-icon"
                    }
                    onClick={() => {
                      setShowConfirmPassword((prevState) => !prevState);
                    }}></span>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <Tooltip
                        title={formik.errors.confirmPassword}
                        placement="right"
                        arrow>
                        <span className="tooltip-icon">
                          <FaExclamationCircle />
                        </span>
                      </Tooltip>
                    )}
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      formik.values.password !== formik.values.confirmPassword
                    }
                    className="form-control btn btn-primary submit px-3">
                    Đăng kí
                  </button>
                </div>
              </form>
              <p className="w-100 text-center">
                &mdash; Đã có tài khoản ? &mdash;
              </p>
              <div className="form-group">
                <button
                  onClick={() => navigate(routes.login)}
                  className="form-control btn btn-primary submit px-3">
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
