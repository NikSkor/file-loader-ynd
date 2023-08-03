import { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import style from './FileUploader.module.scss';
import { generateRandomId } from '../../utils/generateRandomId';
import FileList from './FileList/FileList';
import { FC } from 'react';
import { uploadFile } from '../API/uploadFile';
import { INameObj } from '../../models/interfaces';
import MessageModal from '../MessageModal/MessageModal';

const FileUploader: FC = ()=> {

  const [fileList, setFileList] = useState<INameObj[]>([]);
  const [id, setId] = useState<string>('');
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  const [isBtnActive, setIsBtnActive] = useState<boolean>(true);


  const modalActivity = (status: boolean, text: string, btnStatus: boolean)=> {
    setIsModal(status);
    setModalText(text);
    setIsBtnActive(btnStatus);
  }

  const fileUploadHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let answer: {
      status: boolean, 
      text: string
    } = {
      status: false,
      text: ''
    };

    if(fileList.length === 0) {
      modalActivity(true, 'Файлы не выбраны', true)
    }

    if(fileList.length !== 0) {
      modalActivity(true, 'Загрузка файлов в процессе...', false)
      answer = await uploadFile(fileList);
      modalActivity(answer.status, answer.text, true);
      setFileList([]);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof e.target.files !== 'undefined') {
      if(e.target.files !== null) {
        if (e.target.files.length > 100) {
          modalActivity(true, 'Не больше 100 файлов!', true);
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
          return <FileList key = {item.id} item={item} delItem={setId}/>
        })
        }
        </ul>
      </form>
      <MessageModal active={isModal} message={modalText} setActive={setIsModal} setMessage={setModalText} activeBtn={isBtnActive} setActiveBtn={setIsBtnActive}/>
    </div>
  )

};

export default FileUploader;
