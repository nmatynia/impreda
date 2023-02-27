import React from 'react';

const admin = () => {
  //TODO change to trpc approach (?)
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) return;
    const file = e.target.files[0];
    const filename = encodeURIComponent(file?.name ?? '');
    const res = await fetch(`/api/upload-image?file=${filename}`);
    const data = await res.json();
    const formData = new FormData();

    Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value);
    });
    fetch(data.url, {
      method: 'POST',
      body: formData
    });
  };

  return <input onChange={uploadPhoto} type="file" accept="image/png, image/jpeg" name="image" />;
};

export default admin;
