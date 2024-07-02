import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import { addVoucher } from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/manage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddVoucher() {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleButtonClick = (type) => {
        setSelectedType(type);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!selectedType) {
            toast.error('Vui lòng chọn phân loại');
            return;
        }

        if (!startDate || !endDate) {
            toast.error('Vui lòng chọn ngày có hiệu lực và ngày hết hiệu lực.');
            return;
        }

        const voucherRequestDTO = new FormData(e.target);
        voucherRequestDTO.append('type', selectedType);
        voucherRequestDTO.append('startDate', startDate.toLocaleDateString('en-GB'));
        voucherRequestDTO.append('endDate', endDate.toLocaleDateString('en-GB'));

        try {
            await addVoucher(voucherRequestDTO);
            navigate(routes.manageVoucher);
            toast.success('Thêm voucher thành công!');
        } catch (error) {
            toast.error(`Error adding voucher: ${error.message}`);
        }
    };

    const handleReload = (e) => {
        e.preventDefault();
        window.location.reload();
    };

    useEffect(() => {
        const checkAuthentication = () => {
            const userRole = localStorage.getItem("userRole");
            if (!userRole || userRole !== "ROLE_STAFF") {
                navigate('/');
            }
        };

        checkAuthentication();
    }, [navigate]);

    return (
        <div>
            <ToastContainer />
            <StaffHeader />
            <div className="manage-content">
                <StaffSideBar />
                <div className="add-update-content-detail">
                    <form onSubmit={handleSubmit}>
                        <div className="manage-form-input">
                            {/* 1 TITLE */}
                            <div className="manage-form-group">
                                <label>Tiêu đề</label>
                                <div className="manage-form-control">
                                    <input type="text" name="title" required />
                                </div>
                            </div>

                            {/* 2 LIMIT */}
                            <div className="manage-form-group">
                                <label>Giới hạn</label>
                                <div className="manage-form-control">
                                    <input type="number" name="limit" step="1" min="0" required />
                                </div>
                            </div>

                            {/* 3 DES */}
                            <div className="manage-form-group">
                                <label>Mô tả voucher</label>
                                <div className="manage-form-control">
                                    <textarea name="description" required />
                                </div>
                            </div>

                            {/* 8 min_order_amount */}
                            <div className="manage-form-group">
                                <label>Giá trị đơn hàng yêu cầu</label>
                                <div className="manage-form-control">
                                    <input type="number" name="min_order_amount" step="500" min="0" required />
                                </div>
                            </div>

                            {/* 9 type */}
                            <div className="manage-form-group">
                                <label>Phân loại</label>
                                <div className="manage-form-type-voucher-control">
                                    <button 
                                        style={{marginRight: '15px', borderRadius: '10px', border: '1px solid rgb(67, 65, 65)'}}
                                        type="button"
                                        className={selectedType === 'FLAT' ? 'selected' : ''}
                                        onClick={() => handleButtonClick('FLAT')}
                                    >
                                        FLAT
                                    </button>
                                    <button
                                        style={{marginRight: '15px', borderRadius: '10px', border: '1px solid rgb(67, 65, 65)'}}
                                        type="button"
                                        className={selectedType === 'FREE_SHIPPING' ? 'selected' : ''}
                                        onClick={() => handleButtonClick('FREE_SHIPPING')}
                                    >
                                        FREE_SHIPPING
                                    </button>
                                    <button
                                        style={{marginRight: '15px', borderRadius: '10px', border: '1px solid rgb(67, 65, 65)'}}
                                        type="button"
                                        className={selectedType === 'PERCENTAGE' ? 'selected' : ''}
                                        onClick={() => handleButtonClick('PERCENTAGE')}
                                    >
                                        PERCENTAGE
                                    </button>
                                    <button
                                        style={{marginRight: '15px', borderRadius: '10px', border: '1px solid rgb(67, 65, 65)'}}
                                        type="button"
                                        className={selectedType === 'DISCOUNT_SHIPPING' ? 'selected' : ''}
                                        onClick={() => handleButtonClick('DISCOUNT_SHIPPING')}
                                    >
                                        DISCOUNT_SHIPPING
                                    </button>
                                </div>
                            </div>

                            {/* Conditional Fields based on type */}
                            {selectedType === 'FLAT' && (
                                <div className="manage-form-group">
                                    <label>Số tiền giảm</label>
                                    <div className="manage-form-control">
                                        <input type="number" name="discount_amount" step="500" min="0" required />
                                    </div>
                                </div>
                            )}

                            {selectedType === 'PERCENTAGE' && (
                                <>
                                    <div className="manage-form-group">
                                        <label>Phần trăm giảm</label>
                                        <div className="manage-form-control">
                                            <input type="number" name="discount_percentage" step="0.1" min="0" required />
                                        </div>
                                    </div>
                                    <div className="manage-form-group">
                                        <label>Số tiền giảm tối đa</label>
                                        <div className="manage-form-control">
                                            <input type="number" name="max_discount_amount" step="500" min="0" />
                                        </div>
                                    </div>
                                </>
                            )}

                            {selectedType === 'DISCOUNT_SHIPPING' && (
                                <div className="manage-form-group">
                                    <label>Giảm phí giao hàng</label>
                                    <div className="manage-form-control">
                                        <input type="number" name="ship_discount_amount" step="500" min="0" required />
                                    </div>
                                </div>
                            )}

                            {/* 10 start_date */}
                            <div className="manage-form-group">
                                <label>Ngày có hiệu lực</label>
                                <div className="manage-form-control">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        required
                                    />
                                </div>

                            </div>

                            {/* 11 end_date */}
                            <div className="manage-form-group">
                                <label>Ngày hết hiệu lực</label>
                                <div className="manage-form-control">
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Product BUTTON */}
                        <div className="manage-form-btn">
                            <button className="save-manage-btn save-manage-link" type="submit">
                                Thêm voucher
                            </button>
                            <div className="cancel-manage-btn">
                                <button onClick={handleReload} className="cancel-manage-link">
                                    Đặt lại
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
