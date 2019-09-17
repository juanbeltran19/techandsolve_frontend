import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})

export class AppComponent implements OnInit {
  title = 'frontendapp';
  registerForm: FormGroup;
  submitted = false;
  nmDocumento: number = null;
  file: File;

  constructor(private formBuilder:FormBuilder, private appService:AppService){}

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      nmDocumento: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  downLoadFile(data: any, type: string){
    var blob = new Blob([data], {type: type.toString()});
    var url = window.URL.createObjectURL(blob);
  }

  procesarArchivo(){
    this.submitted = true;

    this.appService.procesarArchivo(this.file, this.nmDocumento).subscribe(Response=>{
        this.downLoadFile(Response, "text/plain")
    });

  }

  cargarArchivo(evento: any){
    this.file = evento.target.files[0];
  }
}
