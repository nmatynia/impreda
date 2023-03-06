import React, { useRef } from 'react';
import { trpc } from '../utils/trpc';

const admin = () => {
  const utils = trpc.useContext();

  const { mutateAsync: createPresignedUrl } = trpc.images.createPresignedUrl.useMutation({
    onSuccess: () => {
      utils.images.invalidate();
    }
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const filename = encodeURIComponent(file?.name ?? '');
    const { url, fields }: { url: string; fields: any } = (await createPresignedUrl()) as any;
    console.log(url);
    const data = {
      ...fields,
      'Content-Type': file.type,
      file
    };
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    await fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <input
      ref={fileRef}
      onChange={uploadImage}
      type="file"
      accept="image/png, image/jpeg"
      name="image"
    />
  );
};

export default admin;
