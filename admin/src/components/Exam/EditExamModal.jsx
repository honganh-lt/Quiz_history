import React, { useEffect, useState } from "react";
import "./css/EditExamModal.css";
import { updateExam } from "../../api/examApi";

export const EditExamModal = ({
  exam,
  onClose,
  onSuccess
}) => {

  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    if (!exam) return;

    setTitle(exam.title || "");
    // setDescription(exam.description || "");
    setDuration(exam.duration || 20);
  }, [exam]);

  if (!exam) return null;

  const handleUpdate = async () => {
    try {
      // Validate
      if (!title.trim()) {
        alert("Vui lòng nhập tên đề thi");
        return;
      }

      if (!duration || duration <= 0) {
        alert("Thời gian làm bài không hợp lệ");
        return;
      }

      await updateExam(exam.exam_id, {
        title: title.trim(),
        // description: description.trim(),
        duration: Number(duration)
      });

      alert("Cập nhật đề thi thành công");

      // Reload danh sách ở component cha
      if (onSuccess) {
        onSuccess();
      }

      onClose();

    } catch (err) {
      alert(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Lỗi cập nhật đề thi"
      );
    }
  };

  return (
    <div className="modal-overlay-edit">
      <div className="modal-exam-edit">
        <h3>Sửa đề thi</h3>

        <h4>Tên đề thi</h4>
        <input
          type="text"
          placeholder="Tên đề thi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <h4>Mô tả</h4>
        <textarea
          placeholder="Mô tả đề thi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}

        <h4>Thời gian</h4>
        <input
          type="number"
          min="1"
          placeholder="Thời gian làm bài (phút)"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        <div className="modal-actions-exam-edit">
          <button onClick={handleUpdate}>
            Cập nhật
          </button>

          <button onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditExamModal;