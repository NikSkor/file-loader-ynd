import { ChangeEvent, MouseEvent, useState } from 'react';
import style from './FileUploader.module.scss';
import { URL_API, URL_SDK, token } from '../API/const';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/UserSlice';
import { generateRandomId } from '../../utils/generateRandomId';

interface INameObj {
  id: string,
  file: File
}

const uploadFile = async (fileList: INameObj[]) => {
  for (let item of fileList) {
    const formData = new FormData();
    formData.append('file', item.file);

    try {
        const response = await axios.get(URL_API, {
          params: 
          { 
            path: item.file.name, 
            overwrite: true 
          },
          headers: {
            Authorization:
              'OAuth y0_AgAAAAAAuZgcAADLWwAAAADpTQDR5aRGEktlRF6krySp7iY4p1Q4DSM',
          }, // Replace with your OAuth token
        });

        await axios.put(response.data.href, formData);
        console.log('Returned data:', response);
        // await console.log('response.data.href: ', response.data);
      } catch (e) {
        console.log(`Axios request failed: ${e}`);
        throw new Error(`Axios request failed: ${e}`);
    }
  }
};

export default function FileUploader() {

  const [fileList, setFileList] = useState<INameObj[]>([]);
  // let [fileArr, setFileArr] = useState<INameObj[]>([]);

  //   const dispatch = useAppDispatch();

  // const {addFiles} = userSlice.actions;

  // const filesList: File[] = useAppSelector(state => state.userReducer.filesList);

  // let loaded: {
  //   url: boolean
  // } = {
  //   url: false
  // };
//   function addScript(url:string) {
//   if (loaded.url === false) {
//     let s = document.createElement('script');
//     s.src = url;
//     document.head.appendChild(s);
//     loaded.url = true;
//   }
// }

  // let filesArr: INameObj[] = [];
  const fileUploadHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    uploadFile(fileList);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // addScript(URL_SDK);
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
      // const headers = {
      //   'Authorization': token
      // }

      // try {
      // const response = await axios.get(URL_API, {
      //   params: 
      //   {
      //     path: 'foo.png',
      //     overwrite: true,
      //   },
      //   headers: {
      //     Authorization: 'OAuth y0_AgAAAAAAuZgcAADLWwAAAADpTQDR5aRGEktlRF6krySp7iY4p1Q4DSM',
      //   }
      
      // });
      //   console.log('Returned data:', response);

      // } catch (e: any) {
      //   console.log(`Axios request failed: ${e}`);
      // }
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        {/* <h3 className={style.title}>Количество файлов {fileList.length}</h3> */}
        <label className={style.label}>Выберите файл
          <input 
            type="file" 
            onChange={handleFileChange} 
            className={style.input} 
            multiple
            />
        </label>
        <button onClick={fileUploadHandler} className={style.label}>Загрузить на диск</button>
        <ul className={style.list}>
          {fileList.map((item) => {
          return (
            <li className={style.listItem} key={item.id} set-id={item.id}>
              <span>{item.file.name}</span>
            </li>
          )
        })
        }
        </ul>
        
      </form>
    </div>
    
  )

};