import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Store, select } from '@ngrx/store';
import { retrievedQuestionList } from './state/actions/questions.actions';
import { retrievedUserList, setAuthedUser } from './state/actions/users.actions';
import { selectQuestions } from './state/selectors/questions.selectors'
import { selectUsers } from './state/selectors/users.selectors';
import { selectAuthedUser } from './state/selectors/authedUser.selectors';
import { AppState } from './state/app.state';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from './modals/auth.modal/auth.modal.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'kudo-assgiment';
    authedUserId: string = '';
    // authModalOpened: boolean = false;

    constructor(
        private apiService: ApiService,
        private store: Store<AppState>,
        private modalService: NgbModal
    ) {

    }

    ngOnInit() {
        this.apiService.getInitialData()
            .then((response: any) => {
                this.store.dispatch(retrievedQuestionList({ questions: response.questions }));
                this.store.dispatch(retrievedUserList({ users: response.users }));
            }).catch((apiError) => {

            });
        this.store.select(selectAuthedUser)
            .subscribe((authedUser) => {
                console.log('selectAuthedUser')
                console.log(authedUser)
                if (!authedUser) {
                    this.openAuthenticationModal();
                }
            });
    }

    private openAuthenticationModal() {
        const modalRef = this.modalService.open(AuthModalComponent, {
            backdrop: 'static',
            centered: true
        });
        modalRef.result
            .then(() => {
            })
            .catch(() => {/* Do Nothing*/
            });
    }

}
