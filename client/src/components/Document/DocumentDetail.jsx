import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocumentDetail } from "../../api/documentApi";
import "./DocumentDetail.css";
import Header from "../Home/Header";

const DocumentDetail = () => {
    const { documentId } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);

    // Chuẩn hóa luồng gọi API bằng async/await, lồng try-catch và quản lý trạng thái loading chuyên nghiệp
    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const data = await getDocumentDetail(documentId);
                setDocument(data || null);
            } catch (error) {
                console.error("Lỗi khi tải chi tiết bài học/tài liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        if (documentId) {
            fetchDetail();
        }
    }, [documentId]);

    // LOADING TRẠNG THÁI ĐANG TẢI
    if (loading) {
        return (
            <div>
                <Header />
                <h2 style={{ textAlign: "center", marginTop: "50px", color: "#666" }}>
                    Đang tải nội dung bài học...
                </h2>
            </div>
        );
    }

    // TRƯỜNG HỢP KHÔNG TÌM THẤY DỮ LIỆU
    if (!document) {
        return (
            <div>
                <Header />
                <h2 style={{ textAlign: "center", marginTop: "50px", color: "#dc3545" }}>
                    Tài liệu không tồn tại hoặc đã bị xóa!
                </h2>
            </div>
        );
    }

    return (
        <div className="detail-document">
            <Header />
            
            <div className="detail-page">
                <div className="detail-card">
                    
                    {/* Hiển thị tiêu đề bài học nếu có dữ liệu */}
                    {document.lesson_name && (
                        <h1 className="detail-title" style={{ marginBottom: "20px" }}>
                            Bài {document.lesson_number}: {document.lesson_name}
                        </h1>
                    )}

                    {/*Thêm điều kiện fallback || "" để an toàn, không bị crash ứng dụng nếu nội dung trống */}
                    <div
                        className="detail-content"
                        dangerouslySetInnerHTML={{
                            __html: document.content || "<p>Nội dung đang được cập nhật...</p>"
                        }}
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default DocumentDetail;