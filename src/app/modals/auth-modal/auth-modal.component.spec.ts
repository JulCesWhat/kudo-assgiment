import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AuthModalComponent } from './auth-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('Auth-ModalComponent', () => {
    let component: AuthModalComponent;
    let fixture: ComponentFixture<AuthModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({})
            ],
            declarations: [AuthModalComponent],
            providers: [
                NgbActiveModal
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
