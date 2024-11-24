"use client"

import axios from 'axios';
import React, { useState } from 'react';
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function FileUploader() {

    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files) { setFile(files[0]) }
    }

    async function handleUpload() {
        if (!file) return;

        setStatus('uploading');
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setStatus('success');
        } catch (error) {
            console.error('An error occurred', error);
            setStatus('error');
        }
    }

    return (
        <div>
            <h1>File Uploader</h1>
            <input type="file" onChange={handleFileChange} />
            {file && (
                <div className="mb-4 text-sm">
                    <p>File selected: {file.name}</p>
                    <p>File size: {file.size} bytes</p>
                    <p>Type: {file.type}</p>
                </div>
            )}
            {file && status !== 'uploading' &&
                <button onClick={handleUpload}
                >Upload</button>
            }

        </div>
    );
}
