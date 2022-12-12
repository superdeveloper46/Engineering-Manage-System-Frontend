import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-type-edit',
  templateUrl: './contract-type-edit.component.html',
  styleUrls: ['./contract-type-edit.component.scss']
})
export class ContractTypeEditComponent implements OnInit {
  public result;
  public EditForm: FormGroup;
  @Input() contractType;
  constructor(
    public activeModal: NgbActiveModal,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.EditForm = new FormGroup({
      contractTypeName: new FormControl('', Validators.required)
    });

    this.EditForm.controls['contractTypeName'].setValue(this.contractType.contractTypeName);
  }

  editContractType() {
    if (this.EditForm.valid) {
    this.apiService
      .editContractTypes(
        this.contractType._id,
        this.EditForm.value,
      )
      .subscribe((res) => {
        this.result = res as any;
        if (this.result.result_status == false) {
          Swal.fire({
            title: this.result.result_message,
            icon: 'error'
          });
        } else {
          this.activeModal.close();
        }
      });
    } else {
      Swal.fire({
        title: '請填寫必填欄位',
        confirmButtonText: '確定',
        confirmButtonColor: '#17A2B8',
        icon: 'error'
      });
    }
  }
}
