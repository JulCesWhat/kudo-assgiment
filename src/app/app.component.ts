import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthedUser } from './state/selectors/authedUser.selectors';
import { AppState } from './state/app.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from './modals/auth-modal/auth-modal.component';
import { Subscription } from 'rxjs';
import { getInitialData } from './state/actions/authedUser.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'kudo-assgiment';
    authedUserId: string = '';
    authedUserSubscription: Subscription | null = null;

    constructor(
        private store: Store<AppState>,
        private modalService: NgbModal
    ) {

    }

    ngOnInit() {
        this.store.dispatch(getInitialData());
        this.authedUserSubscription = this.store.select(selectAuthedUser)
            .subscribe((authedUser) => {
                if (authedUser) {
                    this.authedUserId = authedUser.id;
                } else {
                    this.authedUserId = '';
                    this.openAuthenticationModal();
                }
            });
    }

    ngOnDestroy(): void {
        this.authedUserSubscription?.unsubscribe();
    }

    private openAuthenticationModal() {
        const modalRef = this.modalService.open(AuthModalComponent, {
            backdrop: 'static',
            centered: false,
            size: 'md'
        });
        modalRef.result
            .then(() => {
            })
            .catch(() => {
                /* Do Nothing*/
            });
    }
}
