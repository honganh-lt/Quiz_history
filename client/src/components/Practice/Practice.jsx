// import Header from "../Home/Header"
import Revise from "./Revise"
import Revise2 from "./Revise2"
// import ReviseLop10 from "./ReviseLop10"
// import ReviseLop11 from "./ReviseLop11"
// import ReviseLop12 from "./ReviseLop12"

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getQuestionsByLesson } from "../../api/questionApi";
import Header from "../Home/Header";
import Footer from "../Home/Footer";


function Practice() {
    return (
        <>
            <Header />
            <Revise />
            {/* <Revise2/> */}
            <Footer/>
        </>

    )
}

export default Practice



// function Practice() {
//     const {className, lessonId} = useParams();

//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         if (!lessonId) return;

//         getQuestionsByLesson(lessonId)
//         .then(res => {
//             console.log("Data: " , res.data); //debug
//             setQuestions(res.data);
//         })
//         .catch(err => console.error(err));
//     }, [lessonId]);
    

//     return (
//         <>
//           <Header/>

//           <h2>{className}</h2>
//           <h3>Bài: {lessonId}</h3>

//           {/* Hiển thị câu hỏi */}
//           {questions.map((q, index) => (
//             <div key={q.question_id} style={{marginBottom: "20px"}}>
//                 <p><b>Câu {index + 1}: </b>{q.content}</p>

//                 {q.answer.map((a) => (
//                     <div key={a.answer_id}>
//                         <label htmlFor="">
//                             <input type="radio" name={`q-${q.question_id}`} />
//                             {a.content}
//                         </label>
//                     </div>
//                 ))}
//             </div>
//           ))}
//         </>
//     );
// }

// export default Practice;