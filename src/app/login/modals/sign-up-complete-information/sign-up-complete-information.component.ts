import { Component, OnInit, Input } from '@angular/core';
import { Components } from '@ionic/core';
import { NgForm } from '@angular/forms';

//Services
import { StorageFireService } from '../../../core/services/storage-fire.service';

//Models
import { NameSignUpModel } from '../../../core/models/name-signUp.model';
import { AvatarItemModel } from 'src/app/core/models/avatar-item.model';

@Component({
  selector: 'app-sign-up-complete-information',
  templateUrl: './sign-up-complete-information.component.html',
  styleUrls: ['./sign-up-complete-information.component.scss'],
})
export class SignUpCompleteInformationComponent implements OnInit {

  IMAGENES_AVATARES: AvatarItemModel[] = [];
  cargando = true;
  usuario: NameSignUpModel;

  public ultimoSelec: AvatarItemModel;

  public algunItemSeleccionado = false;

  @Input() modal: Components.IonModal
  constructor(
    private storage: StorageFireService,
  ) {
    this.usuario = new NameSignUpModel('', '');
    this.storage.getImages().then(
      (resp) => {
        this.IMAGENES_AVATARES = resp;
        this.cargando = false;
      }
    );
  }

  ngOnInit() {


  }

  ngAfterContentChecked(): void {
  }

  change(checkItemChanged: AvatarItemModel) {

    if (this.ultimoSelec === undefined) {
      this.ultimoSelec = checkItemChanged;

    } else if (this.ultimoSelec !== checkItemChanged) {

      this.ultimoSelec.checked = false;
      this.ultimoSelec = checkItemChanged;

    }
    
    this.algunItemSeleccionado = this.ultimoSelec.checked;
  }

  submit(){
    this.usuario.imagen = this.ultimoSelec.imgURL;

    this.modal.dismiss({ userName: this.usuario })
    .then(
      (data) => {
        this.modal = null;
      }
    );
    
  }


}
