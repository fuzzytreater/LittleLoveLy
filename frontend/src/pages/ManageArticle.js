import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import Switch from 'react-switch';
import instance from "../services/auth/customize-axios";
import {
  articles,
} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import { jwtDecode } from "jwt-decode";
import "../assets/css/manage.css";

export default function ManageArticle() {
  const [articleList, setArticleList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const checkAuthentication = () => {
          const userRole = localStorage.getItem("userRole");
          if (!userRole || userRole !== "ROLE_STAFF") {
              navigate('/');
          }
        };
        checkAuthentication();     
        
        const fetchArticles = async () => {
      try {
        let response = await articles();
        if (response) {
          setArticleList(response.slice(0, 3));
        } else {
          setArticleList([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast.error("Không thể tải được tin tức");
        setArticleList([]);
      }
    };
    fetchArticles();

    }, []);

    return (
        <div>
          <ToastContainer />
          <StaffHeader/>
    
          <div className="manage-content">
            <StaffSideBar/>    

            <div className="manage-content-detail">   
              
            <table className="manage-table">
              <thead>
                <tr>
                <th className="index-head" style={{ width: '5%' }}>STT</th>
                <th className="name-head" style={{ width: '25%' }}>Tiêu đề</th>
                <th className="img-head" style={{ width: '15%' }}>Hình ảnh</th>
                <th className="date-head" style={{ width: '9%' }}>Ngày đăng</th>
                <th className="content-head" style={{ width: '25%' }}>Nội dung</th>
                <th className="active-head" style={{ width: '9%' }}>Trạng thái</th>
                <th className="update-head" style={{ width: '9%' }}>Chỉnh sửa</th>
                </tr>                               
              </thead>

              <tbody>
                {articleList.map((article, index) =>(
                  <tr key={article.articleId}>
                    <td className="index-body">{index + 1}</td>
                    <td className="name-body">{article.title}</td>
                    <td className="img-body">
                      {article.articleImages.slice(0, 1).map((image) => (
                        <img
                          src={`${instance.defaults.baseURL}/images/articles/${image.imagePath}`}
                          alt={article.title}
                          style={{ width: '50%', height: '50%' }}
                        />
                      ))}
                    </td>
                    <td className="date-body">{article.uploadedDate}</td>
                    <th className="content-body">{article.content.length > 170 ? `${article.content.slice(0, 170)}...` : article.content}</th>
                    <td className="active-body"></td>
                    <td className="update-body">
                      <Link
                      to="#" style={{color: "#7f8c8d"}}>
                      Chi tiết 
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>         
        </div>
      </div>
    );
  }