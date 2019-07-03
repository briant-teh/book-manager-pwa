import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {
    // booksObservable: Observable<any>

    constructor(
        private db: AngularFirestore
    ) { 
    }

    getBooksActions(): Observable<any> {
        return this.db.collection('books').snapshotChanges();
    }
}
