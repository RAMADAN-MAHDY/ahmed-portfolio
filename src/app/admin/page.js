"use client"; 
import ProjectForm from "@/app/componant/adminComponent/projectForm.js"; // Adjust the import path as necessary
import MyProjects from "@/app/componant/myProjects.js"; // Adjust the import path as necessary
import AddImage from "@/app/componant/adminComponent/addImage";

import { useEffect, useState } from "react";

const AdminPage = () => {    
    const ApiUrl = process.env.NEXT_PUBLIC_API_URL ;

    const [currentPathAddPro, setCurrentPathAddPro] = useState(false);
    const [currentPathAddImage, setCurrentPathAddImage] = useState(false);
    const [currentPathUpdate, setCurrentPathUpdate] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // حالة التحقق
    const [password, setPassword] = useState(""); // كلمة المرور
    const [error, setError] = useState(""); // رسالة الخطأ


    // التحقق من الجلسة عند تحميل الصفحة
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch(`${ApiUrl}/admin/check-session`, {
                    method: "GET",
                    credentials: "include", // إرسال الكوكيز مع الطلب
                });

                if (res.ok) {
                    setIsAuthenticated(true); // الجلسة صالحة
                } else {
                    setIsAuthenticated(false); // الجلسة غير صالحة
                }
            } catch (err) {
                console.error("Error checking session:", err);
                setIsAuthenticated(false);
            }
        };

        checkSession();
    }, []);


    const handleLogin = async () => {
        try {
            const res = await fetch(`${ApiUrl}/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
                credentials: "include",
            });

            const data = await res.json();
            if (res.ok) {
                setIsAuthenticated(true); // السماح بعرض الصفحة
            } else {
                setError(data.message || "كلمة المرور غير صحيحة");
            }
        } catch (err) {
            setError("حدث خطأ أثناء التحقق من كلمة المرور");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
                <h1 className="text-2xl font-bold mb-4">تسجيل الدخول</h1>
                <input
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded mb-4 w-64"
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white p-2 rounded w-64 hover:bg-blue-700"
                >
                    تسجيل الدخول
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        );
    }

    return (                                 
        <div>       
            <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
                <h1 className="text-xl font-bold">لوحة التحكم</h1>
                <button
                    onClick={() => {
                        setCurrentPathAddPro(true);
                        setCurrentPathUpdate(false);
                        setCurrentPathAddImage(false);

                    }}
                    className={`${currentPathAddPro ? "bg-[#187efc]" : "bg-[#1a1f2575]"} hover:bg-[#8abfff] p-3 rounded-2xl font-bold`}
                >
                    اضافة مشروع
                </button>
                <button
                    onClick={() => {
                        setCurrentPathUpdate(true);
                        setCurrentPathAddPro(false);
                        setCurrentPathAddImage(false);

                    }}
                    className={`${currentPathUpdate ? "bg-[#187efc]" : "bg-[#1a1f2575]"} hover:bg-[#87bdff] p-3 rounded-2xl font-bold`}
                >
                    تعديل او حذف مشروع
                </button>
                <a
                    href="https://ahmed-mahdy.vercel.app/"
                    target="_blank"
                    className="bg-[#1a1f2575] hover:bg-[#8abfff] p-3 rounded-2xl font-bold"
                >
                    تصفح الموقع
                </a>
                <button
                    onClick={() => {
                        setCurrentPathAddImage(true);
                        setCurrentPathUpdate(false);
                        setCurrentPathAddPro(false);

                    }}
                    className={`${currentPathAddPro ? "bg-[#187efc]" : "bg-[#1a1f2575]"} hover:bg-[#8abfff] p-3 rounded-2xl font-bold`}
                >
                    اضافة صوره شخصية
                </button>
            </nav> 
            {currentPathAddImage && <AddImage />}
            {currentPathAddPro && <ProjectForm />}
            {currentPathUpdate && <MyProjects />}

        </div>                                
    );                                       
};

export default AdminPage;