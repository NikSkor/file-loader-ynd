import { ChangeEvent, useState } from 'react';
import style from './FileUploader.module.scss';
import { URL_SDK, token } from '../API/const';
import axios from 'axios';

interface INameObj {
  id: number,
  name: string
}

export default function FileUploader() {

  const [fileList, setFileList] = useState<FileList | null>(null);
  let [fileArr, setFileArr] = useState<INameObj[]>([]);

  let loaded: {
    url: boolean
  } = {
    url: false
  };
  function addScript(url:string) {
  if (loaded.url === false) {
    let s = document.createElement('script');
    s.src = url;
    document.head.appendChild(s);
    loaded.url = true;
  }
}

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    addScript(URL_SDK);
    if (typeof e.target.files !== 'undefined') {
      if(e.target.files !== null) {
        if (e.target.files.length > 100) {
          alert('Не больше 100 файлов!')
          return;
        }

        let fileNameArr: INameObj[] = [];
        for (let i = 0; i < e.target.files.length; i++) {
          
          fileNameArr.push({
            id: i,
            name: e.target.files[i].name
            });
          // console.log('zuzu');
          
        }
        // console.log('fileNameArr: ', fileNameArr);
        setFileArr(fileNameArr);
        setFileList(e.target.files);
      }
    }
      const headers = {
        'Authorization': token
      }

      try {
      const response = await axios.get(`https://cloud-api.yandex.net/v1/disk/resources/upload`, {
        params: 
        {
          path: 'foo.png',
          overwrite: true,
        },
        headers: {
          Authorization: 'OAuth y0_AgAAAAAAuZgcAApG8AAAAADpOIUbTO1ZqMsVSeOYkUXAHzGCDAxVUs4',
        }
      
      });
        console.log('Returned data:', response);

      } catch (e: any) {
        console.log(`Axios request failed: ${e}`);
      }
  };


  // console.log('fileList: ', fileList);
  // console.log('fileArr: ', fileArr);


  return (
    <div className={style.container}>
      <form className={style.form}>
        <label className={style.label}>Выберите файл
          <input 
            type="file" 
            onChange={handleFileChange} 
            className={style.input} 
            multiple
            />
        </label>
        <ul className={style.list}>
          {fileArr.map((item) => {
          return (
            <li className={style.listItem} key={item.id}>
              <span set-id={item.id}>{item.name}</span>
            </li>
          )
        })
        }
        </ul>
        
      </form>
    </div>
    
  )

};