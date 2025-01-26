## make pdf rtl

Create a pdf file based on the text you enter.
Compatible with Persian and right-to-left.
Customizable

### Note:
If you are using xampp or wamp or any virtual server, to run the program, place the source in the root and server execution location (www, htdocs ...)

### Personalization example:
The selected Persian font is "vazir". You can replace any font in the source.
To change the font, you must convert the .ttf file to base64.
Place your base64 contents in a "txt" file at the following address. 
`/assets/font`

```
if (button) {
        button.addEventListener("click", () => {
            const text = textInput.value; // دریافت متن ورودی

            fetch('assets/font/base-font.txt')
            
            ....... 
```
