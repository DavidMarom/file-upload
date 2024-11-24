
import fs from 'fs';

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) {
        return new Response('No file found', { status: 400 });
    }

    const reader = (file as File).stream().getReader();
    const filename = (file as File).name;
    const writableStream = fs.createWriteStream(`./public/${filename}`);
    let bytesRead = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        writableStream.write(value);
        bytesRead += value.byteLength;
    }
    writableStream.end();

    return new Response(`File size: ${bytesRead} bytes`, { status: 200 });
}
