document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("generate-pdf");
    const textInput = document.getElementById("text-input");

    // تنظیم دایرکشن برای ورودی متن
    if (textInput) {
        textInput.dir = "rtl"; // جهت راست به چپ برای textarea
    }

    if (button) {
        button.addEventListener("click", () => {
            const text = textInput.value; // دریافت متن ورودی

            fetch('assets/font/vazir.txt')
                .then(response => response.text())
                .then(data => {
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
                .catch(error => console.error('خطا:', error));
        });
    } else {
        console.error("دکمه 'generate-pdf' پیدا نشد!");
    }
});
