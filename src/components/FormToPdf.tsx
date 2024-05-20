// FormToPdf.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Document, Page, Text, Image, PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';

type FormData = {
  textNameField: string;
  textSurnameField: string;
  imageField: FileList;
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  text: {
    margin: 10,
    fontSize: 18,
  },
  image: {
    margin: 10,
    width: 300,
    height: 300,
  },
});

const FormToPdf: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    setFormData(data);
    if (data.imageField && data.imageField[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSrc(fileReader.result as string);
      };
      fileReader.readAsDataURL(data.imageField[0]);
    }
  };

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>{formData?.textNameField}</Text>
        <Text style={styles.text}>{formData?.textSurnameField}</Text>
        {imageSrc && <Image style={styles.image} src={imageSrc} />}
      </Page>
    </Document>
  );

  return (
    <div id="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id="element">
          <label htmlFor="textNameField">Enter name:</label>
          <input id="textNameField" {...register('textNameField')} required />
        </div>
        <div id="element">
          <label htmlFor="textSurnameField">Enter surname:</label>
          <input id="textSurnameField" {...register('textSurnameField')} required />
        </div>
        <div id="element">
          <label htmlFor="imageField">Image:</label>
          <input id="imageField" type="file" accept="image/png, image/jpeg" {...register('imageField')} required />
        </div>
        <button type="submit">Generate PDF</button>
      </form>

      {formData && (
        <div id="element">
        <PDFDownloadLink document={MyDocument} fileName="formData.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Скачать'
          }
        </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default FormToPdf;
