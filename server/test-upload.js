const fs = require('fs');

async function test() {
    const formData = new FormData();
    formData.append('title', 'Test upload');
    const blob = new Blob([fs.readFileSync('server.js')], { type: 'image/jpeg' });
    formData.append('file', blob, 'test.jpg');

    try {
        const response = await fetch('http://localhost:5000/api/newsletter', {
            method: 'POST',
            body: formData
        });
        const data = await response.text();
        console.log(response.status, data);
    } catch (err) {
        console.error(err);
    }
}
test();
