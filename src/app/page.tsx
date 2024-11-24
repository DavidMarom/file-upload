import React from 'react';
import FileUploader from '../components/FileUploader';

export default function Home() {
  return (
    <div>
      <FileUploader />
      <img src="/sc.jpg" alt="logo" />
    </div>
  );
}
