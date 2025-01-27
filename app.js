document.addEventListener("DOMContentLoaded", function () {
    // مقداردهی اولیه Quill.js
    const quill = new Quill("#editor-container", {
        theme: "snow",
        placeholder: "متن خود را وارد کنید...",
        modules: {
            toolbar: [
                ["bold", "italic", "underline"], // ابزار قالب‌بندی
                [{ list: "ordered" }, { list: "bullet" }], // لیست‌ها
                [{ direction: "rtl" }], // تنظیم جهت راست به چپ
                ["clean"], // حذف قالب‌بندی
            ],
        },
    });

    const button = document.getElementById("generate-pdf");

    if (button) {
        button.addEventListener("click", () => {
            const text = quill.getText(); // دریافت متن ساده از Quill.js

            fetch("assets/font/base-font.txt")
                .then((response) => response.text())
                .then((data) => {
                    const vazirFont = data.trim(); // داده‌های Base64 فونت

                    const doc = new window.jspdf.jsPDF();
                    doc.addFileToVFS("vazir.ttf", vazirFont); // اضافه کردن فونت
                    doc.addFont("vazir.ttf", "Vazir", "normal"); // انتخاب فونت
                    doc.setFont("Vazir");

                    // تنظیم متن و مکان آن
                    doc.text(text, 190, 20, {
                        align: "right", // جهت راست به چپ
                        maxWidth: 180, // عرض حداکثر
                    });

                    doc.save("output.pdf"); // ذخیره PDF
                })
                .catch((error) => console.error("خطا:", error));
        });
    } else {
        console.error("دکمه 'generate-pdf' پیدا نشد!");
    }
});
