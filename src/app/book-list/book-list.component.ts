import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: [];

    constructor(
        private firestoreService: FirestoreService
    ) { 
    }

    ngOnInit() {
        this.firestoreService.getBooks()
            .subscribe(result => {
                this.books = result;
                console.log('books', this.books);
            });
    }
}
