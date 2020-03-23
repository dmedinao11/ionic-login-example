import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { AvatarItemModel } from '../models/avatar-item.model';


@Injectable({
  providedIn: 'root'
})
export class StorageFireService {

  IMAGENESAVATARES = [
    '1000.png',
    '1001.png',
    '1002.png',
    '1003.png',
    '1004.png',
    '1005.png',
    '1006.png',
    '1007.png',
    '1008.png',
  ];
  IMAGE_URL = 'users-avatar/';





  constructor(
    private storage: AngularFireStorage,
  ) {}


  public getImages(): Promise<any> {
    let checkBoxItems: AvatarItemModel[][] = [];
    let indx = 0;
    return new Promise(
      async (resolve) => {
        for(let i = 0; i < 3; i++){

          let checkBoxRow: AvatarItemModel[] = [];

          for(let j = 0; j < 3; j++){

            const URL = this.IMAGE_URL + this.IMAGENESAVATARES[indx];
            let resultado = await this.getImage(URL);

            const checkBox = new AvatarItemModel(
              indx,
              resultado,
              `myCheckbox${indx}`,
              false
            );

            checkBoxRow.push(checkBox);
            indx++;
          }

          checkBoxItems.push(checkBoxRow);
        }
        resolve(checkBoxItems);
      }
    )
  }

  private async getImage(url: string) {
    const ref = this.storage.ref(url);
    return await ref.getDownloadURL().toPromise();
  }
}
