import { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import style from './FileUploader.module.scss';
import { generateRandomId } from '../../utils/generateRandomId';
import FileList from './FileList/FileList';
import { FC } from 'react';
import { uploadFile } from '../API/uploadFile';


interface INameObj {
  id: string,
  file: File
}

const FileUploader: FC = ()=> {

  const [fileList, setFileList] = useState<INameObj[]>([]);
  const [id, setId] = useState<string>('');

  // let fileNameCatalog: INameObj[] = [...fileList];

  const fileUploadHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    uploadFile(fileList);
    setFileList([]);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof e.target.files !== 'undefined') {
      if(e.target.files !== null) {
        if (e.target.files.length > 100) {
          alert('Не больше 100 файлов!')
          return;
        }

        let fileNameArr: INameObj[] = [];
        fileNameArr = [...fileList];

        for (let i = 0; i < e.target.files.length; i++) {
          let isRereat: boolean = false;
          if (fileList.length === 0) {
            fileNameArr.push({
              id: generateRandomId(),
              file: e.target.files[i]
            });
          }
          if (fileList.length > 0) {
            for (let j = 0; j < fileList.length; j++) {
              if (e.target.files[i].name === fileList[j].file.name) {
                isRereat = true;
              } 
            }
            if (!isRereat) {
              fileNameArr.push({
                id: generateRandomId(),
                file: e.target.files[i]
              });
            }
          }
        }
        setFileList(fileNameArr);
      }
    }
  };

  const delItem = (idDel: string) => {
    setId(idDel);
  }

  // const filterCatalog = (catalog: INameObj[], id: string) => {
  //   let fileNameArr: INameObj[] = [];

  //   if (id === '') return catalog;

  //   for (let item of catalog) {
  //     if (item.id !== id) {
  //       fileNameArr.push(item);
  //     }
  //   }
  //   setFileList(fileNameArr);
  //   return catalog;
  // }

  useEffect(()=> {
    let fileNameArr: INameObj[] = [];

    for (let item of fileList) {
      if (item.id !== id) {
        fileNameArr.push(item);
      }
    }
    setFileList(fileNameArr);
  }, [id])


  return (
    <div className={style.container}>
      <form className={style.form}>
        <div className={style.btnsBlock}>
          <label className={style.label}>Выберите файл
          <input 
            type="file" 
            onChange={handleFileChange} 
            className={style.input} 
            multiple
            />
        </label>
        <button onClick={fileUploadHandler} className={style.label}>Загрузить на диск</button>
        </div>
        {(fileList.length !== 0) && <h3>Список загружаемых файлов:</h3>}
        <ul className={style.list}>
          {fileList.map((item) => {
          return <FileList key = {item.id} item={item} delItem={delItem}/>
        })
        }
        </ul>
      </form>
    </div>
  )

};

export default FileUploader;
