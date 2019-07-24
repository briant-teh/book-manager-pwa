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

    addBook(book): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.collection('books').add(book)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    deleteBook(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.collection('books').doc(id).delete()
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}
